import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { ChangePinPage } from '../change-pin/change-pin';

import { User } from '../../models/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private user: User = new User('');

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = navParams.data;
  }

  logout(){
    this.navCtrl.setRoot(LoginPage);
  }

  changePin(){
    this.navCtrl.push(ChangePinPage);
  }
}
