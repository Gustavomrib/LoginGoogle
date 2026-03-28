// src/services/storage.ts
import { RegisteredUser, AccountStorage, StoredAccount } from '@/types/auth';

const USERS_KEY = 'auth-app-users';
const ACCOUNTS_KEY = 'auth-app-accounts';

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

// --- Usuários cadastrados ---

export function getAllUsersStorage(): AccountStorage {
  if (typeof window === 'undefined') return {};
  try {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function saveAllUsersStorage(storage: AccountStorage): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USERS_KEY, JSON.stringify(storage));
}

export function getUsersByAccount(accountUid: string): RegisteredUser[] {
  const storage = getAllUsersStorage();
  return storage[accountUid] || [];
}

export function addUser(accountUid: string, userData: Omit<RegisteredUser, 'id' | 'createdAt' | 'ownerUid'>): RegisteredUser {
  const storage = getAllUsersStorage();
  const newUser: RegisteredUser = {
    ...userData,
    id: generateId(),
    createdAt: new Date().toISOString(),
    ownerUid: accountUid,
  };

  if (!storage[accountUid]) {
    storage[accountUid] = [];
  }
  storage[accountUid].push(newUser);
  saveAllUsersStorage(storage);
  return newUser;
}

export function deleteUser(accountUid: string, userId: string): void {
  const storage = getAllUsersStorage();
  if (storage[accountUid]) {
    storage[accountUid] = storage[accountUid].filter(u => u.id !== userId);
    saveAllUsersStorage(storage);
  }
}

export function getUserById(accountUid: string, userId: string): RegisteredUser | undefined {
  const users = getUsersByAccount(accountUid);
  return users.find(u => u.id === userId);
}

// --- Contas autenticadas ---

export function getStoredAccounts(): StoredAccount[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(ACCOUNTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addStoredAccount(account: StoredAccount): StoredAccount[] {
  const accounts = getStoredAccounts();
  const existing = accounts.findIndex(a => a.uid === account.uid);

  if (existing >= 0) {
    accounts[existing] = account;
  } else if (accounts.length < 2) {
    accounts.push(account);
  } else {
    // Substituir a conta mais antiga (primeira)
    accounts[0] = account;
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  }
  return accounts;
}

export function removeStoredAccount(uid: string): StoredAccount[] {
  let accounts = getStoredAccounts();
  accounts = accounts.filter(a => a.uid !== uid);
  if (typeof window !== 'undefined') {
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  }
  return accounts;
}

export function userToJSON(user: RegisteredUser): string {
  return JSON.stringify({
    id: user.id,
    nome: user.nome,
    email: user.email,
    telefone: user.telefone || 'Não informado',
    cidade: user.cidade || 'Não informado',
    profissao: user.profissao || 'Não informado',
    bio: user.bio || 'Não informado',
    createdAt: user.createdAt,
  }, null, 2);
}
