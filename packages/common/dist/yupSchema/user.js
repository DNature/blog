"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup = require("yup");
const errors_1 = require("../errors/errors");
exports.registerPasswordValidation = yup
    .string()
    .min(8, errors_1.passwordNotLongEnough)
    .max(255)
    .required();
exports.emailValidation = yup
    .string()
    .min(5, errors_1.invalidEmail)
    .max(255)
    .email(errors_1.invalidEmail)
    .required();
exports.validUserSchema = yup.object().shape({
    email: exports.emailValidation,
    password: exports.registerPasswordValidation
});
//# sourceMappingURL=user.js.map