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
    const self: any = this;

    self.addDeviceFormGroup = self.formBuilder.group({
      username: ['', Validators.required],
      deviceName: ['', Validators.required]
    });
  }

  addDevice(){
    const self: any = this;

    let username = self.addDeviceFormGroup.value.username;
    let deviceName = self.addDeviceFormGroup.value.deviceName;

    self.pageLoadingService.present();

    self.authService.addDevice(username, deviceName).then(
      data => {
        self.pageLoadingService.dismiss();

        self.navCtrl.push(ActivateDevicePage);
      },
      err => {
        self.pageLoadingService.dismiss();
      }
    );

  }
}
