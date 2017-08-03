import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { HaventecClient } from '@haventec/common-js';
import { HomePage } from '../home/home';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LogService } from '../../providers/log-service/log-service';
import { PageLoadingService } from '../../providers/page-loading-service/page-loading-service';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public username: string;

  private registrationFormGroup: FormGroup;

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

    self.registrationFormGroup = self.formBuilder.group({
      registrationToken: ['', Validators.required],
      pin: ['', Validators.required],
      deviceName: ['', Validators.required]
    });

    self.username = self.haventecClient.getUsername();

  }

  pinUpdated(pin){
    const self: any = this;

    if(pin.length === 4){
      self.registrationFormGroup.controls['pin'].setValue(pin);
    }
  }

  registerUser(){
    const self: any = this;

    self.username = self.haventecClient.getUsername();

    let registrationToken = self.registrationFormGroup.value.registrationToken;
    let hashedPin = self.haventecClient.getHashPin(self.registrationFormGroup.value.pin);
    let deviceName = self.registrationFormGroup.value.deviceName;

    self.pageLoadingService.present();

    self.authService.registerUser(self.username, registrationToken, hashedPin, deviceName).then(
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
