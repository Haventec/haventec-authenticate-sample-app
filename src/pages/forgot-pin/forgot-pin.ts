import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PinValidation } from '../../validators/pin.validator';

import { HomePage } from '../home/home';

import { User } from '../../models/user'

@Component({
  selector: 'page-forgot-pin',
  templateUrl: 'forgot-pin.html',
})
export class ForgotPinPage {

  private user: User = new User('');
  private resetFormGroup : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.user = navParams.data;

    this.resetFormGroup = this.formBuilder.group({
      resetCode: ['', Validators.required],
      pin1: ['', Validators.required],
      pin2: ['', Validators.required],

    }, {
      validator: PinValidation.MatchPin
    })
  }

  resetPin(){
    this.navCtrl.setRoot(HomePage);
  }
}
