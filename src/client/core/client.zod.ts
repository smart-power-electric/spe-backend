import { z } from 'zod';

export const createClientSchema = z.object({
  name: z.string().describe('Name of client'),
  email: z.string().email().describe('Email of client'),
  phone: z
    .string()
    .max(255)
    .nullable()
    .refine(
      (phone) => {
        if (!phone) return true;
        const phoneRegex = /^\+?\d{10,15}$/;
        return phoneRegex.test(phone);
      },
      {
        message: 'Invalid phone number format',
      },
    )
    .describe('Phone number'),
  tin: z.string().nullable().describe('TIN of client'),
  address: z
    .string()
    .optional()
    .transform((x) => {
      return x ?? null;
    })
    .describe('Address of client'),
  city: z
    .string()
    .optional()
    .transform((x) => {
      return x ?? null;
    })
    .describe('City of client'),
  state: z
    .string()
    .optional()
    .transform((x) => {
      return x ?? null;
    })
    .describe('State of client'),
  zip: z
    .string()
    .optional()
    .transform((x) => {
      return x ?? null;
    })
    .describe('Zip code of client'),
  contact: z
    .string()
    .optional()
    .transform((x) => {
      return x ?? null;
    })
    .describe('Contact of the client'),
});

export const UpdateClientSchema = z.object({
  name: z.string().optional().nullable().describe('Name of client'),
  email: z.string().email().optional().nullable().describe('Email of client'),
  phone: z
    .string()
    .max(255)
    .optional()
    .nullable()
    .refine(
      (phone) => {
        if (!phone) return true;
        const phoneRegex = /^\+?\d{10,15}$/;
        return phoneRegex.test(phone);
      },
      {
        message: 'Invalid phone number format',
      },
    )
    .describe('Phone number'),
  address: z.string().optional().nullable().describe('Address of client'),
  tin: z.string().optional().nullable().describe('TIN of client'),
  city: z.string().optional().nullable().describe('City of client'),
  state: z.string().optional().nullable().describe('State of client'),
  zip: z.string().optional().nullable().describe('Zip code of client'),
  contact: z.string().optional().nullable().describe('Contact of the client'),
});
