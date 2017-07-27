import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as sjcl from "@haventec/sjcl512";

@Injectable()
export class HaventecService {

  saltBits: string;

  constructor(private storage: Storage) {
    this.storage.get('salt').then((salt) => {
      if(salt != null){
        this.saltBits = salt;
        console.log('Haventec service existing salt set', this.saltBits);
      }else {
        this.saltBits = sjcl.random.randomWords(128);
        this.storage.set('salt', this.saltBits);
        console.log('Haventec service new salt created', this.saltBits);
      }
    });
  }

  public getHashPin(pin: string): string {
      let hash512 = new sjcl.hash.sha512();

      console.log('Haventec Hashed PIN salt', this.saltBits);

      hash512.update(this.saltBits);
      hash512.update(pin);

      let hashed = hash512.finalize();
      let hashedPin = sjcl.codec.base64.fromBits(hashed);

      console.log('Haventec Hashed PIN', hashedPin);

      return hashedPin;
  }
}
