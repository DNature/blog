import * as yup from "yup";
import { passwordNotLongEnough, invalidEmail, shortName } from "../errors/errors";

export const registerPasswordValidation = yup
  .string()
  .min(8, passwordNotLongEnough)
  .max(255)
  .required();

export const emailValidation = yup
  .string()
  .min(5, invalidEmail)
  .max(255)
  .email(invalidEmail)
  .required();

export const fullNameValidation = yup
  .string()
  .min(3, shortName )
  .required()
  .max(255)

export const validUserSchema = yup.object().shape({
  email: emailValidation,
  password: registerPasswordValidation,
  fullName: fullNameValidation
});
