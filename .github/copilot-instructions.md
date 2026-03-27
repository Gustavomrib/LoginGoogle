<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Auth App - Instruções para Copilot

## 📝 Descrição do Projeto

Sistema de autenticação web completo com React/Next.js que inclui:
- Login com Google via Firebase
- Apresentação de dupla de desenvolvimento
- Formulário de cadastro com geração de JSON
- Proteção de rotas
- Design responsivo com Tailwind CSS

## 🎯 Stack Tecnológico

- **Framework**: Next.js 14+ (React)
- **Linguagem**: TypeScript
- **Estilos**: Tailwind CSS
- **Autenticação**: Firebase Authentication (Google OAuth)
- **Estado Global**: Context API
- **Icons**: Lucide React
- **Deploy**: Vercel/Netlify

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx                  # Home page
│   ├── layout.tsx                # Root layout com AuthProvider
│   ├── apresentacao/page.tsx     # Página da dupla
│   ├── cadastro/page.tsx         # Formulário de cadastro
│   └── globals.css               # Estilos globais
├── components/
│   ├── Navbar.tsx                # Navegação
│   ├── Footer.tsx                # Rodapé
│   ├── LoginButton.tsx           # Botão de login Google
│   └── UserProfile.tsx           # Card de perfil
├── context/
│   └── AuthContext.tsx           # Context de autenticação
├── services/
│   └── firebase.ts               # Configuração Firebase
└── types/
    └── auth.ts                   # Types TypeScript

Documentação:
├── README.md                     # Documentação principal
├── QUICK_START.md                # Guia rápido
├── SETUP_FIREBASE.md             # Setup do Firebase
├── DEPLOY.md                     # Guia de deploy
└── TECNICO.md                    # Documentação técnica
```

## 🔐 Autenticação & Segurança

- Credenciais do Firebase em `.env.local` (nunca commit)
- Proteção com Context API
- Routes protegidas (redirect se não logado)
- onAuthStateChanged para persistência
- Logout com signOut do Firebase

## 🚀 Tarefas Comuns

### Editar dados da dupla
Arquivo: `src/app/apresentacao/page.tsx`
Procure por: `TEAM_MEMBERS`

### Adicionar campo no formulário
Arquivo: `src/app/cadastro/page.tsx`
Adicione um novo input e atualize `FormData` interface

### Mudar cores/design
Use classes Tailwind em qualquer arquivo `.tsx`
Referência: `https://tailwindcss.com/docs`

### Testar login localmente
```bash
npm run dev
# Acesse http://localhost:3000
```

### Build para produção
```bash
npm run build
npm run start
```

## 📚 Padrões Usados

- **'use client'** em componentes com interação
- **useAuth()** hook para acessar Context
- **useRouter** para navegação
- **useEffect** para effects
- **Type Safety** com TypeScript interfaces

## ✅ Checklist de Completude

- [x] Autenticação Google funcional
- [x] Proteção de rotas
- [x] Context API configurada
- [x] 3 páginas implementadas (Home, Apresentação, Cadastro)
- [x] Formulário com dados pré-preenchidos
- [x] Geração de JSON
- [x] Design responsivo
- [x] TypeScript com types
- [x] Documentação completa
- [x] Build sem erros
- [x] Pronto para deploy

## 🔗 Links Importantes

- Firebase Console: https://console.firebase.google.com
- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- TypeScript: https://www.typescriptlang.org/docs/

## 📞 Suporte

Cada arquivo .md possui documentação específica:
- **QUICK_START.md**: Para começar rápido
- **SETUP_FIREBASE.md**: Para configurar autenticação
- **DEPLOY.md**: Para fazer deploy
- **TECNICO.md**: Para entender a arquitetura
