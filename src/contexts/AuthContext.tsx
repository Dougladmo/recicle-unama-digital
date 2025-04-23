
import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase, getCurrentUser } from '@/lib/supabase';
import type { Aluno } from '@/types';

interface AuthContextType {
  user: Aluno | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Aluno | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    const getSession = async () => {
      setLoading(true);
      
      const user = await getCurrentUser();
      setUser(user);
      
      setLoading(false);
    };

    getSession();

    // Listen for changes on auth state (logged in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event) => {
        if (event === 'SIGNED_IN') {
          const user = await getCurrentUser();
          setUser(user);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error && data) {
      const user = await getCurrentUser();
      setUser(user);
    }

    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
