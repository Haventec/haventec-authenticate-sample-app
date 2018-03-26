import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HaventecClient } from '@haventec/common-js';
import { ChooseUserPage } from '../choose-user/choose-user';
import { HomePage } from '../home/home';
import { AuthService } from '../../providers/auth-service/auth-service';
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
    private authService: AuthService,
    private haventecClient: HaventecClient,
    private pageLoadingService: PageLoadingService
  ) {

    this.activateDeviceFormGroup = this.formBuilder.group({
      deviceActivationCode: ['', Validators.required],
      pin: ['', Validators.required]
    });

    this.username = this.haventecClient.getUsername();
  }

  pinUpdated(pin){
    if(pin.length === 4){
      this.activateDeviceFormGroup.controls['pin'].setValue(pin);
    }
  }

  activateDevice(){

    let deviceActivationCode = this.activateDeviceFormGroup.value.deviceActivationCode;
    let pin = this.activateDeviceFormGroup.value.pin;

    this.pageLoadingService.present();

    this.authService.activateDevice(deviceActivationCode, pin).then(
      data => {
        this.pageLoadingService.dismiss();
        this.navCtrl.setRoot(HomePage);
      },
      err => {
        this.pageLoadingService.dismiss();
      }
    );
  }

  back() {
    this.navCtrl.push(ChooseUserPage);
  }
}
