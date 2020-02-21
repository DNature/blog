import { GraphQLMiddlewareFunc, Resolver } from '../types/graphqlUtils';

export const createMiddleware = (
    middlewareFunc: GraphQLMiddlewareFunc,
    resolverFunc: Resolver
) => (parent: any, args: any, context: any, info: any): any => middlewareFunc(resolverFunc, parent, args, context, info)