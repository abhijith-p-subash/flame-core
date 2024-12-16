# flame-core Documentation

`flame-core` is a comprehensive npm package designed to simplify Firebase operations. It provides developers with modular services for managing Firebase authentication, database, and storage with minimal boilerplate code. By using `flame-core`, you can streamline common Firebase tasks, saving time and effort in your development process.

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Features](#features)
4. [Modules](#modules)
   - [FirebaseConfig](#firebaseconfig)
   - [FireAuthService](#fireauthservice)
   - [FireStoreDatabaseService](#firestoredatabaseservice)
   - [FireStorageService](#firestorageservice)
5. [Sample Usage](#sample-usage)
6. [Demos](#demos)

---

## Overview

`flame-core` abstracts Firebase functionalities into easy-to-use modules. Whether you're working on authentication, database operations, or file storage, `flame-core` provides a unified API to interact with Firebase services efficiently.

### Why Use flame-core?
- Simplified Firebase integration.
- Modular design for easy scalability.
- Reduces boilerplate code and development time.
- Comprehensive methods for authentication, Firestore, and storage operations.
- Well-documented APIs with clear examples.

---

## Installation

1. Install `flame-core` via npm:
   ```bash
   npm install flame-core
   ```

2. Initialize Firebase using your configuration:
   ```typescript
   import firebaseConfig from 'flame-core';

   firebaseConfig.initialize({
     apiKey: "your-api-key",
     authDomain: "your-auth-domain",
     projectId: "your-project-id",
     storageBucket: "your-storage-bucket",
     messagingSenderId: "your-messaging-sender-id",
     appId: "your-app-id",
   });
   ```

---

## Features

### Simplified Firebase Operations
- Easy-to-use modules for Firebase authentication, database, and storage.
- Support for common tasks like user sign-in, data retrieval, and file uploads.

### Modular Architecture
- Each service is encapsulated in a dedicated module, making it easier to manage and scale.

### Improved Code Readability
- Clear and consistent APIs reduce complexity and enhance maintainability.

### Cross-Platform Compatibility
- Fully compatible with web, mobile, and server-side applications.

### Enhanced Security
- Built-in support for Firebase security rules and token management.

---

## Modules

### FirebaseConfig
Handles the initialization of Firebase in your project.

#### Usage:
```typescript
import firebaseConfig from 'flame-core';

firebaseConfig.initialize({
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
});
```

---

### FireAuthService
The `FireAuthService` module focuses on authentication-related methods. It provides a seamless way to manage user login, registration, password resets, and social sign-ins.

[Read detailed documentation](#fireauthservice-documentation)

---

### FireStoreDatabaseService
The `FireStoreDatabaseService` module simplifies Firestore database operations. Perform CRUD operations with intuitive methods.

#### Features:
- Add, update, delete, and fetch data.
- Query documents with ease.
- Support for batch operations.

[Read detailed documentation](#firestoredatabaseservice-documentation)

---

### FireStorageService
The `FireStorageService` module abstracts Firebase Storage operations, enabling easy file uploads, downloads, and deletions.

#### Features:
- Upload files with metadata.
- Retrieve download URLs.
- Delete stored files.
- Monitor upload progress.

[Read detailed documentation](#firestorageservice-documentation)

---

## Sample Usage

### Authentication Example
```typescript
import { fireAuthService } from 'flame-core';

const authService = fireAuthService();

(async () => {
  try {
    const loginResponse = await authService.login("test@example.com", "password123");
    console.log(loginResponse);
  } catch (error) {
    console.error("Login failed:", error);
  }
})();
```

### Firestore Example
```typescript
import { fireStoreDatabaseService } from 'flame-core';

const dbService = fireStoreDatabaseService();

(async () => {
  try {
    const data = await dbService.getDocument("users", "userId123");
    console.log(data);
  } catch (error) {
    console.error("Error fetching document:", error);
  }
})();
```

### Storage Example
```typescript
import { fireStorageService } from 'flame-core';

const storageService = fireStorageService();

(async () => {
  try {
    const downloadUrl = await storageService.uploadFile("images/profile.png", file);
    console.log("File uploaded successfully:", downloadUrl);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
})();
```

---

## Demos

Explore the full potential of `flame-core` by diving into the individual module documentation:

<!-- - [FireAuthService Documentation](#fireauthservice-documentation) -->
- [FireAuthService Documentation](#FIREBASE_AUTHENTICATION)
- [FireStoreDatabaseService Documentation](#firestoredatabaseservice-documentation)
- [FireStorageService Documentation](#firestorageservice-documentation)

Each module includes detailed examples, method explanations, and demo code to get you started quickly.

