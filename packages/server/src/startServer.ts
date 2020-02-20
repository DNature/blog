import "reflect-metadata";
const RateLimitRedisStore = require("rate-limit-redis");

import { GraphQLServer } from "graphql-yoga";
import * as connectRedis from "connect-redis";
import * as session from "express-session";
import * as RateLimit from "express-rate-limit";

import { redis } from "./utils/redis";
import { createTypeormConn } from "./utils/createTypeormConn";
import { genSchema } from "./utils/genSchema";
import { Server } from "typeorm";
import { createTestConn } from "./testUtils/createTestConn";
import { Context, ContextCallback } from "graphql-yoga/dist/types";
import {
  redisSessionPrefix,
  productionEnv,
  testEnv,
  frontEndHost
} from "./utils/constants";

const RedisStore = connectRedis(session);

export const startServer = async (): Promise<Server | any> => {
  const server = new GraphQLServer({
    schema: genSchema(),
    context: ({
      request,
      response
    }): Context | ContextCallback | undefined => ({
      redis,
      session: request.session,
      req: request,
      res: response
    })
  });

  const express = server.express;
  express.disable("x-powered-by");

  express.use(
    RateLimit({
      store: new RateLimitRedisStore({
        client: redis
      }),
      windowMs: 15 * 60 * 100,
      max: 100,
      message:
        "Too many accounts created from this IP, please try again after an hour"
    })
  );

  express.use(
    session({
      store: new RedisStore({
        client: redis,
        prefix: redisSessionPrefix
      }),
      name: "sesId",
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: productionEnv,
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7days
      }
    })
  );

  const cors = {
    credentials: !productionEnv,
    origin: testEnv ? "*" : frontEndHost
  };

  if (process.env.NODE_ENV === "test") {
    await redis.flushall();
    await createTestConn();
  } else {
    await createTypeormConn();
  }
  const app = await server.start({
    cors,
    port: testEnv ? 0 : 4000
  });

  console.log("Server is running on http://localhost:4000");
  return app;
};
