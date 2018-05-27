import { Injectable } from '@angular/core';
import { HaventecAuthenticateClient } from '@haventec/authenticate-client-js';
import * as Constant from '../../constants/application.const';
const superagent = require('superagent');

@Injectable()
export class Sanctum {

  constructor(private haventecAuthenticateClient: HaventecAuthenticateClient) {}

  createVault(content: string) {
    return superagent.post(Constant.API_ENDPOINT + '/user/wallet')
      .set("Authorization", "Bearer " + this.haventecAuthenticateClient.getAccessToken())
      .set("Content-type", "application/json")
      .send({ content: content });
  }

  getVault() {
    return superagent.put(Constant.API_ENDPOINT + '/user/wallet')
      .set("Authorization", "Bearer " + this.haventecAuthenticateClient.getAccessToken())
      .set("Content-type", "application/json");
  }

  updateVault(content: string) {
    return superagent.post(Constant.API_ENDPOINT + '/user/wallet')
      .set("Authorization", "Bearer " + this.haventecAuthenticateClient.getAccessToken())
      .set("Content-type", "application/json")
      .send({ content: content });
  }
}
