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
import { RegisterPage } from "../pages/register/register";
import { ForgotPinPage } from "../pages/forgot-pin/forgot-pin";
import { AddDevicePage } from "../pages/add-device/add-device";

import { PinInput } from "../components/pin-input/pin-input";

import { AuthService } from '../providers/auth-service/auth-service';
import { CrytoServiceProvider } from '../providers/cryto-service/cryto-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignUpPage,
    LoginPage,
    RegisterPage,
    ForgotPinPage,
    AddDevicePage,
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
    RegisterPage,
    ForgotPinPage,
    AddDevicePage,
    PinInput
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    CrytoServiceProvider
  ]
})
export class AppModule {}
