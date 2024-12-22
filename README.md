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
5. [Utils](#utils)
   - [Task](#task)
   - [Validation](#validation)

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

#### Authentication Example
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

[Read detailed documentation](docs/FIREBASE_AUTHENTICATION.md)

---

### FireStoreDatabaseService
The `FireStoreDatabaseService` module simplifies Firestore database operations. Perform CRUD operations with intuitive methods.

#### Features:
- Add, update, delete, and fetch data.
- Query documents with ease.
- Support for batch operations.

#### Firestore Example
```typescript
import { fireStoreDatabaseService } from 'flame-core';

const dbService = fireStoreDatabaseService();

interface Users {
    id?: string,
    name: string,
    email: string,
    age: number,
    eligible: boolean,
    salary: 50000,
    // Additional fields...
}

(async () => {
  try {
    const data = await dbService.getAll<Users>("users", {
      options: {
        where: {
          age: 20,
          email: "ram@ram.com",
          name: "Nike",
          created_at: { $gte: "01-01-1900", $lte: "31-12-2000" },
          salary: {
            $gt: 1000,
          },
        },
        sort: [["created_at", "asc"]],
        limit: 10,
      },
    });
    console.log(data);
  } catch (error) {
    console.error("Error fetching document:", error);
  }
})();
```

[Read detailed documentation](docs/FIREBASE_STORE_DATABASE.md)

---

### FireStorageService
The `FireStorageService` module abstracts Firebase Storage operations, enabling easy file uploads, downloads, and deletions.

#### Features:
- Upload files with metadata.
- Retrieve download URLs.
- Delete stored files.
- Monitor upload progress.

#### Storage Example
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

[Read detailed documentation](docs/FIREBASE_STORAGE.md)

---

## Utils

The `Utils` section contains helper modules that enhance functionality and simplify complex operations.

### Task
The `Task` module provides a structured interface for defining and handling tasks, including filtering, sorting, and pagination. It also includes tools for constructing Firestore queries dynamically.

**Key Features:**
- Define tasks with `TaskOptions`, supporting advanced query conditions like `$lt`, `$gte`, `$in`, and `$arrCont`.
- Handle task responses with `TaskResponse`.
- Manage errors using the `TaskResponseError` class.
- Includes `queryValidator` to dynamically build Firestore queries.

[Read detailed documentation](docs/TASK.md)

---

### Validation
The `Validation` module includes functions to validate the structure and content of queries and ensure they adhere to the required format.

**Key Features:**
- `validateQuery`: Validates the query object to ensure it is correctly formatted.
- Integrated into Firestore query building for error-free dynamic queries.

[Read detailed documentation](docs/VALIDATION.md)

## Contribute

We welcome contributions to make flame-core better! If you have ideas, suggestions, or want to report issues, feel free to open a pull request or create an issue on GitHub. Let’s build something amazing together! 🚀

---

## Support the Developer

If you find this project helpful, consider buying me a coffee! Your support means the world. ☕
[Buy Me A Coffee](https://www.buymeacoffee.com/abhijithpsubash)

#### Contact me

Linkedin: https://bit.ly/3GQJ7mB
Website: https://abhijithpsubash.com/

---

Thank you for using flame-core! Happy coding! 😊