import { PipeTransform, Injectable } from '@nestjs/common';
import { InvalidFormatException } from 'src/common/core/exception';

@Injectable()
export class CustomValidateEnumPipe<T extends object> implements PipeTransform {
  constructor(private readonly enumType: T) {}

  transform(value: any): T[keyof T] {
    if (!Object.values(this.enumType).includes(value)) {
      throw new InvalidFormatException(
        null,
        `Invalid value: ${value}. Allowed values are: ${Object.values(this.enumType).join(', ')}`,
      );
    }
    return value as T[keyof T];
  }
}
