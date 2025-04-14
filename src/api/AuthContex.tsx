import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthStateType, UserProfile } from '../types';
import { supabase } from './SuperbaseClient';

const AuthContext = createContext<AuthStateType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Sync with Supabase auth state
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth Event:', event);
        if (session?.user) {
          const { data: profileData, error } = await supabase
            .from('profiles')
            .select('first_name, last_name, phone')
            .eq('id', session.user.id)
            .single();

          if (error) {
            console.error('Profile fetch error:', error.message);
            setUser(null);
          } else {
            const userProfile: UserProfile = {
              id: session.user.id,
              email: session.user.email!,
              firstName: profileData.first_name,
              lastName: profileData.last_name,
              phone: profileData.phone
            };
            setUser(userProfile);
            await AsyncStorage.setItem('user', JSON.stringify(userProfile));
          }
        } else {
          setUser(null);
          await AsyncStorage.removeItem('user');
        }
        setLoading(false);
      }
    );

    // Load initial user
    const initializeAuth = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    initializeAuth();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const loginUser = async (emailOrPhone: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = emailOrPhone.includes('@')
        ? await supabase.auth.signInWithPassword({
            email: emailOrPhone,
            password
          })
        : await supabase.auth.signInWithPassword({
            phone: emailOrPhone,
            password
          });

      if (error) throw error;

      // User is set via onAuthStateChange
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGmail = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google'
      });

      if (error) throw error;
      console.log('Google Sign-In Data:', data);
    } catch (error) {
      console.error('Error signing in with Gmail:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUpUser = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone: string
  ) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;

      const user = data.user;
      if (user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            { id: user.id, first_name: firstName, last_name: lastName, phone }
          ]);

        if (profileError) throw profileError;
        // User is set via onAuthStateChange
      }
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      // User is cleared via onAuthStateChange
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string, newPassword: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        email,
        password: newPassword
      });

      if (error) throw error;
      return { success: true, message: 'Password reset successful' };
    } catch (error) {
      console.error('Error resetting password:', error);
      return {
        success: false,
        message: 'An error occurred. Please try again.'
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        loginUser,
        signUpUser,
        logout,
        loading,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
