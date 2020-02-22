import {
  validationError,
  notAuthenticated,
  validateArticleSchema
} from "@blog/common";

import { ResolverMap, Errors } from "../../../types/graphqlUtils";
import { Article } from "../../../entity/Article";
import { User } from "../../../entity/User";
import { formatYupError } from "../../../utils/formatYupError";

export const resolvers: ResolverMap = {
  Mutation: {
    createArticle: async (
      _,
      { input }: GQL.ICreateArticleOnMutationArguments,
      { session }
    ): Promise<Errors[] | null> => {
      try {
        await validateArticleSchema.validate(
          { ...input },
          { abortEarly: false }
        );
      } catch (err) {
        return formatYupError(err);
      }

      if (!session.userId) {
        return [validationError("email", notAuthenticated)];
      }

      const user = await User.findOne({ where: { id: session.userId } });

      if (!user) {
        return [validationError("email", notAuthenticated)];
      }
      await Article.create({
        ...input,
        userId: session.userId,
        createdAt: new Date().toISOString(),
        author: user.fullName as string
      }).save();

      return null;
    }
  }
};
