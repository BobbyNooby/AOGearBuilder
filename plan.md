# Aotools Refactor Plan

> Target: `aotools` monorepo.  
> Goal: port the useful parts of the AOGearBuilder/Woody calculation engine into aotools, make the build system fully online (with offline fallback), and complete RBAC/API keys.

---

## Locked-in decisions

| Decision | Value |
|---|---|
| Calculation engine | Client-side only, moved to `packages/shared` |
| Build-code format | base64url-encoded JSON, versioned as `2026.1` |
| Short-link ID length | 10 alphanumeric characters |
| localStorage key | `aotools.savedBuilds` |
| Invalid builds | Notify the user and reset; never crash |
| Legacy builds | Auto-migrate on load/check; mark invalid if unrecoverable |
| Build limit | 100 per Discord account per builder type (`gear` now, `ship` later) |
| Public read access | Open; API keys for builds/admin |
| Item IDs | 3-character auto-generated alphanumeric random IDs |
| Ship builder | Backlog |

---

## Phase 1 — Baseline & data

1. Stabilize: `pnpm check`, `pnpm test`, `pnpm build` must pass.
2. Restore `AOPlanningRework` data source so `pnpm db:seed` populates items, modifiers, config, and formulas.
3. Expand `SchemaForm` to edit nested config fields (`scalings`, `arcaniumAttunements`, `amuletVariants`, `playerConstraints`) instead of raw JSON.

## Phase 2 — Auto item IDs

1. Port the 3-character alphanumeric random ID generator with collision retry.
2. Update `POST /api/admin/items` to auto-generate IDs when omitted.
3. Update the admin item editor: ID read-only for new items, editable for existing items.

## Phase 3 — Calculation engine in shared package

1. Move working calc logic from `packages/web/src/lib/stats.ts` into `packages/shared/src/engine/`.
2. Port missing mechanics from AOGearBuilder/Woody:
   - Imbued item scaling
   - Dragon multipliers and color detection
   - Gilded gem-slot bonus
   - Arcanium armor magic matching
   - Vitality scaling
3. Keep the engine data-driven: rules, tags, and config control behavior, not hardcoded item names.

## Phase 4 — Build-code format

1. Define the canonical build object:
   - `version: "2026.1"`
   - `player` stats
   - `selectedMagic`, `selectedFS`
   - `slots` with `armorId`, `enchantId`, `modifierId`, `gemIds`, `attunement`, `amuletVariant`, `level`
2. Encode: `base64url(JSON.stringify(build))`.
3. Decode → migrate → validate.
4. Add versioned migration pipeline: `migrateBuild(build)`.

## Phase 5 — Build validation

1. Add `validateBuild(build, items, modifiers, config) -> { valid, reason }`.
2. Add `tryLoadBuild(code, items, modifiers, config) -> { build, migrated } | null`.
3. On invalid: show a toast and reset the builder to default.

## Phase 6 — localStorage saves

1. Use `localStorage` key `aotools.savedBuilds`.
2. Store `{ id, name, version, build, savedAt, source }`.
3. On load dialog open: validate all entries, auto-migrate, mark invalid with delete option.

## Phase 7 — Legacy AOGearBuilder migration

1. Detect old keys: `savedBuilds`, `savedShipBuilds`, `gearBuild`, `shipBuild`.
2. Convert old `{ name, code, builderVersion, buildType }` entries to `2026.1`.
3. Mark unrecoverable entries as invalid.

## Phase 8 — Online build persistence

1. Create `builds` collection with `shortId`, `ownerId`, `type`, `name`, `build`, `isPublic`, timestamps.
2. Add CRUD endpoints and enforce the 100-build limit per `(ownerId, type)`.
3. Add override field `users.maxBuilds` or `extraBuildSlots`.

## Phase 9 — Sharing

1. Short link: `/b/{shortId}` → redirect to `/builder?code=<encoded-build>`.
2. Raw build-code link: `/builder?code=<encoded-build>`.
3. Both work for non-logged users.

## Phase 10 — RBAC completion

1. Roles stored in `roles` collection; built-in `admin`, `moderator`, `editor`, `user`.
2. Discord-like multiple roles per user.
3. Custom role creation/editing in `/admin/platform`.
4. Reusable permission guard for API and UI.
5. Gate admin pages and actions.

## Phase 11 — API keys

1. Scopes: `read`, `builds:read`, `builds:write`, `admin` (plus full dot permission list).
2. No server-side calculation scope.
3. Per-key rate limits.

## Phase 12 — Admin UI redesign + ID/image migration

1. `/admin` — Game Data page: two columns (item image grid left, modifiers/config/formulas dropdowns right).
2. Full-screen item/modifier modal editor; create flow opens the modal first, then auto-generates the 3-char ID on save.
3. IDs read-only for existing items/modifiers; hidden during creation.
4. Item/modifier schema supports `imageUrl` for builder images.
5. Migrate current DB IDs/images from `AOTools.items-woody` (match by name, generate IDs for unmatched records).
6. Seed default formulas from `data/config/formulas.jsonc` on startup.
7. `/admin/platform` — Platform page: roles, users, API keys, internal keys, admin IDs.

## Phase 13 — Tests & verification

1. Unit tests for engine parity, build-code round-trip, validation, limits, RBAC, API keys, custom roles, legacy migration.
2. Final: `pnpm check && pnpm test && pnpm build`.

---

## Out of scope

- Ship builder (backlog).
- Server-side calculation endpoints.
- Discord role sync.
- `/report` item submission and approval workflow (backlog).
