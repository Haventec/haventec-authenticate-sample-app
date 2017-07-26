import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AccessCredential } from '../../models/accessCredential';
import { AuthService } from '../../providers/auth-service/auth-service';
import { ErrorService } from '../../providers/error-service/error-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private accessCredential: AccessCredential = new AccessCredential('');

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, private errorService: ErrorService) {
    this.accessCredential = navParams.data;
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
