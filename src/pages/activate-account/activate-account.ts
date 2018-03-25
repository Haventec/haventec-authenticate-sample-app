import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { HaventecClient } from '@haventec/common-js';
import { ChooseUserPage } from '../choose-user/choose-user';
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
      pin: ['', Validators.required]
    });

    this.username = this.haventecClient.getUsername();
  }

  pinUpdated(pin){
    if(pin.length === 4){
      this.activateAccountFormGroup.controls['pin'].setValue(pin);
    }
  }

  activateAccount(){
    let activationToken = this.navParams.get('activationToken');
    let pin = this.activateAccountFormGroup.value.pin;

    this.pageLoadingService.present();

    this.authService.activateAccount(this.haventecClient.getUsername(), activationToken, pin).then(
      data => {
        this.pageLoadingService.dismiss();
        this.navCtrl.setRoot(HomePage);
      },
      err => {
        this.pageLoadingService.dismiss();
      }
    );
  }

  back() {
    this.navCtrl.push(ChooseUserPage);
  }
}
