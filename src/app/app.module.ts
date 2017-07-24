import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignUpPage } from "../pages/sign-up/sign-up";
import { LoginPage } from "../pages/login/login";
import { RegisterPage } from "../pages/register/register";
import { ForgotPinPage } from "../pages/forgot-pin/forgot-pin";
import { ExistingUserPage } from "../pages/existing-user/existing-user";
import { AddDevicePage } from "../pages/add-device/add-device";
import { ChangePinPage } from "../pages/change-pin/change-pin";

import { PinInput } from "../components/pin-input/pin-input";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignUpPage,
    LoginPage,
    RegisterPage,
    ForgotPinPage,
    ExistingUserPage,
    AddDevicePage,
    ChangePinPage,
    PinInput
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignUpPage,
    LoginPage,
    RegisterPage,
    ForgotPinPage,
    ExistingUserPage,
    AddDevicePage,
    ChangePinPage,
    PinInput
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
