import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class ErrorService {

  constructor(private alertCtrl: AlertController) {}

  showError(errorObj) {
    let errorMsg = this.formatError(errorObj);
    let alert = this.alertCtrl.create({title: 'Sorry an error occurred', subTitle: errorMsg, buttons: ['Dismiss']});
    alert.present();
    console.error('Error authService.signUpUser:' + errorMsg);
  }

  formatError(error) {
    if ( error && error.responseStatus && error.responseStatus.message ) {
      return  ": " + error.responseStatus.message;
    }
    if ( error && error.message ) {
      return ": " + error.message;
    }
    if ( error && error._body ) {
      return ": " + JSON.parse(error._body).message;
    }

    if ( error ) {
      return ": " + JSON.stringify(error);
    }

    return "";
  }

}
