import { PipeTransform, Injectable } from '@nestjs/common';
import { InvalidFormatException } from 'src/common/core/exception';

@Injectable()
export class CustomValidateEnumPipe<T extends object> implements PipeTransform {
  constructor(private readonly enumType: T, private readonly optional:boolean=true) {}

  transform(value: any): T[keyof T] {
    if (!Object.values(this.enumType).includes(value) && !this.optional) {
      throw new InvalidFormatException(
        null,
        `Invalid value: ${value}. Allowed values are: ${Object.values(this.enumType).join(', ')}`,
      );
    }
    return value as T[keyof T];
  }
}
