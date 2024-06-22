import { useReducer } from 'react';

export const useObjReducer = <T>(obj: T) =>
  useReducer((oldObj: T, newObj: Partial<T>) => ({ ...oldObj, ...newObj }), obj);
