import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { ForgotPinPage } from '../forgot-pin/forgot-pin';
import { AccessCredential } from '../../models/accessCredential';
import { AuthService } from '../../providers/auth-service/auth-service';
import { HaventecService } from '../../providers/haventec-service/haventec-service';
import { ErrorService } from '../../providers/error-service/error-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private accessCredential: AccessCredential = new AccessCredential('');
  private loginFormGroup: FormGroup;
  // private loading: any;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private storage: Storage, private authService: AuthService, private haventecService: HaventecService, public events: Events, private errorService: ErrorService) {
    this.storage.get('auth').then((auth) => {
      this.accessCredential.setUsername(auth.username);
    });

    this.loginFormGroup = this.formBuilder.group({
      pin: ['', Validators.required],
    });

  }

  pinUpdated(pin) {
    if (pin.length === 4) {
      console.log('Login PIN', pin);
      this.loginFormGroup.reset();
      this.events.publish('pin:clear');
      this.login(pin);
    }
  }

  login(pin) {
    this.storage.get('auth').then((data) => {
      let username = data.username;
      let applicationUuid = data.applicationUuid;
      let deviceUuid = data.deviceUuid;
      let authKey = data.authKey;
      let hashedPin = this.haventecService.getHashPin(pin);


      this.authService.login(username, applicationUuid, deviceUuid, authKey, hashedPin).subscribe(
        data => {
          console.log('Login response data', data);

          if (data.responseStatus.status === 'SUCCESS') {
            this.storage.set('auth', data);
            this.navCtrl.setRoot(HomePage, this.accessCredential);
          } else {
            this.errorService.showError(data.responseStatus);
          }
        },
        err => {
          console.error(err);
        }
      );
    });
  }

  forgotPin() {
    this.storage.get('auth').then((data) => {
      let username = data.username;
      let applicationUuid = data.applicationUuid;
      let deviceUuid = data.deviceUuid;

      this.authService.forgotPin(applicationUuid, username, deviceUuid).subscribe(
        data => {
          if (data.responseStatus.status === 'SUCCESS') {
            this.navCtrl.push(ForgotPinPage, this.accessCredential);
          } else {
            this.errorService.showError(data.responseStatus);
          }
        },
        err => {
          console.error(err);
        }
      );
    });
  }
}
