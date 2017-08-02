import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

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
    this.navCtrl.setRoot(HomePage);
  }
}
