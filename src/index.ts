import firebaseConfig from "./config/firebase.config";
import { fireAuthService } from "./modules/fireAuth.service";
import { fireStoreDatabaseService } from "./modules/fireStoreDatabase.service";
import { fireStorageService } from "./modules/fireStorage.service";

firebaseConfig.initialize({
  apiKey: "AIzaSyCpv_GfAtP_V5PUyWsvq3dYhJ_TYcfxUXI",
  authDomain: "flame-core.firebaseapp.com",
  projectId: "flame-core",
  storageBucket: "flame-core.firebasestorage.app",
  messagingSenderId: "694484863589",
  appId: "1:694484863589:web:878f5ff8728e10505a548c",
});

export {
  firebaseConfig,
  fireStoreDatabaseService,
  fireAuthService,
  fireStorageService,
};
