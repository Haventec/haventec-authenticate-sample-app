import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { HaventecAuthenticateClient } from '@haventec/authenticate-client-js';
import { ChooseUserPage } from '../choose-user/choose-user';
import { HomePage } from '../home/home';
import { LogService } from '../../providers/log-service/log-service';
import { PageLoadingService } from '../../providers/page-loading-service/page-loading-service';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import {Storage} from "@ionic/storage";
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import * as Constant from '../../constants/application.const'

@Component({
  selector: 'ht-page-activate-account',
  templateUrl: 'activate-account.html',
})
export class ActivateAccountPage {

  public username: string;
  private activateAccountFormGroup: FormGroup;

  private canUseFingerprint = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private faio: FingerprintAIO,
    private insecureStorage: Storage,
    private secureStorage: SecureStorage,
    private haventecAuthenticateClient: HaventecAuthenticateClient,
    private logService: LogService,
    private pageLoadingService: PageLoadingService
  ) {

    this.activateAccountFormGroup = this.formBuilder.group({
      pin: ['', Validators.required]
    });

    this.username = this.haventecAuthenticateClient.getUsername();

    this.faio.isAvailable().then(result => {
      if ( result === 'OK' || result === 'Success' || result === 'finger' ) {
        this.canUseFingerprint = true;
      }
    }, err => {
      console.log(err);
    });
  }

  pinUpdated(pin){
    if(pin.length === 4){
      this.activateAccountFormGroup.controls['pin'].setValue(pin);
    }
  }

  activateUser() {
    let pin = this.activateAccountFormGroup.value.pin;

    this.insecureStorage.set('ha_auth_method', 'pin');

    return this.doActivateUser(pin);
  }

  activateUserWithFingerprint(){

    this.faio.show({
      clientId: Constant.APPLICATION_NAME,
      disableBackup:true  //Only for Android(optional)
    })
      .then((result: any) => {

        // If the user successfully authenticates with Fingerprint,
        // we generate a PIN for them to use to authenticate with Haventec Authenticate.
        // We must save this locally in secure storage before calling Haventec Authenticate activateUser,
        // which will be used in subsequent logins, accessed only after successful fingerprint authentication
        let pin = this.generatePIN(Constant.FINGERPRINT_PIN_SIZE);

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
        this.logService.error(error);
      });
  }

  generatePIN(len: number) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < len; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
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
}
