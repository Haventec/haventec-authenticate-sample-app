import {Component, Input, Output, EventEmitter} from "@angular/core";

@Component({
    templateUrl: 'pin-input.html',
    selector: 'pin-input',

})
export class PinInput{

    @Input() pincode: string;
    @Input() pin1: string;
    @Input() pin2: string;
    @Input() pin3: string;
    @Input() pin4: string;

    @Output() pinUpdated = new EventEmitter();

    constructor() {
        this.pin1 = '';
        this.pin2 = '';
        this.pin3 = '';
        this.pin4 = '';
        this.pincode = '';
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
    }

    if (changes.keyCode == 8) {
      next = changes.target.previousElementSibling;
    }

    if (next) {
      next.focus();
    }
  }
}
