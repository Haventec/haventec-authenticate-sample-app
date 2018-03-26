import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { AddDevicePage } from '../add-device/add-device';
import { ActivateAccountPage } from '../activate-account/activate-account';
import { AuthService } from '../../providers/auth-service/auth-service';
import { PageLoadingService } from '../../providers/page-loading-service/page-loading-service';
import * as Constant from '../../constants/application.const';

@Component({
  selector: 'ht-page-choose-user',
  templateUrl: 'choose-user.html',
  providers: [AuthService]
})
export class ChooseUserPage {

  private appName: string;
  private signUpFormGroup : FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private pageLoadingService: PageLoadingService

  ) {
    this.appName = Constant.APPLICATION_NAME;
    this.signUpFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
    });
  }

  signUp(){

    let username = this.signUpFormGroup.value.username;
    let email = this.signUpFormGroup.value.email;

    this.pageLoadingService.present();

    this.authService.signUpUser(username, email).then(
      data => {
        this.pageLoadingService.dismiss();
        this.navCtrl.push(ActivateAccountPage, {
          activationToken: data.activationToken
        });
      },
      err => {
        this.pageLoadingService.dismiss();
      }
    );
  }

  existingUser() {
    const self: any = this;
    self.navCtrl.push(AddDevicePage);
  }
}
