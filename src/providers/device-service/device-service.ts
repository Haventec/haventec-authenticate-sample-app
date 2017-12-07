import { Injectable } from '@angular/core';
import { HaventecClient } from '@haventec/common-js';
import { HttpService } from '../../providers/http-service/http-service';

import * as Constant from '../../constants/application.const';

@Injectable()
export class DeviceService {

  private getUsersDevicesPath: string;

  constructor(
    private http: HttpService,
    private haventecClient: HaventecClient,
  ) {


    // this.getUsersDevicesPath = Constant.API_ENDPOINT + '/user' + this.haventecClient.getUserUuid();
  }

  getDevices(username: string, email: string) {
    // let body = {
    //   applicationUuid: Constant.APPLICATION_UUID,
    //   email: email,
    //   username: username,
    // };
    //
    // return this.http.post(this.getUsersDevicesPath, body, username);

    this.getUserUuid();
  }

  private getUserUuid(){
    console.log('Access Token:', this.haventecClient.getAccessToken())
  }
}
