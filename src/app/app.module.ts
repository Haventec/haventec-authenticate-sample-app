import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignUpPage } from "../pages/sign-up/sign-up";
import { LoginPage } from "../pages/login/login";
import { ActivateAccountPage } from "../pages/activate-account/activate-account";
import { ForgotPinPage } from "../pages/forgot-pin/forgot-pin";
import { ActivateDevicePage } from "../pages/activate-device/activate-device";
import { ChooseUserPage } from "../pages/choose-user/choose-user";
import { ExistingUserPage } from "../pages/existing-user/existing-user";

import { PinInput } from "../components/pin-input/pin-input";

import { AuthService } from '../providers/auth-service/auth-service';
import { LogService } from '../providers/log-service/log-service';
import { PageLoadingService } from '../providers/page-loading-service/page-loading-service'
import {HaventecClientProvider} from "@haventec/common-js";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignUpPage,
    LoginPage,
    ActivateAccountPage,
    ForgotPinPage,
    ActivateDevicePage,
    ChooseUserPage,
    ExistingUserPage,
    PinInput
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignUpPage,
    LoginPage,
    ActivateAccountPage,
    ForgotPinPage,
    ActivateDevicePage,
    ChooseUserPage,
    ExistingUserPage,
    PinInput
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    LogService,
    PageLoadingService,
    HaventecClientProvider
  ]
})
export class AppModule {}
