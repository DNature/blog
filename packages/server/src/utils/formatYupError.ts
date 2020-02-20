import { ValidationError } from 'yup';

interface Errors {
    path: string;
    message: string;
}

export const formatYupError = (err: ValidationError): void => {
    const errors: Errors[] = []
    err.inner.forEach(e => {
        errors.push({
            path: e.path,
            message: e.message
        })
    })
}