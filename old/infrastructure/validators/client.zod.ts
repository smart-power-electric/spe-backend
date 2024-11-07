import { z } from 'zod';

export const createClientSchema = z.object({
  name: z.string().describe('Name of client'),
  email: z.string().email().describe('Email of client'),
  phone: z
    .string()
    .max(255)
    .optional()
    .refine(
      (phone) => {
        if (!phone) return true;
        const phoneRegex = /^\+?[0-9]{10,15}$/;
        return phoneRegex.test(phone);
      },
      {
        message: 'Invalid phone number format',
      },
    )
    .transform((phone) => {
      if (phone?.startsWith('+1')) {
        return phone
          .replace('+1', '')
          .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
      }
      return phone;
    })
    .describe('Phone number'),
  address: z.string().optional().describe('Address of client'),
  city: z.string().optional().describe('City of client'),
  state: z.string().optional().describe('State of client'),
  zip: z.string().optional().describe('Zip code of client'),
});

export const updateClientSchema = z.object({
    name: z.string().optional().describe('Name of client'),
    email: z.string().email().optional().describe('Email of client'),
    phone: z
      .string()
      .max(255)
      .optional()
      .refine(
        (phone) => {
          if (!phone) return true;
          const phoneRegex = /^\+?[0-9]{10,15}$/;
          return phoneRegex.test(phone);
        },
        {
          message: 'Invalid phone number format',
        },
      )
      .transform((phone) => {
        if (phone?.startsWith('+1')) {
          return phone
            .replace('+1', '')
            .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        }
        return phone;
      })
      .describe('Phone number'),
    address: z.string().optional().describe('Address of client'),
    city: z.string().optional().describe('City of client'),
    state: z.string().optional().describe('State of client'),
    zip: z.string().optional().describe('Zip code of client'),
});
