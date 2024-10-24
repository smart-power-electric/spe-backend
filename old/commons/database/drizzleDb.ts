import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Database } from './dbConnect';
import { ILogger } from '../logging/logger.interface';
import { Client, Pool } from 'pg';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import * as schemaDB from 'src/core/schema/schema';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { DrizzleLogger } from 'src/commons/logging/drizzle.logger.service';
import {} from 'drizzle-orm/logger';

type schema = typeof schemaDB;

@Injectable()
export class DrizzleDb implements OnModuleInit {
  private pgClient!: Client | Pool;
  db!: NodePgDatabase<schema>;
  constructor(
    private readonly dbPg: Database,
    @Inject(ILogger) private readonly logger: ILogger,
    private readonly d_logger: DrizzleLogger,
  ) {
    this.logger.init('DrizzleDb', 'info');
    this.logger.info(null, 'DrizzleDb initialized');
  }

  async onModuleInit() {
    try {
      this.pgClient = await this.dbPg.getClient();
      this.logger.info(null, 'Database connected');
    } catch (e) {
      this.logger.error(null, 'Database connection failed');
      this.logger.error(null, e);
      throw e;
    }
    await this.initDrizzle(this.pgClient);
  }

  async initDrizzle(pgClinet: Client | Pool) {
    this.pgClient = pgClinet;
    this.db = drizzle(this.pgClient, { schema: schemaDB, logger: this.d_logger });

    if (process.env.AUTOMIGRATE?.toUpperCase() == 'ON') {
      this.logger.info(null, 'Automigrating database');
      try {
        await migrate(this.db, { migrationsFolder: './drizzle-migrations' });
      } catch (e) {
        this.logger.error(null, 'Database migration failed');
        this.logger.error(null, (e as any).message);
        this.logger.error(null, e);
        process.exit(1);
      }
      this.logger.info(null, 'Database migration successful');
    }
  }

  getDb() {
    if (!this.db) {
      throw new Error('DrizzleDb not initialized');
    }

    return this.db;
  }
}
