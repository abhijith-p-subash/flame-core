import {
  CollectionReference,
  limit,
  orderBy,
  Query,
  query,
  where,
} from "firebase/firestore";
import { Task } from "./task";

export const validateQuery = (query: object) => {
  if (!query || typeof query !== "object") {
    throw new Error("Invalid query object.");
  }
};

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
          q = query(
            q,
            where(field, "array-contains-any", condition.$arrContAny)
          );
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

  if (task.options?.limit) {
    q = query(q, limit(task.options.limit));
  }
  return q;
};
