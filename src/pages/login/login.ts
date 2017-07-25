import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { ForgotPinPage } from '../forgot-pin/forgot-pin';
import { AccessCredential } from '../../models/accessCredential';
import { AuthService } from '../../providers/auth-service/auth-service';
import { ErrorService } from '../../providers/error-service/error-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private haventecKey: string = 'haventec_username';
  private accessCredential: AccessCredential = new AccessCredential('');
  private loginFormGroup: FormGroup;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private storage: Storage, private authService: AuthService, private errorService: ErrorService) {
    this.storage.get(this.haventecKey).then((username) => {
      this.accessCredential.setUsername(username);
    });

    this.loginFormGroup = this.formBuilder.group({
      pin: ['', Validators.required],
    })
  }

  pinUpdated(pin) {
    if (pin.length === 4) {
      this.loginFormGroup.controls['pin'].setValue(event);
      this.login();
    }
  }

  login() {
    let username = this.accessCredential.getUsername();
    let deviceUuid = 'Todo';
    let authKey = 'Todo';
    let hashedPin = 'Todo';

    this.authService.login(username, deviceUuid, authKey, hashedPin).subscribe(
      data => {
        if (data.status === 'SUCCESS') {
          // Todo save keys
          this.navCtrl.setRoot(HomePage, this.accessCredential);
        } else {
          console.error('Error authService.login:' + data.result);
        }
      },
      err => {
        console.error(err);
      }
    );
  }

  forgotPin() {
    let username = this.accessCredential.getUsername();
    let deviceUuid = 'Todo';

    this.authService.forgotPin(username, deviceUuid).subscribe(
      data => {
        if (data.status === 'SUCCESS') {
          this.navCtrl.push(ForgotPinPage, this.accessCredential);
        } else {
          this.errorService.showError(data.result);
        }
      },
      err => {
        console.error(err);
      }
    );
  }
}
