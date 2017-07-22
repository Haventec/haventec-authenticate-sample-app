import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { HomePage } from '../home/home';

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

  logForm(){
    this.navCtrl.setRoot(HomePage);
  }
}
