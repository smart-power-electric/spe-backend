import { Context } from "src/commons/app-context/context.entity";

export class GetProjectQuery {
    constructor(public readonly ctx: Context, public readonly id: number) {}
  }