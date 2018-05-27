import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import * as Constant from '../../constants/application.const'
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LogService {

  constructor(private alertCtrl: AlertController, private translate: TranslateService) {}

  info(msg: string, obj?: any) {
      this.print(msg, obj);
  }

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
    let buttonName = 'Dismiss';
    let errorMsg = this.formatError(errorObj);
    this.translate.get('ERROR_CTA').subscribe(
      value => {
        buttonName = value;
      }
    );

    this.translate.get('ERROR_GENERAL').subscribe(
      value => {
        let alert = this.alertCtrl.create({title: value, subTitle: errorMsg, buttons: [buttonName]});
        alert.present();
      }
    );

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
