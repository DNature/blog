declare type Errors = {
    path: string;
    message: string;
};
export declare const validationError: (path: string, message: string) => Errors;
export {};
