import { Component} from "@angular/core";
import { NavController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';

@Component({
    templateUrl: 'header-private.html',
    selector: 'header-private',

})
export class HeaderPrivate{
     constructor(private navCtrl: NavController) {}

  logout(){

    this.navCtrl.setRoot(LoginPage);

    // this.authService.logout().then(
    //   data => {
    //     this.navCtrl.setRoot(LoginPage);
    //   },
    //   err => {}
    // );
  }
}
