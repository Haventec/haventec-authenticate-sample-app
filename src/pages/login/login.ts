import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { HomePage } from '../home/home';
import { ForgotPinPage } from '../forgot-pin/forgot-pin';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private loginFormGroup : FormGroup;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder,) {
    this.loginFormGroup = this.formBuilder.group({
      pin1: ['', Validators.required],
    })
  }

  login(){
    this.navCtrl.setRoot(HomePage);
  }

  forgotPIN(){
    this.navCtrl.push(ForgotPinPage);
  }
}
