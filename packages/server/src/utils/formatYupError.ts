import { ValidationError } from "yup";
import { Errors } from "../types/graphqlUtils";

export const formatYupError = (err: ValidationError): Errors[] => {
  const errors: Errors[] = [];
  err.inner.forEach(e => {
    errors.push({
      path: e.path,
      message: e.message
    });
  });

  return errors;
};
