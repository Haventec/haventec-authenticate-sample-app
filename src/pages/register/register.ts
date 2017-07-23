import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PinValidation } from '../../validators/pin.validator';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';

import { User } from '../../models/user'

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private user: User = new User('');
  private registrationFormGroup: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private storage: Storage) {
    this.user = navParams.data;

    this.registrationFormGroup = this.formBuilder.group({
      registrationCode: ['', Validators.required],
      pin1: ['', Validators.required],
      pin2: ['', Validators.required],
      deviceName: ['', Validators.required]
    }, {
      validator: PinValidation.MatchPin
    })
  }

  register(){
    this.storage.set('haventec_username', this.user.getUsername());
    this.navCtrl.setRoot(HomePage, this.user);
  }
}
