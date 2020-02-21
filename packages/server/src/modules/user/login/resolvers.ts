import * as bcrypt from "bcrypt";

import { ResolverMap, ErrorsMap } from "../../../types/graphqlUtils";
import { User } from "../../../entity/User";
import { invalidCredentials } from "@blog/common";
import { userSessionIdPrefix } from "../../../utils/constants";

const errorResponse = [
  {
    path: "email",
    message: invalidCredentials
  }
];

export const resolvers: ResolverMap = {
  Mutation: {
    login: async (
      _,
      { email, password }: GQL.ILoginOnMutationArguments,
      { session, redis, req }
    ): Promise<ErrorsMap> => {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return { errors: errorResponse };
      }

      if (user && user.password) {
        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
          return { errors: errorResponse };
        }

        session.userId = user.id;
        console.log(session);
        if (req.sessionID) {
          await redis.lpush(`${userSessionIdPrefix}${user.id}`, req.sessionID);
        }
      }

      return { sessionId: req.sessionID };
    }
  }
};
