# Firebase Storage Service Documentation

The Firebase Storage Service provides an easy-to-use API for interacting with Firebase Storage. This service allows developers to upload, download, and delete files stored in Firebase Storage while abstracting the complexities of the Firebase SDK.

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Usage](#usage)
4. [API Reference](#api-reference)
   - [uploadFile](#uploadfile)
   - [downloadFile](#downloadfile)
   - [deleteFile](#deletefile)
5. [Singleton Pattern](#singleton-pattern)
6. [Error Handling](#error-handling)

---

## Getting Started

Import and use the `FireAuthService`:

   ```typescript
   import { fireStorageService } from "flame-core";

   const storageService = fireStorageService();;
   ```

---

## Methods

### File Upload

```typescript
import { fireStorageService } from './path-to/fire-storage-service';

const storageService = fireStorageService();

(async () => {
  const file = new File(["content"], "example.txt", { type: "text/plain" });
  const response = await storageService.uploadFile('uploads/example.txt', file);
  console.log(response.message, response.data);
})();
```

### File Download

```typescript
(async () => {
  const response = await storageService.downloadFile('uploads/example.txt');
  console.log(response.message, response.data);
})();
```

### File Deletion

```typescript
(async () => {
  const response = await storageService.deleteFile('uploads/example.txt');
  console.log(response.message);
})();
```

---

## API Reference

### uploadFile

Uploads a file to Firebase Storage and returns its download URL.

#### Syntax

```typescript
async uploadFile(filePath: string, file: File): Promise<TaskResponse>
```

#### Parameters

- `filePath` *(string)*: The path in Firebase Storage where the file will be stored.
- `file` *(File)*: The file to upload.

#### Returns

- `Promise<TaskResponse>`: An object containing the file's download URL and a success message.

#### Example

```typescript
const response = await storageService.uploadFile('uploads/image.png', imageFile);
console.log(response.data.downloadURL);
```

---

### downloadFile

Fetches the download URL for a file stored in Firebase Storage.

#### Syntax

```typescript
async downloadFile(filePath: string): Promise<TaskResponse>
```

#### Parameters

- `filePath` *(string)*: The path of the file in Firebase Storage.

#### Returns

- `Promise<TaskResponse>`: An object containing the download URL and a success message.

#### Example

```typescript
const response = await storageService.downloadFile('uploads/image.png');
console.log(response.data.downloadURL);
```

---

### deleteFile

Deletes a file from Firebase Storage.

#### Syntax

```typescript
async deleteFile(filePath: string): Promise<TaskResponse>
```

#### Parameters

- `filePath` *(string)*: The path of the file in Firebase Storage to delete.

#### Returns

- `Promise<TaskResponse>`: An object with a success message confirming the deletion.

#### Example

```typescript
const response = await storageService.deleteFile('uploads/image.png');
console.log(response.message);
```

---

## Singleton Pattern

The `FireStorageService` is implemented as a singleton to ensure only one instance is created and reused throughout the application.

### Accessing the Singleton

```typescript
import { fireStorageService } from './path-to/fire-storage-service';

const storageService = fireStorageService();
```

This approach ensures efficient resource usage and consistent behavior.

---

## Error Handling

The service methods throw errors if the operation fails. Use `try-catch` blocks to handle these errors gracefully.

### Example

```typescript
try {
  const response = await storageService.uploadFile('uploads/example.txt', file);
  console.log(response.message);
} catch (error) {
  console.error('Error:', error);
}
```

---

This documentation provides a comprehensive guide to using the Firebase Storage Service. For further assistance, consult the Firebase SDK documentation or reach out to the development team.

