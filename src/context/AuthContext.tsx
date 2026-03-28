'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { User as FirebaseUser, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/services/firebase';
import { StoredAccount } from '@/types/auth';
import { getStoredAccounts, addStoredAccount, removeStoredAccount } from '@/services/storage';

export interface UserData {
  uid: string;
  name: string;
  email: string;
  photoURL: string | null;
  telefone?: string;
  createdAt?: string;
}

interface AuthContextType {
  user: UserData | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  logout: () => Promise<void>;
  updateUserData: (data: Partial<UserData>) => void;
  // Multi-account
  accounts: StoredAccount[];
  activeAccountUid: string | null;
  switchAccount: (uid: string) => Promise<void>;
  addAccount: () => Promise<void>;
  removeAccount: (uid: string) => void;
  canAddAccount: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState<StoredAccount[]>([]);
  const [activeAccountUid, setActiveAccountUid] = useState<string | null>(null);

  // Carregar contas salvas
  useEffect(() => {
    setAccounts(getStoredAccounts());
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUserData) => {
      if (firebaseUserData) {
        const userData: UserData = {
          uid: firebaseUserData.uid,
          name: firebaseUserData.displayName || '',
          email: firebaseUserData.email || '',
          photoURL: firebaseUserData.photoURL,
        };
        setFirebaseUser(firebaseUserData);
        setUser(userData);
        setActiveAccountUid(firebaseUserData.uid);

        // Salvar conta no storage
        const storedAccount: StoredAccount = {
          uid: firebaseUserData.uid,
          name: firebaseUserData.displayName || '',
          email: firebaseUserData.email || '',
          photoURL: firebaseUserData.photoURL,
        };
        const updated = addStoredAccount(storedAccount);
        setAccounts(updated);
      } else {
        setFirebaseUser(null);
        setUser(null);
        setActiveAccountUid(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setFirebaseUser(null);
      setActiveAccountUid(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  };

  const updateUserData = (data: Partial<UserData>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  const addAccount = useCallback(async () => {
    if (accounts.length >= 2) return;
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
      // onAuthStateChanged fará o resto
    } catch (error) {
      console.error('Erro ao adicionar conta:', error);
    }
  }, [accounts.length]);

  const switchAccount = useCallback(async (uid: string) => {
    const account = accounts.find(a => a.uid === uid);
    if (!account) return;

    // Para trocar de conta, fazemos re-login com prompt de seleção
    // Se a conta Firebase atual é diferente, precisamos fazer sign-in novamente
    if (user?.uid === uid) return;

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ login_hint: account.email });
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Erro ao trocar conta:', error);
    }
  }, [accounts, user?.uid]);

  const removeAccount = useCallback((uid: string) => {
    const updated = removeStoredAccount(uid);
    setAccounts(updated);

    // Se removeu a conta ativa, fazer logout
    if (user?.uid === uid) {
      logout();
    }
  }, [user?.uid]);

  return (
    <AuthContext.Provider value={{
      user,
      firebaseUser,
      loading,
      logout,
      updateUserData,
      accounts,
      activeAccountUid,
      switchAccount,
      addAccount,
      removeAccount,
      canAddAccount: accounts.length < 2,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
