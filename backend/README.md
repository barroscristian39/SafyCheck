# SafeCheck Backend

API Node.js + Express para o sistema de inspeção SafeCheck.

## Setup

```bash
npm install
```

## Environment

Copie `.env.example` para `.env` e configure as variáveis:

```bash
cp .env.example .env
```

## Development

```bash
npm run dev
```

A API rodará em `http://localhost:3000`

## Build

```bash
npm run build
npm start
```

## Lint

```bash
npm run lint
```

## Type Check

```bash
npm run type-check
```

## Estrutura

```
src/
├── index.ts          # Entry point
├── routes/           # API routes
├── controllers/      # Business logic
├── services/         # Services
├── models/           # Database models
├── middleware/       # Express middleware
├── utils/            # Utilities
└── types/            # TypeScript types
```

## API Routes

- `GET /health` - Health check
- `POST /auth/login` - Login
- `POST /auth/register` - Register
- `POST /auth/oauth` - OAuth login
- `POST /checklists` - Create checklist
- `GET /checklists` - List checklists
- `GET /checklists/:id` - Get checklist
- `POST /inspections` - Create inspection
- `PUT /inspections/:id` - Update inspection
- `GET /reports` - List reports
- `POST /reports/generate` - Generate report
