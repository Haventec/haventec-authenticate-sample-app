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
      }else {
        this.saltBits = sjcl.random.randomWords(128);
        this.storage.set('salt', this.saltBits);
      }
    });
  }

  public getHashPin(pin: string): string {
      let hash512 = new sjcl.hash.sha512();

      hash512.update(this.saltBits);
      hash512.update(pin);

      let hashed = hash512.finalize();

      return sjcl.codec.base64.fromBits(hashed);
  }
}
