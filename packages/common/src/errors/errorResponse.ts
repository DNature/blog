type Errors = {
  path: string;
  message: string;
}

export const validationError = (path: string, message: string): Errors  => {
return { path, message };
}