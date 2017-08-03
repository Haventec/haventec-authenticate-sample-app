import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, Events } from 'ionic-angular';
import { HaventecClient } from '@haventec/common-js';
import { HomePage } from '../home/home';
import { ForgotPinPage } from '../forgot-pin/forgot-pin';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LogService } from '../../providers/log-service/log-service';
import { PageLoadingService } from '../../providers/page-loading-service/page-loading-service';

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
    private haventecClient: HaventecClient,
    public events: Events,
    private logService: LogService,
    private pageLoadingService: PageLoadingService
  ) {

    const self: any = this;

    self.loginFormGroup = self.formBuilder.group({
      pin: ['', Validators.required],
    });

    self.username = self.haventecClient.getUsername();

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

    self.username = self.haventecClient.getUsername();
    let deviceUuid = self.haventecClient.getDeviceUuid();
    let authKey = self.haventecClient.getAuthKey();
    let hashedPin = self.haventecClient.getHashPin(pin);

    self.pageLoadingService.present();

    self.authService.login(self.username, deviceUuid, authKey, hashedPin).then(
      data => {
        self.pageLoadingService.dismiss();
        self.logService.debug('Auth key: ' + data.authKey);

        self.haventecClient.updateDataFromResponse(data);

        self.navCtrl.setRoot(HomePage);
      },
      err => {
        self.pageLoadingService.dismiss();
        self.logService.error(err);
      }
    );
  }

  forgotPin() {
    const self: any = this;

    self.username = self.haventecClient.getUsername();
    let deviceUuid = self.haventecClient.getDeviceUuid();

    self.pageLoadingService.present();

    self.authService.forgotPin(self.username, deviceUuid).then(
      data => {
        self.pageLoadingService.dismiss();
        self.navCtrl.push(ForgotPinPage);
      },
      err => {
        self.pageLoadingService.dismiss();
        self.logService.error(err);
      }
    );
  }
}
