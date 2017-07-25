import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HomePage } from '../home/home';
import { AccessCredential } from '../../models/accessCredential';
import { AuthService } from '../../providers/auth-service/auth-service';
import { ErrorService } from '../../providers/error-service/error-service';

@Component({
  selector: 'page-forgot-pin',
  templateUrl: 'forgot-pin.html',
})
export class ForgotPinPage {

  private accessCredential: AccessCredential = new AccessCredential('');
  private resetFormGroup : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private authService: AuthService, private errorService: ErrorService) {
    this.accessCredential = navParams.data;

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
    let username = this.accessCredential.getUsername();
    let deviceUuid = 'Todo';
    let hashedPin = 'Todo';
    let resetPinToken = this.resetFormGroup.value.resetPinToken;

    this.authService.registerUser(username, deviceUuid, hashedPin, resetPinToken).subscribe(
      data => {
        if(data.responseStatus.status === 'SUCCESS'){
          // Todo save keys
          this.navCtrl.setRoot(HomePage, this.accessCredential);
        } else {
          this.errorService.showError(data.responseStatus);
        }
      },
      err => {console.error(err);}
    );
  }
}
