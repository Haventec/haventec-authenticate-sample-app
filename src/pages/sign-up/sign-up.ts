import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RegisterPage } from '../register/register';
import { AuthService } from '../../providers/auth-service/auth-service';
import {HaventecCommon} from '@haventec/common-js';
import { LogService } from '../../providers/log-service/log-service';

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
    private haventecCommon: HaventecCommon,
    private logService: LogService) {

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

    self.authService.signUpUser(username, email).then(
      data => {
        self.logService.trace('Sign up response data ' + data);

        self.haventecCommon.init(username);
        self.navCtrl.push(RegisterPage);
      },
      err => {
        self.logService.error(err);
      }
    );
  }
}
