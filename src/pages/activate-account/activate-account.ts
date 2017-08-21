import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { HaventecClient } from '@haventec/common-js';
import { HomePage } from '../home/home';
import { AuthService } from '../../providers/auth-service/auth-service';
import { PageLoadingService } from '../../providers/page-loading-service/page-loading-service';

@Component({
  selector: 'page-activate-account',
  templateUrl: 'activate-account.html',
})
export class ActivateAccountPage {

  public username: string;

  private activateAccountFormGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private haventecClient: HaventecClient,
    private pageLoadingService: PageLoadingService
  ) {

    this.activateAccountFormGroup = this.formBuilder.group({
      activationToken: ['', Validators.required],
      pin: ['', Validators.required],
      deviceName: ['', Validators.required]
    });

    this.username = this.haventecClient.getUsername();
  }

  pinUpdated(pin){
    if(pin.length === 4){
      this.activateAccountFormGroup.controls['pin'].setValue(pin);
    }
  }

  activateAccount(){

    this.username = this.haventecClient.getUsername();

    let activationToken = this.activateAccountFormGroup.value.activationToken;
    let pin = this.activateAccountFormGroup.value.pin;
    let deviceName = this.activateAccountFormGroup.value.deviceName;

    this.pageLoadingService.present();

    this.authService.activateAccount(this.username, activationToken, pin, deviceName).then(
      data => {
        this.pageLoadingService.dismiss();
        this.navCtrl.setRoot(HomePage);
      },
      err => {
        this.pageLoadingService.dismiss();
      }
    );
  }
}
