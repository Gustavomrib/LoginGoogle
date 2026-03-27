# 🔐 Setup Firebase Authentication

## Passo a Passo para Configurar Google OAuth

### 1. Crie um Projeto no Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com)
2. Clique em "Add project"
3. Preencha o nome do projeto (ex: "Auth App")
4. Siga as instruções e clique "Create project"
5. Aguarde o projeto ser criado

### 2. Configure a Autenticação com Google

1. No Firebase Console, vá para **Authentication** (no menu esquerdo)
2. Clique em **"Get Started"**
3. Clique em **Google** provider
4. Clique no toggle para **"Enable"**
5. Preencha:
   - **Project support email**: Seu email do Google
   - **Project name**: O nome da sua aplicação
6. Clique **"Save"**

### 3. Obtenha as Credenciais do Firebase

1. Clique no ícone de engrenagem (⚙️) no canto superior esquerdo
2. Vá para **Project Settings**
3. Desça para **Your apps** e clique em **Web** (símbolo `</>`)
4. Preencha o apelido (ex: "auth-app")
5. Clique **"Register app"**
6. Copie as credenciais mostradas:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

### 4. Configure as Variáveis de Ambiente

1. Abra o arquivo `.env.local` na raiz do projeto
2. Substitua os valores de `YOUR_*` pelas credenciais do Firebase
3. **Importante**: Nunca commit este arquivo em git!

```bash
# .env.local
NEXT_PUBLIC_FIREBASE_API_KEY=paste_your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=paste_your_auth_domain_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=paste_your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=paste_your_storage_bucket_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=paste_your_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=paste_your_app_id_here
```

### 5. Configure URI de Redirecionamento Autorizado

Para desenvolvimento local:

1. Vá para **Authentication** > **Settings** (engrenagem) > **Authorized domains**
2. Adicione: `localhost:3000`

Para produção (após fazer deploy):

1. Adicione seu domínio do Vercel/Netlify
2. Exemplo: `seu-app.vercel.app`

### 6. Teste a Aplicação

```bash
npm run dev
```

Acesse `http://localhost:3000` e teste o login com Google!

---

## 🎯 O que Você Vai Ver

- ✅ Botão "Entrar com Google"
- ✅ Pop-up de login do Google
- ✅ Redirecionamento automático após login
- ✅ Dados do usuário carregados (nome, email, foto)

## ⚠️ Problemas Comuns

### "Erro ao fazer login"

- Verifique se as credenciais no `.env.local` estão corretas
- Confirme que `localhost:3000` está na lista de "Authorized domains"

### "Blank page after login"

- Abra o console (F12) e procure por erros
- Verifique se o Firebase foi inicializado corretamente

### "Photo doesn't load"

- É normal que nem sempre a foto do Google carregue imediatamente
- A aplicação usa um fallback com ícone se não houver foto

---

## 🚀 Deploy em Produção

Após fazer deploy (Vercel/Netlify):

1. Adicione seu domínio em **Authorized domains** no Firebase
2. Atualize a variável `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` se necessário
3. Garanta que o `.env.local` está em `.gitignore`

---

Para mais informações: [Firebase Documentation](https://firebase.google.com/docs/auth)
