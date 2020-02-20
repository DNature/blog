export interface ResolverMap {
  [key: string]: {
    [key: string]: (parent: any, args: any, context: {}, info: any) => any;
  };
}

export interface Errors {
  path: string;
  message: string;
}
