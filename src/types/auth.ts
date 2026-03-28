// src/types/auth.ts

export interface UserData {
  uid: string;
  name: string;
  email: string;
  photoURL: string | null;
  telefone?: string;
  createdAt?: string;
}

export interface CadastroData {
  timestamp: string;
  usuario: {
    nome: string;
    email: string;
    telefone?: string;
    cidade?: string;
    profissao?: string;
    bio?: string;
  };
  autenticacao: {
    provider: string;
    uid: string;
    fotoURL: string | null;
  };
  metadata: {
    navegador: string;
    idioma: string;
  };
}

// Usuário cadastrado no sistema
export interface RegisteredUser {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  profissao: string;
  bio: string;
  createdAt: string;
  ownerUid: string;
}

// Estrutura de armazenamento por conta
export interface AccountStorage {
  [accountUid: string]: RegisteredUser[];
}

// Conta autenticada armazenada
export interface StoredAccount {
  uid: string;
  name: string;
  email: string;
  photoURL: string | null;
}
