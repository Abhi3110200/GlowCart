import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

type UserData = {
  uid: string;
  email: string;
  displayName: string;
  createdAt: Date;
};

type AuthState = {
  user: UserData | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  initializeAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    
    login: async (email: string, password: string) => {
      try {
        set({ loading: true, error: null });
        
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        
        if (!userCredential.user) {
          throw new Error('No user found with these credentials');
        }

        const token = await userCredential.user.getIdToken();
        
        const userDoc = await firestore()
          .collection('users')
          .doc(userCredential.user.uid)
          .get();
        
        const userData = userDoc.data() as UserData;
        
        set({
          user: {
            uid: userCredential.user.uid,
            email: userCredential.user.email || '',
            displayName: userData?.displayName || '',
            createdAt: userData?.createdAt || new Date(),
          },
          token,
          isAuthenticated: true,
          loading: false,
        });
        
      } catch (error: any) {
        const errorMessage = error.code === 'auth/user-not-found' 
          ? 'No user found with this email.'
          : error.code === 'auth/wrong-password'
          ? 'Incorrect password.'
          : error.message || 'Login failed';
          
        set({ 
          error: errorMessage,
          loading: false 
        });
        throw new Error(errorMessage);
      }
    },
    
    register: async (email: string, password: string, name: string) => {
      try {
        set({ loading: true, error: null });
        
        // Create user with email and password
        const userCredential = await auth().createUserWithEmailAndPassword(email, password);
        
        if (!userCredential.user) {
          throw new Error('Failed to create user');
        }
        
        // Update user profile with display name
        await userCredential.user.updateProfile({
          displayName: name,
        });
        
        // Get the user's auth token
        const token = await userCredential.user.getIdToken();
        
        // Create user document in Firestore
        const userData = {
          uid: userCredential.user.uid,
          email,
          displayName: name,
          createdAt: firestore.FieldValue.serverTimestamp(),
        };
        
        await firestore()
          .collection('users')
          .doc(userCredential.user.uid)
          .set(userData);
        
        set({
          user: {
            ...userData,
            createdAt: new Date(),
          },
          token,
          isAuthenticated: false,
          loading: false,
        });
        
      } catch (error: any) {
        const errorMessage = error.code === 'auth/email-already-in-use'
          ? 'An account with this email already exists.'
          : error.message || 'Registration failed';
          
        set({ 
          error: errorMessage,
          loading: false 
        });
        throw new Error(errorMessage);
      }
    },
    
    logout: async () => {
      try {
        await auth().signOut();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      } catch (error) {
        console.error('Error during logout:', error);
        throw error;
      }
    },
    
    setLoading: (loading: boolean) => set({ loading }),
    setError: (error: string | null) => set({ error }),
    initializeAuth: async () => {
      try {
        set({ loading: true });
        const currentUser = auth().currentUser;
        
        if (currentUser) {
          const token = await currentUser.getIdToken();
          const userDoc = await firestore()
            .collection('users')
            .doc(currentUser.uid)
            .get();
            
          const userData = userDoc.data() as UserData;
          
          set({
            user: {
              uid: currentUser.uid,
              email: currentUser.email || '',
              displayName: userData?.displayName || '',
              createdAt: userData?.createdAt || new Date(),
            },
            token,
            isAuthenticated: true,
            loading: false,
          });
        } else {
          set({ loading: false });
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        set({ loading: false });
      }
    },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      })
    }
  )
);
