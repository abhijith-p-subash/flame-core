# Task Interface Documentation

## Overview
This documentation provides details about the `Task`, `TaskOptions`, `TaskResponse`, and related interfaces used for defining and handling tasks in a TypeScript environment. It also includes the `TaskResponseError` class for managing errors associated with task responses.

---

## Interfaces

### `WhereCondition`
Defines conditions for filtering data.

```typescript
type WhereCondition = {
  [key: string]:
    | string
    | number
    | boolean
    | {
        $lt?: any;
        $lte?: any;
        $gt?: any;
        $gte?: any;
        $ne?: any;
        $in?: any[];
        $notIn?: any[];
        $arrCont?: any;
        $arrContAny?: any[];
      };
};
```

### `TaskOptions`
Defines options to pass to a task.

#### Properties

- `search?` (*string*): String to search for in data.
- `where?` (*WhereCondition*): Conditions to filter data with.
- `populate?` (*[[string, string], [string, string]?, [string, string]?]*): [['collection_name', 'reference_id']] Fields to populate in data (limited to a maximum of 3 entries).
- `sort?` (*Array<[string, "asc" | "desc"]>*): Sort order for data.
- `offset?` (*number*): Number of records to skip.
- `limit?` (*number*): Number of records to return. Defaults to 10 if undefined and 1000 if set to -1.
- `startAfter?` (*any[]*): Cursor for use in pagination (`startAfter` in Firestore).
- `startAt?` (*any[]*): Cursor for use in pagination (`startAt` in Firestore).

```typescript
export interface TaskOptions {
  search?: string;
  where?: WhereCondition;
  populate?: string | any[];
  sort?: [string, "asc" | "desc"][];
  offset?: number;
  limit?: number;
  startAfter?: any[];
  startAt?: any[];
}
```

### `TaskResponse`
Defines the structure of a response from a task.

#### Properties

- `error?` (*any*): Error if the task failed.
- `data?` (*any*): Data returned from the task.
- `message?` (*string*): Message returned from the task.
- `offset?` (*number*): Number of records skipped.
- `limit?` (*number*): Number of records returned.
- `count?` (*number*): Total number of records in the database.

```typescript
export interface TaskResponse {
  error?: any;
  data?: any;
  message?: string;
  offset?: number;
  limit?: number;
  count?: number;
}
```

### `Task`
Defines the structure of a task.

#### Properties

- `id?` (*number | string*): Unique identifier for the task.
- `uid?` (*string*): User who created the task.
- `owner?` (*any*): Owner of the task.
- `action?` (*string*): Action to perform for the task.
- `payload?` (*{ [key: string]: any }*): Payload for the task.
- `body?` (*{ [key: string]: any }*): Same as payload.
- `options?` (*TaskOptions*): Options for the task.
- `response?` (*TaskResponse*): Response from the task.
- `status?` (*"Pending" | "Completed" | "Errored"*): Status of the task.

```typescript
export interface Task {
  id?: number | string;
  uid?: string;
  owner?: any;
  action?: string;
  payload?: { [key: string]: any };
  body?: { [key: string]: any };
  options?: TaskOptions;
  response?: TaskResponse;
  status?: "Pending" | "Completed" | "Errored";
}
```

---

## Classes

### `TaskResponseError`
A class for wrapping a task response in an error.

#### Properties

- `taskResponse` (*TaskResponse*): Task response that caused the error.

#### Constructor

- `constructor(taskResponse: TaskResponse)`: Initializes a new instance of `TaskResponseError`.

#### Example

```typescript
const response: TaskResponse = {
  error: true,
  message: "An error occurred",
};

throw new TaskResponseError(response);
```

```typescript
export class TaskResponseError extends Error {
  taskResponse: TaskResponse;

  constructor(taskResponse: TaskResponse) {
    super(taskResponse.message);
    this.taskResponse = taskResponse;
    this.name = this.constructor.name;
  }
}
