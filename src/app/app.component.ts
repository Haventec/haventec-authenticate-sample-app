import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HaventecClient } from '@haventec/common-js';
import { ChooseUserPage } from '../pages/choose-user/choose-user';
import { LoginPage } from '../pages/login/login';
import { LogService } from '../providers/log-service/log-service';
import * as Constant from '../constants/application.const'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild("content") navCtrl: NavController;

  rootPage: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private logService: LogService,
    private haventecClient: HaventecClient) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.checkAppConfig();
      this.checkForFirstTimeUse();
    });
  }

  // Reset the App and return the user to the Sign up page
  resetApp(page) {
    this.haventecClient.purge();
    this.logService.debug('Resetting App');
    this.navCtrl.setRoot(ChooseUserPage);
  }

  // Check if this is the users first time using the App
  checkForFirstTimeUse(): void {

    let username = this.haventecClient.getUsername();

      if(username == null){
        this.logService.debug('First time use');
        this.rootPage = ChooseUserPage;
      } else {
        this.logService.debug('Not First time use');
        this.rootPage = LoginPage;
      }
  };

  checkAppConfig(){
    if(Constant.APPLICATION_UUID === '' || Constant.API_ENDPOINT === '') {
      this.logService.error('Please configure your Application UUID and API endpoint in application.const.ts');
    }
  }
}
