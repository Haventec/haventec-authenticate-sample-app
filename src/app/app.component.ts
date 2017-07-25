import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { SignUpPage } from '../pages/sign-up/sign-up';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild("content") navCtrl: NavController;

  private haventecKey: string = 'haventec_username';
  rootPage: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private storage: Storage) {
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
    this.storage.remove(this.haventecKey).then((val) => {
      this.navCtrl.setRoot(SignUpPage);
    });
  }

  // Check if this is the users first time using the App
  checkForFirstTimeUse(): void {
    this.storage.get(this.haventecKey).then((username) => {
      if(username == null){
        this.rootPage = SignUpPage;
      } else {
        this.rootPage = LoginPage;
      }
    });
  };
}
