import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';
import { ForgotPinPage } from '../forgot-pin/forgot-pin';

import { User } from '../../models/user'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private haventecKey: string = 'haventec_username';
  private user: User = new User('');
  private loginFormGroup : FormGroup;


  constructor(public navCtrl: NavController, private formBuilder: FormBuilder, private storage: Storage) {
    this.storage.get(this.haventecKey).then((username) => {
      this.user.setUsername(username);
    });

    this.loginFormGroup = this.formBuilder.group({
      pin: ['', Validators.required],
    })
  }

  pinUpdated(pin){
    if(pin.length === 4){
      this.loginFormGroup.controls['pin'].setValue(event);
    }
  }

  login(){
    this.navCtrl.setRoot(HomePage, this.user);
  }

  forgotPIN(){
    this.navCtrl.push(ForgotPinPage, this.user);
  }
}
