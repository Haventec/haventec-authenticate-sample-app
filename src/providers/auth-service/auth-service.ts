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
      username: username,
      email: email,
      applicationUuid: Constant.APPLICATION_UUID,
    };

    return this.postNoAuth(this.signUpUserPath, body, username);
  }

  activateAccount(username: string, activationToken: string, hashedPin: string, deviceName: string) {
    let body = {
      username: username,
      applicationUuid: Constant.APPLICATION_UUID,
      activationToken: activationToken,
      hashedPin: hashedPin,
      deviceName: deviceName,
      queryParameters: ''
    };

    return this.postNoAuth(this.registerUserPath, body);
  }

  addDevice(username: string, deviceName: string) {
    let body = {
      applicationUuid: Constant.APPLICATION_UUID,
      username: username,
      devicename: deviceName
    };

    return this.postNoAuth(this.addDevicePath, body, username);
  }

  activateDevice(activationToken: string, hashedPin: string, deviceUuid: string, username: string) {
    let body = {
      activationToken: activationToken,
      applicationUuid: Constant.APPLICATION_UUID,
      deviceUuid: deviceUuid,
      hashedPin: hashedPin,
      username: username
    };

    return this.postNoAuth(this.activateDevicePath, body);
  }

  login(username: string, deviceUuid: string, authKey: string, hashedPin: string) {
    let body = {
      username: username,
      applicationUuid: Constant.APPLICATION_UUID,
      deviceUuid: deviceUuid,
      authKey: authKey,
      hashedPin: hashedPin
    };

    return this.postNoAuth(this.loginUserPath, body);
  }

  logout() {
    //return this.http.delete(this.logoutUserPath).map(res => res.json());
  }

  forgotPin(username: string, deviceUuid: string) {
    let body = {
      applicationUuid: Constant.APPLICATION_UUID,
      username: username,
      deviceUuid: deviceUuid
    };

    return this.postNoAuth(this.forgotPinPath, body);
  }

  resetPin(username: string, deviceUuid: string, hashedPin: string, resetPinToken: string) {
    let body = {
      applicationUuid: Constant.APPLICATION_UUID,
      username: username,
      deviceUuid: deviceUuid,
      hashedPin: hashedPin,
      resetPinToken: resetPinToken
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
