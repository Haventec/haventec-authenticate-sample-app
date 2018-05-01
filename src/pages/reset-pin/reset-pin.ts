import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { HaventecAuthenticateClient } from '@haventec/authenticate-client-js';
import { HomePage } from '../home/home';
import { LoginPage } from "../login/login";
import { PageLoadingService } from '../../providers/page-loading-service/page-loading-service';

@Component({
  selector: 'ht-page-reset-pin',
  templateUrl: 'reset-pin.html',
})
export class ResetPinPage {

  public username: string;
  private resetFormGroup : FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private haventecAuthenticateClient: HaventecAuthenticateClient,
    private pageLoadingService: PageLoadingService
  ) {

    this.resetFormGroup = this.formBuilder.group({
      resetPinToken: ['', Validators.required],
      pin: ['', Validators.required],
    });

    this.username = this.haventecAuthenticateClient.getUsername();
  }

  pinUpdated(pin){
    if(pin.length === 4){
      this.resetFormGroup.controls['pin'].setValue(pin);
    }
  }

  resetPin(){
    let pin = this.resetFormGroup.value.pin;
    let resetPinToken = this.resetFormGroup.value.resetPinToken;

    this.pageLoadingService.present();

    this.haventecAuthenticateClient.resetPin(this.username, resetPinToken, pin).then(
      data => {
        this.pageLoadingService.dismiss();
        this.navCtrl.setRoot(HomePage);
      },
      err => {
        this.pageLoadingService.dismiss();
      }
    );
  }

  login() {
    this.navCtrl.setRoot(LoginPage);
  }
}
