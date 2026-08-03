# Aotools Monorepo

Arcane Odyssey build tools — now a monorepo with a separate public API and web frontend.

## Packages

| Package | Description | Runtime |
|---------|-------------|---------|
| `packages/api` | ElysiaJS + BetterAuth backend. Public read API, admin CRUD, API keys, rate limiting. | Bun |
| `packages/web` | SvelteKit frontend. Gear builder, item list, admin dashboard. | Bun/Node |
| `packages/shared` | Shared schemas and engine from AOPlanningRework. | TS |

## Development

```bash
# Install dependencies
pnpm install

# Start both API and web side-by-side
pnpm dev
```

- Web → http://localhost:3000
- API → http://localhost:4000

## Environment

Copy `.env.example` to `.env` and fill in values. Discord OAuth is optional for local dev.

## Production (Docker)

```bash
docker compose up --build
```

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all packages in dev mode |
| `pnpm build` | Build all packages |
| `pnpm check` | Type-check all packages |
| `pnpm test` | Run API integration tests with in-memory MongoDB |
| `pnpm db:seed` | Seed MongoDB from AOPlanningRework data |

## Public API

| Tier | Auth | Rate limit | Access |
|------|------|------------|--------|
| Public | None | 6 req/min / IP | Read-only |
| API Key | `X-API-Key` | Configurable per key | Scoped read/write |
| Internal | `X-Internal-Key` | Unlimited | Full access (web server only) |
| Admin | Discord OAuth session | Unlimited | Full access + key management |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for full project context, architecture, and development conventions.
