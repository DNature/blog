import { Redis } from "ioredis";

export interface Session extends Express.Session {
  userId?: string;
}

export interface Context {
  redis: Redis;
  session: Session;
  req: Express.Request;
  res: Express.Response;
}

export type Resolver = (
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;

export type GraphQLMiddlewareFunc = (
  resolver: Resolver,
  parent: any,
  args: any,
  context: Context,
  info: any
) => any;

export interface ResolverMap {
  [key: string]: {
    [key: string]: Resolver;
  };
}

export interface Errors {
  path: string;
  message: string;
}
export interface ErrorsMap {
  errors?: Errors[];
  sessionId?: string;
}

export interface UserMap {
  id?: string;
  email?: string;
  fullName?: string;
}