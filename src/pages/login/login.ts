import { Component } from '@angular/core';
import { NavController, Events, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HomePage } from '../home/home';
import { ForgotPinPage } from '../forgot-pin/forgot-pin';
import { AuthService } from '../../providers/auth-service/auth-service';
import { ErrorService } from '../../providers/error-service/error-service';
import {HaventecCommon} from '@haventec/common-js';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public username: string;

  private loginFormGroup: FormGroup;
  private loading: any;

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private haventecCommon: HaventecCommon,
    public events: Events,
    private errorService: ErrorService,
    public loadingCtrl: LoadingController) {

    const self: any = this;

    self.loginFormGroup = self.formBuilder.group({
      pin: ['', Validators.required],
    });

    self.loading = self.loadingCtrl.create();

    self.username = self.haventecCommon.getUsername();

  }

  pinUpdated(pin) {
    const self: any = this;

    if (pin.length === 4) {
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

    self.loading.present();

    self.authService.login(self.username, deviceUuid, authKey, hashedPin).then(
      data => {

        self.loading.dismiss();

        self.haventecCommon.updateDataFromResponse(data);

        self.navCtrl.setRoot(HomePage);
      },
      err => {
        self.errorService.showError(err);
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
        self.errorService.showError(err);
      }
    );
  }
}
