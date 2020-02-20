// import { GraphQLSchema } from "graphql";
// import { readdirSync } from "fs";
// import * as path from "path";
// import { importSchema } from "graphql-import";
// import { makeExecutableSchema, mergeSchemas } from "graphql-tools";

// export const genSchema = (): GraphQLSchema => {
//   const schemas: GraphQLSchema[] = [];

//   const folders = readdirSync(path.join(__dirname, "../modules"));
//   folders.forEach(folder => {
//     const { resolvers } = require(`../modules/${folder}/resolvers`);
//     const typeDefs = importSchema(
//       path.join(__dirname, `../modules/${folder}/schema.graphql`)
//     );
//     schemas.push(makeExecutableSchema({ resolvers, typeDefs }));
//   });
//   return mergeSchemas({ schemas });
// };

import { mergeResolvers, mergeTypes } from "merge-graphql-schemas";
import * as path from "path";
import * as fs from "fs";
import { makeExecutableSchema } from "graphql-tools";
import * as glob from "glob";
import { GraphQLSchema } from "graphql";

export const genSchema = (): GraphQLSchema => {
  const pathModules = path.join(__dirname, "../modules");
  const graphqlTypes = glob
    .sync(`${pathModules}/**/*.graphql`)
    .map(x => fs.readFileSync(x, { encoding: "utf8" }));

  const resolvers = glob
    .sync(`${pathModules}/**/resolvers.?s`)
    .map(resolver => require(resolver).resolvers);

  return makeExecutableSchema({
    typeDefs: mergeTypes(graphqlTypes),
    resolvers: mergeResolvers(resolvers)
  });
};
