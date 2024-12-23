/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getFirestore,
  Firestore,
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import FirebaseConfig from "../config/firebase.config";
import { Task, TaskResponse } from "../utils/task";
import { queryValidator } from "../utils/validation";

class FireStoreDatabaseService {
  private readonly db: Firestore;

  /**
   * Initializes a new instance of the FireStoreDatabaseService class.
   * This constructor sets up the Firestore database instance using the
   * Firebase app configuration.
   */

  constructor() {
    this.db = getFirestore(FirebaseConfig.getApp());
  }

  /**
   * Retrieves all data from the specified collection using the provided task.
   * This method validates the task using the queryValidator and retrieves the
   * data from the Firestore database. It returns a TaskResponse containing the
   * retrieved data, the total count of data in the collection, and the limit
   * set for the query.
   *
   * @param {string} collectionName - The name of the Firestore collection to
   * retrieve data from.
   * @param {Task} task - The task object containing the query options.
   * @returns {Promise<TaskResponse>} A promise resolving to a TaskResponse
   * containing the retrieved data, total count, and limit.
   */
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

  /**
   * Retrieves a single document from the specified collection using the
   * provided id.
   *
   * @param {string} collectionName - The name of the Firestore collection to
   * retrieve data from.
   * @param {Task} task - The task object containing the id of the document to
   * retrieve.
   * @returns {Promise<TaskResponse>} A promise resolving to a TaskResponse
   * containing the retrieved data.
   */
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

  /**
   * Retrieves a single document from the specified collection using the provided task query options.
   * This method utilizes the queryValidator to construct the query and fetches the document
   * from the Firestore database. It returns a TaskResponse containing the first matched document.
   *
   * @param {string} collectionName - The name of the Firestore collection to retrieve data from.
   * @param {Task} task - The task object containing query options to filter the document.
   * @returns {Promise<TaskResponse>} A promise resolving to a TaskResponse containing the first matched document.
   */

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

  /**
   * Retrieves the count of documents in the specified collection using the
   * provided task query options.
   * This method constructs a query using the queryValidator and fetches the
   * total number of documents that match the query from the Firestore database.
   *
   * @param {string} collectionName - The name of the Firestore collection to
   * count documents from.
   * @param {Task} task - The task object containing query options to filter
   * the documents.
   * @returns {Promise<TaskResponse>} A promise resolving to a TaskResponse
   * containing the count of matched documents.
   */

  async getCount(collectionName: string, task: Task): Promise<TaskResponse> {
    try {
      const colRef = collection(this.db, collectionName);
      const q = queryValidator(
        { ...task, options: { limit: undefined } },
        colRef
      );
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

  /**
   * Creates a new document in the specified collection with the provided task data.
   * This method adds the document to the Firestore database and returns a TaskResponse
   * containing the newly created document's ID and data.
   *
   * @param {string} collectionName - The name of the Firestore collection to add the document to.
   * @param {Task} task - The task object containing the data to be added as a new document.
   * @returns {Promise<TaskResponse>} A promise resolving to a TaskResponse containing the created document's ID and data.
   */

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

      if (!task.body) {
        throw new Error("Body is required tp update");
      }

      const docRef = doc(this.db, collectionName, task.id as string);
      await updateDoc(docRef, task.body);
      return {
        data: { id: task.id, ...task.body } as T,
        message: "Document updated successfully",
      };

      // const colRef = collection(this.db, collectionName, task.id as string);
      // const docRef = await addDoc(colRef, task.body);
      // return {
      //   data: { id: docRef.id, ...task.body } as T,
      //   error: null,
      //   message: "Update successfully",
      // };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Updates a single document in the specified collection with the provided task data.
   * This method first retrieves the document using the getOne method, and then updates
   * the document in the Firestore database using the updateById method. It returns a
   * TaskResponse containing the updated document's ID and data.
   *
   * @param {string} collectionName - The name of the Firestore collection containing the document to update.
   * @param {Task} task - The task object containing the data to be updated.
   * @returns {Promise<TaskResponse>} A promise resolving to a TaskResponse containing the updated document's ID and data.
   * @throws {Error} Throws an error if the task ID is not provided.
   */
  async updateOne<T>(
    collectionName: string,
    task: Task
  ): Promise<TaskResponse> {
    try {
      const existingDocRes = await this.getOne(collectionName, task);
      if (existingDocRes.data) {
        const res = await this.updateById(collectionName, {
          ...task,
          id: existingDocRes.data.id,
        });

        return {
          data: res.data as T,
          message: "Document updated successfully",
        };
      }
      throw new Error("Document to update not found");
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Updates multiple documents in the specified collection with the provided task data.
   * This method first validates the task ID and then updates the documents in the Firestore
   * database using the updateById method. It returns a TaskResponse containing the updated
   * documents' IDs and data.
   *
   * @param {string} collectionName - The name of the Firestore collection containing the documents to update.
   * @param {string[]} ids - Array of document IDs to update.
   * @param {Task} task - The task object containing the data to be updated.
   * @returns {Promise<TaskResponse>} A promise resolving to a TaskResponse containing the updated documents' IDs and data.
   * @throws {Error} Throws an error if the task IDs is not provided.
   */
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
        data: results as T[],
        message: "Bulk update successfully",
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Deletes a document from the specified collection using the provided task ID.
   *
   * @param {string} collectionName - The name of the Firestore collection containing the document to delete.
   * @param {Task} task - The task object containing the ID of the document to delete.
   * @returns {Promise<TaskResponse>} A promise resolving to a TaskResponse containing the result of the deletion operation.
   * @throws {Error} Throws an error if the task ID is not provided.
   */
  async deleteById<T>(
    collectionName: string,
    task: Task
  ): Promise<TaskResponse> {
    try {
      if (!task.id) throw new Error("ID is required");
      const docRef = doc(this.db, collectionName, task.id as string);
      const res = await deleteDoc(docRef);
      return { data: res as T, message: "Delete successfully" };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Deletes a single document in the specified collection with the provided task data.
   * This method first retrieves the document using the getOne method, and then deletes
   * the document in the Firestore database using the deleteById method. It returns a
   * TaskResponse containing the result of the deletion operation.
   *
   * @param {string} collectionName - The name of the Firestore collection containing the document to delete.
   * @param {Task} task - The task object containing the data to be deleted.
   * @returns {Promise<TaskResponse>} A promise resolving to a TaskResponse containing the result of the deletion operation.
   * @throws {Error} Throws an error if the task ID is not provided.
   */
  async deleteOne<T>(
    collectionName: string,
    task: Task
  ): Promise<TaskResponse> {
    try {
      const existingDocRes = await this.getOne(collectionName, task);
      if (existingDocRes.data) {
        const res = await this.deleteById(collectionName, {
          ...task,
          id: existingDocRes.data.id,
        });

        return {
          data: res.data as T,
          message: "Document deleted successfully",
        };
      }
      throw new Error("Document to delete not found");
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Deletes multiple documents in the specified collection with the provided task data.
   * This method accepts an array of IDs and a task object, and deletes the documents in
   * the Firestore database using the deleteById method. It returns a TaskResponse containing
   * the result of the deletion operation.
   *
   * @param {string} collectionName - The name of the Firestore collection containing the documents to delete.
   * @param {string[]} ids - The array of IDs of the documents to delete.
   * @param {Task} task - The task object containing the data to be deleted.
   * @returns {Promise<TaskResponse>} A promise resolving to a TaskResponse containing the result of the deletion operation.
   * @throws {Error} Throws an error if the task ID is not provided.
   */
  async deleteBulk<T>(
    collectionName: string,
    ids: string[],
    task: Task
  ): Promise<TaskResponse> {
    try {
      if (!ids.length) throw new Error("IDs are required");

      const res = await Promise.all(
        ids.map((id) => this.deleteById(collectionName, { id, ...task }))
      );

      return { data: res as T[], message: "Bulk delete successful" };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Populates the specified field(s) of the given data object(s) with the 
   * corresponding document from the specified collection. If the data is an array, 
   * the populate operation is performed in parallel using Promise.all.
   * 
   * @param {any} data - The data object(s) to be populated.
   * @param {any} populatePayload - An array of arrays containing the field name 
   * and the ID field name to be populated.
   * @returns {Promise<any>} A promise resolving to the populated data object(s).
   * @throws {Error} Throws an error if the populate operation fails.
   */
  async populateFn(data: any, populatePayload: any) {
    try {
      const isArray = Array.isArray(data);
      const result = isArray ? [...data] : { ...data };

      console.log("Data", data);
      console.log("Populate Payload", populatePayload);
      console.log("Data Type", isArray ? "array" : "object");

      for (const [field, idField] of populatePayload) {
        if (isArray) {
          // Use Promise.all for parallel fetching
          await Promise.all(
            result.map(async (item: any) => {
              const populateData = await this.getById(field, {
                id: item[idField] as string,
              });
              item[field] = populateData.data;
            })
          );
        } else {
          const populateData = await this.getById(field, {
            id: result[idField] as string,
          });
          result[field] = populateData.data;
        }
      }

      return result;
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
