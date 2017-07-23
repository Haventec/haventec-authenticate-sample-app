import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { RegisterPage } from '../register/register';
import { ExistingUserPage } from '../existing-user/existing-user';

import { User } from '../../models/user'

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  private user: User = new User('');
  private signUpFormGroup : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.signUpFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
    });

  }

  signUp(){
    this.user.setUsername(this.signUpFormGroup.value.username);
    this.navCtrl.push(RegisterPage, this.user);
  }

  existingUser(){
    this.navCtrl.push(ExistingUserPage);
  }
}
