import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AddDevicePage } from '../add-device/add-device';

@Component({
  selector: 'page-existing-user',
  templateUrl: 'existing-user.html',
})
export class ExistingUserPage {

  private addDeviceFormGroup : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.addDeviceFormGroup = this.formBuilder.group({
      username: ['', Validators.required]
    });
  }

  addDevice(){
    this.navCtrl.setRoot(AddDevicePage);
  }
}
