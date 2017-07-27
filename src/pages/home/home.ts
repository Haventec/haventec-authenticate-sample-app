import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AccessCredential } from '../../models/accessCredential';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private accessCredential: AccessCredential = new AccessCredential('');

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.accessCredential = navParams.data;
  }

  logout(){
    this.navCtrl.setRoot(LoginPage);
  }
}
