import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HomePage } from '../home/home';
import { User } from '../../models/user';
import { AuthService } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-forgot-pin',
  templateUrl: 'forgot-pin.html',
})
export class ForgotPinPage {

  private user: User = new User('');
  private resetFormGroup : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private authService: AuthService) {
    this.user = navParams.data;

    this.resetFormGroup = this.formBuilder.group({
      resetPinToken: ['', Validators.required],
      pin: ['', Validators.required],
    })
  }

  pinUpdated(pin){
    if(pin.length === 4){
      this.resetFormGroup.controls['pin'].setValue(event);
    }
  }

  resetPin(){
    let username = this.user.getUsername();
    let deviceUuid = 'Todo';
    let hashedPin = 'Todo';
    let resetPinToken = this.resetFormGroup.value.resetPinToken;

    this.authService.registerUser(username, deviceUuid, hashedPin, resetPinToken).subscribe(
      data => {
        if(data.responseStatus.status === 'SUCCESS'){
          // Todo save keys
          this.navCtrl.setRoot(HomePage, this.user);
        } else {
          console.error('Error authService.resetPin:' + data.responseStatus.message);
        }
      },
      err => {console.error(err);}
    );
  }
}
