import {HaventecCommon} from '@haventec/common-js';
import {IonicStorageService} from "./ionic_storage.service";
import {Storage} from "@ionic/storage";

export function HaventecCommonFactory(storage: Storage) {
  const ionicStorageService: IonicStorageService = new IonicStorageService(storage);
  return new HaventecCommon(null);
};

export let HaventecCommonProvider = { provide: HaventecCommon,
  useFactory: HaventecCommonFactory,
  deps: [Storage]
};
