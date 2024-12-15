import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import FirebaseConfig from "../config/firebase.config";
import { TaskResponse } from "../utils/task";

/**
 * Service for interacting with Firebase Storage.
 * This class provides methods to upload, download, and delete files from Firebase Storage.
 */
class FireStorageService {
  private readonly storage;

  constructor() {
    // Initialize Firebase Storage instance using the Firebase app configuration.
    this.storage = getStorage(FirebaseConfig.getApp());
  }

  /**
   * Uploads a file to Firebase Storage.
   *
   * @param {string} filePath - The path where the file should be stored in Firebase Storage.
   * @param {File} file - The file to upload.
   * @returns {Promise<TaskResponse>} The response containing the file's download URL.
   */
  async uploadFile(filePath: string, file: File): Promise<TaskResponse> {
    try {
      const fileRef = ref(this.storage, filePath);

      // Upload the file to the specified path in Firebase Storage.
      await uploadBytes(fileRef, file);

      // Get the download URL of the uploaded file.
      const downloadURL = await getDownloadURL(fileRef);

      return {
        data: { downloadURL },
        message: "File uploaded successfully",
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Downloads a file from Firebase Storage.
   *
   * @param {string} filePath - The path of the file in Firebase Storage.
   * @returns {Promise<TaskResponse>} The response containing the file's download URL.
   */
  async downloadFile(filePath: string): Promise<TaskResponse> {
    try {
      const fileRef = ref(this.storage, filePath);

      // Get the download URL of the file.
      const downloadURL = await getDownloadURL(fileRef);

      return {
        data: { downloadURL },
        message: "File downloaded successfully",
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Deletes a file from Firebase Storage.
   *
   * @param {string} filePath - The path of the file to delete in Firebase Storage.
   * @returns {Promise<TaskResponse>} The response confirming the deletion.
   */
  async deleteFile(filePath: string): Promise<TaskResponse> {
    try {
      const fileRef = ref(this.storage, filePath);

      // Delete the file from Firebase Storage.
      await deleteObject(fileRef);

      return {
        data: null,
        message: "File deleted successfully",
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

// Singleton pattern for FireStorageService
let fireStorageServiceCore: FireStorageService | null = null;

/**
 * Returns a singleton instance of the FireStorageService.
 *
 * @returns {FireStorageService} The singleton FireStorageService instance.
 */
const fireStorageService = (): FireStorageService => {
  if (!fireStorageServiceCore) {
    fireStorageServiceCore = new FireStorageService();
  }
  return fireStorageServiceCore;
};

export { fireStorageService };
