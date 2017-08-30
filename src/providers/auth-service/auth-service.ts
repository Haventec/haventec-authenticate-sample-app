import { Injectable } from '@angular/core';
import { HaventecClient } from '@haventec/common-js';
import { LogService } from '../../providers/log-service/log-service';
import { DeviceNameService } from '../../providers/device-name-service/device-name-service';
import * as Constant from '../../constants/application.const';

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
  private userDetailsPath: string = Constant.API_ENDPOINT + '/user/current';

  constructor(
    private haventecClient: HaventecClient,
    private logService: LogService,
    private deviceNameService: DeviceNameService
  ) {}

  signUpUser(username: string, email: string) {
    let body = {
      applicationUuid: Constant.APPLICATION_UUID,
      email: email,
      username: username,
    };

    return this.post(this.signUpUserPath, body, username);
  }

  activateAccount(username: string, activationToken: string, pin: string) {
    let body = {
      activationToken: activationToken,
      applicationUuid: Constant.APPLICATION_UUID,
      deviceName: this.deviceNameService.getDeviceName(),
      hashedPin: this.haventecClient.getHashPin(pin),
      username: username
    };

    return this.post(this.registerUserPath, body);
  }

  activateDevice(activationToken: string, pin: string) {
    let body = {
      activationToken: activationToken,
      applicationUuid: Constant.APPLICATION_UUID,
      deviceUuid: this.haventecClient.getDeviceUuid(),
      hashedPin: this.haventecClient.getHashPin(pin),
      username: this.haventecClient.getUsername()
    };

    return this.post(this.activateDevicePath, body);
  }

  addDevice(username: string) {
    let body = {
      applicationUuid: Constant.APPLICATION_UUID,
      deviceName: this.deviceNameService.getDeviceName(),
      username: username
    };

    return this.post(this.addDevicePath, body, username);
  }

  forgotPin() {
    let body = {
      applicationUuid: Constant.APPLICATION_UUID,
      deviceUuid: this.haventecClient.getDeviceUuid(),
      username: this.haventecClient.getUsername()
    };

    return this.post(this.forgotPinPath, body);
  }

  login(pin: string) {
    let body = {
      applicationUuid: Constant.APPLICATION_UUID,
      authKey: this.haventecClient.getAuthKey(),
      deviceUuid: this.haventecClient.getDeviceUuid(),
      hashedPin: this.haventecClient.getHashPin(pin),
      username: this.haventecClient.getUsername()
    };

    return this.post(this.loginUserPath, body);
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

    return this.post(this.resetPinPath, body);
  }

  getUserDetails(){
    return this.get(this.userDetailsPath)
  }

  private get(url: string): Promise<any> {

    this.logService.trace('GET Request: ' + url);

    return new Promise((resolve, reject) => {
      this.haventecClient.http.get(url, this.haventecClient.getAccessToken()).then(
        data => {
          this.logService.trace('GET Response: ' + url + ' with data ', data);
          resolve(data);
        },
        err => {
          this.logService.error(err);
          reject(err);
        }
      );
    });
  }

  private post(url: string, body: {}, initialiseAppWithUsername?: string): Promise<any> {

    this.logService.trace('POST Request: ' + url + ' with body ', body);

    return new Promise((resolve, reject) => {
      this.haventecClient.http.postNoAuth(url, body).then(
        data => {

          this.logService.trace('Response: ' + url + ' with data ', data);

          if(initialiseAppWithUsername){
            this.logService.debug('Initialising App with username: ' + initialiseAppWithUsername);
            this.haventecClient.init(initialiseAppWithUsername);
          }

          this.haventecClient.updateDataFromResponse(data);
          resolve(data);
        },
        err => {
          this.logService.error(err);
          reject(err);
        }
      );
    });
  }
}
