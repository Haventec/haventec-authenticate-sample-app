import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { ActivateAccountPage } from '../activate-account/activate-account';
import { AuthService } from '../../providers/auth-service/auth-service';
import { PageLoadingService } from '../../providers/page-loading-service/page-loading-service';

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
  providers: [AuthService]
})
export class SignUpPage {

  private signUpFormGroup : FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private pageLoadingService: PageLoadingService
  ) {

    const self: any = this;

    self.signUpFormGroup = self.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
    });
  }

  signUp(){
    const self: any = this;

    let username = self.signUpFormGroup.value.username;
    let email = self.signUpFormGroup.value.email;

    self.pageLoadingService.present();

    self.authService.signUpUser(username, email).then(
      data => {
        self.pageLoadingService.dismiss();
        self.navCtrl.push(ActivateAccountPage);
      },
      err => {
        self.pageLoadingService.dismiss();
      }
    );
  }
}
