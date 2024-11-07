import { z } from 'zod';

export const createWorkerSchema = z.object({
  name: z.string().nullable().describe('Name of worker'),
  speciality: z.string().nullable().describe('Speciality of worker'),
  contact: z.string().nullable().describe('Contact of worker'),
  address: z.string().nullable().describe('Address of worker'),
  phone: z.string().nullable().describe('Phone of worker'),
  socialSecurity: z.string().nullable().describe('Social security of worker'),
  startDate: z.coerce.date().nullable().describe('Start date of worker'),
  endDate: z.coerce.date().nullable().describe('End date of worker'),
});

export const UpdateWorkerSchema = z.object({
  name: z.string().nullable().describe('Name of worker'),
  speciality: z.string().nullable().describe('Speciality of worker'),
  contact: z.string().nullable().describe('Contact of worker'),
  address: z.string().nullable().describe('Address of worker'),
  phone: z.string().nullable().describe('Phone of worker'),
  socialSecurity: z.string().nullable().describe('Social security of worker'),
  startDate: z.coerce.date().nullable().describe('Start date of worker'),
  endDate: z.coerce.date().nullable().describe('End date of worker'),
});
