import { user } from './../../common/infrastructure/schema/schema';
import { Inject, Injectable } from '@nestjs/common';
import { Context } from 'src/common/core/context.entity';
import { ILogger } from 'src/common/core/logger.interface';
import { DrizzleDb } from 'src/common/infrastructure/database/drizzleDb';

import { role, userRole } from 'src/common/infrastructure/schema/schema';

import { and, count, eq, isNull } from 'drizzle-orm';
import { RoleRepository } from '../core/role.interface';
import { Role } from '../core/role.entity';
import { RoleToRoleNew, RoleToRow, RowToRole } from './role.mapper';

export type RoleRow = typeof role.$inferSelect;
export type RoleNew = typeof role.$inferInsert;

@Injectable()
export class DrizzleRoleRepository implements RoleRepository {
  constructor(
    private readonly db: DrizzleDb,
    @Inject(ILogger) private readonly logger: ILogger,
  ) {
    this.logger.init(DrizzleRoleRepository.name, 'info');
  }

  async insert(ctx: Context, row: Role) {
    this.logger.info(
      ctx,
      DrizzleRoleRepository.name,
      'insert',
      'Inserting client',
    );
    const newRow: RoleNew = RoleToRoleNew(row);
    const result = await this.db
      .getDb()
      .insert(role)
      .values(newRow)
      .returning()
      .execute();
    return result.map(RowToRole).at(0) ?? null;
  }

  async getAll(ctx: Context, limit: number, offset: number) {
    this.logger.info(
      ctx,
      DrizzleRoleRepository.name,
      'getAll',
      'Getting all clients',
    );

    const result = await this.db
      .getDb()
      .select()
      .from(role)
      .limit(limit)
      .offset(offset)
      .execute();
    const total = await this.db
      .getDb()
      .select({ count: count() })
      .from(role)
      .limit(1)
      .execute();
    return { data: result.map(RowToRole), total: total[0].count };
  }

  async getById(ctx: Context, id: string) {
    this.logger.info(
      ctx,
      DrizzleRoleRepository.name,
      'getById',
      'Getting client by id',
    );
    const result = await this.db
      .getDb()
      .select()
      .from(role)
      .where(eq(role.id, id))
      .execute();
    return result.map(RowToRole).at(0) ?? null;
  }
  async getByRolename(ctx: Context, roleName: string): Promise<Role | null> {
    this.logger.info(
      ctx,
      DrizzleRoleRepository.name,
      'getByEmail',
      'Getting client by email',
    );
    const result = await this.db
      .getDb()
      .select()
      .from(role)
      .where(eq(role.roleName, roleName))
      .execute();
    return result.map(RowToRole).at(0) ?? null;
  }
  async getByRole(ctx: Context, roleParam: string): Promise<Role | null> {
    this.logger.info(
      ctx,
      DrizzleRoleRepository.name,
      'getByEmail',
      'Getting client by email',
    );
    const result = await this.db
      .getDb()
      .select()
      .from(role)
      .where(eq(role.role, roleParam))
      .execute();
    return result.map(RowToRole).at(0) ?? null;
  }
  async update(ctx: Context, id: string, row: Role) {
    this.logger.info(
      ctx,
      DrizzleRoleRepository.name,
      'update',
      'Updating client',
    );
    const newRow = RoleToRow(row);
    const result = await this.db
      .getDb()
      .update(role)
      .set(newRow)
      .where(eq(role.id, id))
      .returning()
      .execute();
    return result.map(RowToRole).at(0) ?? null;
  }

  async delete(ctx: Context, id: string) {
    this.logger.info(
      ctx,
      DrizzleRoleRepository.name,
      'delete',
      'Deleting client',
    );
    const result = await this.db
      .getDb()
      .delete(role)
      .where(eq(role.id, id))
      .returning()
      .execute();
    return result.map(RowToRole).at(0) ?? null;
  }
  async insertRoleToUser(
    ctx: Context,
    userId: string,
    roleId: string,
  ): Promise<Role | null> {
    this.logger.info(
      ctx,
      DrizzleRoleRepository.name,
      'insertRoleToUser',
      'Inserting role to user',
    );
    await this.db
      .getDb()
      .insert(userRole)
      .values({
        userId,
        roleId,
      })
      .returning()
      .execute();

    return this.getById(ctx, roleId);
  }
  async getRolesByUserId(ctx: Context, userId: string): Promise<Role[]> {
    this.logger.info(
      ctx,
      DrizzleRoleRepository.name,
      'getRolesByUserId',
      'Getting roles by user id',
    );

    const result = await this.db
      .getDb()
      .selectDistinct({ role })
      .from(role)
      .innerJoin(userRole, eq(role.id, userRole.roleId))
      .innerJoin(user, eq(user.id, userRole.userId))
      .where(
        and(
          ...[
            eq(userRole.userId, userId),
            isNull(role.deletedAt),
            isNull(user.deletedAt),
            isNull(userRole.deletedAt),
          ],
        ),
      )
      .execute();
    return result.map((x) => RowToRole(x.role));
  }
  async getRolesByUserEmail(ctx: Context, email: string): Promise<Role[]> {
    this.logger.info(
      ctx,
      DrizzleRoleRepository.name,
      'getRolesByUserEmail',
      'Getting roles by user email',
    );

    const result = await this.db
      .getDb()
      .selectDistinct({ role })
      .from(role)
      .innerJoin(userRole, eq(role.id, userRole.roleId))
      .innerJoin(user, eq(user.id, userRole.userId))
      .where(
        and(
          ...[
            eq(user.username, email),
            isNull(role.deletedAt),
            isNull(user.deletedAt),
            isNull(userRole.deletedAt),
          ],
        ),
      )
      .execute();
    return result.map((x) => RowToRole(x.role));
  }
}
