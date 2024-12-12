import { CollectionReference, limit, Query, query } from "firebase/firestore";
import { Task } from "./task";

export const validateQuery = (query: object) => {
    if (!query || typeof query !== 'object') {
      throw new Error('Invalid query object.');
    }
  };
  


export const queryValidator = (task: Task, colRef:CollectionReference) => {
  let q: Query = query(colRef);

  if (task.options?.where) {
   
  }

  if (task.options?.limit) {
    q = query(q, limit(task.options.limit));
  }

  return q;
} 