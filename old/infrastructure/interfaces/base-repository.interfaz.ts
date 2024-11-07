import { Context } from "src/commons/app-context/context.entity";
import { Pagination } from "../dtos/pagination.dto";

export interface IBaseRespository<T, Z> {
    create(ctx: Context, data: T): Promise<Z | null>;
    update(ctx: Context, id: number, data: T): Promise<Z | null>;
    delete(ctx: Context, id: number): Promise<Z | null>;
    getById(ctx: Context, id: number): Promise<Z | null>;
    getAll(ctx: Context, filter:Partial<T>, offset: number, limit: number): Promise<Pagination<Z>>;
}