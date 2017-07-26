import { Injectable } from '@angular/core';
import { sjcl } from "@haventec/sjcl512";
import { Storage } from '@ionic/storage';


@Injectable()
export class HaventecService {

  readonly  ACTIVE_USERNAME_KEY: string = 'haventec_username';
  readonly  USER_DETAILS_PREFIX_KEY: string = 'ht_';
  readonly  USER_DETAILS_SUFFIX_KEY: string = '_localData';

  private isFirstTime: boolean;

  constructor(private storage: Storage) {

    // Check storage for existing user
    // Todo - Clean up nested promises
    this.getActiveUser().then((username) => {
      if(username == null){
        this.isFirstTime = true;
      } else {
        this.isFirstTime = false;

        this.getUserDetails(username).then((username) => {
            console.log('No user details');
        });
      }
    });
  }

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

  public getActiveUser(): Promise<any> {
    return this.storage.get(this.ACTIVE_USERNAME_KEY);
  }

  public saveActiveUser(username: string): Promise<any> {
    return this.storage.set(this.ACTIVE_USERNAME_KEY, username);
  }

  public removeActiveUser(): Promise<any> {
    return this.storage.remove(this.ACTIVE_USERNAME_KEY);
  }

  private getUserDetails(username: string): Promise<any> {
    let key = this.USER_DETAILS_PREFIX_KEY + username + this.USER_DETAILS_SUFFIX_KEY;
    return this.storage.get(key);
  };

}



