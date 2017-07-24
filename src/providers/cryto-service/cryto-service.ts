import { Injectable } from '@angular/core';
import { sjcl } from "@haventec/sjcl512";

@Injectable()
export class CrytoServiceProvider {

  public static getHashPin(pin: string, salt: string): string {
    let hash512 = new sjcl.hash.sha512();

    hash512.update(JSON.parse(salt));
    hash512.update(pin);

    let hashed = hash512.finalize();

    return sjcl.codec.base64.fromBits(hashed);
  }

  public static getRandomSalt() {
    return sjcl.random.randomWords(128);
  }
}



