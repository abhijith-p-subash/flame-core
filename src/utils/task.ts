/**
 * Interface for a condition to filter data with.
 *
 * @export
 * @interface WhereCondition
 */
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

/**
 * Interface for options to pass to a task.
 *
 * @export
 * @interface TaskOptions
 */
export interface TaskOptions {
  /**
   * String to search for in data.
   *
   * @type {string}
   * @memberof TaskOptions
   */
  search?: string;

  /**
   * Conditions to filter data with.
   *
   * @type {WhereCondition}
   * @memberof TaskOptions
   */
  where?: WhereCondition;

  /**
   * Fields to populate in data.
   *
   * @type {(string | any[])}
   * @memberof TaskOptions
   */
  populate?: string | any[];

  /**
   * Sort order for data.
   *
   * @type {Array<[string, "asc" | "desc"]>}
   * @memberof TaskOptions
   */
  sort?: [string, "asc" | "desc"][];

  /**
   * Number of records to skip.
   *
   * @type {number}
   * @memberof TaskOptions
   */
  offset?: number;

  /**
   * Number of records to return.
   *
   * @type {number}
   * @memberof TaskOptions
   */
  limit?: number;


  /**
   * A cursor for use in pagination.
   * This is a value that can be used as the `startAfter` option in a Firestore query.
   *
   * @type {any[]}
   * @memberof TaskOptions
   */
  startAfter?: any[];

  /**
   * A cursor for use in pagination.
   * This is a value that can be used as the `startAt` option in a Firestore query.
   *
   * @type {any[]}
   * @memberof TaskOptions
   */
  startAt?: any[];
}

/**
 * Interface for a task response.
 *
 * @export
 * @interface TaskResponse
 */
export interface TaskResponse {
  /**
   * Error if the task failed.
   *
   * @type {*}
   * @memberof TaskResponse
   */
  error?: any;

  /**
   * Data returned from the task.
   *
   * @type {*}
   * @memberof TaskResponse
   */
  data?: any;

  /**
   * Message returned from the task.
   *
   * @type {string}
   * @memberof TaskResponse
   */
  message?: string;

  /**
   * Number of records skipped.
   *
   * @type {number}
   * @memberof TaskResponse
   */
  offset?: number;

  /**
   * Number of records returned.
   *
   * @type {number}
   * @memberof TaskResponse
   */
  limit?: number;

  /**
   * Number of records in the database.
   *
   * @type {number}
   * @memberof TaskResponse
   */
  count?: number;
}

/**
 * Interface for a task.
 *
 * @export
 * @interface Task
 */
export interface Task {
  /**
   * Unique identifier for the task.
   *
   * @type {number | string}
   * @memberof Task
   */
  id?: number | string;

  /**
   * User that created the task.
   *
   * @type {string}
   * @memberof Task
   */
  uid?: string;

  /**
   * Owner of the task.
   *
   * @type {*}
   * @memberof Task
   */
  owner?: any;

  /**
   * Action to perform for the task.
   *
   * @type {string}
   * @memberof Task
   */
  action?: string;

  /**
   * Payload for the task.
   *
   * @type {{ [key: string]: any }}
   * @memberof Task
   */
  payload?: { [key: string]: any };

  /**
   * Body of the task. Same as payload.
   *
   * @type {{ [key: string]: any }}
   * @memberof Task
   */
  body?: { [key: string]: any };

  /**
   * Options for the task.
   *
   * @type {TaskOptions}
   * @memberof Task
   */
  options?: TaskOptions;

  /**
   * Response from the task.
   *
   * @type {TaskResponse}
   * @memberof Task
   */
  response?: TaskResponse;

  /**
   * Status of the task.
   *
   * @type {"Pending" | "Completed" | "Errored"}
   * @memberof Task
   */
  status?: "Pending" | "Completed" | "Errored";
}

/**
 * Class for wrapping a task response in an error.
 *
 * @export
 * @class TaskResponseError
 * @extends {Error}
 */
export class TaskResponseError extends Error {
  /**
   * Task response that caused the error.
   *
   * @type {TaskResponse}
   * @memberof TaskResponseError
   */
  taskResponse: TaskResponse;

  /**
   * Creates an instance of TaskResponseError.
   *
   * @param {TaskResponse} taskResponse
   * @memberof TaskResponseError
   */
  constructor(taskResponse: TaskResponse) {
    super(taskResponse.message);
    this.taskResponse = taskResponse;
    this.name = this.constructor.name;
  }
}

