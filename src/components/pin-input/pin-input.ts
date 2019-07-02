import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Events } from 'ionic-angular';
import { ChangeDetectorStatus } from "@angular/core/src/change_detection/constants";

@Component({
  templateUrl: 'pin-input.html',
  selector: 'pin-input',

})
export class PinInput {

  @Input() pincode: string;
  @Input() pin1: string;
  @Input() pin2: string;
  @Input() pin3: string;
  @Input() pin4: string;

  @Output() pinUpdated = new EventEmitter();

  constructor(public events: Events) {
    this.pin1 = '';
    this.pin2 = '';
    this.pin3 = '';
    this.pin4 = '';
    this.pincode = '';

    events.subscribe('pin:clear', () => {
      this.clearPins();
    });
  }

  ngOnChanges(changes: any) {
    this.update(changes);
  }

  doKeydown1() {
    this.pin1 = '';
    this.doKeydown();
  }

  doKeydown2() {
    this.pin2 = '';
    this.doKeydown();
  }

  doKeydown3() {
    this.pin3 = '';
    this.doKeydown();
  }

  doKeydown4() {
    this.pin4 = '';
    this.doKeydown();
  }

  doKeydown() {
    this.pincode = this.pin1 + this.pin2 + this.pin3 + this.pin4;
    this.pinUpdated.emit(this.pincode);
  }

  update(changes) {
    let next = null;
    if (changes.keyCode >= 48 && changes.keyCode <= 57) {
      this.pincode = this.pin1 + this.pin2 + this.pin3 + this.pin4;
      this.pinUpdated.emit(this.pincode);
      next = changes.target.nextElementSibling;
    } else if (changes.keyCode == 8) {
      next = changes.target.previousElementSibling;
    } else if (changes.keyCode < 48 || changes.keyCode > 57) {
      changes.preventDefault();
    }

    if (next) {
      next.focus();
    }
  }

  clearPins() {
    this.pin1 = '';
    this.pin2 = '';
    this.pin3 = '';
    this.pin4 = '';
    this.pincode = '';
  }
}
