import * as yup from 'yup';

// GitHub
//   Min: 1
//   Max: 39
//   Can contain: a-z A-Z 0-9 -
//   Other: Can not start with a dash

const username = {
  min: 'Username must be at least 1 character long',
  max: 'Username must be up to 39 characters long',
  required: 'Username is required'
};

const password = {
  min: 'Password must be at least 8 characters long',
  required: 'Password is equired'
};

const confirmPassword = {
  min: 'Password must be at least 8 characters long',
  required: 'Confirm your password',
  oneOf: "Passwords don't match"
};

export const signUpSchema = yup.object({
  username: yup.string().min(1, username.min).max(39, username.max).required(username.required),
  password: yup.string().min(8, password.min).required(password.required),
  confirmPassword: yup
    .string()
    .min(8, confirmPassword.min)
    .required(confirmPassword.required)
    .oneOf([yup.ref('password')], confirmPassword.oneOf)
});

export const loginSchema = yup.object({
  username: yup.string().min(1, username.min).max(39, username.max).required(username.required),
  password: yup.string().min(8, password.min).required(password.required)
});
