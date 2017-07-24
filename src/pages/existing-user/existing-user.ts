import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AddDevicePage } from '../add-device/add-device';

import { User } from '../../models/user'

@Component({
  selector: 'page-existing-user',
  templateUrl: 'existing-user.html',
})
export class ExistingUserPage {

  private user: User = new User('');
  private addDeviceFormGroup : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.addDeviceFormGroup = this.formBuilder.group({
      username: ['', Validators.required]
    });
  }

  addDevice(){
    this.user.setUsername(this.addDeviceFormGroup.value.username);
    this.navCtrl.setRoot(AddDevicePage, this.user);
  }
}
