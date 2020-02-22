"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup = require("yup");
const __1 = require("..");
exports.validateArticleSchema = yup.object().shape({
    title: yup
        .string()
        .min(3, __1.shortName)
        .max(255)
        .required(),
    body: yup
        .string()
        .min(100, __1.shortName)
        .required(),
    readTime: yup
        .string()
        .min(3, __1.shortName)
        .max(255)
        .required(),
    tags: yup
        .array()
        .of(yup.string().min(2, __1.shortName))
        .required()
});
//# sourceMappingURL=article.js.map