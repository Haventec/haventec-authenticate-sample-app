import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HaventecClient } from '@haventec/common-js';
import { HomePage } from '../home/home';
import { AuthService } from '../../providers/auth-service/auth-service';
import { PageLoadingService } from '../../providers/page-loading-service/page-loading-service';

@Component({
  selector: 'page-activate-device',
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

    const self: any = this;

    self.activateDeviceFormGroup = this.formBuilder.group({
      deviceActivationCode: ['', Validators.required],
      pin: ['', Validators.required]
    });

    self.username = self.haventecClient.getUsername();
  }

  pinUpdated(pin){
    const self: any = this;

    if(pin.length === 4){
      self.activateDeviceFormGroup.controls['pin'].setValue(pin);
    }
  }

  activateDevice(){
    const self: any = this;

    let deviceActivationCode = self.activateDeviceFormGroup.value.deviceActivationCode;
    let pin = self.activateDeviceFormGroup.value.pin;

    self.pageLoadingService.present();

    self.authService.activateDevice(deviceActivationCode, pin).then(
      data => {
        self.pageLoadingService.dismiss();
        self.navCtrl.setRoot(HomePage);
      },
      err => {
        self.pageLoadingService.dismiss();
      }
    );
  }
}
