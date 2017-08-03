import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HomePage } from '../home/home';
import { AuthService } from '../../providers/auth-service/auth-service';
import {HaventecCommon} from '@haventec/common-js';
import { LogService } from '../../providers/log-service/log-service';

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
    private haventecCommon: HaventecCommon,
    private logService: LogService) {

    const self: any = this;

    self.registrationFormGroup = self.formBuilder.group({
      registrationToken: ['', Validators.required],
      pin: ['', Validators.required],
      deviceName: ['', Validators.required]
    });

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

    self.authService.registerUser(self.username, registrationToken, hashedPin, deviceName).then(
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
}
