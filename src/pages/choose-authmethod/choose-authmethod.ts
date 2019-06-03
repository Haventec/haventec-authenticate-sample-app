import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ActivateAccountPage } from '../activate-account/activate-account';
import { PageLoadingService } from '../../providers/page-loading-service/page-loading-service';
import { LogService } from '../../providers/log-service/log-service';
import * as Constant from '../../constants/application.const';
import {SecureStorage, SecureStorageObject} from "@ionic-native/secure-storage";
import {HomePage} from "../home/home";
import {ChooseUserPage} from "../choose-user/choose-user";
import {Storage} from "@ionic/storage";
import {FingerprintAIO} from "@ionic-native/fingerprint-aio";
import { HaventecAuthenticateClient } from '../../services/authenticate.client';

@Component({
  selector: 'ht-page-choose-authmethod',
  templateUrl: 'choose-authmethod.html',
})
export class ChooseAuthMethodPage {

  private appName: string;
  public username: string;
  private canUseFingerprint = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private faio: FingerprintAIO,
    private insecureStorage: Storage,
    private secureStorage: SecureStorage,
    private haventecAuthenticateClient: HaventecAuthenticateClient,
    private logService: LogService,
    private pageLoadingService: PageLoadingService

  ) {
    this.appName = Constant.APPLICATION_NAME;

    this.username = this.haventecAuthenticateClient.getUsername();

    this.faio.isAvailable().then(result => {
      if ( result === 'OK' || result === 'Success' || result === 'finger' ) {
        this.canUseFingerprint = true;
      }
    }, err => {
      console.log(err);
      this.usePIN();
    });
  }

  usePIN() {
    let activationToken = this.navParams.get('activationToken');
    this.insecureStorage.set('ha_auth_method', 'pin');
    this.navCtrl.setRoot(ActivateAccountPage, {
      activationToken: activationToken,
      fromChooseAuthMethod: true
    });
  }

  doActivateUser(pin: string){
    let activationToken = this.navParams.get('activationToken');

    this.pageLoadingService.present();

    this.haventecAuthenticateClient.activateUser(this.username, activationToken, pin).then(
      data => {
        this.pageLoadingService.dismiss();
        this.navCtrl.setRoot(HomePage);
      },
      err => {
        this.logService.error(err);
        this.pageLoadingService.dismiss();
      }
    );
  }

  back() {
    this.navCtrl.setRoot(ChooseUserPage);
  }

  activateUserWithFingerprint(){

    let pin = this.generatePIN(Constant.FINGERPRINT_PIN_SIZE);

    this.faio.show({
      clientId: Constant.APPLICATION_NAME,
      clientSecret: 'password', //Only necessary for Android
      localizedFallbackTitle: 'Use Pin', //Only for iOS
      localizedReason: 'Please authenticate', //Only for iOS
      disableBackup:true  //Only for Android(optional)
    })
      .then((result: any) => {

        // If the user successfully authenticates with Fingerprint,
        // we generate a PIN for them to use to authenticate with Haventec Authenticate.
        // We must save this locally in secure storage before calling Haventec Authenticate activateUser,
        // which will be used in subsequent logins, accessed only after successful fingerprint authentication
        this.secureStorage.create('ha_sample_app')
          .then((storage: SecureStorageObject) => {
            storage.set('ha_pin', pin)
              .then(
                data => {
                  this.insecureStorage.set('ha_auth_method', 'fingerprint').then(result => {
                    this.doActivateUser(pin);
                  },error => {
                    this.logService.error(error);
                  })
                },
                error => {
                  this.logService.error(error);
                });
          });
      },error => {
        if ( error !== 'Cancelled' && error != 'Error: Optional("Canceled by user.")' ) {
          this.logService.error(error);
        }
      });
  }

  generatePIN(len: number) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < len; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
}
