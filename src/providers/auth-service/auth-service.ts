import { Injectable } from '@angular/core';
import { LogService } from '../../providers/log-service/log-service'
import * as Constant from '../../constants/application.const'
import {HaventecCommon} from '@haventec/common-js';

@Injectable()
export class AuthService {

  private readonly url: string = Constant.API_ENDPOINT;
  private signUpUserPath: string = '/self-service/user';
  private registerUserPath: string = '/register/user';
  private loginUserPath: string = '/login';
  // private logoutUserPath: string = '/logout';
  private forgotPinPath: string = '/forgot-pin';
  private resetPinPath: string = '/reset-pin';

  constructor(
    private haventecCommon: HaventecCommon,
    private logService: LogService
  ) {}

  signUpUser(username: string, email: string) {
    let body = {
      username: username,
      email: email,
      applicationUuid: Constant.APPLICATION_UUID,
    };

    this.logService.trace('Sign up request data ' + body);

    return this.haventecCommon.http.postNoAuth(this.url + this.signUpUserPath, body);
  }

  registerUser(username: string, registrationToken: string, hashedPin: string, deviceName: string) {
    // Todo - Not required remove queryParameters
    let body = {
      username: username,
      applicationUuid: Constant.APPLICATION_UUID,
      registrationToken: registrationToken,
      hashedPin: hashedPin,
      deviceName: deviceName,
      queryParameters: ''
    };

    this.logService.trace('Register user request data ' + body);

    return this.haventecCommon.http.postNoAuth(this.url + this.registerUserPath, body);
  }

  login(username: string, deviceUuid: string, authKey: string, hashedPin: string) {
    let body = {
      username: username,
      applicationUuid: Constant.APPLICATION_UUID,
      deviceUuid: deviceUuid,
      authKey: authKey,
      hashedPin: hashedPin
    };

    this.logService.trace('Login request data ' + body);

    return this.haventecCommon.http.postNoAuth(this.url + this.loginUserPath, body);
  }

  logout() {
    //return this.http.delete(this.url + this.logoutUserPath).map(res => res.json());
  }

  forgotPin(username: string, deviceUuid: string) {
    let body = {
      applicationUuid: Constant.APPLICATION_UUID,
      username: username,
      deviceUuid: deviceUuid
    };

    this.logService.trace('Forgot PIN request data ' + body);

    return this.haventecCommon.http.postNoAuth(this.url + this.forgotPinPath, body);
  }

  resetPin(username: string, deviceUuid: string, hashedPin: string, resetPinToken: string) {
    let body = {
      applicationUuid: Constant.APPLICATION_UUID,
      username: username,
      deviceUuid: deviceUuid,
      hashedPin: hashedPin,
      resetToken: resetPinToken
    };

    this.logService.trace('Reset PIN request data ' + body);

    return this.haventecCommon.http.postNoAuth(this.url + this.resetPinPath, body);
  }
}
