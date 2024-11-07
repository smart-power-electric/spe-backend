import type { Config } from 'drizzle-kit';

export default {
  schema: ['./src/common/infrastructure/schema'],
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: process.env.DATABASE_PORT ? +process.env.DATABASE_PORT : 5432,
    database: process.env.DATABASE_NAME ?? 'test_local',
    ssl: process.env.DATABASE_SSL_MODE === 'required',
  },
  verbose: true,
  strict: true,
  introspect: {
    casing: 'camel',
  },
  breakpoints: true,
  schemaFilter: ['main'],
} satisfies Config;
