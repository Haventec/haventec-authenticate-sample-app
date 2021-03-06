import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import {IonicStorageModule} from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ActivateAccountPage } from '../pages/activate-account/activate-account';
import { ResetPinPage } from '../pages/reset-pin/reset-pin';
import { ActivateDevicePage } from '../pages/activate-device/activate-device';
import { ChooseUserPage } from '../pages/choose-user/choose-user';
import { AddDevicePage } from '../pages/add-device/add-device';
import {ChooseAuthMethodPage} from "../pages/choose-authmethod/choose-authmethod";

import { PinInput } from '../components/pin-input/pin-input';
import { Devices } from '../components/ht-devices/ht-devices';
import { AppHeader } from '../components/app-header/app-header';

import { LogService } from '../providers/log-service/log-service';
import { PageLoadingService } from '../providers/page-loading-service/page-loading-service';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Http } from '@angular/http';

import { OrderByPipe } from '../pipes/orderBy'
import {FingerprintAIO} from "@ionic-native/fingerprint-aio";
import {SecureStorage} from "@ionic-native/secure-storage";
import { HaventecAuthenticateClient } from '../services/authenticate.client';
import { HT_HttpService } from '../services/http.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ActivateAccountPage,
    ResetPinPage,
    ActivateDevicePage,
    ChooseUserPage,
    ChooseAuthMethodPage,
    AddDevicePage,
    PinInput,
    Devices,
    AppHeader,
    OrderByPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ActivateAccountPage,
    ResetPinPage,
    ActivateDevicePage,
    ChooseUserPage,
    ChooseAuthMethodPage,
    AddDevicePage,
    PinInput,
    Devices,
    AppHeader
  ],
  providers: [
    HaventecAuthenticateClient,
    HT_HttpService,
    StatusBar,
    SplashScreen,
    FingerprintAIO,
    SecureStorage,
    { provide: ErrorHandler, useClass: IonicErrorHandler},
    LogService,
    PageLoadingService
  ]
})
export class AppModule {}

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
