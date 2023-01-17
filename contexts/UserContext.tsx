import {AuthResponse, Session, User} from '@supabase/supabase-js';
import React, {ReactNode, createContext, useEffect, useState} from 'react';
import {ToastAndroid} from 'react-native';
import supabase from '../lib/initSupabase';

type UserContextDefaultValuesType = {
  user: User | null;
  authSession: Session | null;
  isAuthenticated: boolean;
  loginAndSignup(payload: SignUpPayload): Promise<void> | null;
};

type SignUpPayload = {
  email: string;
  password: string;
  type: 'LOGIN' | 'SIGNUP';
};

const defaultValues: UserContextDefaultValuesType = {
  user: null,
  isAuthenticated: false,
  authSession: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loginAndSignup: values => null,
};

export const UserContext = createContext(defaultValues);

function UserContextProvider({children}: {children: ReactNode}) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authSession, setAuthSession] = useState<Session | null>(null);

  const getAuthSession = async () => {
    const session = await supabase?.auth?.getSession();
    setAuthSession(session?.data?.session);
    setUser(session?.data?.session?.user || null);
    setIsAuthenticated(session?.data?.session?.user ? true : false);
  };

  const loginAndSignup = async ({email, password, type}: SignUpPayload) => {
    let res: AuthResponse;
    if (type === 'LOGIN') {
      res = await supabase?.auth?.signInWithPassword({email, password});
    } else {
      res = await supabase?.auth?.signUp({email, password});
    }

    if (res?.error) {
      ToastAndroid.showWithGravity(
        res?.error?.message,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }

    if (res?.data) {
      ToastAndroid.showWithGravity(
        type === 'LOGIN' ? 'Signin successful' : 'Signup successful',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };

  useEffect(() => {
    getAuthSession();

    const {data: authListener} = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log(`Supabase auth event: ${event}`);
        setAuthSession(session);
        setUser(session?.user ?? null);
        setIsAuthenticated(session?.user ? true : false);
      },
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{user, isAuthenticated, authSession, loginAndSignup}}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
