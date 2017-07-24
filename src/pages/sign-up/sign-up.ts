import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RegisterPage } from '../register/register';
import { ExistingUserPage } from '../existing-user/existing-user';
import { User } from '../../models/user'
import { AuthService } from '../../providers/auth-service/auth-service'

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
  providers: [AuthService]
})
export class SignUpPage {

  private user: User = new User('');
  private signUpFormGroup : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public authService: AuthService) {
    this.signUpFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
    });
  }

  signUp(){
    let username = this.signUpFormGroup.value.username;
    let email = this.signUpFormGroup.value.email;

    this.authService.signUpUser(username, email).subscribe(
      data => {
        if(data.responseStatus.status === 'SUCCESS'){
          this.user.setUsername(this.signUpFormGroup.value.username);
          this.navCtrl.push(RegisterPage, this.user);
        } else {
          console.error('Error authService.signUpUser:' + data.responseStatus.message);
        }
      },
      err => {console.error(err);}
    );
  }

  existingUser(){
    this.navCtrl.push(ExistingUserPage);
  }
}
