import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { User } from '../../models/user'
import { AuthService } from '../../providers/auth-service/auth-service'

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private user: User = new User('');
  private registrationFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private storage: Storage, private authService: AuthService) {
    this.user = navParams.data;

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
    let username = this.user.getUsername();
    let registrationToken = this.registrationFormGroup.value.registrationToken;
    let hashedPin = 'Todo';
    let deviceName = this.registrationFormGroup.value.deviceName;

    this.authService.registerUser(username, registrationToken, hashedPin, deviceName).subscribe(
      data => {
        if(data.responseStatus.status === 'SUCCESS'){
          // Todo save keys
          this.storage.set('haventec_username', this.user.getUsername());
          this.navCtrl.setRoot(HomePage, this.user);
        } else {
          console.error('Error authService.registerUser:' + data.responseStatus.message);
        }
      },
      err => {console.error(err);}
    );
  }
}
