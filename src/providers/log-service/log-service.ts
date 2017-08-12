import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import * as Constant from '../../constants/application.const'

@Injectable()
export class LogService {

  constructor(private alertCtrl: AlertController) {}

  debug(msg: string, obj?: any) {
    if(Constant.DEBUG){
      this.print(msg, obj);
    }
  }

  trace(msg: string, obj?: any) {
    if(Constant.TRACE){
      this.print(msg, obj);
    }
  }

  error(errorObj: any, obj?: any) {
    let errorMsg = this.formatError(errorObj);
    let alert = this.alertCtrl.create({title: 'Sorry an error occurred', subTitle: errorMsg, buttons: ['Dismiss']});
    alert.present();
    console.error('Error: ' + errorMsg);
  }

  private print(msg: string, obj?: any) {
    if(obj){
      console.log(msg, obj);
    }else {
      console.log(msg);
    }
  }

  private formatError(error: any) {
    if ( error && error.responseStatus && error.responseStatus.message ) {
      return error.responseStatus.message;
    }
    if ( error && error.message ) {
      return error.message;
    }
    if ( error && error._body ) {
      return JSON.parse(error._body).message;
    }
    if ( typeof error === 'string' ) {
      return error;
    }

    console.error(error);
    return "Error occurred, see console for details";
  }
}
