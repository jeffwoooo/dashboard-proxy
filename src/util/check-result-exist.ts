import { NotFoundException } from '@nestjs/common';
import { map, OperatorFunction } from 'rxjs';

export function checkResultExist<T, R>(): OperatorFunction<T, T> {
  return map((d) => {
    if (d === undefined) {
      throw new NotFoundException();
    }
    return d;
  });
}
