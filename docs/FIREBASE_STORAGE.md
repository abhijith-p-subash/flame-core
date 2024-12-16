# Firebase Storage Service Documentation

The Firebase Storage Service provides an easy-to-use API for interacting with Firebase Storage. This service allows developers to upload, download, and delete files stored in Firebase Storage while abstracting the complexities of the Firebase SDK.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Methods](#methods)
   - [uploadFile](#uploadfile)
   - [downloadFile](#downloadfile)
   - [deleteFile](#deletefile)
3. [Demo Usage](#demo-usage)


---

## Getting Started

Import and use the `FireAuthService`:

   ```typescript
   import { fireStorageService } from "flame-core";

   const storageService = fireStorageService();;
   ```

---

## Methods

### uploadFile

Uploads a file to Firebase Storage.

**Parameters:**
- `filePath: string`: The path where the file should be stored in Firebase Storage.
- `file: File`: The file to upload.

**Returns:**
- `Promise<TaskResponse>`

**Example:**
```typescript
const file = new File([data], "filename.png");
const response = await storageService.uploadFile("images/filename.png", file);
console.log(response);
```

### downloadFile

Downloads a file from Firebase Storage.

**Parameters:**
- `filePath: string`: The path of the file in Firebase Storage.
- `file: File`: The file to upload.

**Returns:**
- `Promise<TaskResponse>`

**Example:**
```typescript
const response = await storageService.downloadFile("images/filename.png");
console.log(response);
```

### deleteFile

Deletes a file from Firebase Storage.

**Parameters:**
- `filePath: string`: The path of the file to delete in Firebase Storage.
- `file: File`: The file to upload.

**Returns:**
- `Promise<TaskResponse>`

**Example:**
```typescript
const response = await storageService.deleteFile("images/filename.png");
console.log(response);
```

---

## Demo Usage

```typescript
import { fireStorageService } from "./services/fireStorageService";

const storageService = fireStorageService();

// Upload File Example
(async () => {
  try {
    const file = new File([data], "filename.png");
    const uploadResponse = await storageService.uploadFile("images/filename.png", file);
    console.log(uploadResponse);
  } catch (error) {
    console.error("File upload failed:", error);
  }
})();

// Download File Example
(async () => {
  try {
    const downloadResponse = await storageService.downloadFile("images/filename.png");
    console.log(downloadResponse);
  } catch (error) {
    console.error("File download failed:", error);
  }
})();

// Delete File Example
(async () => {
  try {
    const deleteResponse = await storageService.deleteFile("images/filename.png");
    console.log(deleteResponse);
  } catch (error) {
    console.error("File deletion failed:", error);
  }
})();

```

### deleteFile
- Ensure that Firebase is initialized correctly in your app before using `FireStorageService`.
- The `TaskResponse` returned by each method contains either the data (like download URL) or a success message upon successful completion. If an error occurs, the method throws an exception that can be caught for error handling.


