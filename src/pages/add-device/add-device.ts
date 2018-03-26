import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { ActivateDevicePage } from '../activate-device/activate-device'
import { ChooseUserPage } from '../choose-user/choose-user'
import { AuthService } from '../../providers/auth-service/auth-service';
import { PageLoadingService } from '../../providers/page-loading-service/page-loading-service';
import * as Constant from '../../constants/application.const';

@Component({
  selector: 'ht-page-add-device',
  templateUrl: 'add-device.html',
  providers: [AuthService]
})
export class AddDevicePage {

  private addDeviceFormGroup : FormGroup;
  private appName: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private authService: AuthService,
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

    this.authService.addDevice(username).then(
      data => {
        this.pageLoadingService.dismiss();

        this.navCtrl.push(ActivateDevicePage);
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
