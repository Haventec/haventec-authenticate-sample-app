import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class ErrorService {

  constructor(private alertCtrl: AlertController) {}

  showError(error) {
    let alert = this.alertCtrl.create({title: 'Sorry an error occurred', subTitle: error, buttons: ['Dismiss']});
    alert.present();
    console.error('Error authService.signUpUser:' + error);
  }
}
