import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { HaventecClient } from '@haventec/common-js';
import { UserService } from '../../providers/user-service/user-service';
import { UserModel } from '../../models/user';
import * as Constant from '../../constants/application.const';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public username: string;
  public accessToken: string;
  public authKey: string;
  public user: UserModel = new UserModel();
  private appName: string;
  private thisDeviceUuid: string;

  constructor(
    private alertCtrl: AlertController,
    private haventecClient: HaventecClient,
    private userService: UserService
  ){
    this.username = this.haventecClient.getUsername();
    this.accessToken = this.haventecClient.getAccessToken();
    this.authKey = this.haventecClient.getAuthKey();
    this.thisDeviceUuid = this.haventecClient.getDeviceUuid();
    this.getUserDetails();
    this.getUserDevices();
    this.appName = Constant.APPLICATION_NAME;
  }

  private getUserDetails(){
    this.userService.getUserDetails().then(
      data => {
        this.user.setData(data);
      },
      err => {}
    );
  }

  private getUserDevices(){
    this.userService.getUserDevices().then(
      data => {
        console.log(data);
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
