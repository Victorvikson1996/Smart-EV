import { UserProfile } from './User';

export interface AuthStateType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  loginUser: (emailOrPhone: string, password: string) => Promise<void>;
  signUpUser: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string
  ) => Promise<void>;
  logout: () => void;
  loading: boolean;
  resetPassword: (
    email: string,
    newPassword: string,
    confirmNewPassword: string
  ) => Promise<{ success: boolean; message: string }>;
}
