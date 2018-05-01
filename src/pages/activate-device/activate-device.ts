import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HaventecAuthenticateClient } from '@haventec/authenticate-client-js';
import { ChooseUserPage } from '../choose-user/choose-user';
import { HomePage } from '../home/home';
import { LogService } from '../../providers/log-service/log-service';
import { PageLoadingService } from '../../providers/page-loading-service/page-loading-service';

@Component({
  selector: 'ht-page-activate-device',
  templateUrl: 'activate-device.html',
})
export class ActivateDevicePage {

  public username: string;
  private activateDeviceFormGroup : FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private haventecAuthenticateClient: HaventecAuthenticateClient,
    private logService: LogService,
    private pageLoadingService: PageLoadingService
  ) {

    this.activateDeviceFormGroup = this.formBuilder.group({
      deviceActivationCode: ['', Validators.required],
      pin: ['', Validators.required]
    });

    this.username = this.haventecAuthenticateClient.getUsername();
  }

  pinUpdated(pin){
    if(pin.length === 4){
      this.activateDeviceFormGroup.controls['pin'].setValue(pin);
    }
  }

  activateDevice(){
    let activationToken = this.activateDeviceFormGroup.value.deviceActivationCode;
    let pin = this.activateDeviceFormGroup.value.pin;

    this.pageLoadingService.present();

    this.haventecAuthenticateClient.activateDevice(this.username, pin, activationToken).then(
      data => {
        this.pageLoadingService.dismiss();
        this.navCtrl.setRoot(HomePage);
      },
      err => {
        this.pageLoadingService.dismiss();
        this.logService.error(err);
      }
    );
  }

  back() {
    this.navCtrl.setRoot(ChooseUserPage);
  }
}
