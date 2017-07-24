import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { ForgotPinPage } from '../forgot-pin/forgot-pin';
import { User } from '../../models/user';
import { AuthService } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private haventecKey: string = 'haventec_username';
  private user: User = new User('');
  private loginFormGroup: FormGroup;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private storage: Storage, private authService: AuthService) {
    this.storage.get(this.haventecKey).then((username) => {
      this.user.setUsername(username);
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
    let username = this.user.getUsername();
    let deviceUuid = 'Todo';
    let authKey = 'Todo';
    let hashedPin = 'Todo';

    this.authService.login(username, deviceUuid, authKey, hashedPin).subscribe(
      data => {
        if (data.responseStatus.status === 'SUCCESS') {
          // Todo save keys
          this.navCtrl.setRoot(HomePage, this.user);
        } else {
          console.error('Error authService.login:' + data.responseStatus.message);
        }
      },
      err => {
        console.error(err);
      }
    );
  }

  forgotPin() {
    let username = this.user.getUsername();
    let deviceUuid = 'Todo';

    this.authService.forgotPin(username, deviceUuid).subscribe(
      data => {
        if (data.responseStatus.status === 'SUCCESS') {
          this.navCtrl.push(ForgotPinPage, this.user);
        } else {
          console.error('Error authService.forgotPin:' + data.responseStatus.message);
        }
      },
      err => {
        console.error(err);
      }
    );
  }
}
