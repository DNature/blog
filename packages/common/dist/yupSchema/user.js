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
exports.fullNameValidation = yup
    .string()
    .min(3, errors_1.shortName)
    .required()
    .max(255);
exports.validUserSchema = yup.object().shape({
    email: exports.emailValidation,
    password: exports.registerPasswordValidation,
    fullName: exports.fullNameValidation
});
//# sourceMappingURL=user.js.map