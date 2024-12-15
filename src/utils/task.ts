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

export interface TaskOptions {
  search?: string;
  where?: WhereCondition;
  select?: string[];
  attributes?: any;
  populate?: string | any[];
  include?: any[];
  sort?: [string, "asc" | "desc"][];
  group?: any;
  fields?: string[];
  distinct?: boolean;
  having?: any;
  offset?: number;
  limit?: number;
}
export interface TaskResponse {
  error?: any;
  data?: any;
  message?: string;
  offset?: number;
  limit?: number;
  count?: number;
}

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


 export class TaskResponseError extends Error {
  taskResponse: TaskResponse;
  constructor(taskResponse: TaskResponse) {
    super(taskResponse.message);
    this.taskResponse = taskResponse;
    this.name = this.constructor.name;
  }
}