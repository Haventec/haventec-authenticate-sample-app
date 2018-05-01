import { Component, Input } from "@angular/core";
import { HaventecAuthenticateClient } from '@haventec/authenticate-client-js';
import { LogService } from '../../providers/log-service/log-service';
import { UserModel } from '../../models/user';

@Component({
    templateUrl: 'ht-devices.html',
    selector: 'ht-devices'
})
export class Devices {

  @Input() user: UserModel;

  private thisDeviceUuid: string;

  constructor(
    private haventecAuthenticateClient: HaventecAuthenticateClient,
    private logService: LogService
  ){
    this.thisDeviceUuid = this.haventecAuthenticateClient.getDeviceUuid();
  }

  deleteDevice(deviceUuid) {
    this.haventecAuthenticateClient.deleteDevice(deviceUuid).then(
      data => {
        this.removeDeviceFromLocalUserDevices(deviceUuid)
      },
      err => {
        this.logService.error(err);
      }
    );
  }

  lockDevice(deviceUuid) {
    this.haventecAuthenticateClient.lockDevice(deviceUuid).then(
      data => {
        this.updatelockStatusInLocalUserDevices(deviceUuid, true);
      },
      err => {
        this.logService.error(err);
      }
    );
  }

  unlockDevice(deviceUuid) {
    this.haventecAuthenticateClient.unlockDevice(deviceUuid).then(
      data => {
        this.updatelockStatusInLocalUserDevices(deviceUuid, false);
      },
      err => {
        this.logService.error(err);
      }
    );
  }

  private removeDeviceFromLocalUserDevices(deviceUuid: string) {
    this.user.devices = this.user.devices.filter(function( obj ) {
      return obj.deviceUuid !== deviceUuid;
    });
  }

  private updatelockStatusInLocalUserDevices(deviceUuid: string, lockStatus: boolean) {
    for (let i in this.user.devices) {
      if (this.user.devices[i].deviceUuid == deviceUuid) {
        this.user.devices[i].locked = lockStatus;
        break;
      }
    }
  }

}
