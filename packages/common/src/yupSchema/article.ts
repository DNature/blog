import * as yup from "yup";
import { shortName } from "..";

// title: String!;
// body: String!;
// readTime: String!;
// tags: [String!]!;
export const validateArticleSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, shortName)
    .max(255)
    .required(),
  body: yup
    .string()
    .min(100, shortName)
    .required(),
  readTime: yup
    .string()
    .min(3, shortName)
    .max(255)
    .required(),
  tags: yup
    .array()
    .of(yup.string().min(2, shortName))
    .required()
});
