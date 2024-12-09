/* eslint-disable no-console */
import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Client, Pool, PoolConfig, QueryResult } from 'pg';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { ConnectionOptions } from 'tls';
import { ILogger } from 'src/common/core/logger.interface';
import { DatabaseConfig } from 'src/common/core/configuration.entity';

@Injectable()
export class Database implements OnModuleInit, OnModuleDestroy {
  private conn: Pool | Client | null = null; //PostgreSQL client instance.
  private isConnected: boolean = false; //Flag indicating whether the client is connected.

  constructor(
    private readonly configService: ConfigService,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init('Database', 'info');
  }

  async onModuleInit() {
    await this.connectToDB();
    this.logger.info(null, 'Database initialized');
  }
  /**
   * Establishes a connection to the PostgreSQL database.
   * This makes sure that connection is established only once
   * @returns {Promise<Client>} A Promise resolving to the PostgreSQL Client instance.
   * @throws {Error} Throws an error if the connection fails.
   */

  private async connectToDB(): Promise<Pool | Client> {
    const enabledSSL =
      this.configService.get<DatabaseConfig>('database')?.sslmode == 'required';
    let sslConfig: boolean | ConnectionOptions = false;
    if (enabledSSL) {
      sslConfig = {
        rejectUnauthorized: false,
        cert: fs.readFileSync('database-ca-certificate.crt').toString(),
      };
    }
    if (!this.conn || !this.isConnected) {
      const connectionObject: PoolConfig = {
        user:
          this.configService.get<DatabaseConfig>('database')?.user ?? 'admin',
        host:
          this.configService.get<DatabaseConfig>('database')?.host ??
          'postgres',
        database:
          this.configService.get<DatabaseConfig>('database')?.database ??
          'app_honest_game',
        password:
          this.configService.get<DatabaseConfig>('database')?.password ??
          '1234',
        port: this.configService.get<DatabaseConfig>('database')?.port ?? 5432,
        ssl: sslConfig,
      };
      if (this.configService.get<string>('environment') === 'test') {
        this.conn = new Client(connectionObject);
      } else {
        this.conn = new Pool(connectionObject);
      }
      try {
        await this.conn.connect();
        this.isConnected = true;
        console.log('Connected to PostgreSQL');
      } catch (error) {
        console.error('Error connecting to PostgreSQL:', error);
        throw error;
      }
    }
    return this.conn;
  }

  /**
   * Executes a SQL query against the connected PostgreSQL database.
   * @param {string} query - The SQL query to execute.
   * @returns {Promise<QueryResult[]>} A Promise resolving to an array of QueryResult objects.
   * @throws {Error} Throws an error if query execution fails.
   */
  async executeQuery(query: string): Promise<QueryResult[]> {
    if (!this.conn || !this.isConnected) {
      await this.connectToDB();
    }
    try {
      const result: QueryResult = await this.conn!.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  async getTotalCount(countQuery: string): Promise<number> {
    const queryResult = await this.executeQuery(countQuery);
    if (queryResult && queryResult.length > 0) {
      // Assuming the total count is in the first element of the result array
      const totalCount: number | null = queryResult[0].rowCount; // Replace 'count' with the actual property containing the total count

      return totalCount ?? 0;
    }
    // Return a default value or handle the case where the query result is empty
    return 0;
  }
  async getClient(): Promise<Pool | Client> {
    if (!this.conn || !this.isConnected) {
      await this.connectToDB();
    }
    return this.conn!;
  }
  async closeConnection(): Promise<void> {
    if (this.conn) {
      await this.conn.end();
      this.isConnected = false;
    }
  }
  async onModuleDestroy() {
    if (this.conn instanceof Pool) {
      await this.conn.end();
      this.isConnected = false;
    }
    if (this.conn instanceof Client) {
      await this.conn.end();
      this.isConnected = false;
    }
  }
}
