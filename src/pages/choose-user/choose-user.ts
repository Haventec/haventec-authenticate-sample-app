import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignUpPage } from '../sign-up/sign-up';
import { ExistingUserPage } from '../existing-user/existing-user';

@Component({
  selector: 'page-choose-user',
  templateUrl: 'choose-user.html',
})
export class ChooseUserPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  newUser() {
    const self: any = this;
    self.navCtrl.push(SignUpPage);
  }

  existingUser() {
    const self: any = this;
    self.navCtrl.push(ExistingUserPage);
  }

}