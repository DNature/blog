import * as bcrypt from "bcrypt";

import { ResolverMap, Errors } from "../../../types/graphqlUtils";
import { User } from "../../../entity/User";
import { invalidCredentials } from "@blog/common";

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
      { email, password }: GQL.ILoginOnMutationArguments
    ): Promise<Errors[] | null> => {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return errorResponse;
      }

      if (user && user.password) {
        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
          return errorResponse;
        }
      }

      return null;
    }
  }
};
