import { plainToInstance } from 'class-transformer';

type Type<T> = new (...params: unknown[]) => T;

export function responseAs<T>(type: Type<T>) {
  return async (pValue: T | T[] | Promise<T> | Promise<T[]>) => {
    return pValue instanceof Promise
      ? pValue.then((value) => plainToInstance(type, value))
      : plainToInstance(type, pValue);
  };
}
