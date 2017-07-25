import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class ErrorService {

  constructor(private alertCtrl: AlertController) {}

  showError(errorObj) {
    let errorMsg = errorObj.message;
    let alert = this.alertCtrl.create({title: 'Sorry an error occurred', subTitle: errorMsg, buttons: ['Dismiss']});
    alert.present();
    console.error('Error authService.signUpUser:' + errorMsg);
  }
}
