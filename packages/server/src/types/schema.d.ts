// tslint:disable
// graphql typescript definitions

declare namespace GQL {
interface IGraphQLResponseRoot {
data?: IQuery | IMutation;
errors?: Array<IGraphQLResponseError>;
}

interface IGraphQLResponseError {
/** Required for all errors */
message: string;
locations?: Array<IGraphQLResponseErrorLocation>;
/** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
[propName: string]: any;
}

interface IGraphQLResponseErrorLocation {
line: number;
column: number;
}

interface IQuery {
__typename: "Query";
me: IUser;
hello: string;
}

interface IHelloOnQueryArguments {
name?: string | null;
}

interface IUser {
__typename: "User";
id: string;
email: string;
fullName: string;
}

interface IMutation {
__typename: "Mutation";
createArticle: boolean;
login: ILoginResponse | null;
register: Array<IError> | null;
}

interface ICreateArticleOnMutationArguments {
input?: IArticle | null;
}

interface ILoginOnMutationArguments {
email: string;
password: string;
}

interface IRegisterOnMutationArguments {
email: string;
password: string;
fullName: string;
}

interface IArticle {
title: string;
body: string;
createdAt: string;
readTime: string;
userId: string;
author: string;
tags: Array<string>;
}

interface ILoginResponse {
__typename: "LoginResponse";
errors: Array<IError> | null;
sessionId: string | null;
}

interface IError {
__typename: "Error";
path: string;
message: string;
}
}

// tslint:enable
