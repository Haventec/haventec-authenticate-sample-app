import { Component } from "@angular/core";
import * as Constant from '../../constants/application.const';

@Component({
    templateUrl: 'app-header.html',
    selector: 'app-header'
})
export class AppHeader{

  private appName: string;

  constructor() {
    this.appName = Constant.APPLICATION_NAME;
  }
}
