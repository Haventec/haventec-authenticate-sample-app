import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, Events } from 'ionic-angular';
import { HaventecClient } from '@haventec/common-js';
import { HomePage } from '../home/home';
import { ResetPinPage } from '../reset-pin/reset-pin';
import { AuthService } from '../../providers/auth-service/auth-service';
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
      self.loginFormGroup.reset();
      self.events.publish('pin:clear');
      self.login(pin);
    }
  }

  login(pin) {
    const self: any = this;

    self.pageLoadingService.present();

    self.authService.login(pin).then(
      data => {
        self.pageLoadingService.dismiss();
        self.navCtrl.setRoot(HomePage);
      },
      err => {
        self.pageLoadingService.dismiss();
      }
    );
  }

  forgotPin() {
    const self: any = this;

    self.pageLoadingService.present();

    self.authService.forgotPin().then(
      data => {
        self.pageLoadingService.dismiss();
        self.navCtrl.push(ResetPinPage);
      },
      err => {
        self.pageLoadingService.dismiss();
      }
    );
  }
}
