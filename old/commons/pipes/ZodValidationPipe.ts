import { PipeTransform } from '@nestjs/common';
import { ZodError, ZodSchema, z } from 'zod';
import { PlatformError } from '../http-exception/Error.entity';

export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (err) {
      if (err instanceof ZodError) {
        const errMessage = err.errors.map(err => `request.${err.path}: ${err.message}`).join(', ');
        throw PlatformError.BadRequest(errMessage);
      }
      throw err; // Let http-exception filter handle that...
    }
  }
}

export const stringToNumberSchema = z.string().transform((value, context) => {
  const parsed = parseInt(value);
  if (isNaN(parsed)) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Not numeric string or number',
    });

    return z.NEVER;
  }
  return parsed;
});
export const optionalStringToNumberSchema = stringToNumberSchema.optional();
export const optionalStringToNumberSchemaNullable = z
  .preprocess(
    input => {
      if (input === undefined || input === null) {
        return null;
      }

      if (typeof input === 'string') {
        const parsedNumber = Number(input);
        if (!isNaN(parsedNumber)) {
          return parsedNumber;
        }
      }

      return input;
    },
    z.union([z.number(), z.null()]),
  )
  .optional()
  .nullable();

export const stringToDateSchema = z.string().transform((value, context) => {
  const parsed = new Date(value);
  if (isNaN(parsed.getTime())) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Not a valid date string',
    });

    return z.NEVER;
  }
  return parsed;
});

export const sortOrderList = ['asc', 'desc'] as const;
export const sortOrderEnumSchema = z.enum(sortOrderList);
export type SortOrderEnum = z.infer<typeof sortOrderEnumSchema>;
export const sortOrderDictionary = Object.fromEntries(sortOrderList.map(key => [key, key])) as {
  [K in SortOrderEnum]: K;
};

export const stringSchema = z.string();
export const optionalStringSchema = stringSchema.optional();
export const optionalNullableStringSchema = optionalStringSchema.nullable().default(null);

export const optionalStringToBooleanSchema = optionalStringSchema.transform(value => {
  if (value === 'true') {
    return true;
  }

  return false;
});
