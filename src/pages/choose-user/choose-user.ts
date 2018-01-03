import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';
import { AddDevicePage } from '../add-device/add-device';
import * as Constant from '../../constants/application.const';

@Component({
  selector: 'page-choose-user',
  templateUrl: 'choose-user.html',
})
export class ChooseUserPage {

  private appName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.appName = Constant.APPLICATION_NAME;
  }

  newUser() {
    const self: any = this;
    self.navCtrl.push(SignUpPage);
  }

  existingUser() {
    const self: any = this;
    self.navCtrl.push(AddDevicePage);
  }

}
