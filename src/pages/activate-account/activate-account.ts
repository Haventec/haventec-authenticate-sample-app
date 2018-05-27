import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { HaventecAuthenticateClient } from '@haventec/authenticate-client-js';
import { ChooseUserPage } from '../choose-user/choose-user';
import { HomePage } from '../home/home';
import { LogService } from '../../providers/log-service/log-service';
import { PageLoadingService } from '../../providers/page-loading-service/page-loading-service';

@Component({
  selector: 'ht-page-activate-account',
  templateUrl: 'activate-account.html',
})
export class ActivateAccountPage {

  public username: string;
  private activateAccountFormGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private haventecAuthenticateClient: HaventecAuthenticateClient,
    private logService: LogService,
    private pageLoadingService: PageLoadingService
  ) {

    this.activateAccountFormGroup = this.formBuilder.group({
      pin: ['', Validators.required]
    });

    this.username = this.haventecAuthenticateClient.getUsername();
  }

  pinUpdated(pin){
    if(pin.length === 4){
      this.activateAccountFormGroup.controls['pin'].setValue(pin);
    }
  }

  activateUser(){
    let activationToken = this.navParams.get('activationToken');
    let pin = this.activateAccountFormGroup.value.pin;

    this.pageLoadingService.present();

    this.haventecAuthenticateClient.activateUser(this.username, activationToken, pin).then(
      data => {
        this.pageLoadingService.dismiss();
        this.navCtrl.setRoot(HomePage);
      },
      err => {
        this.logService.error(err);
        this.pageLoadingService.dismiss();
      }
    );
  }

  back() {
    this.navCtrl.setRoot(ChooseUserPage);
  }
}
