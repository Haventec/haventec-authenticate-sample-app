import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, Events } from 'ionic-angular';
import { HaventecClient } from '@haventec/common-js';
import { HomePage } from '../home/home';
import { ResetPinPage } from '../reset-pin/reset-pin';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LogService } from '../../providers/log-service/log-service'
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
    private logService: LogService,
    private haventecClient: HaventecClient,
    public events: Events,
    private pageLoadingService: PageLoadingService
  ) {

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

    this.authService.login(pin).then(
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

    this.pageLoadingService.present();

    this.authService.forgotPin().then(
      data => {
        this.pageLoadingService.dismiss();
        this.navCtrl.push(ResetPinPage);
      },
      err => {
        this.pageLoadingService.dismiss();
      }
    );
  }
}
