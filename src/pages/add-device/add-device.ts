import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { ActivateDevicePage } from '../activate-device/activate-device'
import { AuthService } from '../../providers/auth-service/auth-service';
import { PageLoadingService } from '../../providers/page-loading-service/page-loading-service';

@Component({
  selector: 'page-existing-user',
  templateUrl: 'add-device.html',
  providers: [AuthService]
})
export class AddDevicePage {

  private addDeviceFormGroup : FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private pageLoadingService: PageLoadingService
  ) {

    this.addDeviceFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      deviceName: ['', Validators.required]
    });
  }

  addDevice(){

    let username = this.addDeviceFormGroup.value.username;
    let deviceName = this.addDeviceFormGroup.value.deviceName;

    this.pageLoadingService.present();

    this.authService.addDevice(username, deviceName).then(
      data => {
        this.pageLoadingService.dismiss();

        this.navCtrl.push(ActivateDevicePage);
      },
      err => {
        this.pageLoadingService.dismiss();
      }
    );

  }
}
