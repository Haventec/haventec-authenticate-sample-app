import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthService } from '../../providers/auth-service/auth-service';
import {HaventecClient} from '@haventec/common-js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public username: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthService,
    private haventecClient: HaventecClient) {

    this.username = this.haventecClient.getUsername();
  }

  logout(){
    this.navCtrl.setRoot(LoginPage);
  }
}
