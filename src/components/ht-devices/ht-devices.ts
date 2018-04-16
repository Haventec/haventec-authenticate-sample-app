import { Component, Input } from "@angular/core";
import { HaventecClient } from 'authenticate-client-js';
import { UserModel } from '../../models/user';

@Component({
    templateUrl: 'ht-devices.html',
    selector: 'ht-devices'
})
export class Devices {

  @Input() user: UserModel;

  private thisDeviceUuid: string;

  constructor(private haventecClient: HaventecClient,) {
    this.thisDeviceUuid = this.haventecClient.getDeviceUuid();
  }
}
