import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { HaventecClient } from '@haventec/common-js';
import { HomePage } from '../home/home';
import { AuthService } from '../../providers/auth-service/auth-service';
import { PageLoadingService } from '../../providers/page-loading-service/page-loading-service';

@Component({
  selector: 'page-forgot-pin',
  templateUrl: 'forgot-pin.html',
})
export class ForgotPinPage {

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

    const self: any = this;

    self.resetFormGroup = self.formBuilder.group({
      resetPinToken: ['', Validators.required],
      pin: ['', Validators.required],
    });

    self.username = self.haventecClient.getUsername();

  }

  pinUpdated(pin){
    if(pin.length === 4){
      this.resetFormGroup.controls['pin'].setValue(pin);
    }
  }

  resetPin(){
    const self: any = this;

    let pin = self.resetFormGroup.value.pin;
    let resetPinToken = self.resetFormGroup.value.resetPinToken;

    self.pageLoadingService.present();

    self.authService.resetPin(pin, resetPinToken).then(
      data => {
        self.pageLoadingService.dismiss();
        self.navCtrl.setRoot(HomePage);
      },
      err => {
        self.pageLoadingService.dismiss();
      }
    );
  }
}
