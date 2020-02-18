// @flow
import { GraphQLSchema } from "graphql";
import { readdirSync } from "fs";
import * as path from "path";
import { importSchema } from "graphql-import";
import { makeExecutableSchema, mergeSchemas } from "graphql-tools";

export const genSchema = (): GraphQLSchema => {
  const schemas: GraphQLSchema[] = [];

  const folders = readdirSync(path.join(__dirname, "../modules"));
  folders.forEach(folder => {
    const { resolvers } = require(`../modules/${folder}/resolvers`);
    const typeDefs = importSchema(
      path.join(__dirname, `../modules/${folder}/schema.graphql`)
    );
    schemas.push(makeExecutableSchema({ resolvers, typeDefs }));
  });
  return mergeSchemas({ schemas });
};
