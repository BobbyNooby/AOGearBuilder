# @aotools/api

ElysiaJS + Bun backend for Arcane Odyssey build tools.

## Endpoints

| Route | Access | Description |
|-------|--------|-------------|
| `/api/public/*` | Public | Read-only items, modifiers, magics, config |
| `/api/admin/items` | RBAC | Item CRUD |
| `/api/admin/modifiers` | RBAC | Modifier CRUD |
| `/api/admin/config/*` | RBAC | Game config + formulas |
| `/api/admin/builds` | API key | Build save/load |
| `/api/admin/platform/*` | Admin | Users, API keys, roles |

## Auth tiers

| Tier | Auth | Rate limit | Access |
|------|------|------------|--------|
| Public | None | 6 req/min | Read-only |
| API Key | `X-API-Key` | Configurable | Scoped read/write |
| Internal | `X-Internal-Key` | Unlimited | Web server only |
| Admin | Discord OAuth | Unlimited | Full access |

## Running

```bash
pnpm dev                 # http://localhost:4000
pnpm build               # Production bundle
pnpm test                # Integration tests (in-memory MongoDB)
```

## Database

MongoDB via `mongodb` driver. Collections: `items`, `modifiers`, `config`, `magics`, `fightingStyles`, `builds`, `apiKeys`, `adminIds`, `roles`, `internalKeys`.

## Seeding

```bash
pnpm seed                      # Seed items, modifiers, magics from data/
pnpm seed:config               # Push game-config.jsonc → MongoDB
pnpm seed:config:dump          # Snapshot MongoDB → game-config.jsonc
pnpm seed:images               # Sync item image URLs
pnpm normalize:images          # Migrate old imageId/image → imageUrl
```

## Key files

| File | Purpose |
|------|---------|
| `src/index.ts` | ElysiaJS app entry, route registration |
| `src/routes/` | API route handlers |
| `src/middleware/adminGuard.ts` | RBAC permission enforcement |
| `src/scripts/` | Seed scripts (seedGameConfig, seedImages, dumpGameConfig) |
| `src/test/integration.test.ts` | 19 integration tests |
