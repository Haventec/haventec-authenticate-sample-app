import { Injectable } from '@angular/core';
import { HaventecClient } from '@haventec/common-js';
import { HttpService } from '../../providers/http-service/http-service';
import * as Constant from '../../constants/application.const';

@Injectable()
export class UserService {

  private userDetailsPath: string = Constant.API_ENDPOINT + '/user/current';
  private userDevicesPath: string = Constant.API_ENDPOINT + '/user/{userUuid}/device';

  constructor(
    private http: HttpService,
    private haventecClient: HaventecClient
  ) {}

  getUserDetails(){
    return this.http.get(this.userDetailsPath)
  }

  getUserDevices(){
    this.haventecClient.getDeviceUuid();
    return this.http.get(this.userDevicesPath)
  }
}
