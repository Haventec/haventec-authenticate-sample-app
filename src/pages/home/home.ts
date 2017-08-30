import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HaventecClient } from '@haventec/common-js';
import { LoginPage } from '../login/login';
import { AuthService } from '../../providers/auth-service/auth-service';
import { UserModel } from '../../models/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public username: string;
  public user: UserModel = new UserModel();

  constructor(
    private navCtrl: NavController,
    private haventecClient: HaventecClient,
    private authService: AuthService
  ){
    this.username = this.haventecClient.getUsername();
    this.getUserDetails();
  }

  getUserDetails(){
    this.authService.getUserDetails().then(
      data => {
        this.user.setData(data)
      },
      err => {}
    );
  }

  logout(){
    this.navCtrl.setRoot(LoginPage);
  }
}
