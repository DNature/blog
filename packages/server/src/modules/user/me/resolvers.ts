import { validationError, notAuthenticated } from '@blog/common';

import { ResolverMap } from "../../../types/graphqlUtils";
import { User } from "../../../entity/User";
import { createMiddleware } from "../../../utils/createMiddleware";
import middleware from "./middleware";

export const resolvers: ResolverMap = {
  Query: {
    me: createMiddleware(middleware, (_, __, { session }) => {
      if (!session || !session.userId) {
        return {
          errors: [validationError("email", notAuthenticated)]
        };
      }
      return User.findOne({ where: { id: session.userId } });
    })
  }
};
