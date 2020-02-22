import { removeAllUserSessions } from "../../../utils/removeAllSessions";
import { ResolverMap } from "../../../types/graphqlUtils";

export const resolvers: ResolverMap = {
  Mutation: {
    logout: async (_, __, { session, redis }): Promise<boolean> => {
      const { userId } = session;

      if (userId) {
        removeAllUserSessions(userId, redis);
        return true;
      }

      return false;
    }
  }
};
