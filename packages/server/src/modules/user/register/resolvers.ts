import * as yup from "yup";

import { ResolverMap } from "../../../types/graphqlUtils";
import { User } from "../../../entity/User";
import { formatYupError } from "../../../utils/formatYupError";
import { duplicateEmail } from './errorMessages';

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

interface Errors{
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
        await registerValidation.validate(
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
