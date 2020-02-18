import * as yup from "yup";

import { ResolverMap } from "../../types/graphqlUtils";
import GQL from "../../types/GQL";
import { User } from "../../entity/User";

export const registerValidation = yup.object().shape({
  email: yup
    .string()
    .min(3, "Email not long enough")
    .max(255)
    .email("email must be a valid email address")
    .required(),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(255)
    .required()
});

export const resolvers: ResolverMap = {
  Query: {
    hello: (_, { name }: GQL.IHelloOnQueryArguments): string =>
      `Hello ${name || "world"}`
  },

  Mutation: {
    register: async (
      _,
      { email, password }: GQL.IRegisterOnMutationArguments
    ): Promise<boolean | any> => {
      try {
        await registerValidation.validate(
          { email, password },
          { abortEarly: false }
        );
      } catch (err) {
        return new Error(err);
      }
      const user = User.create({
        email,
        password
      });

      await user.save();
      return true;
    }
  }
};
