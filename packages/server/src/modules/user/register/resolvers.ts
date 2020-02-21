import { validUserSchema, registerError } from "@blog/common";

import { ResolverMap, Errors } from "../../../types/graphqlUtils";
import { User } from "../../../entity/User";
import { formatYupError } from "../../../utils/formatYupError";

export const resolvers: ResolverMap = {
  Mutation: {
    register: async (
      _,
      args: GQL.IRegisterOnMutationArguments
    ): Promise<Errors[] | null> => {
      const { email, password } = args;
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
        return [registerError];
      }
      const user = User.create({ email, password });
      await user.save();
      return null;
    }
  }
};
