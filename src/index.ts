// Import Firebase configuration
import firebaseConfig from "./config/firebase.config";

// Import services for Firebase Authentication, Firestore Database, and Storage
import { fireAuthService } from "./modules/fireAuth.service";
import { fireStoreDatabaseService } from "./modules/fireStoreDatabase.service";
import { fireStorageService } from "./modules/fireStorage.service";

// Export configuration and services for external usage
export {
  firebaseConfig,
  fireStoreDatabaseService,
  fireAuthService,
  fireStorageService,
};

// Author: Abhijith P Subash