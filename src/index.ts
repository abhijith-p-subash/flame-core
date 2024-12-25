import firebaseConfig from "./config/firebase.config";
import { fireAuthService } from "./modules/fireAuth.service";
import { fireStoreDatabaseService } from "./modules/fireStoreDatabase.service";
import { fireStorageService } from "./modules/fireStorage.service";

export {
  firebaseConfig,
  fireStoreDatabaseService,
  fireAuthService,
  fireStorageService,
};

// Author: Abhijith P Subash