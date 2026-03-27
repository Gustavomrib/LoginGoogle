# 📚 Documentação Técnica

## Arquitetura do Projeto

```
┌─────────────────────────────────────────────┐
│           Next.js App (Frontend)            │
├─────────────────────────────────────────────┤
│  ┌──────────────────────────────────────┐   │
│  │     React Components                 │   │
│  │  (Navbar, LoginButton, UserProfile)  │   │
│  └────────────┬─────────────────────────┘   │
│               │                             │
│  ┌────────────▼─────────────────────────┐   │
│  │     Context API (AuthContext)        │   │
│  │  (Global State Management)           │   │
│  └────────────┬─────────────────────────┘   │
│               │                             │
│  ┌────────────▼─────────────────────────┐   │
│  │   Firebase Authentication Service    │   │
│  │  (Login com Google)                  │   │
│  └────────────┬─────────────────────────┘   │
└───────────────┼──────────────────────────────┘
                │
                ▼
    ┌───────────────────────┐
    │  Firebase Console     │
    │  ├─ Authentication    │
    │  ├─ Google Provider   │
    │  └─ User Data         │
    └───────────────────────┘
```

---

## Flow de Autenticação

```
1. User clica "Entrar com Google"
   ↓
2. SignInWithPopup (Firebase)
   ↓
3. Google OAuth Dialog
   ↓
4. User autoriza
   ↓
5. Firebase retorna User Data
   ↓
6. onAuthStateChanged dispara
   ↓
7. AuthContext atualiza estado
   ↓
8. Componentes re-renderizam
   ↓
9. Redirect para Home (já logado)
```

---

## Context API - AuthContext

### Propósito

Gerenciar estado global de autenticação sem prop drilling.

### Valores Disponíveis

```typescript
interface AuthContextType {
  user: UserData | null; // Dados do usuário
  firebaseUser: FirebaseUser | null; // Firebase user object
  loading: boolean; // Estado de carregamento
  logout: () => Promise<void>; // Função de logout
  updateUserData: (data: Partial<UserData>) => void; // Atualizar dados
}
```

### Uso em Componentes

```typescript
'use client';

import { useAuth } from '@/context/AuthContext';

export function MeuComponente() {
  const { user, loading, logout } = useAuth();

  if (loading) return <p>Carregando...</p>;
  if (!user) return <p>Não autenticado</p>;

  return (
    <div>
      <h1>Bem-vindo, {user.name}!</h1>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
```

---

## Proteção de Rotas

### Como Funciona

1. **Layout Principal** - Envolve tudo com `<AuthProvider>`
2. **Componentes Private** - Verificam se `user` existe
3. **useRouter.push** - Redireciona para home se não autenticado

### Exemplo em Página Protegida

```typescript
'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function PageProtegida() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');  // Redireciona se não logado
    }
  }, [user, loading, router]);

  if (loading) return <p>Carregando...</p>;
  if (!user) return null;

  return <div>Conteúdo protegido</div>;
}
```

---

## Firebase Configuration

### Environment Variables

```env
NEXT_PUBLIC_FIREBASE_API_KEY          # Chave pública de API
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN      # Domínio de autenticação
NEXT_PUBLIC_FIREBASE_PROJECT_ID       # ID do projeto
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET   # Bucket de storage
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID  # ID do sender
NEXT_PUBLIC_FIREBASE_APP_ID           # ID da app
```

**Nota**: Prefixo `NEXT_PUBLIC_` = Exposto ao cliente (é OK, são públicas)

### Inicialização

```typescript
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // ... Valores das variáveis
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

---

## Componentes Principais

### LoginButton

- Trigger: `signInWithPopup`
- Provider: `GoogleAuthProvider`
- State: Loading durante autenticação

### UserProfile

- Exibe: Nome, email, foto
- Botão: Logout
- Fallback: Ícone se sem foto

### Navbar

- Visibilidade: Sempre visível
- Navegação: Condicionada ao login
- Responsivo: Hamburger menu em mobile

---

## Formulário de Cadastro

### Campos

1. **Nome** - Obrigatório (pré-preenchido)
2. **Email** - Obrigatório (pré-preenchido)
3. **Telefone** - Opcional
4. **Cidade** - Opcional
5. **Profissão** - Opcional
6. **Bio** - Opcional

### Processamento

1. User preenche e clica "Gerar Cadastro"
2. Dados são organizados em objeto
3. JSON é gerado e formatado
4. Mostrado na tela
5. Logado no console (F12)
6. Opções: Copiar ou Download

---

## Boas Práticas Implementadas

### 1. TypeScript

- ✅ Type safety em componentes
- ✅ Interfaces para dados
- ✅ Tipos no Context

### 2. React Hooks

- ✅ useState - Estado local
- ✅ useEffect - Side effects
- ✅ useContext - Estado global
- ✅ useRouter - Navegação

### 3. Performance

- ✅ Code splitting automático (Next.js)
- ✅ Lazy loading de componentes
- ✅ Image optimization

### 4. Segurança

- ✅ Credenciais em environment variables
- ✅ Proteção de rotas
- ✅ Firebase security rules
- ✅ HTTPS em produção

### 5. Acessibilidade

- ✅ Semântica HTML5 correta
- ✅ Labels em formulários
- ✅ Contraste de cores
- ✅ Navegação por teclado

### 6. UX/Design

- ✅ Loading states
- ✅ Error handling
- ✅ Feedback visual
- ✅ Responsive design
- ✅ Animações suaves

---

## Fluxo de Dados

```
Google OAuth
    │
    ▼
Firebase Auth
    │
    ├─ onAuthStateChanged
    │
    ▼
AuthContext (setState)
    │
    ├─ user
    ├─ firebaseUser
    ├─ loading
    │
    ▼
Componentes (useAuth)
    │
    ├─ Navbar (verifica user)
    ├─ Home (mostra conteúdo)
    ├─ Apresentacao (protegido)
    └─ Cadastro (protegido)
```

---

## Extensões Possíveis

### 1. Tema Escuro

```typescript
'use client';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  return <button onClick={() => setIsDark(!isDark)}>🌙/☀️</button>;
}
```

### 2. Persistência de Dados

```typescript
// localStorage para dados do usuário
const saveUserData = (data) => {
  localStorage.setItem("userData", JSON.stringify(data));
};

const getUserData = () => {
  return JSON.parse(localStorage.getItem("userData"));
};
```

### 3. API Backend

```typescript
// Para armazenar dados no servidor
const submitCadastro = async (dados) => {
  const response = await fetch("/api/cadastro", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return response.json();
};
```

### 4. Mais Provedores de OAuth

```typescript
// Adicionar Microsoft, GitHub, etc
const providers = {
  google: new GoogleAuthProvider(),
  github: new GithubAuthProvider(),
  microsoft: new OAuthProvider("microsoft.com"),
};
```

---

## Variáveis de Tipo

### UserData

```typescript
interface UserData {
  uid: string; // Único ID do Firebase
  name: string; // Nome do usuário
  email: string; // Email
  photoURL: string | null; // URL da foto (pode ser null)
  telefone?: string; // Adiciona no cadastro
  createdAt?: string; // Quando foi criado
}
```

### CadastroData

```typescript
interface CadastroData {
  timestamp: string; // ISO string
  usuario: {}; // Infos do formulário
  autenticacao: {}; // Infos do Firebase
  metadata: {}; // Info do navegador
}
```

---

## Performance Tips

1. **Code Splitting**: Next.js faz automaticamente
2. **Image Optimization**: Use `next/image`
3. **Bundle Size**: Firebase SDK é otimizado
4. **Lazy Loading**: Use `dynamic()` para componentes pesados

```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./heavy'), {
  loading: () => <p>Carregando...</p>,
});
```

---

## Debugging

### Console do Navegador (F12)

- Verificar errors
- Logs do Firebase
- Network requests

### React DevTools

- Inspecionar componentes
- Ver props e state
- Debugar Context

### Firebase Console

- Verificar usuários autenticados
- Ver logs de autenticação
- Monitorar usage

---

## Suporte e Recursos

- 📖 [Next.js Docs](https://nextjs.org/docs)
- 🔥 [Firebase Docs](https://firebase.google.com/docs)
- 🎨 [Tailwind CSS](https://tailwindcss.com)
- 📘 [TypeScript](https://www.typescriptlang.org)
- 🆘 [Stack Overflow](https://stackoverflow.com/questions/tagged/nextjs)

---

Última atualização: Março de 2024
