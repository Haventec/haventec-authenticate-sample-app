import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../login/login'
import { ChangePinPage } from '../change-pin/change-pin'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {}

  logout(){
    this.navCtrl.setRoot(LoginPage);
  }

  changePin(){
    this.navCtrl.push(ChangePinPage);
  }
}
