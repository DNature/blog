import * as yup from "yup";
export declare const validateArticleSchema: yup.ObjectSchema<yup.Shape<object, {
    title: string;
    body: string;
    readTime: string;
    tags: string[];
}>>;
