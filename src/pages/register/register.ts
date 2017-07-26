import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { AccessCredential } from '../../models/accessCredential';
import { AuthService } from '../../providers/auth-service/auth-service';
import { HaventecService } from '../../providers/haventec-service/haventec-service';
import { ErrorService } from '../../providers/error-service/error-service';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private accessCredential: AccessCredential = new AccessCredential('');
  private registrationFormGroup: FormGroup;
  private loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private authService: AuthService, private haventecService: HaventecService, private errorService: ErrorService, private storage: Storage, public loadingCtrl: LoadingController) {
    this.accessCredential = navParams.data;

    this.registrationFormGroup = this.formBuilder.group({
      registrationToken: ['', Validators.required],
      pin: ['', Validators.required],
      deviceName: ['', Validators.required]
    });

    this.loading = this.loadingCtrl.create();
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

    this.loading.present();

    this.authService.registerUser(username, registrationToken, hashedPin, deviceName).subscribe(
      data => {

        this.loading.dismiss();

        if(data.responseStatus.status === 'SUCCESS'){
          this.storage.set('auth', data);
          this.navCtrl.setRoot(HomePage, this.accessCredential);
        } else {
          this.errorService.showError(data.responseStatus);
        }
      },
      err => {console.error(err);}
    );
  }
}
