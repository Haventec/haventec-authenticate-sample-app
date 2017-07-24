import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-change-pin',
  templateUrl: 'change-pin.html',
})
export class ChangePinPage {

  private changePinFormGroup : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.changePinFormGroup = this.formBuilder.group({
      pin: ['', Validators.required],
    })
  }

  pinUpdated(pin){
    if(pin.length === 4){
      this.changePinFormGroup.controls['pin'].setValue(event);
    }
  }

  logout(){
    this.navCtrl.setRoot(LoginPage);
  }

  changePin(){

  }
}
