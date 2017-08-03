import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { HaventecClient } from '@haventec/common-js';
import { RegisterPage } from '../register/register';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LogService } from '../../providers/log-service/log-service';
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
    private haventecClient: HaventecClient,
    private logService: LogService,
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

    self.logService.trace('Sign up Email ' + email);
    self.logService.trace('Sign up Username ' + username);

    self.pageLoadingService.present();

    self.authService.signUpUser(username, email).then(
      data => {
        self.pageLoadingService.dismiss();
        self.logService.trace('Sign up response data ' + data);

        self.haventecClient.init(username);
        self.navCtrl.push(RegisterPage);
      },
      err => {
        self.pageLoadingService.dismiss();
        self.logService.error(err);
      }
    );
  }
}
