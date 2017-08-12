import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HaventecClient } from '@haventec/common-js';
import { HomePage } from '../home/home';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LogService } from '../../providers/log-service/log-service';
import { PageLoadingService } from '../../providers/page-loading-service/page-loading-service';

@Component({
  selector: 'page-activate-device',
  templateUrl: 'activate-device.html',
})
export class ActivateDevicePage {

  private activateDeviceFormGroup : FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private haventecClient: HaventecClient,
    private authService: AuthService,
    private logService: LogService,
    private pageLoadingService: PageLoadingService
  ) {

    const self: any = this;

    self.activateDeviceFormGroup = this.formBuilder.group({
      deviceActivationCode: ['', Validators.required],
      pin: ['', Validators.required]
    })
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
    let hashedPin = self.haventecClient.getHashPin(pin);
    let username = self.haventecClient.getUsername();
    let deviceUuid = self.haventecClient.getDeviceUuid();

    self.logService.trace('Activate Device Email ' + deviceActivationCode);

    self.pageLoadingService.present();

    self.authService.activateDevice(deviceActivationCode, hashedPin, deviceUuid, username).then(
      data => {
        self.pageLoadingService.dismiss();
        self.logService.trace('Activate Device response data ' + data);

        self.haventecClient.updateDataFromResponse(data);

        self.navCtrl.setRoot(HomePage);
      },
      err => {
        self.pageLoadingService.dismiss();
        self.logService.error(err);
      }
    );
  }
}
