import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HomePage } from '../home/home';
import { ForgotPinPage } from '../forgot-pin/forgot-pin';
import { AuthService } from '../../providers/auth-service/auth-service';
import {HaventecCommon} from '@haventec/common-js';
import { LogService } from '../../providers/log-service/log-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public username: string;

  private loginFormGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private haventecCommon: HaventecCommon,
    public events: Events,
    private logService: LogService) {

    const self: any = this;

    self.loginFormGroup = self.formBuilder.group({
      pin: ['', Validators.required],
    });

    self.username = self.haventecCommon.getUsername();

  }

  pinUpdated(pin) {
    const self: any = this;

    if (pin.length === 4) {

      this.logService.trace('Login PIN ' + pin);

      self.loginFormGroup.reset();
      self.events.publish('pin:clear');
      self.login(pin);
    }
  }

  login(pin) {
    const self: any = this;

    self.username = self.haventecCommon.getUsername();
    let deviceUuid = self.haventecCommon.getDeviceUuid();
    let authKey = self.haventecCommon.getAuthKey();
    let hashedPin = self.haventecCommon.getHashPin(pin);

    self.authService.login(self.username, deviceUuid, authKey, hashedPin).then(
      data => {

        self.logService.debug('Auth key: ' + data.authKey);

        self.haventecCommon.updateDataFromResponse(data);

        self.navCtrl.setRoot(HomePage);
      },
      err => {
        self.logService.error(err);
      }
    );
  }

  forgotPin() {
    const self: any = this;

    self.username = self.haventecCommon.getUsername();
    let deviceUuid = self.haventecCommon.getDeviceUuid();

    self.authService.forgotPin(self.username, deviceUuid).then(
      data => {
        self.navCtrl.push(ForgotPinPage);
      },
      err => {
        self.logService.error(err);
      }
    );
  }
}
