import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, Events } from 'ionic-angular';
import { HaventecClient } from 'authenticate-client-js';
import { HomePage } from '../home/home';
import { ResetPinPage } from '../reset-pin/reset-pin';
import { LogService } from '../../providers/log-service/log-service'
import { PageLoadingService } from '../../providers/page-loading-service/page-loading-service';
import * as Constant from '../../constants/application.const';

@Component({
  selector: 'ht-page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public username: string;
  private loginFormGroup: FormGroup;
  private appName: string;

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private logService: LogService,
    private haventecClient: HaventecClient,
    public events: Events,
    private pageLoadingService: PageLoadingService
  ) {

    this.appName = Constant.APPLICATION_NAME;
    this.loginFormGroup = this.formBuilder.group({
      pin: ['', Validators.required],
    });

    this.username = this.haventecClient.getUsername();
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

    this.haventecClient.login(this.username, pin).then(
      data => {
        this.logService.debug('\nAuthentication Key: \n\n', data.authKey);
        this.pageLoadingService.dismiss();
        this.navCtrl.setRoot(HomePage);
      },
      err => {
        this.pageLoadingService.dismiss();
      }
    );
  }

  forgotPin() {
    this.navCtrl.setRoot(ResetPinPage);
    this.haventecClient.forgotPin(this.username);
  }
}
