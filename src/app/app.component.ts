import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { LoginPage } from '../pages/login/login';
import { LogService } from '../providers/log-service/log-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild("content") navCtrl: NavController;

  rootPage: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private storage: Storage, private logService: LogService) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.checkForFirstTimeUse();
    });
  }

  // Reset the App and return the user to the Sign up page
  resetApp(page) {
    this.storage.clear().then(() => {
      this.logService.debug('Resetting App');
      this.navCtrl.setRoot(SignUpPage);
    });
  }

  // Check if this is the users first time using the App
  checkForFirstTimeUse(): void {
    this.storage.get('auth').then((auth) => {
      if(auth == null){
        this.logService.debug('First time use');
        this.rootPage = SignUpPage;
      } else {
        this.logService.debug('Not First time use');
        this.rootPage = LoginPage;
      }
    });
  };
}
