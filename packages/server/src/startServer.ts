import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
// import { genSchema } from "./utils/genSchema";
import { resolvers } from "./modules/register/resolvers";
import { importSchema } from "graphql-import";
import * as path from "path";
import { createTypeormConn } from "./utils/createTypeormConn";

export const startServer = async () => {
  const typeDefs = importSchema(
    path.join(__dirname, "./modules/register/schema.graphql")
  );

  const server = new GraphQLServer({ typeDefs, resolvers });

  await createTypeormConn();
  await server.start();
  console.log("Server is running on localhost:4000");
};
