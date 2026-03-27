# 🚀 Guia de Deploy

## Opção 1: Deploy em Vercel (⭐ Recomendado)

Vercel é a plataforma oficial para Next.js e oferece deploy automático com GitHub.

### Passo a Passo

1. **Prepare o Repositório**

   ```bash
   git init
   git add .
   git commit -m "Initial commit: Auth App"
   git branch -M main
   ```

2. **Crie um Repositório no GitHub**
   - Acesse [github.com/new](https://github.com/new)
   - Crie um repositório público ou privado
   - Exemplo: `seu-usuario/auth-app`

3. **Push para GitHub**

   ```bash
   git remote add origin https://github.com/seu-usuario/auth-app.git
   git push -u origin main
   ```

4. **Deploy no Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Clique "New Project"
   - Selecione seu repositório
   - Clique "Import"

5. **Configure Variáveis de Ambiente**
   - Na tela de imports, vá para "Environment Variables"
   - Adicione:
     ```
     NEXT_PUBLIC_FIREBASE_API_KEY
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
     NEXT_PUBLIC_FIREBASE_PROJECT_ID
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
     NEXT_PUBLIC_FIREBASE_APP_ID
     ```
   - Clique "Deploy"

6. **Configure Firebase**
   - Firebase Console > Authentication > Settings
   - Authorized domains: Adicione seu domínio Vercel
   - Exemplo: `seu-app.vercel.app`

7. **Pronto! 🎉**
   - Seu app está live em `seu-app.vercel.app`

---

## Opção 2: Deploy em Netlify

### Passo a Passo

1. **Prepare o Projeto**

   ```bash
   npm run build
   ```

2. **Crie uma Conta Netlify**
   - Acesse [netlify.com](https://netlify.com)
   - Conecte seu GitHub

3. **Novo Site**
   - Clique "New site from Git"
   - Selecione seu repo
   - Build command: `npm run build`
   - Publish dir: `.next`

4. **Configure Variáveis de Ambiente**
   - Site settings > Build & deploy > Environment
   - Adicione as mesmas variáveis do Firebase

5. **Deploy Automático**
   - Cada push para `main` faz deploy automático

---

## Opção 3: Deploy Manual em Servidor

### Com Node.js + PM2

```bash
# 1. SSH para seu servidor
ssh user@seu-servidor.com

# 2. Clone o repositório
git clone https://github.com/seu-usuario/auth-app.git
cd auth-app

# 3. Instale dependências
npm install --production

# 4. Build
npm run build

# 5. Configure variáveis
nano .env.local
# Cole suas variáveis Firebase

# 6. Inicie com PM2
npm install -g pm2
pm2 start npm -- start -name "auth-app"
pm2 startup
pm2 save
```

### Com Docker

```bash
# 1. Crie Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]

# 2. Build image
docker build -t auth-app .

# 3. Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_FIREBASE_API_KEY=XXX \
  auth-app
```

---

## Opção 4: Deploy em AWS Amplify

1. **Push para GitHub** (como acima)
2. **AWS Amplify Console**
   - Clique "Deploy an app"
   - Selecione GitHub
   - Selecione seu repositório
   - Clique "Save and deploy"
3. **Configure Environment Variables**
   - App settings > Environment variables
   - Adicione variáveis do Firebase
4. **Aguarde o Deploy**
   - Amplify faz build automático e deploy

---

## ✅ Checklist de Deploy

Antes de fazer deploy:

- [ ] Testei localmente: `npm run dev`
- [ ] Sem erros no console
- [ ] Firebase configurado
- [ ] `.env.local` **NÃO** foi committed
- [ ] `.gitignore` inclui `.env.local`
- [ ] README.md atualizado com link de deploy
- [ ] Teste de login functiona com Google

Após fazer deploy:

- [ ] Acesse a URL de produção
- [ ] Teste login com Google
- [ ] Verifique se dados são capturados
- [ ] Teste formulário de cadastro
- [ ] Verifique console para erros

---

## 🔗 URLs Úteis

| Serviço     | Link                            |
| ----------- | ------------------------------- |
| Vercel      | https://vercel.com              |
| Netlify     | https://netlify.com             |
| AWS Amplify | https://aws.amazon.com/amplify/ |
| GitHub      | https://github.com              |
| Firebase    | https://firebase.google.com     |

---

## 🆘 Troubleshooting

### Build falha com erro de tipos

```bash
npm run type-check
npm run lint
npm run build
```

### Firebase aceita mas login não funciona

- Adicione seu domínio de produção em Firebase > Authorized domains
- Reinicie a aplicação

### Variáveis de ambiente não são lidas

- Certifique-se que começam com `NEXT_PUBLIC_` para client-side
- Redeploy após adicionar

### Imagens ou assets não carregam

- Verifique se os arquivos estão em `public/`
- Verifique paths relativos

---

## 📊 Monitoramento em Produção

### Vercel Analytics

- Automático no Vercel
- Dashboard com métricas de performance

### Firebase Console

- Monitorar login attempts
- Verificar logs de autenticação

### Google Analytics (opcional)

```bash
npm install @react-google-analytics/core
# Configure em src/app/layout.tsx
```

---

## 🔄 Atualizações Futuras

Para atualizar seu app em produção:

```bash
# 1. Desenvolva localmente
git checkout -b feature/nova-feature
# ... fazer mudanças ...
npm run dev  # Teste

# 2. Commit e push
git add .
git commit -m "feat: adiciona nova funcionalidade"
git push origin feature/nova-feature

# 3. Abra PR no GitHub (se desejar review)
# ou direto:
git checkout main
git merge feature/nova-feature
git push origin main

# Deploy automático no Vercel! ✅
```

---

Parabéns! Seu app está pronto para o mundo! 🌍🚀
