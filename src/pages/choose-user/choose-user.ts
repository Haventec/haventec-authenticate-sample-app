import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { AddDevicePage } from '../add-device/add-device';
import { ActivateAccountPage } from '../activate-account/activate-account';
import { PageLoadingService } from '../../providers/page-loading-service/page-loading-service';
import { LogService } from '../../providers/log-service/log-service';
import * as Constant from '../../constants/application.const';
import {ChooseAuthMethodPage} from "../choose-authmethod/choose-authmethod";
import {FingerprintAIO} from "@ionic-native/fingerprint-aio";
import { HaventecAuthenticateClient } from '../../services/authenticate.client';

@Component({
  selector: 'ht-page-choose-user',
  templateUrl: 'choose-user.html',
})
export class ChooseUserPage {

  private appName: string;
  private signUpFormGroup : FormGroup;
  private canUseFingerprint = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private faio: FingerprintAIO,
    private haventecAuthenticateClient: HaventecAuthenticateClient,
    private logService: LogService,
    private pageLoadingService: PageLoadingService

  ) {
    this.appName = Constant.APPLICATION_NAME;
    this.signUpFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
    });

    this.faio.isAvailable().then(result => {
      if ( result === 'OK' || result === 'Success' || result === 'finger' ) {
        this.canUseFingerprint = true;
      }
    }, err => {
      console.log(err);
    });

  }

  signUp(){

    let username = this.signUpFormGroup.value.username;
    let email = this.signUpFormGroup.value.email;

    this.pageLoadingService.present();

    this.haventecAuthenticateClient.signUp(username, email).then(
      (data:any) => {
        this.pageLoadingService.dismiss();

        const pageToNavTo = this.canUseFingerprint ? ChooseAuthMethodPage : ActivateAccountPage;
        this.navCtrl.setRoot(pageToNavTo, {
          activationToken: data.activationToken
        });
      },
      err => {
        this.pageLoadingService.dismiss();
        this.logService.error(err);
      }
    );
  }

  existingUser() {
    const self: any = this;
    self.navCtrl.setRoot(AddDevicePage);
  }
}
