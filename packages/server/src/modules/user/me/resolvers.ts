import { ResolverMap } from "../../../types/graphqlUtils";
import { User } from "../../../entity/User";
import { createMiddleware } from "../../../utils/createMiddleware";
import middleware from "./middleware";

export const resolvers: ResolverMap = {
  Query: {
    me: createMiddleware(middleware, (_, __, { session }) => {
      if (!session || !session.userId) {
        throw new Error("Please Login");
      }
      return User.findOne({ where: { id: session.userId } });
    })
  }
};
