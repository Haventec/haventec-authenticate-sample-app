import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { HaventecClient } from '@haventec/common-js';
import { HomePage } from '../home/home';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LogService } from '../../providers/log-service/log-service';
import { PageLoadingService } from '../../providers/page-loading-service/page-loading-service';

@Component({
  selector: 'page-forgot-pin',
  templateUrl: 'forgot-pin.html',
})
export class ForgotPinPage {

  public username: string;

  private resetFormGroup : FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private logService: LogService,
    private haventecClient: HaventecClient,
    private pageLoadingService: PageLoadingService
  ) {

    const self: any = this;

    self.resetFormGroup = self.formBuilder.group({
      resetPinToken: ['', Validators.required],
      pin: ['', Validators.required],
    });

    self.username = self.haventecClient.getUsername();

  }

  pinUpdated(pin){
    if(pin.length === 4){
      this.resetFormGroup.controls['pin'].setValue(pin);
    }
  }

  resetPin(){
    const self: any = this;

    self.username = self.haventecClient.getUsername();
    let deviceUuid = self.haventecClient.getDeviceUuid();
    let hashedPin = self.haventecClient.getHashPin(self.resetFormGroup.value.pin);
    let resetPinToken = self.resetFormGroup.value.resetPinToken;

    self.pageLoadingService.present();

    self.authService.resetPin(self.username, deviceUuid, hashedPin, resetPinToken).then(
      data => {
        self.pageLoadingService.dismiss();
        self.logService.debug('Auth key: ' + data.authKey);

        self.navCtrl.setRoot(HomePage);
      },
      err => {
        self.pageLoadingService.dismiss();
        self.logService.error(err);
      }
    );
  }
}
