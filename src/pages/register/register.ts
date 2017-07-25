import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { AccessCredential } from '../../models/accessCredential';
import { AuthService } from '../../providers/auth-service/auth-service';
import { ErrorService } from '../../providers/error-service/error-service';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private accessCredential: AccessCredential = new AccessCredential('');
  private registrationFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private storage: Storage, private authService: AuthService, private errorService: ErrorService) {
    this.accessCredential = navParams.data;

    this.registrationFormGroup = this.formBuilder.group({
      registrationCode: ['', Validators.required],
      pin: ['', Validators.required],
      deviceName: ['', Validators.required]
    })
  }

  pinUpdated(pin){
    if(pin.length === 4){
      this.registrationFormGroup.controls['pin'].setValue(event);
    }
  }

  registerUser(){
    let username = this.accessCredential.getUsername();
    let registrationToken = this.registrationFormGroup.value.registrationToken;
    let hashedPin = 'Todo';
    let deviceName = this.registrationFormGroup.value.deviceName;

    this.authService.registerUser(username, registrationToken, hashedPin, deviceName).subscribe(
      data => {
        if(data.responseStatus.status === 'SUCCESS'){
          // Todo save keys
          this.storage.set('haventec_username', this.accessCredential.getUsername());
          this.navCtrl.setRoot(HomePage, this.accessCredential);
        } else {
          this.errorService.showError(data.responseStatus);
        }
      },
      err => {console.error(err);}
    );
  }
}
