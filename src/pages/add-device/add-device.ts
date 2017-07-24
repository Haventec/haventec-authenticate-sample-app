import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { HomePage } from '../home/home';

import { AccessCredential } from '../../models/accessCredential'

@Component({
  selector: 'page-add-device',
  templateUrl: 'add-device.html',
})
export class AddDevicePage {

  private accessCredential: AccessCredential = new AccessCredential('');
  private addDeviceFormGroup : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.accessCredential = navParams.data;

    this.addDeviceFormGroup = this.formBuilder.group({
      deviceCode: ['', Validators.required],
      pin: ['', Validators.required],
      deviceName: ['', Validators.required]
    })
  }

  pinUpdated(pin){
    if(pin.length === 4){
      this.addDeviceFormGroup.controls['pin'].setValue(event);
    }
  }

  addDevice(){
    this.navCtrl.setRoot(HomePage, this.accessCredential);
  }
}
