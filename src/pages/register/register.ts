import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PinValidation } from '../../validators/pin.validator';
import { Storage } from '@ionic/storage';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  private registrationFormGroup : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private storage: Storage) {
    this.registrationFormGroup = this.formBuilder.group({
      registrationCode: ['', Validators.required],
      pin1: ['', Validators.required],
      pin2: ['', Validators.required],
      deviceName: ['', Validators.required]
    }, {
      validator: PinValidation.MatchPassword
    })
  }

  logForm(){
    console.log(this.registrationFormGroup.value);
    this.storage.set('haventec_username','john');
    this.navCtrl.setRoot(HomePage);
  }
}
