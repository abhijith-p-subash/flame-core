import {
  getFirestore,
  Firestore,
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import FirebaseConfig from "../config/firebase.config";
import { Task, TaskResponse } from "../utils/task";
import { queryValidator } from "../utils/validation";

class FireStoreService {
  private static instance: FireStoreService;
  private db: Firestore;

  constructor() {
    this.db = getFirestore(FirebaseConfig.getApp());
  }

  static getInstance(): FireStoreService {
    if (!this.instance) {
      this.instance = new FireStoreService();
    }

    return this.instance;
  }

  async getAll<T>(collectionName: string, task: Task): Promise<TaskResponse> {
    try {
      const colRef = collection(this.db, collectionName);
      const limit = task.options?.limit || 1000;
      const q = queryValidator(task, colRef);
      const totalCountRes = await this.getCount(collectionName, task);
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as T),
      })) as T[];

      return {
        data,
        count: totalCountRes.count,
        limit: limit,
        message: "Get all data successfully",
      };
    } catch (error) {
      return {
        error: error as Error,
        message: "Error getting data",
      };
    }
  }

  async getById<T>(collectionName: string, task: Task): Promise<TaskResponse> {
    try {
      if (!task.id) {
        throw new Error("Id is required");
      }

      const snapshot = await getDoc(
        doc(this.db, collectionName, task.id as string)
      );

      if (!snapshot.exists()) {
        throw new Error("Data not found");
      }

      return {
        data: { id: snapshot.id, ...snapshot.data() } as T,
        error: null,
        message: "Get data by id successfully",
      };
    } catch (error) {
      return {
        error: error as Error,
        message: "Failed to get data by id",
      };
    }
  }

  async getOne<T>(collectionName: string, task: Task): Promise<TaskResponse> {
    try {
      const colRef = collection(this.db, collectionName);
      const q = queryValidator(task, colRef);
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as T),
      })) as T[];
      return {
        data: data[0],
        error: null,
        message: "Get one data successfully",
      };
    } catch (error) {
      return {
        error: error as Error,
        message: "Failed to get one data",
      };
    }
  }

  async getCount(collectionName: string, task: Task): Promise<TaskResponse> {
    try {
      const colRef = collection(this.db, collectionName);
      const q = queryValidator(task, colRef);
      const totalCountSnapshot = await getDocs(q);
      const totalCount = totalCountSnapshot.size || 0;
      return {
        count: totalCount,
      };
    } catch (error) {
      return {
        error: error as Error,
        message: "Failed to get data count",
      };
    }
  }

  async create<T>(collectionName: string, task: Task): Promise<TaskResponse> {
    try {
      const colRef = collection(this.db, collectionName);
      const docRef = await addDoc(colRef, task.body);
      return {
        data: { id: docRef.id, ...task.body } as T,
        error: null,
        message: "Create successfully",
      };
    } catch (error) {
      return {
        error: error as Error,
        message: "Failed to create",
      };
    }
  }

  async updateById<T>(
    collectionName: string,
    task: Task
  ): Promise<TaskResponse> {
    try {
      if (!task.id) {
        throw new Error("Id is required");
      }
      const colRef = collection(this.db, collectionName, task.id as string);
      const docRef = await addDoc(colRef, task.body);
      return {
        data: { id: docRef.id, ...task.body } as T,
        error: null,
        message: "Update successfully",
      };
    } catch (error) {
      return {
        error: error as Error,
        message: "Failed to update",
      };
    }
  }

  async updateOne<T>(
    collectionName: string,
    task: Task
  ): Promise<TaskResponse> {
    try {
      const getOneRes = await this.getOne(collectionName, task);
      const updateRes = await this.updateById(collectionName, {
        ...task,
        id: getOneRes.data.id,
      });
      return {
        data: updateRes.data,
        error: null,
        message: "Update successfully",
      };
    } catch (error) {
      return {
        error: error as Error,
        message: "Failed to update",
      };
    }
  }

  async updateBulk<T>(
    collectionName: string,
    ids: string[],
    task: Task
  ): Promise<TaskResponse> {
    try {
      if (!ids.length) {
        throw new Error("Ids is required");
      }
      const results = await Promise.all(
        ids.map(async (id) => {
          await this.updateById(collectionName, {
            id,
            ...task,
          });
        })
      );
      return {
        data: results,
        message: "Bulk update successfully",
      };
    } catch (error) {
      return {
        error: error as Error,
        message: "Bulk update Failed",
      };
    }
  }

  async deleteById<T>(
    collectionName: string,
    task: Task
  ): Promise<TaskResponse> {
    try {
      const docRef = doc(this.db, collectionName, task.id as string);
      const res = await deleteDoc(docRef);
      return { data: res, error: null, message: "Delete successfully" };
    } catch (error) {
      return {
        error: error as Error,
        message: "Failed to delete",
      };
    }
  }

  async deleteOne<T>(
    collectionName: string,
    task: Task
  ): Promise<TaskResponse> {
    try {
      const getOneRes = await this.getOne(collectionName, task);
      const deleteRes = await this.deleteById(collectionName, {
        ...task,
        id: getOneRes.data.id,
      });
      return {
        data: deleteRes.data,
        error: null,
        message: "Delete successfully",
      };
    } catch (error) {
      return {
        error: error as Error,
        message: "Failed to delete one",
      };
    }
  }

  async deleteBulk<T>(
    collectionName: string,
    ids: string[],
    task: Task
  ): Promise<TaskResponse> {
    try {
      if (!ids.length) {
        throw new Error("Ids is required");
      }
      const results = ids.map(async (id) => {
        await this.deleteById(collectionName, {
          id,
          ...task,
        });
      });
      return { data: results, message: "Bulk delete successfully" };
    } catch (error) {
      return { error: error as Error, message: "Bulk delete Failed" };
    }
  }

  // async taskBeforeRead() {}
  // async taskAfterRead() {}
  // async taskBeforeWrite() {}
  // async taskAfterWrite() {}
  // async taskBeforeDelete() {}
  // async taskAfterDelete() {}
}

const fireStoreService = FireStoreService.getInstance()
export {fireStoreService}