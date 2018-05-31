import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, Events } from 'ionic-angular';
import { HaventecAuthenticateClient } from '@haventec/authenticate-client-js';
import { HomePage } from '../home/home';
import { ResetPinPage } from '../reset-pin/reset-pin';
import { LogService } from '../../providers/log-service/log-service'
import { PageLoadingService } from '../../providers/page-loading-service/page-loading-service';
import * as Constant from '../../constants/application.const';
import {FingerprintAIO} from "@ionic-native/fingerprint-aio";
import {Storage} from "@ionic/storage";
import {SecureStorage, SecureStorageObject} from "@ionic-native/secure-storage";

@Component({
  selector: 'ht-page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public username: string;
  private loginFormGroup: FormGroup;
  private appName: string;

  private mustUseFingerprint = false;

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private logService: LogService,
    private faio: FingerprintAIO,
    private insecureStorage: Storage,
    private secureStorage: SecureStorage,
    private haventecAuthenticateClient: HaventecAuthenticateClient,
    public events: Events,
    private pageLoadingService: PageLoadingService
  ) {

    this.appName = Constant.APPLICATION_NAME;
    this.loginFormGroup = this.formBuilder.group({
      pin: ['', Validators.required],
    });

    this.username = this.haventecAuthenticateClient.getUsername();

    this.insecureStorage.get('ha_auth_method').then(authMethod => {
      if ( authMethod === 'fingerprint' ) {
        this.faio.isAvailable().then(result => {

          if ( result === 'OK' || result === 'Success' || result === 'finger' ) {
            this.mustUseFingerprint = true;
            this.openFingerprint();
          }
        }, error => {
          this.logService.error(error);
        });
      }
    }, error => {
      this.logService.error(error);
    });
  }

  openFingerprint() {
    this.faio.show({
      clientId: Constant.APPLICATION_NAME,
      disableBackup:true  //Only for Android(optional)
    })
      .then((result: any) => {

        this.secureStorage.create('ha_sample_app')
          .then((storage: SecureStorageObject) => {
            storage.get('ha_pin')
              .then(
                data => {
                  this.login(data);
                },
                error => {
                  this.logService.error(error);
                }
              );
          });
      })
      .catch((error: any) =>
      {
        this.logService.error(error);
      });
  }

  pinUpdated(pin) {
    if (pin.length === 4) {
      this.loginFormGroup.reset();
      this.events.publish('pin:clear');
      this.login(pin);
    }
  }

  login(pin) {
    this.pageLoadingService.present();

    this.haventecAuthenticateClient.login(this.username, pin).then(
      data => {
        this.logService.debug('\nAuthentication Key: \n\n', data.authKey);
        this.pageLoadingService.dismiss();
        this.navCtrl.setRoot(HomePage);
      },
      err => {
        this.pageLoadingService.dismiss();
        this.logService.error(err);
      }
    );
  }

  forgotPin() {
    this.navCtrl.setRoot(ResetPinPage);
    this.haventecAuthenticateClient.forgotPin(this.username).then(
      data => {},
      err => {
        this.logService.error(err);
      }
    );
  }
}
