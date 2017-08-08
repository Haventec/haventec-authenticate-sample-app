import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { HaventecClient } from '@haventec/common-js';
import { HomePage } from '../home/home';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LogService } from '../../providers/log-service/log-service';
import { PageLoadingService } from '../../providers/page-loading-service/page-loading-service';

@Component({
  selector: 'page-activate-account',
  templateUrl: 'activate-account.html',
})
export class ActivateAccountPage {

  public username: string;

  private activateAccountFormGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private haventecClient: HaventecClient,
    private logService: LogService,
    private pageLoadingService: PageLoadingService
  ) {

    const self: any = this;

    self.activateAccountFormGroup = self.formBuilder.group({
      activationToken: ['', Validators.required],
      pin: ['', Validators.required],
      deviceName: ['', Validators.required]
    });

    self.username = self.haventecClient.getUsername();

  }

  pinUpdated(pin){
    const self: any = this;

    if(pin.length === 4){
      self.activateAccountFormGroup.controls['pin'].setValue(pin);
    }
  }

  activateAccount(){
    const self: any = this;

    self.username = self.haventecClient.getUsername();

    let activationToken = self.activateAccountFormGroup.value.activationToken;
    let hashedPin = self.haventecClient.getHashPin(self.activateAccountFormGroup.value.pin);
    let deviceName = self.activateAccountFormGroup.value.deviceName;

    self.pageLoadingService.present();

    self.authService.activateAccount(self.username, activationToken, hashedPin, deviceName).then(
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
}
