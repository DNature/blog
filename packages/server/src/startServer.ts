import "reflect-metadata";
import { GraphQLServer } from "graphql-yoga";
import { createTypeormConn } from "./utils/createTypeormConn";
import { genSchema } from "./utils/genSchema";
import { Server } from "typeorm";
import { createTestConn } from "./testUtils/createTestConn";

export const startServer = async (): Promise<Server | any> => {
  const server = new GraphQLServer({
    schema: genSchema()
  });

  if (process.env.NODE_ENV === "test") {
    await createTestConn();
  } else {
    await createTypeormConn();
  }
  const app = await server.start();
  console.log("Server is running on localhost:4000");
  return app;
};
