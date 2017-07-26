import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as Constant from '../../constants/application.const'

@Injectable()
export class AuthService {

  private readonly url: string = Constant.API_ENDPOINT;
  private readonly applicationUuid: string = Constant.APPLICATION_UUID;
  private signUpUserPath: string = '/self-service/user';
  private registerUserPath: string = '/register/user';
  private loginUserPath: string = '/login';
  private logoutUserPath: string = '/logout';
  private forgotPinPath: string = '/forgot-pin';
  private resetPinPath: string = '/reset-pin';

  constructor(private http: Http) {}

  signUpUser(username: string, email: string) {
    let body = {
      username: username,
      email: email,
      applicationUuid: this.applicationUuid
    };

    return this.http.post(this.url + this.signUpUserPath, body).map(res => res.json());
  }

  registerUser(username: string, registrationToken: string, hashedPin: string, deviceName: string) {
    let body = {
      username: username,
      registrationToken: registrationToken,
      hashedPin: hashedPin,
      deviceName: deviceName
    };

    return this.http.post(this.url + this.registerUserPath, body).map(res => res.json());
  }

  login(username: string, deviceUuid: string, authKey: string, hashedPin: string) {
    let body = {
      username: username,
      deviceUuid: deviceUuid,
      authKey: authKey,
      hashedPin: hashedPin
    };

    return this.http.post(this.url + this.loginUserPath, body).map(res => res.json());
  }

  logout() {
    return this.http.delete(this.url + this.logoutUserPath).map(res => res.json());
  }

  forgotPin(username: string, deviceUuid: string) {
    let body = {
      username: username,
      deviceUuid: deviceUuid
    };

    return this.http.post(this.url + this.forgotPinPath, body).map(res => res.json());
  }

  resetPin(username: string, deviceUuid: string, hashedPin: string, resetPinToken: string) {
    let body = {
      username: username,
      deviceUuid: deviceUuid,
      hashedPin: hashedPin,
      resetPinToken: resetPinToken
    };

    return this.http.post(this.url + this.resetPinPath, body).map(res => res.json());
  }
}
