import { Component, Input } from "@angular/core";
import { UserModel } from '../../models/user';

@Component({
    templateUrl: 'ht-devices.html',
    selector: 'ht-devices',

})
export class Devices{

  @Input() user: UserModel;

  constructor() { }
}
