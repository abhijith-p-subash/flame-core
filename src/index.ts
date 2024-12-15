import FirebaseConfig from "./config/firebase.config";
import { fireAuthService } from "./modules/fireAuth.service";
import { fireStoreDatabaseService } from "./modules/fireStoreDatabase.service";
import { fireStorageService } from "./modules/fireStorage.service";

FirebaseConfig.initialize({
  apiKey: "AIzaSyCpv_GfAtP_V5PUyWsvq3dYhJ_TYcfxUXI",
  authDomain: "flame-core.firebaseapp.com",
  projectId: "flame-core",
  storageBucket: "flame-core.firebasestorage.app",
  messagingSenderId: "694484863589",
  appId: "1:694484863589:web:878f5ff8728e10505a548c",
});


async function getData() {
  try {
    const res = await fireStoreDatabaseService().getAll("users", {
      options: {
        // where: {
        //   age: 20,
        //   email: "ram@ram.com",
        //   name: "Nike",
        //   createdAt: { $gte: "01-01-1900", $lte: "31-12-2000" },
        //   salary: {
        //     $gt: 1000,
        //   },
        // },
        // sort: [["createdAt", "asc"]],
        limit: 1,
      },
    });

    // const res2 = await fireStoreDatabaseService().create("users", {
    //   body: {
    //     name: "Ram",
    //     email: "ram@ram.com",
    //     phone: "94949494944",
    //     age: Math.floor(Math.random() * 100) + 1,
    //     city: "america",
    //     salary: Math.floor(Math.random() * 10000) + 1,
    //     dob: new Date("02-03-1997"),
    //     createdAt: new Date().toISOString(),
    //   },
    // });

    //const res = await fireAuthService().register("abhijith.p.subash@gmail.com", "123456");
    //  const res = await fireAuthService().login(email, password)
    // const res = await fireAuthService().logout()
    // const res = await fireAuthService().resetPassword(email)
    //const res = await fireAuthService().signInWithGoogle("popup")
    console.log("RES", res);
    // console.log("RES 2", res2);
  } catch (error) {
    console.log("ERROR !@#", error);
  }

  process.exit();
}

getData();

export {
  FirebaseConfig,
  fireStoreDatabaseService,
  fireAuthService,
  fireStorageService,
};
