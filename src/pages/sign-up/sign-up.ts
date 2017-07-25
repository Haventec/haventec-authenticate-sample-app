import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RegisterPage } from '../register/register';
import { AccessCredential } from '../../models/accessCredential';
import { AuthService } from '../../providers/auth-service/auth-service';
import { ErrorService } from '../../providers/error-service/error-service';

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
  providers: [AuthService]
})
export class SignUpPage {

  private accessCredential: AccessCredential = new AccessCredential('');
  private signUpFormGroup : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public authService: AuthService, private errorService: ErrorService) {
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
        if(data.status === 'SUCCESS'){
          this.accessCredential.setUsername(this.signUpFormGroup.value.username);
          this.navCtrl.push(RegisterPage, this.accessCredential);
        } else {
          this.errorService.showError(data.result);
        }
      },
      err => {console.error(err);}
    );
  }
}
