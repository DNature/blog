import * as yup from "yup";
import {
  passwordNotLongEnough,
  emailNotLongEnough,
  invalidEmail
} from "./errors";

export const registerPasswordValidation = yup
  .string()
  .min(8, passwordNotLongEnough)
  .max(255)
  .required();

export const emailValidation = yup
  .string()
  .min(3, emailNotLongEnough)
  .max(255)
  .email(invalidEmail)
  .required();

export const validUserSchema = yup.object().shape({
  email: emailValidation,
  password: registerPasswordValidation
});
