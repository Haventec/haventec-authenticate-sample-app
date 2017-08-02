import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthService } from '../../providers/auth-service/auth-service';
import { ErrorService } from '../../providers/error-service/error-service';
import {HaventecCommon} from '@haventec/common-js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public username: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthService,
    private errorService: ErrorService,
    private haventecCommon: HaventecCommon) {

    this.username = this.haventecCommon.getUsername();
  }

  logout(){
    // this.authService.logout().subscribe(
    //   data => {
    //     if(data.responseStatus.status === 'SUCCESS'){
    //       // Todo clear storage
          this.navCtrl.setRoot(LoginPage);
    //     } else {
    //       this.errorService.showError(data.responseStatus);
    //     }
    //   },
    //   err => {console.error(err);}
    // );
  }
}
