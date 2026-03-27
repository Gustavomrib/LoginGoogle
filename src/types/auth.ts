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
