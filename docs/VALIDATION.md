# Firebase Query Builder

This document explains the implementation and functionality of a Firebase query builder written in TypeScript. The code is designed to dynamically construct Firestore queries based on a `Task` object and a `CollectionReference`.

## Table of Contents

1. [Overview](#overview)
2. [Dependencies](#dependencies)
3. [Functions](#functions)
   - [validateQuery](#validatequery)
   - [queryValidator](#queryvalidator)
4. [Usage](#usage)
5. [Notes and Limitations](#notes-and-limitations)

## Overview

The provided code allows the construction of Firestore queries using an object-based configuration. It supports advanced query features such as filtering, sorting, pagination, and limiting results.

## Dependencies

The following Firestore functions are imported for building queries:

```typescript
import {
  CollectionReference,
  limit,
  orderBy,
  Query,
  query,
  startAfter,
  startAt,
  where,
} from "firebase/firestore";
```

## Functions

### validateQuery

This function validates that the input `query` is an object.

#### Parameters:
- `query: object` - The query object to validate.

#### Throws:
- An error if the `query` is not a valid object.

#### Code:
```typescript
export const validateQuery = (query: object) => {
  if (!query || typeof query !== "object") {
    throw new Error("Invalid query object.");
  }
};
```

### queryValidator

This function builds a Firestore query based on the `Task` object and the provided `CollectionReference`.

#### Parameters:
- `task: Task` - An object containing query options (filters, sorting, pagination).
- `colRef: CollectionReference` - A Firestore collection reference.

#### Returns:
- A Firestore `Query` object constructed based on the specified options.

#### Supported Query Options:
- **Filters (`where`)**:
  - `$lt`, `$lte`, `$gt`, `$gte`: Comparison filters.
  - `$ne`: Not equal filter.
  - `$in`, `$notIn`: Inclusion/exclusion filters.
  - `$arrCont`, `$arrContAny`: Array containment filters.
- **Sorting (`sort`)**:
  - Allows specifying fields and directions (`asc` or `desc`).
- **Pagination**:
  - `startAfter`, `startAt`: Pagination cursors.
- **Limit**:
  - Restrict the number of results using `limit`.

#### Code:
```typescript
export const queryValidator = (task: Task, colRef: CollectionReference) => {
  let q: Query = query(colRef);

  if (task.options?.where) {
    for (const [field, condition] of Object.entries(task.options.where)) {
      if (typeof condition === "object" && condition !== null) {
        if (condition.$lt !== undefined)
          q = query(q, where(field, "<", condition.$lt));
        if (condition.$lte !== undefined)
          q = query(q, where(field, "<=", condition.$lte));
        if (condition.$gt !== undefined)
          q = query(q, where(field, ">", condition.$gt));
        if (condition.$gte !== undefined)
          q = query(q, where(field, ">=", condition.$gte));
        if (condition.$ne !== undefined)
          q = query(q, where(field, "!=", condition.$ne));
        if (condition.$in !== undefined)
          q = query(q, where(field, "in", condition.$in));
        if (condition.$notIn !== undefined)
          q = query(q, where(field, "not-in", condition.$notIn));
        if (condition.$arrCont !== undefined)
          q = query(q, where(field, "array-contains", condition.$arrCont));
        if (condition.$arrContAny !== undefined)
          q = query(q, where(field, "array-contains-any", condition.$arrContAny));
      } else {
        q = query(q, where(field, "==", condition));
      }
    }
  }

  if (task.options?.sort) {
    for (const [field, direction] of task.options.sort) {
      q = query(q, orderBy(field, direction));
    }
  }

  if (task.options?.startAfter) {
    q = query(q, startAfter(task.options.startAfter));
  }

  if (task.options?.startAt) {
    q = query(q, startAt(task.options.startAt));
  }

  if (task.options?.limit) {
    q = query(q, limit(task.options.limit));
  }

  return q;
};
```

## Usage

1. Define a `Task` object with query options:

```typescript
const task = {
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
    startAt: "cursorValue2",
    limit: 10,
  },
};
```

2. Pass the `Task` object and a Firestore `CollectionReference` to the `queryValidator` function:

```typescript
const colRef = firestore.collection("tasks");
const firestoreQuery = queryValidator(task, colRef);
```

3. Execute the query:

```typescript
const querySnapshot = await firestoreQuery.get();
querySnapshot.forEach(doc => {
  console.log(doc.id, "=>", doc.data());
});
```

## Notes and Limitations

- Ensure that the Firestore collection has indexed fields for filters and sorting to avoid errors.
- The `$ne` operator is supported only in specific Firestore versions.
- Multiple `orderBy` clauses must align with the filters for proper index configuration.

This implementation is ideal for scenarios requiring dynamic query building with flexible conditions.
