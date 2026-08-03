# Arcane Odyssey Tools

Who would've thought my first ever coding project would be because of a Roblox game 🤷‍♂️

Website: https://tools.arcaneodyssey.net

## Changelogs

2026 Rework — Full monorepo rewrite with ElysiaJS API, SvelteKit 5 frontend, and formula-driven engine.

2024 — Nimbus Sea Part 1 site overhaul, efficiency points, secondary stat hover tooltips, ship builder, health calculator, Atlantean modifier, gems, amulets, jewels, share links, build codes, mobile UI, local save/load, ported to Svelte, GUI revamp.

2023 — Relaunch, Atlantean, gems, jewels, build codes, Svelte port, dark sea update, JSON/JQuery usage, metadata link preview, page icon, design update, barebones, first page.

## Packages

| Package | Description | Runtime |
|---------|-------------|---------|
| `packages/api` | ElysiaJS backend. Public API, admin CRUD, RBAC, rate limiting. | Bun |
| `packages/web` | SvelteKit 5 frontend. Gear builder, admin dashboard. | Bun/Node |
| `packages/shared` | Shared schemas and engine. | TS |

See [packages/api](packages/api/README.md), [packages/web](packages/web/README.md), [packages/shared](packages/shared/README.md) for per-package details.

## Development

```bash
pnpm install
pnpm dev          # API → http://localhost:4000, Web → http://localhost:3000
```

Copy `.env.example` to `.env` and fill in values. Discord OAuth is optional for local dev.

## Production

```bash
docker compose up --build
```

## Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all packages |
| `pnpm build` | Build all packages |
| `pnpm check` | Type-check all packages |
| `pnpm test` | Run integration tests |

## Public API

| Tier | Auth | Rate limit | Access |
|------|------|------------|--------|
| Public | None | 6 req/min / IP | Read-only |
| API Key | `X-API-Key` | Configurable | Scoped read/write |
| Admin | Discord OAuth | Unlimited | Full access |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for full project context, architecture, and development conventions.
