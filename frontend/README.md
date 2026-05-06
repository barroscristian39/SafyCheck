# SafeCheck Frontend

Aplicação React + TypeScript + Vite para o sistema de inspeção SafeCheck.

## Setup

```bash
npm install
```

## Environment

Copie `.env.example` para `.env`:

```bash
cp .env.example .env
```

## Development

```bash
npm run dev
```

A app rodará em `http://localhost:5173`

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
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
├── main.tsx           # Entry point
├── App.tsx            # Root component
├── index.css          # Global styles
├── components/        # Reusable components
├── pages/             # Page components
├── hooks/             # Custom hooks
├── services/          # API services
├── stores/            # Zustand stores
├── types/             # TypeScript types
└── utils/             # Utilities
```

## Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **TanStack Query** - Data fetching
- **Zustand** - State management
- **Lucide React** - Icons
