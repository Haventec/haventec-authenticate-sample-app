import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { HaventecClient } from '@haventec/common-js';
import { HomePage } from '../home/home';
import { LoginPage } from "../login/login";
import { AuthService } from '../../providers/auth-service/auth-service';
import { PageLoadingService } from '../../providers/page-loading-service/page-loading-service';

@Component({
  selector: 'page-reset-pin',
  templateUrl: 'reset-pin.html',
})
export class ResetPinPage {

  public username: string;

  private resetFormGroup : FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private haventecClient: HaventecClient,
    private pageLoadingService: PageLoadingService
  ) {

    this.resetFormGroup = this.formBuilder.group({
      resetPinToken: ['', Validators.required],
      pin: ['', Validators.required],
    });

    this.username = this.haventecClient.getUsername();
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

    this.authService.resetPin(pin, resetPinToken).then(
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
    this.navCtrl.push(LoginPage);
  }
}
