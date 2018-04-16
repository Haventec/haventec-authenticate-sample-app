import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { HaventecClient } from 'authenticate-client-js';
import { UserModel } from '../../models/user';
import * as Constant from '../../constants/application.const';

@Component({
  selector: 'ht-page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public accessToken: string;
  public authKey: string;
  public user: UserModel = new UserModel();
  private appName: string;

  constructor(
    private alertCtrl: AlertController,
    private haventecClient: HaventecClient,
  ){
    this.user.username = this.haventecClient.getUsername();
    this.accessToken = this.haventecClient.getAccessToken();
    this.authKey = this.haventecClient.getAuthKey();
    this.getUserDetails();
    this.getUserDevices();
    this.appName = Constant.APPLICATION_NAME;
  }

  private getUserDetails(){
    this.haventecClient.getCurrentUserDetails().then(
      data => {
        this.user.setData(data);
      },
      err => {}
    );
  }

  private getUserDevices(){
    this.haventecClient.getUserDevices(this.haventecClient.getUserUuid()).then(
      data => {
        this.user.setData(data);
      },
      err => {}
    );
  }

  showAuthKey() {
      let alert = this.alertCtrl.create({
        title: 'Your unique Authentication Key',
        subTitle: this.authKey,
        buttons: ['OK']
      });
      alert.present();
    }
}
