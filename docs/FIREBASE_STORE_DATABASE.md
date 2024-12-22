# Firebase Store Database Documentation

The Firebase Store Database Service provides a robust abstraction for interacting with Firebase Firestore. It supports CRUD operations, bulk updates, and advanced querying, allowing you to interact with Firestore collections and documents efficiently.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Methods](#methods)
   - [getAll](#getall)
   - [getById](#getbyid)
   - [getOne](#getone)
   - [getCount](#getcount)
   - [create](#create)
   - [updateById](#updatebyid)
   - [updateOne](#updateone)
   - [updateBulk](#updatebulk)
   - [deleteById](#deletebyid)
   - [deleteOne](#deleteone)
   - [deleteBulk](#deletebulk)
3. [Demo Usage](#demo-usage)

---

## Getting Started

Import and use the `FireAuthService`:

```typescript
import { fireStoreDatabaseService } from "flame-core";

const storageService = fireStoreDatabaseService();
```

---

## Methods

### `getAll<T>(collectionName: string, task: Task): Promise<TaskResponse>`

Fetches all documents from a specified Firestore collection.

- **Parameters:**
  - `collectionName`: Name of the Firestore collection.
  - `task`: Object containing query options.
- **Returns:**
  - A `TaskResponse` containing the retrieved data, total count, and query limit.

**Example Usage:**

```typescript
const response = await storageService.getAll("users", {
  options: {
    where: {
      status: "completed",
      priority: { $gt: 1 },
      tags: { $arrCont: "important" },
      categories: { $arrContAny: ["work", "personal"] },
      type: { $in: ["task", "reminder"] },
      archived: { $ne: true },
    },
    sort: [
      ["createdAt", "desc"],
      ["priority", "asc"],
    ],
    startAfter: "cursorValue1",
    limit: 10,
  },
});
console.log(response.data);
```

---

### `getById<T>(collectionName: string, task: Task): Promise<TaskResponse>`

Fetches a document by its ID.

- **Parameters:**
  - `collectionName`: Name of the Firestore collection.
  - `task`: Object containing the document ID.
- **Returns:**
  - A `TaskResponse` containing the document data.
- **Throws:**
  - Error if the ID is missing or the document is not found.

**Example Usage:**

```typescript
const response = await storageService.getById("users", {
  id: "12345",
});
console.log(response.data);
```

---

### `getOne<T>(collectionName: string, task: Task): Promise<TaskResponse>`

Fetches the first document matching a query.

- **Parameters:**
  - `collectionName`: Name of the Firestore collection.
  - `task`: Object containing query options.
- **Returns:**
  - A `TaskResponse` containing the first matching document.

**Example Usage:**

```typescript
const response = await storageService.getOne("users", {
  options: {
    where: {
      status: "completed",
      priority: { $gt: 1 },
      tags: { $arrCont: "important" },
      categories: { $arrContAny: ["work", "personal"] },
      type: { $in: ["task", "reminder"] },
      archived: { $ne: true },
    },
  },
});
console.log(response.data);
```

---

### `getCount(collectionName: string, task: Task): Promise<TaskResponse>`

Counts the number of documents in a collection matching a query.

- **Parameters:**
  - `collectionName`: Name of the Firestore collection.
  - `task`: Object containing query options.
- **Returns:**
  - A `TaskResponse` containing the count of matching documents.

**Example Usage:**

```typescript
const response = await storageService.getCount("users", {
  options: {
    where: {
      status: "completed",
    },
  },
});
console.log(response.count);
```

---

### `create<T>(collectionName: string, task: Task): Promise<TaskResponse>`

Creates a new document in a collection.

- **Parameters:**
  - `collectionName`: Name of the Firestore collection.
  - `task`: Object containing the document data.
- **Returns:**
  - A `TaskResponse` containing the newly created document's ID and data.

**Example Usage:**

```typescript
const response = await storageService.create("users", {
  body: { name: "John Doe", age: 30, email: "user@mail.com" },
});
console.log(response.data);
```

---

### `updateById<T>(collectionName: string, task: Task): Promise<TaskResponse>`

Updates a document by its ID.

- **Parameters:**
  - `collectionName`: Name of the Firestore collection.
  - `task`: Object containing the document ID and update data.
- **Returns:**
  - A `TaskResponse` containing the updated document's ID and data.
- **Throws:**
  - Error if the ID or update data is missing.

**Example Usage:**

```typescript
const response = await storageService.updateById("users", {
  id: "12345",
  body: { age: 35 },
});
console.log(response.data);
```

---

### `updateOne<T>(collectionName: string, task: Task): Promise<TaskResponse>`

Updates the first document matching a query.

- **Parameters:**
  - `collectionName`: Name of the Firestore collection.
  - `task`: Object containing query options and update data.
- **Returns:**
  - A `TaskResponse` containing the updated document's ID and data.

**Example Usage:**

```typescript
const response = await storageService.updateOne("users", {
  options: { where: { email: "user@mail.com" } },
  body: { age: 35 },
});
console.log(response.data);
```

---

### `updateBulk<T>(collectionName: string, ids: string[], task: Task): Promise<TaskResponse>`

Updates multiple documents by their IDs.

- **Parameters:**
  - `collectionName`: Name of the Firestore collection.
  - `ids`: Array of document IDs to update.
  - `task`: Object containing update data.
- **Returns:**
  - A `TaskResponse` containing the updated documents' data.
- **Throws:**
  - Error if the IDs array is empty.

**Example Usage:**

```typescript
const response = await storageService.updateBulk("users", ["12345", "67890"], {
  body: { status: "inactive" },
});
console.log(response.data);
```

---

### `deleteById<T>(collectionName: string, task: Task): Promise<TaskResponse>`

Deletes a document by its ID.

- **Parameters:**
  - `collectionName`: Name of the Firestore collection.
  - `task`: Object containing the document ID.
- **Returns:**
  - A `TaskResponse` confirming the deletion.
- **Throws:**
  - Error if the ID is missing.

**Example Usage:**

```typescript
const response = await storageService.deleteById("users", {
  id: "12345",
});
console.log(response.message);
```

---

### `deleteOne<T>(collectionName: string, task: Task): Promise<TaskResponse>`

Deletes the first document matching a query.

- **Parameters:**
  - `collectionName`: Name of the Firestore collection.
  - `task`: Object containing query options.
- **Returns:**
  - A `TaskResponse` confirming the deletion.

**Example Usage:**

```typescript
const response = await storageService.deleteOne("users", {
  options: { where: { email: "user@mail.com" } },
});
console.log(response.message);
```

---

### `deleteBulk<T>(collectionName: string, ids: string[], task: Task): Promise<TaskResponse>`

Deletes multiple documents by their IDs.

- **Parameters:**
  - `collectionName`: Name of the Firestore collection.
  - `ids`: Array of document IDs to delete.
  - `task`: Object containing additional options.
- **Returns:**
  - A `TaskResponse` confirming the deletion.
- **Throws:**
  - Error if the IDs array is empty.

**Example Usage:**

```typescript
const response = await storageService.deleteBulk(
  "users",
  ["12345", "67890"],
  {}
);
console.log(response.message);
```

---

## Demo Usage

**Fetch All Documents from a Collection**

```typescript
try {
  const response = await storageService.getAll("users", {
    options: { limit: 10 },
  });
  console.log("Users:", response.data);
} catch (error) {
  console.error("Error fetching users:", error);
}
```

**Fetch a Document by ID from a Collection**

```typescript
try {
  // Fetch a specific user by ID
  const response = await storageService.getById("users", { id: "12345" });
  console.log("User:", response.data);
} catch (error) {
  console.error("Error fetching user by ID:", error);
}
```

**Create a New Document**

```typescript
try {
  // Create a new user
  const response = await storageService.create("users", {
    body: { name: "Jane Doe", age: 28 },
  });
  console.log("Created User:", response.data);
} catch (error) {
  console.error("Error creating user:", error);
}
```

**Update a Document by ID**

```typescript
try {
  // Update a user's age
  const response = await storageService.updateById("users", {
    id: "12345",
    body: { age: 29 },
  });
  console.log("Updated User:", response.data);
} catch (error) {
  console.error("Error updating user:", error);
}
```

**Delete a Document by ID**

```typescript
try {
  // Delete a specific user by ID
  const response = await storageService.deleteById("users", { id: "12345" });
  console.log("User deleted:", response.message);
} catch (error) {
  console.error("Error deleting user:", error);
}
```

**Advanced Query with Conditions**

```typescript
try {
  // Fetch users older than 25
  const response = await storageService.getOne("users", {
    options: {
    where: {
      status: "completed",
      priority: { $gt: 1 },
      tags: { $arrCont: "important" },
      categories: { $arrContAny: ["work", "personal"] },
      type: { $in: ["task", "reminder"] },
      archived: { $ne: true },
    },
    sort: [
      ["createdAt", "desc"],
      ["priority", "asc"],
    ],
    startAfter: "cursorValue1",
    limit: 10,
  },,
  });
  console.log("User:", response.data);
} catch (error) {
  console.error("Error fetching user:", error);
}
```

**Bulk Updates**

```typescript
try {
  // Update multiple users' statuses to 'inactive'
  const response = await storageService.updateBulk(
    "users",
    ["12345", "67890"],
    {
      body: { status: "inactive" },
    }
  );
  console.log("Updated Users:", response.data);
} catch (error) {
  console.error("Error updating users:", error);
}
```

**Bulk Deletions**

```typescript
try {
  // Delete multiple users by their IDs
  const response = await storageService.deleteBulk(
    "users",
    ["12345", "67890"],
    {}
  );
  console.log("Users deleted:", response.message);
} catch (error) {
  console.error("Error deleting users:", error);
}
```

## Notes

- Always ensure proper error handling when using asynchronous methods to interact with Firestore.
- Customize the query options (e.g., where, limit) as per Firestore querying documentation to fine-tune results.
- This storageService provides a scalable abstraction for various CRUD operations in Firestore, making it reusable across different modules of your application.
