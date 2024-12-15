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

class FireStoreDatabaseService {
  private readonly db: Firestore;

  constructor() {
    this.db = getFirestore(FirebaseConfig.getApp());
  }

  async getAll<T>(collectionName: string, task: Task): Promise<TaskResponse> {
    try {
      const colRef = collection(this.db, collectionName);
      const limit = task.options?.limit ?? 1000;
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
      console.error(error);
      throw error;
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
      console.error(error);
      throw error;
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
      console.error(error);
      throw error;
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
      console.error(error);
      throw error;
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
      console.error(error);
      throw error;
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
      console.error(error);
      throw error;
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
      console.error(error);
      throw error;
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
      console.error(error);
      throw error;
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
      console.error(error);
      throw error;
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
      console.error(error);
      throw error;
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
      console.error(error);
      throw error;
    }
  }

  // async taskBeforeRead() {}
  // async taskAfterRead() {}
  // async taskBeforeWrite() {}
  // async taskAfterWrite() {}
  // async taskBeforeDelete() {}
  // async taskAfterDelete() {}
}

// Singleton pattern for FireStoreDatabaseService
let fireStoreDatabaseServiceCore: FireStoreDatabaseService | null = null;

const fireStoreDatabaseService = (): FireStoreDatabaseService => {
  if (!fireStoreDatabaseServiceCore) {
    fireStoreDatabaseServiceCore = new FireStoreDatabaseService();
  }
  return fireStoreDatabaseServiceCore;
};

export { fireStoreDatabaseService };
