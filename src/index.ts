import firebaseConfig from "./config/firebase.config";
import { fireAuthService } from "./modules/fireAuth.service";
import { fireStoreDatabaseService } from "./modules/fireStoreDatabase.service";
import { fireStorageService } from "./modules/fireStorage.service";
import { Task, TaskResponse, WhereCondition, TaskOptions } from "./utils/task";

export type {
  Task,
  TaskResponse,
  WhereCondition,
  TaskOptions,
}

export {
  firebaseConfig,
  fireStoreDatabaseService,
  fireAuthService,
  fireStorageService,
};

// Author: Abhijith P Subash

// flame-core