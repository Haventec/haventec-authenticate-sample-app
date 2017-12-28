import { Component } from "@angular/core";
import * as Constant from '../../constants/application.const';

@Component({
    templateUrl: 'header-public.html',
    selector: 'header-public'
})
export class HeaderPublic{

  private appName: string;

  constructor() {
    this.appName = Constant.APPLICATION_NAME;
  }
}
