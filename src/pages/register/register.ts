import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { AccessCredential } from '../../models/accessCredential';
import { AuthService } from '../../providers/auth-service/auth-service';
import { HaventecService } from '../../providers/haventec-service/haventec-service';
import { LogService } from '../../providers/log-service/log-service';
import { PageLoadingService } from '../../providers/page-loading-service/page-loading-service'

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private accessCredential: AccessCredential = new AccessCredential('');
  private registrationFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private authService: AuthService, private haventecService: HaventecService, private logService: LogService, private storage: Storage, private pageLoading: PageLoadingService) {
    this.accessCredential = navParams.data;

    this.registrationFormGroup = this.formBuilder.group({
      registrationToken: ['', Validators.required],
      pin: ['', Validators.required],
      deviceName: ['', Validators.required]
    });

  }

  pinUpdated(pin){
    if(pin.length === 4){
      this.registrationFormGroup.controls['pin'].setValue(pin);
    }
  }

  registerUser(){
    let username = this.accessCredential.getUsername();
    let registrationToken = this.registrationFormGroup.value.registrationToken;
    let hashedPin = this.haventecService.getHashPin(this.registrationFormGroup.value.pin);
    let deviceName = this.registrationFormGroup.value.deviceName;

    this.pageLoading.present();

    this.authService.registerUser(username, registrationToken, hashedPin, deviceName).subscribe(
      data => {
        this.pageLoading.dismiss();
        if(data.responseStatus.status === 'SUCCESS'){

          this.logService.debug('Auth key: ' + data.authKey);

          this.storage.set('auth', data);
          this.navCtrl.setRoot(HomePage, this.accessCredential);
        } else {
          this.logService.error(data.responseStatus);
        }
      },
      err => {
        this.pageLoading.dismiss();
        this.logService.error(err);
      }
    );
  }
}
