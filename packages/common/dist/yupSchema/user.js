"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup = require("yup");
const errors_1 = require("./errors");
exports.registerPasswordValidation = yup
    .string()
    .min(8, errors_1.passwordNotLongEnough)
    .max(255)
    .required();
exports.emailValidation = yup
    .string()
    .min(3, errors_1.emailNotLongEnough)
    .max(255)
    .email(errors_1.invalidEmail)
    .required();
exports.validUserSchema = yup.object().shape({
    email: exports.emailValidation,
    password: exports.registerPasswordValidation
});
//# sourceMappingURL=user.js.map