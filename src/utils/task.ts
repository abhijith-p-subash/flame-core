export interface TaskOptions {
    search?: string;
    where?: any;
    select?: string[];
    attributes?: any;
    populate?: string | any[];
    include?: any[];
    sort?: any;
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
  
