import { Context } from "src/commons/app-context/context.entity";

export class GetServiceQuery {
    constructor(public readonly ctx: Context, public readonly id: number) {}
  }