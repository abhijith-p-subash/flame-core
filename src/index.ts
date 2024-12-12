import FirebaseConfig from "./config/firebase.config";
import FireAuthService from "./modules/fireAuth.service";
import FireStoreService from "./modules/fireStore.service";

FirebaseConfig.initialize({
  apiKey: "AIzaSyCpv_GfAtP_V5PUyWsvq3dYhJ_TYcfxUXI",
  authDomain: "flame-core.firebaseapp.com",
  projectId: "flame-core",
  storageBucket: "flame-core.firebasestorage.app",
  messagingSenderId: "694484863589",
  appId: "1:694484863589:web:878f5ff8728e10505a548c",
});

console.log("Flame Core");

const firestoreService = new FireStoreService();

async function getData() {
  try {
    const res = await firestoreService.getAll("users", {});
    const res2 = await firestoreService.create("users", {
      body: {
        name: "Ram",
        email: "ram@ram.com",
        phone: "94949494944",
      },
    });

    console.log("RES", res);
    console.log("RES 2", res2);
  } catch (error) {
    console.log(error);
  }
}

getData();

export { FirebaseConfig, FireStoreService, FireAuthService };
