import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { User } from '../../models/user';
import { AuthService } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private user: User = new User('');

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService) {
    this.user = navParams.data;
  }

  logout(){
    this.authService.logout().subscribe(
      data => {
        if(data.responseStatus.status === 'SUCCESS'){
          // Todo clear storage
          this.navCtrl.setRoot(LoginPage);
        } else {
          console.error('Error authService.logout:' + data.responseStatus.message);
        }
      },
      err => {console.error(err);}
    );
  }
}
