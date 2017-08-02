import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HomePage } from '../home/home';
import { AuthService } from '../../providers/auth-service/auth-service';
import { ErrorService } from '../../providers/error-service/error-service';
import {HaventecCommon} from '@haventec/common-js';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public username: string;

  private registrationFormGroup: FormGroup;
  private loading: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private haventecCommon: HaventecCommon,
    private errorService: ErrorService,
    public loadingCtrl: LoadingController) {

    const self: any = this;

    self.registrationFormGroup = self.formBuilder.group({
      registrationToken: ['', Validators.required],
      pin: ['', Validators.required],
      deviceName: ['', Validators.required]
    });

    self.loading = self.loadingCtrl.create();

    self.username = self.haventecCommon.getUsername();

  }

  pinUpdated(pin){
    const self: any = this;

    if(pin.length === 4){
      self.registrationFormGroup.controls['pin'].setValue(pin);
    }
  }

  registerUser(){
    const self: any = this;

    self.username = self.haventecCommon.getUsername();

    let registrationToken = self.registrationFormGroup.value.registrationToken;
    let hashedPin = self.haventecCommon.getHashPin(self.registrationFormGroup.value.pin);
    let deviceName = self.registrationFormGroup.value.deviceName;

    self.loading.present();

    self.authService.registerUser(self.username, registrationToken, hashedPin, deviceName).then(
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
}
