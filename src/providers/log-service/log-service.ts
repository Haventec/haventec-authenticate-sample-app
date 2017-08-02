import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import * as Constant from '../../constants/application.const'

@Injectable()
export class LogService {

  constructor(private alertCtrl: AlertController) {}


  debug(msg: string) {
    if(Constant.DEBUG){
      console.log(msg);
    }
  }

  trace(msg: string) {
    if(Constant.TRACE){
      console.log(msg);
    }
  }

  error(errorObj: any) {

    let errorMsg = errorObj;

    if(errorObj.message !== undefined){
      errorMsg = errorObj.message;
    }

    let alert = this.alertCtrl.create({title: 'Sorry an error occurred', subTitle: errorMsg, buttons: ['Dismiss']});
    alert.present();
    console.error('Error authService.signUpUser:' + errorMsg);
  }
}
