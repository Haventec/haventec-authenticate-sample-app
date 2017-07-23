import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { PinValidation } from '../../validators/pin.validator';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-add-device',
  templateUrl: 'add-device.html',
})
export class AddDevicePage {

  private addDeviceFormGroup : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.addDeviceFormGroup = this.formBuilder.group({
      deviceCode: ['', Validators.required],
      pin1: ['', Validators.required],
      pin2: ['', Validators.required],
      deviceName: ['', Validators.required]
    }, {
      validator: PinValidation.MatchPin
    })
  }

  addDevice(){
    this.navCtrl.setRoot(HomePage);
  }
}
