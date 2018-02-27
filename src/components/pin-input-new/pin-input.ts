import {Component, Input, Output, EventEmitter, ViewChild} from "@angular/core";
import { Events } from 'ionic-angular';

@Component({
    templateUrl: 'pin-input.html',
    selector: 'pin-input',
})

export class PinInput{

  @Input('pincode') pincode: string;

  @ViewChild('pinInput') pinInput;

  @Output() pinUpdated : EventEmitter<any> = new EventEmitter<any>();

  constructor(public events: Events) {
      this.pincode = '';

    events.subscribe('pin:clear', () => {
      this.clearPins();
    });
  }

  update(changes) {
    this.pinUpdated.next(this.pincode);
  }

  clearPins() {
    this.pincode = '';
  }
}
