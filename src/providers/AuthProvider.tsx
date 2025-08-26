import React, { useEffect, createContext, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';

type AuthProviderProps = {
  children: React.ReactNode;
};

// Create the AuthContext
const AuthContext = createContext<ReturnType<typeof useAuth> | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuth();

  useEffect(() => {
    // Initialize authentication state when the app starts
    const initAuth = async () => {
      try {
        await auth.initializeAuth();
      } catch (error) {
        console.error('Failed to initialize auth:', error);
      }
    };

    initAuth();
  }, [auth.initializeAuth]);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
