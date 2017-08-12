import { Injectable } from '@angular/core';
import { HaventecClient } from '@haventec/common-js';
import { LogService } from '../../providers/log-service/log-service'
import * as Constant from '../../constants/application.const'

@Injectable()
export class AuthService {

  private signUpUserPath: string = Constant.API_ENDPOINT + '/self-service/user';
  private registerUserPath: string = Constant.API_ENDPOINT + '/activate/user';
  private activateDevicePath: string = Constant.API_ENDPOINT + '/activate/device';
  private addDevicePath: string = Constant.API_ENDPOINT + '/device';
  private loginUserPath: string = Constant.API_ENDPOINT + '/login';
  // private logoutUserPath: string = Constant.API_ENDPOINT + '/logout';
  private forgotPinPath: string = Constant.API_ENDPOINT + '/forgot-pin';
  private resetPinPath: string = Constant.API_ENDPOINT + '/reset-pin';

  constructor(
    private haventecClient: HaventecClient,
    private logService: LogService
  ) {}

  signUpUser(username: string, email: string) {
    let body = {
      applicationUuid: Constant.APPLICATION_UUID,
      email: email,
      username: username,
    };

    return this.postNoAuth(this.signUpUserPath, body, username);
  }

  activateAccount(username: string, activationToken: string, pin: string, deviceName: string) {
    let body = {
      activationToken: activationToken,
      applicationUuid: Constant.APPLICATION_UUID,
      deviceName: deviceName,
      hashedPin: this.haventecClient.getHashPin(pin),
      queryParameters: '',
      username: username
    };

    return this.postNoAuth(this.registerUserPath, body);
  }

  activateDevice(activationToken: string, pin: string) {
    let body = {
      activationToken: activationToken,
      applicationUuid: Constant.APPLICATION_UUID,
      deviceUuid: this.haventecClient.getDeviceUuid(),
      hashedPin: this.haventecClient.getHashPin(pin),
      username: this.haventecClient.getUsername()
    };

    return this.postNoAuth(this.activateDevicePath, body);
  }

  addDevice(username: string, deviceName: string) {
    let body = {
      applicationUuid: Constant.APPLICATION_UUID,
      devicename: deviceName,
      username: username
    };

    return this.postNoAuth(this.addDevicePath, body, username);
  }

  forgotPin() {
    let body = {
      applicationUuid: Constant.APPLICATION_UUID,
      deviceUuid: this.haventecClient.getDeviceUuid(),
      username: this.haventecClient.getUsername()
    };

    return this.postNoAuth(this.forgotPinPath, body);
  }

  login(pin: string) {
    let body = {
      applicationUuid: Constant.APPLICATION_UUID,
      authKey: this.haventecClient.getAuthKey(),
      deviceUuid: this.haventecClient.getDeviceUuid(),
      hashedPin: this.haventecClient.getHashPin(pin),
      username: this.haventecClient.getUsername()
    };

    return this.postNoAuth(this.loginUserPath, body);
  }

  logout() {
    //return this.http.delete(this.logoutUserPath).map(res => res.json());
  }

  resetPin(pin: string, resetPinToken: string) {
    let body = {
      applicationUuid: Constant.APPLICATION_UUID,
      deviceUuid: this.haventecClient.getDeviceUuid(),
      hashedPin: this.haventecClient.getHashPin(pin),
      resetPinToken: resetPinToken,
      username: this.haventecClient.getUsername()
    };

    return this.postNoAuth(this.resetPinPath, body);
  }

  private postNoAuth(url: string, body: {}, initialiseAppWithName?: string): Promise<any> {

    this.logService.trace('Request: ' + url + ' with body ' +  body);

    return new Promise((resolve, reject) => {
      this.haventecClient.http.postNoAuth(url, body).then(
        data => {

          this.logService.trace('Response: ' + url + ' with data ' +  data);

          if(initialiseAppWithName){
            this.logService.debug('Initialising App with username: ' + initialiseAppWithName);
            this.haventecClient.init(initialiseAppWithName);
          }

          this.haventecClient.updateDataFromResponse(data);
          resolve(data);
        },
        err => {
          this.logService.error('Error from ' + url + ' ' + err);
          reject(err);
        }
      );
    });
  }
}
