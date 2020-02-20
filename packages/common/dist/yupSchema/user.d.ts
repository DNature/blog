import * as yup from "yup";
export declare const registerPasswordValidation: yup.StringSchema<string>;
export declare const emailValidation: yup.StringSchema<string>;
export declare const validUserSchema: yup.ObjectSchema<yup.Shape<object, {
    email: string;
    password: string;
}>>;
