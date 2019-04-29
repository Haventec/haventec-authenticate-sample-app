import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { ActivateDevicePage } from '../activate-device/activate-device'
import { ChooseUserPage } from '../choose-user/choose-user'
import { LogService } from '../../providers/log-service/log-service';
import { PageLoadingService } from '../../providers/page-loading-service/page-loading-service';
import * as Constant from '../../constants/application.const';
import { HaventecAuthenticateClient } from '../../services/authenticate.client';

@Component({
  selector: 'ht-page-add-device',
  templateUrl: 'add-device.html'
})
export class AddDevicePage {

  private addDeviceFormGroup : FormGroup;
  private appName: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private haventecAuthenticateClient: HaventecAuthenticateClient,
    private logService: LogService,
    private pageLoadingService: PageLoadingService
  ) {

    this.addDeviceFormGroup = this.formBuilder.group({
      username: ['', Validators.required]
    });

    this.appName = Constant.APPLICATION_NAME;
  }

  addDevice(){
    let username = this.addDeviceFormGroup.value.username;

    this.navCtrl.setRoot(ActivateDevicePage);

    this.haventecAuthenticateClient.addDevice(username).then(
      data => { },
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
