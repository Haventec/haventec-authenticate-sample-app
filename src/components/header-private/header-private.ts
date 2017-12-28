import { Component} from "@angular/core";
import { NavController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import * as Constant from '../../constants/application.const';

@Component({
    templateUrl: 'header-private.html',
    selector: 'header-private'
})
export class HeaderPrivate{

  private appName: string;

  constructor(private navCtrl: NavController) {
    this.appName = Constant.APPLICATION_NAME;
  }

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
