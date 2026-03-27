# 🔐 Auth App - Autenticação com Google

Um sistema web completo de autenticação com Google, apresentação de dupla e cadastro de usuários. Desenvolvido com Next.js, TypeScript, Firebase e Tailwind CSS.

## 📸 Demonstração

- ✅ **Autenticação com Google** - Login seguro via Firebase OAuth
- ✅ **Perfil do Usuário** - Exibição de nome, email e foto
- ✅ **Apresentação da Dupla** - Cards com informações dos integrantes
- ✅ **Cadastro Completo** - Formulário com dados pré-preenchidos
- ✅ **Geração de JSON** - Exportação de dados do usuário
- ✅ **Design Responsivo** - Interface moderna e intuitiva
- ✅ **Proteção de Rotas** - Acesso restrito para usuários autenticados

---

## 👥 Integrantes

| Nome           | Papel                    | Email                    |
| -------------- | ------------------------ | ------------------------ |
| Seu Nome Aqui  | Desenvolvedor Full-Stack | seu.email@example.com    |
| Nome do Colega | Desenvolvedor Full-Stack | colega.email@example.com |

---

## 🛠️ Tecnologias Utilizadas

### Frontend

- **Next.js 14+** - React Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Firebase SDK** - Authentication

### Backend

- **Node.js** - Runtime
- **Firebase** - Authentication & Hosting

### DevOps

- **Vercel** - Deployment
- **GitHub** - Version Control

---

## 📦 Estrutura do Projeto

```
src/
├── app/
│   ├── layout.tsx           # Layout raiz com AuthProvider
│   ├── page.tsx             # Home page
│   ├── apresentacao/
│   │   └── page.tsx         # Apresentação da Dupla
│   ├── cadastro/
│   │   └── page.tsx         # Cadastro de Usuário
│   └── globals.css          # Estilos globais
├── components/
│   ├── Navbar.tsx           # Barra de navegação
│   ├── Footer.tsx           # Rodapé
│   ├── LoginButton.tsx      # Botão de login Google
│   └── UserProfile.tsx      # Exibição do perfil
├── context/
│   └── AuthContext.tsx      # Context API para autenticação
├── services/
│   └── firebase.ts          # Configuração do Firebase
└── utils/
    └── (utilitários)

.env.local                    # Variáveis de ambiente (não commit)
.env.example                  # Template de variáveis
SETUP_FIREBASE.md             # Guia de setup do Firebase
```

---

## 🚀 Iniciando Rápido

### Pré-requisitos

- Node.js 16+ instalado
- npm ou yarn
- Conta Google
- Projeto Firebase criado

### 1. Clone e Instale

```bash
cd c:\Users\Gustavo\auth-app
npm install
```

### 2. Configure Firebase

Siga o guia: [SETUP_FIREBASE.md](./SETUP_FIREBASE.md)

Resumidamente:

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com)
2. Ative autenticação com Google
3. Copie as credenciais
4. Atualize o arquivo `.env.local`

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Rode Localmente

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000)

---

## 📖 Como Usar

### 🏠 Home Page

- Exibe apresentação do projeto
- Botão "Entrar com Google"
- Após login: acesso às outras páginas

### 👥 Apresentação da Dupla

- Cards com informações de cada integrante
- Habilidades e interesses
- Visão geral do projeto

### 📝 Cadastro de Usuário

1. Preencha o formulário
2. Clique "Gerar Cadastro"
3. JSON é gerado automaticamente
4. Copie ou baixe o arquivo JSON
5. Dados também aparecem no console

### 📊 JSON Gerado

Exemplo de saída:

```json
{
  "timestamp": "2024-03-27T10:30:00.000Z",
  "usuario": {
    "nome": "João Silva",
    "email": "joao@example.com",
    "telefone": "(11) 99999-9999",
    "cidade": "São Paulo",
    "profissao": "Desenvolvedor",
    "bio": "Apaixonado por tecnologia"
  },
  "autenticacao": {
    "provider": "Google",
    "uid": "firebase_uid",
    "fotoURL": "https://..."
  },
  "metadata": {
    "navegador": "Mozilla/5.0...",
    "idioma": "pt-BR"
  }
}
```

---

## 🔐 Segurança

- ✅ Credenciais do Firebase em variáveis de ambiente
- ✅ Autenticação segura com Google OAuth
- ✅ Proteção de rotas (redirect se não autenticado)
- ✅ Context API para estado seguro
- ✅ Sem dados armazenados em servidores

---

## 🎨 Design & UX

- **Gradientes Modernos** - Background gradiente e componentes
- **Animações Suaves** - Transições e hover effects
- **Responsivo** - Mobile, tablet e desktop
- **Acessibilidade** - Semântica HTML5 correta
- **Dark Mode Ready** - Base para suporte a dark mode

---

## 📱 Responsividade

Testado em:

- ✅ Desktop (1920px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 767px)

---

## 🌐 Deploy

### Vercel (Recomendado)

```bash
# 1. Push para GitHub
git push origin main

# 2. Conecte seu repo ao Vercel
# https://vercel.com/new

# 3. Configure variáveis de ambiente
# NEXT_PUBLIC_FIREBASE_* = seus valores

# 4. Deploy automático!
```

### Netlify

```bash
npm run build
# Conecte a pasta 'out' ao Netlify
```

### Google Cloud Run

```bash
npm run build
gcloud run deploy auth-app --source .
```

---

## 🛠️ Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de desenvolvimento

# Build
npm run build            # Build para produção
npm run start            # Inicia servidor de produção

# Linting
npm run lint             # Verifica código com ESLint

# Tipos
npm run type-check       # Verifica tipos TypeScript
```

---

## 📚 Documentação

- [Next.js Docs](https://nextjs.org/docs)
- [Firebase Auth](https://firebase.google.com/docs/auth)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🐛 Troubleshooting

### Erro: "Cannot find Firebase config"

- Verifique se `.env.local` existe
- Confirme que `NEXT_PUBLIC_FIREBASE_*` estão definidas

### Erro: "Google login failed"

- Verifique se Google é provider ativo no Firebase
- Confirme que `localhost:3000` está em "Authorized domains"

### Foto do usuário não aparece

- Normal: nem sempre o Google retorna a foto
- Fallback: ícone de usuário será mostrado

### Dados não aparecem no console

- Abra DevTools: F12
- Vá para aba "Console"
- Faça login e preencha o formulário novamente

---

## 📄 Arquivos Importantes

| Arquivo                       | Descrição                     |
| ----------------------------- | ----------------------------- |
| `.env.local`                  | Credenciais (⚠️ Nunca commit) |
| `SETUP_FIREBASE.md`           | Guia de setup Firebase        |
| `src/context/AuthContext.tsx` | Lógica de autenticação        |
| `src/services/firebase.ts`    | Configuração Firebase         |
| `tailwind.config.ts`          | Configuração Tailwind         |

---

## 🤝 Contribuindo

Para modificações:

```bash
# 1. Crie uma branch
git checkout -b feature/sua-feature

# 2. Faça commit das mudanças
git commit -m "feat: descrição da mudança"

# 3. Push
git push origin feature/sua-feature

# 4. Abra Pull Request
```

---

## 📝 Licença

Este projeto é fornecido como está para fins educacionais.

---

## 🔗 Links Úteis

- 🌐 [Deploy Live](#) - Link do deploy (adicione aqui)
- 📧 Contato: seu.email@example.com
- 👥 GitHub: [@seu-usuario](https://github.com/seu-usuario)

---

## ✅ Checklist de Requisitos

Todos os requisitos do projeto foram implementados:

- ✅ Autenticação via Google
- ✅ Captura de dados (nome, email, foto)
- ✅ Context API para estado global
- ✅ Tela Home com login
- ✅ Tela Apresentação da Dupla
- ✅ Tela Cadastro com formulário
- ✅ Geração de JSON
- ✅ Proteção de rotas
- ✅ Design responsivo
- ✅ Código limpo e bem organizado
- ✅ README completo
- ✅ Pronto para deploy

---

<div align="center">

**Desenvolvido com ❤️ usando Next.js + Firebase**

[⬆ Voltar ao topo](#-auth-app---autenticação-com-google)

</div>
