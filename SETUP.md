# SafeCheck - Setup Guide

## Quick Start com Neon Database

### 1. Configurar Neon Database

1. Acesse [https://neon.tech](https://neon.tech)
2. Crie uma conta e faça login
3. Crie um novo projeto
4. Copie a **Connection String** (ela terá este formato):
   ```
   postgresql://user:password@project.neon.tech/safecheck?sslmode=require
   ```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Adicione a DATABASE_URL ao arquivo .env:
# DATABASE_URL=postgresql://user:password@neon.tech/safecheck?sslmode=require
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure (opcional, pode manter os valores padrão):
# VITE_API_URL=http://localhost:3000
```

### 4. Rodar o Projeto

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Será criada as tabelas automaticamente na primeira execução
# API rodará em http://localhost:3000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# App rodará em http://localhost:5173
```

## API Endpoints

### Auth
- `POST /auth/register` - Registrar novo usuário
- `POST /auth/login` - Login
- `GET /auth/me` - Get current user (requer token)

### Companies
- `GET /companies` - List all companies
- `GET /companies/:id` - Get company
- `POST /companies` - Create company (admin only)
- `PATCH /companies/:id` - Update company (admin only)
- `DELETE /companies/:id` - Delete company (admin only)

### Units
- `GET /units/company/:company_id` - Get units by company
- `GET /units/:id` - Get unit
- `POST /units` - Create unit
- `PATCH /units/:id` - Update unit
- `DELETE /units/:id` - Delete unit

## Environment Variables

### Backend (.env)
```
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
MICROSOFT_CLIENT_ID=
MICROSOFT_CLIENT_SECRET=
STORAGE_TYPE=local
STORAGE_PATH=./uploads
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=
VITE_MICROSOFT_CLIENT_ID=
```

## Próximas Etapas

- [ ] Implementar rotas de Checklists
- [ ] Implementar rotas de Inspections
- [ ] Implementar geração de Reports
- [ ] Build Frontend com componentes
- [ ] Integração OAuth2
- [ ] Deploy

## Troubleshooting

### Erro de conexão com banco de dados
- Verificar `DATABASE_URL` está correto
- Confirmar que Neon projeto está ativo
- Testar conexão: `psql <DATABASE_URL>`

### Erro ao executar migrations
- Conferir permissões no banco
- Verificar se a string de conexão tem `sslmode=require`

### CORS errors no frontend
- Confirmar que backend está rodando em `http://localhost:3000`
- Verificar `VITE_API_URL` no `.env` do frontend

## Stack

- **Backend**: Node.js 18+, Express, TypeScript, PostgreSQL (Neon)
- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Auth**: JWT + OAuth2 ready
- **Database**: Neon PostgreSQL (serverless)
