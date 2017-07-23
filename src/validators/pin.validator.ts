import { AbstractControl}  from '@angular/forms';

export class PinValidation {

  static MatchPin(AC: AbstractControl) {
    let pin1 = AC.get('pin1').value;
    let pin2 = AC.get('pin2').value;

    if(pin1 != pin2) {
      AC.get('pin2').setErrors( {MatchPassword: true} )
    } else {
      return null
    }
  }
}
