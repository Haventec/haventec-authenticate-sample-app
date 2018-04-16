import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { HaventecClient } from 'authenticate-client-js';
import { ActivateDevicePage } from '../activate-device/activate-device'
import { ChooseUserPage } from '../choose-user/choose-user'
import { PageLoadingService } from '../../providers/page-loading-service/page-loading-service';
import * as Constant from '../../constants/application.const';

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
    private haventecClient: HaventecClient,
    private pageLoadingService: PageLoadingService
  ) {

    this.addDeviceFormGroup = this.formBuilder.group({
      username: ['', Validators.required]
    });

    this.appName = Constant.APPLICATION_NAME;
  }

  addDevice(){
    let username = this.addDeviceFormGroup.value.username;

    this.pageLoadingService.present();

    this.haventecClient.addDevice(username).then(
      data => {
        this.pageLoadingService.dismiss();
        this.navCtrl.setRoot(ActivateDevicePage);
      },
      err => {
        this.pageLoadingService.dismiss();
      }
    );
  }

  back() {
    this.navCtrl.setRoot(ChooseUserPage);
  }
}
