import {HT_IStorageService} from '@haventec/common-js';
import { Storage } from '@ionic/storage';

export class IonicStorageService implements HT_IStorageService {

  constructor(private store : Storage) {

  }

  getItem(key: string) {
    Promise.resolve(this.store.get(key)).then(function(value) {
      return value;
    });
  }

  removeItem(key: string) {
    Promise.resolve(this.store.remove(key));
  }

  setItem(key: string, value: string) {
    Promise.resolve(this.store.set(key, value));
  }
}
