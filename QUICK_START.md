# ⚡ Guia Rápido - Comece em 2 Minutos

## 1️⃣ Pré-requisitos

- [Node.js 16+](https://nodejs.org/)
- Conta Google
- Projeto Firebase (grátis)

---

## 2️⃣ Setup Firebase (5 minutos)

Siga o arquivo [SETUP_FIREBASE.md](./SETUP_FIREBASE.md) ou faça rápido:

1. Vá para [console.firebase.google.com](https://console.firebase.google.com)
2. **"Add project"** → Nome qualquer → Create
3. **Authentication** → **Get Started** → **Google** → Enable
4. ⚙️ (seu avatar) → **Project Settings** → Copie as credencias
5. Edite `.env.local` com as credenciais

---

## 3️⃣ Rode Localmente

```bash
cd c:\Users\Gustavo\auth-app

npm install          # Já feito, mas caso precise

npm run dev          # Inicia no http://localhost:3000
```

Abra [http://localhost:3000](http://localhost:3000)

---

## 4️⃣ Teste

1. Clique "Entrar com Google"
2. Autorize com sua conta Google
3. Veja seu nome e foto aparecerem
4. Clique em "Apresentação da Dupla"
5. Clique em "Cadastro de Usuário"
6. Preencha e clique "Gerar Cadastro"
7. Veja o JSON aparecer 🎉

---

## 5️⃣ Deploy em 3 Cliques (Vercel)

```bash
# 1. Crie repositório no GitHub
git init
git add .
git commit -m "Auth App"
git branch -M main
# ... adicione remote e push para GitHub

# 2. Vá para vercel.com
# 3. Connect GitHub → Select repo → Deploy
# 4. Em Project Settings, adicione as vars do Firebase
```

**Pronto! Seu app está no ar!** 🚀

---

## 📁 Estrutura

```
src/
├── app/              # Páginas (home, apresentacao, cadastro)
├── components/       # Componentes (Navbar, LoginButton, etc)
├── context/          # Context API (AuthContext)
└── services/         # Firebase config

Docs:
├── README.md         # Documentação principal
├── SETUP_FIREBASE.md # Como configurar Firebase
├── DEPLOY.md         # Como fazer deploy
└── TECNICO.md        # Documentação técnica
```

---

## 🔧 Arquivos Importantes

| Arquivo                       | O Quê                     |
| ----------------------------- | ------------------------- |
| `.env.local`                  | Suas credenciais Firebase |
| `src/context/AuthContext.tsx` | Onde fica a autenticação  |
| `src/app/page.tsx`            | Home page                 |
| `src/app/cadastro/page.tsx`   | Formulário de cadastro    |

---

## 💡 Dicas Rápidas

### Editar Dados da Dupla

Abra `src/app/apresentacao/page.tsx` e edite `TEAM_MEMBERS`

### Mudar Cores/Estilos

Use classes Tailwind em qualquer arquivo `.tsx`

### Adicionar Campos no Cadastro

Edite `src/app/cadastro/page.tsx` e adicione um input

### Ver Dados no Console

Abra DevTools (F12) → Console → Faça cadastro

---

## 🚫 Problemas Comuns

**Erro: "Cannot find Firebase config"**

- Verifique se `.env.local` existe
- Reinicie o servidor

**Login não funciona**

- Verifique se Google está enabled no Firebase
- Adicione `localhost:3000` em Authorized domains

**Foto não aparece**

- Normal, nem sempre o Google retorna
- Fallback: ícone azul aparece

---

## 📚 Mais Informações

- 📖 [README.md](./README.md) - Documentação completa
- 🔐 [SETUP_FIREBASE.md](./SETUP_FIREBASE.md) - Como usar Firebase
- 🚀 [DEPLOY.md](./DEPLOY.md) - Como fazer deploy
- 🧙 [TECNICO.md](./TECNICO.md) - Documentação técnica

---

## 🎓 O Projeto Atende

✅ Autenticação com Google  
✅ Captura dados (nome, email, foto)  
✅ Context API para estado global  
✅ 3 telas (Home, Apresentação, Cadastro)  
✅ Formulário com dados pré-preenchidos  
✅ Gera JSON com dados  
✅ Design responsivo  
✅ Pronto para deploy

---

## 🆘 Precisa de Ajuda?

Verifique:

1. [SETUP_FIREBASE.md](./SETUP_FIREBASE.md) para erro de autenticação
2. [TECNICO.md](./TECNICO.md) para entender a arquitetura
3. [DEPLOY.md](./DEPLOY.md) para fazer deploy
4. Console do navegador (F12) para ver erros

---

**Bom desenvolvimento! 🚀**

---

_Última atualização: 27 de Março de 2024_
