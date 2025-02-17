// src/lib/schemas.ts
import { z } from 'zod';

// export const signUpSchema = z.object({
//   email: z.string().email({ message: 'Invalid email address' }),
//   password: z
//     .string()
//     .min(6, { message: 'Password must be at least 6 characters' }),
//   firstName: z.string().min(1, { message: 'First name is required' }),
//   lastName: z.string().min(1, { message: 'Last name is required' }),
//   phone: z
//     .string()
//     .min(10, { message: 'Phone number must be at least 10 digits' })
// });

// export const loginSchema = z.object({
//   emailOrPhone: z
//     .string()
//     .nonempty({ message: 'Email or phone number is required' }),
//   password: z
//     .string()
//     .min(6, { message: 'Password must be at least 6 characters' })
// });

// src/lib/schemas.ts

export const signUpSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Confirm password must be at least 6 characters' }),
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    phone: z
      .string()
      .min(10, { message: 'Phone number must be at least 10 digits' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'] // path of error
  });

export const loginSchema = z.object({
  emailOrPhone: z
    .string()
    .nonempty({ message: 'Email or phone number is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
});

export const _resetPasswordSchema = z.object({
  email: z.string().nonempty({ message: 'Email  is required' })
});

export const resetPasswordWithTokenSchema = z.object({
  token: z.string().nonempty({ message: 'Token is required' }),
  newPassword: z
    .string()
    .nonempty({ message: 'New password is required' })
    .min(6, { message: 'Password must be at least 6 characters long' })
});

export const resetPasswordSchema = z
  .object({
    email: z
      .string()
      .nonempty({ message: 'Email is required' })
      .email({ message: 'Invalid email format' }),

    newPassword: z
      .string()
      .nonempty({ message: 'New password is required' })
      .min(6, { message: 'Password must be at least 6 characters long' }),

    confirmNewPassword: z
      .string()
      .nonempty({ message: 'Please confirm your password' })
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword']
  });
