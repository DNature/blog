import { validUserSchema } from "@blog/common";

import { ResolverMap } from "../../../types/graphqlUtils";
import { User } from "../../../entity/User";
import { formatYupError } from "../../../utils/formatYupError";
import { duplicateEmail } from "./errorMessages";

interface Errors {
  path: string;
  message: string;
}

export const resolvers: ResolverMap = {
  Mutation: {
    register: async (
      _,
      { email, password }: GQL.IRegisterOnMutationArguments
    ): Promise<Errors[] | null | void> => {
      try {
        await validUserSchema.validate(
          { email, password },
          { abortEarly: false }
        );
      } catch (err) {
        return formatYupError(err);
      }

      const userAlreadyExist = await User.findOne({
        where: { email },
        select: ["id"]
      });

      if (userAlreadyExist) {
        return [
          {
            path: "email",
            message: duplicateEmail
          }
        ];
      }
      const user = User.create({
        email,
        password
      });

      await user.save();
      return null;
    }
  }
};
