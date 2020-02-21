import { ResolverMap } from "../../../types/graphqlUtils";

export const resolvers: ResolverMap = {
  Mutation: {
    createArticle: (): boolean => true
  }
};
