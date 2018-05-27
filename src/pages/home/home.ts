import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { HaventecAuthenticateClient } from '@haventec/authenticate-client-js';
import { LogService } from '../../providers/log-service/log-service';
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
    private haventecAuthenticateClient: HaventecAuthenticateClient,
    private logService: LogService
  ){
    this.user.username = this.haventecAuthenticateClient.getUsername();
    this.accessToken = this.haventecAuthenticateClient.getAccessToken();
    this.authKey = this.haventecAuthenticateClient.getAuthKey();
    this.getUserDetails();
    this.getUserDevices();
    this.appName = Constant.APPLICATION_NAME;
  }

  private getUserDetails(){
    this.haventecAuthenticateClient.getCurrentUserDetails().then(
      data => {
        this.user.setData(data);
      },
      err => {
        this.logService.error(err);
      }
    );
  }

  private getUserDevices(){
    this.haventecAuthenticateClient.getUserDevices(this.haventecAuthenticateClient.getUserUuid()).then(
      data => {
        this.user.setData(data);
      },
      err => {
        this.logService.error(err);
      }
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
