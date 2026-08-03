# Implementation Guide

This document breaks the refactor into concrete files, functions, and execution order. Read it alongside `plan.md`.

---

## 1. Data models

### Item (`packages/shared/src/schema/item.ts`)

Keep the unified `Item` interface but add fields needed for ported mechanics:

```ts
export interface Item {
  id: string;
  name: string;
  type: ItemType;
  equipType?: string;
  rarity: string;
  minLevel: number;
  maxLevel?: number | null;
  scaling: Record<string, number>;
  statOverrides?: Record<number, Record<string, number>>;
  jewelSlots?: number;
  description?: string | null;
  statType?: string;
  obtainedBy?: string[];
  tags?: string[];
  flags?: Record<string, unknown>;

  // new fields for dynamic mechanics
  imbue?: string;              // e.g. "heat", "cold"
  dragonColor?: string;        // e.g. "red", "blue"
  requiresMagic?: string[];    // Arcanium armor matching
}
```

### Modifier / Rule (`packages/shared/src/schema/modifier.ts`)

Extend `Rule` union with new rule types needed for Woody mechanics:

```ts
export type Rule =
  | { type: 'flatStat'; stat: string; value: number; per10?: number }
  | { type: 'steppedStat'; stat: string; per10: number; cap?: { level: number } }
  | { type: 'priorityFill'; per10: Record<string, number>; order: string[]; fallback: string }
  | { type: 'addSocket'; amount: number }
  | { type: 'percentageBuff'; stats: string[]; value: number }
  | { type: 'imbuedBonus'; ratio: number }      // replaces placeholder
  | { type: 'dragonBonus'; color: string }
  ;
```

### GameConfig (`packages/shared/src/schema/game-config.ts`)

Add Woody-specific scaling tables:

```ts
export interface GameConfig {
  maxLevel: number;
  pointsPerLevel: number;
  statPointMaxFormula: string;
  scalings: {
    power: number;
    defense: number;
    substat: number;
    rounding: 'floor' | 'round';
    // new
    toStat?: Record<string, number>;
    imbuedStatType?: Record<string, Record<string, number>>;
    imbuedMulti?: Record<string, number>;
    dragon?: { colors: string[]; type: Record<string, number> };
  };
  statRegistry: Record<string, StatDef>;
  buildTypes: BuildType[];
  playerTransforms: Record<string, PlayerTransform>;
  playerConstraints?: {
    validation?: {
      equipTypeExclusive?: string[][];
      namePatternExclusive?: string[][];
      duplicateItemRule?: string;
      statTypeMatch?: boolean;
    };
    awakeningLevel?: number;
    buildStats?: string[];
    fiftyPercentRule?: boolean;
  };
  arcaniumAttunements?: {
    baseLevel: number;
    itemMultiplier: Record<string, number>;
    epValue: { power: number; defense: number; substat: number };
    magics: Record<string, Record<string, number>>;
  };
  amuletVariants?: {
    types: string[];
    tiers: Record<string, { levelRange: number[]; scaling: Record<string, number> }>;
  };
  formulas?: Formulas;
}

export interface FormulaDef {
  expression?: string;
  params?: Record<string, unknown>;
  description?: string;
  status?: string;
}

export type Formulas = Record<string, FormulaDef>;
```

### Build (`packages/shared/src/schema/build.ts` — new file)

```ts
export interface BuildSlot {
  key: string;
  armorId?: string;
  level: number;
  enchantId?: string;
  modifierId?: string;
  gemIds: string[];
  attunement?: string | null;
  amuletVariant?: { type: string; tier: string } | null;
}

export interface BuildPlayer {
  level: number;
  spirit: number;
  magic: number;
  strength: number;
  weapons: number;
  awakened: boolean;
}

export interface BuildObject {
  version: string;
  player: BuildPlayer;
  selectedMagic: string[];
  selectedFS: string[];
  slots: BuildSlot[];
}

export interface SavedBuild {
  id: string;
  name: string;
  version: string;
  build: BuildObject;
  savedAt: string;
  source: 'local' | 'online';
}
```

### MongoDB collections

- `items` — items, gems, etc.
- `modifiers` — enchants, modifiers, factions.
- `config` — `game-config` and `formulas` documents.
- `users` — BetterAuth users + `roles` array, `maxBuilds`, `extraBuildSlots`.
- `builds` — saved builds.
- `apiKeys` — scoped API keys.
- `internalKeys` — server-to-server keys.
- `adminIds` — Discord IDs that auto-promote to admin.
- `roles` — RBAC roles (`_id`, `name`, `color`, `description`, `permissions`, `system`).

---

## 2. Engine (`packages/shared/src/engine/`)

### Move existing logic

1. Create `packages/shared/src/engine/index.ts`.
2. Move these functions from `packages/web/src/lib/stats.ts`:
   - `computeItemStats`
   - `computeEP`
   - `getSlotStats`
   - `aggregateBuildStats`
   - `applyModifier`
   - `validateSlotItem`
   - `effectiveMagicSlots`
   - `effectiveFsSlots`
   - `getArcaniumStats`
   - `getAmuletVariantStats`
   - `secondaryStatEffect`
3. Import them in `packages/web/src/lib/stats.ts` so the builder keeps working during the move.

### Port missing Woody mechanics

#### Imbued

In `computeItemStats`, if `item.imbue` is set, add:

```ts
const imbuedTable = config.scalings.imbuedStatType?.[item.imbue];
if (imbuedTable) {
  for (const [stat, addMult] of Object.entries(imbuedTable)) {
    const toStat = config.scalings.toStat?.[stat] ?? config.scalings.substat;
    const imbuedMulti = config.scalings.imbuedMulti?.[stat] ?? config.scalings.imbuedMulti?.substat ?? 1;
    const accessoryPenalty = (item.type === 'accessory' && !item.tags?.includes('amulet')) ? 0.75 : 1;
    const add = addMult * level * toStat * 1.5 * imbuedMulti * accessoryPenalty;
    out[stat] = (out[stat] ?? 0) + round(add, config.scalings.rounding);
  }
}
```

#### Dragon

If `item.dragonColor` is set:

```ts
const dragonMulti = config.scalings.dragon?.type?.[item.dragonColor] ?? 1;
for (const [stat, mult] of Object.entries(item.scaling)) {
  out[stat] = round(mult * level * constant * dragonMulti, config.scalings.rounding);
}
```

#### Gilded

In `getSlotStats`, after applying modifier, if any effect is `addSocket`, increase the effective `jewelSlots` count for that slot.

#### Arcanium armor

In `BuildManager.fixBuildItems`, instead of matching by name, use `item.requiresMagic`:

```ts
if (item.requiresMagic) {
  const hasRequired = item.requiresMagic.some(m => selectedMagic.includes(m));
  if (!hasRequired) clearSlot(slot);
}
```

#### Formula-driven engine

`GameConfig` includes `formulas?: Formulas` from the seeded `formulas.jsonc`. The engine evaluates these formulas instead of hardcoded math:

- `healthFormula` → `_health`
- `vitalityScaling` → vitality multiplier in `getSlotStats`
- `substatEfficiency` → percentage display in `secondaryStatEffect`
- `statPointMaxFormula` → max points in `BuildManager`

A safe `evalFormulaSafe` helper falls back to the previous hardcoded math if a formula is missing or invalid. `evalFormulaDef` merges params first, then runtime values, so runtime values override seeded defaults.

---

## 3. Build-code system (`packages/shared/src/buildCode/`)

### Files

- `packages/shared/src/buildCode/index.ts` — `encodeBuild`, `decodeBuild`, `tryLoadBuild`, `migrateBuild`.
- `packages/shared/src/buildCode/base64.ts` — base64url encode/decode.
- `packages/shared/src/buildCode/legacy.ts` — AOGearBuilder delimited-code migration.
- `packages/shared/src/buildCode/validate.ts` — `validateBuild`.

### Encode

```ts
export function encodeBuild(build: BuildObject): string {
  return base64urlEncode(JSON.stringify({ ...build, version: CURRENT_BUILD_VERSION }));
}
```

### Decode + migrate

```ts
export function decodeBuild(code: string): BuildObject | null {
  try {
    const json = base64urlDecode(code);
    const parsed = JSON.parse(json);
    return migrateBuild(parsed);
  } catch {
    return null;
  }
}

export function tryLoadBuild(code: string): { build: BuildObject; migrated: boolean } | null {
  const decoded = decodeBuild(code);
  if (decoded) return { build: decoded, migrated: false };
  const legacy = migrateLegacyCodeString(code);
  if (legacy) return { build: legacy, migrated: true };
  return null;
}
```

### Migrate

```ts
export const CURRENT_BUILD_VERSION = '2026.1';

export function migrateBuild(build: any): BuildObject | null {
  if (!build || typeof build !== 'object') return null;
  if (build.version === CURRENT_BUILD_VERSION) return build as BuildObject;

  if (build.version === '2026.0') return { ...build, version: CURRENT_BUILD_VERSION } as BuildObject;

  // Legacy AOGearBuilder code string
  if (typeof build.code === 'string') return migrateLegacyCodeString(build.code);
  if (typeof build === 'string') return migrateLegacyCodeString(build);

  return null;
}
```

### Validate

```ts
export function validateBuild(
  build: BuildObject,
  items: Item[],
  modifiers: ModifierDef[],
  config: GameConfig
): { valid: boolean; reason?: string } {
  if (!build.version) return { valid: false, reason: 'Missing version' };
  if (build.player.level < 1 || build.player.level > config.maxLevel) {
    return { valid: false, reason: 'Invalid player level' };
  }
  const itemIds = new Set(items.map(i => i.id));
  const modIds = new Set(modifiers.map(m => m.id));
  for (const slot of build.slots) {
    if (slot.armorId && !itemIds.has(slot.armorId)) {
      return { valid: false, reason: `Unknown item ${slot.armorId}` };
    }
    if (slot.enchantId && !modIds.has(slot.enchantId)) {
      return { valid: false, reason: `Unknown enchant ${slot.enchantId}` };
    }
    if (slot.modifierId && !modIds.has(slot.modifierId)) {
      return { valid: false, reason: `Unknown modifier ${slot.modifierId}` };
    }
    for (const gemId of slot.gemIds) {
      if (!itemIds.has(gemId)) return { valid: false, reason: `Unknown gem ${gemId}` };
    }
  }
  return { valid: true };
}
```

### Legacy migration

Old code format: `armor,enchant,modifier,gem1,gem2,...,level|...`

Parse per slot, map IDs to new 3-char IDs, convert to `BuildSlot`. If parsing fails, return `null`.

---

## 4. localStorage handling (`packages/web/src/lib/buildStorage.ts`)

### Constants

```ts
const LS_KEY = 'aotools.savedBuilds';
```

### Read and validate

```ts
export function loadLocalBuilds(deps: BuildStorageDeps): SavedBuild[] {
  migrateLegacyLocalStorage(deps);
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) return [];
  const entries: any[] = JSON.parse(raw);
  const valid: SavedBuild[] = [];
  for (const entry of entries) {
    const loaded = tryLoadBuild(typeof entry.build === 'string' ? entry.build : encodeBuild(entry.build));
    if (!loaded) continue;
    const validation = validateBuild(loaded.build, deps.items, deps.modifiers, deps.config);
    if (!validation.valid) continue;
    valid.push({ id: entry.id || crypto.randomUUID(), name: entry.name || 'Unnamed build', version: loaded.build.version, build: loaded.build, savedAt: entry.savedAt || now(), source: 'local' });
  }
  saveLocalBuildsRaw(valid);
  return valid;
}
```

### Save

```ts
export function saveLocalBuild(build: SavedBuild) {
  const builds = loadLocalBuilds();
  const idx = builds.findIndex(b => b.id === build.id);
  if (idx >= 0) builds[idx] = build; else builds.push(build);
  localStorage.setItem(LS_KEY, JSON.stringify(builds));
}
```

### UI behavior

- Load dialog calls `loadLocalBuilds()`.
- Invalid entries shown with a red badge and a delete button.
- Clicking an entry runs `tryLoadBuild` and notifies on failure.

---

## 5. Online build persistence (`packages/api/src/routes/builds.ts`)

### Endpoints

```ts
new Elysia({ prefix: '/builds' })
  .post('/', createBuild)
  .get('/me', listMyBuilds)
  .get('/:shortId', getBuild)
  .patch('/:shortId', updateBuild)
  .delete('/:shortId', deleteBuild);
```

### Create

```ts
async function createBuild({ body, auth }) {
  const ownerId = auth.userId; // Discord account ID
  const type = body.type || 'gear';
  const count = await db.collection('builds').countDocuments({ ownerId, type });
  const max = await getMaxBuilds(ownerId, type);
  if (count >= max) return { error: 'Build limit reached' };

  const shortId = await generateShortId(10);
  await db.collection('builds').insertOne({
    shortId,
    ownerId,
    type,
    name: body.name,
    build: body.build,
    isPublic: body.isPublic ?? true,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  return { shortId };
}
```

### Max builds override

```ts
async function getMaxBuilds(ownerId: string, type: string): Promise<number> {
  const user = await db.collection('user').findOne({ id: ownerId });
  return user?.maxBuilds?.[type] ?? user?.extraBuildSlots?.[type] ?? 100;
}
```

---

## 6. Sharing routes (`packages/web`)

- `/b/[shortId]/+page.server.ts`:
  - Fetch build from API.
  - Redirect to `/builder?shortId=${shortId}&code=${encodeBuild(build)}`.
- `/builder/+page.server.ts`:
  - Read `?code=...` and `?shortId=...`.
  - Decode code with `tryLoadBuild` and pass `initialBuild` to the UI.
- `/builder/+page.svelte`:
  - On first render, apply `data.initialBuild` to the `BuildManager`.
  - Buttons: Share URL, Copy Code, Load Code, Save Local, Save Online.
  - If invalid code is pasted, show toast and do not crash.

---

## 7. Auto IDs (`packages/api/src/lib/itemIds.ts`)

3-character alphanumeric random IDs.

- `generateItemId()` checks the `items` collection.
- `generateUniqueId(collections)` checks the requested collections (`items` and/or `modifiers`) so item and modifier IDs never collide.

Used in:

- `POST /api/admin/items` — `const id = body.id || await generateItemId();`
- `POST /api/admin/modifiers` — `const id = body.id || await generateUniqueId(['items', 'modifiers']);`

---

## 8. RBAC

### Roles

Roles are stored in the `roles` collection. Built-in roles are seeded on startup:

- `admin` — full access (`*`)
- `moderator` — admin panel + read/write items, modifiers, config, formulas; read users and reports.
- `editor` — read/write items, modifiers, config, formulas; no admin panel.
- `user` — normal user; build read/write only.

Users can be assigned **multiple roles** (Discord-like). Custom roles can be created from `/admin/platform`.

### Permission matrix (dot-separated; API keys may use colons, e.g. `builds:write`)

| Resource/Action | Read | Write |
|---|---|---|
| Items | `items.read` | `items.write` |
| Modifiers | `modifiers.read` | `modifiers.write` |
| Game Config | `config.read` | `config.write` |
| Formulas | `formulas.read` | `formulas.write` |
| Users | `users.read` | `users.write` |
| Roles | `roles.read` | `roles.write` |
| API Keys | `keys.read` | `keys.write` |
| Internal Keys | `internalKeys.read` | `internalKeys.write` |
| Admin IDs | `adminIds.read` | `adminIds.write` |
| Stats | `stats.read` | — |
| Reports | `reports.read` | `reports.write` |
| Builds | `builds.read` | `builds.write` |
| Full admin override | `admin` | `admin` |

### API guard

`resolveAuth` loads the user’s `roles`, resolves each role’s permissions, and attaches a `permissions` array to the session context. Internal keys bypass all checks. API keys use their `scopes` array as permissions.

```ts
function requirePermission(auth: AuthContext, permission: string) {
  if (auth.type === 'internal') return true;
  if (auth.type === 'apiKey') return hasPermission(auth.scopes, permission);
  if (auth.type === 'session') return hasPermission(auth.permissions, permission);
  return false;
}
```

Each admin route group registers an `onBeforeHandle` guard that checks the appropriate read/write permission based on the HTTP method.

### Admin UI gating

- Root layout loads `permissions` from `GET /api/me` and passes them to `AppShell`.
- `AppShell` shows the Admin link if the user has any game or platform admin permission.
- `AppShell` has a custom top-left toggle button that opens/closes the sidebar; the sidebar is hidden by default.
- `Sidebar` shows `Game Data` and `Platform` links independently based on those permission sets.
- Pages use `hasPermission(permissions, PERMISSIONS.X)` to show/hide sections, buttons, and fields.

---

## 9. API keys

### Scopes

- `read` — read public data (higher rate limit than anonymous).
- `builds:read` — list and read own builds.
- `builds:write` — create/update/delete own builds.
- `admin` — admin panel routes.
- Wildcards such as `builds.*` are also supported.

### Rate limits

- Anonymous: 6 req/min.
- API key: configurable per key.
- Admin session / internal: unlimited.

---

## 10. Builder UI changes

### Toolbar

- `Random Build`, `Reset`, `Share` (copies `/builder?code=...`), `Copy Code`, `Load Code`, `Save Local`, `Save Online`.
- `Save Online` creates a new build or updates the existing one if `shortId` is in the URL.
- Toasts for feedback; invalid codes are rejected without crashing.

### URL load

- `/builder?code=...` loads the build via `tryLoadBuild` on the server and passes it to the UI.
- `/b/{shortId}` server-redirects to `/builder?shortId=...&code=...`.

---

## 11. Admin UI

### Game Data page (`/admin`)

Two-column layout (50/50):

- Left column: item image grid using `packages/web/src/lib/components/Item.svelte`, with search and create. Clicking an item opens a full-screen modal. Items without an image fall back to the item name.
- Right column: collapsible dropdowns for Modifiers, Game Config, and Formulas.
- Item schema includes an `imageUrl` field so images can be populated per item.
- **Item/modifier creation flow** — clicking "Create" opens the modal first with a blank form. The user fills in the fields, and the `id` is auto-generated on save. The `id` field is read-only for existing records and hidden for new records.
- **Game Config UI** — split into color-coded collapsible subsections (Core, Stat Registry, Build Types, Player Mechanics, Arcane & Amulets) using `ConfigSubSection`.
- **Modifiers** — also support `imageUrl` so enchants/modifiers render images in the builder picker.

New reusable components:

- `packages/web/src/lib/components/ui/FullscreenModal.svelte` — full-screen modal with padding, reusable for future `/report` approvals.
- `packages/web/src/lib/components/ui/ConfigSection.svelte` — collapsible section header.
- `packages/web/src/lib/components/ui/ConfigSubSection.svelte` — smaller collapsible subsection with a colored left border.

### IDs and image migration

- Script: `packages/api/src/scripts/migrateItemIds.ts`.
- Reads the old `AOTools.items-woody` collection as the source of 3-char alphanumeric IDs and `imageId` URLs.
- For current items and modifiers, matches by name (exact, then base name with `[...]` suffixes stripped).
- Matched records adopt the old 3-char ID and image. Unmatched records get a newly generated unique 3-char ID.
- Backs up `items` and `modifiers` to `*-migration-backup` collections first.
- Seeds the `formulas` config document from `data/config/formulas.jsonc` if it does not exist.

### Platform page (`/admin/platform`)

Sections for platform management:

- Roles — create, edit permissions, delete custom roles.
- Users — search, assign multiple roles per user.
- API Keys — create, set scopes, update, delete.
- Internal Keys — create, update, delete.
- Admin IDs — add/remove Discord IDs that auto-promote to admin.

### Modifier effects editor

- File: `packages/web/src/lib/components/admin/ModifierEffectsEditor.svelte`.
- Replaces the raw JSON `effects` field in the modifier editor.
- Supports rule types: `flatStat`, `steppedStat`, `scaledStat`, `priorityFill`, `scaledByBaseStatCount`, `addSocket`, `statOverride`, `multiplyStats`, `percentageBuff`, `validateExclusion`, `setVisual`, `imbuedBonus`, `dragonBonus`, `vitalityScaling`.
- Unknown rule types fall back to a raw JSON card.

### Item stat overrides editor

- File: `packages/web/src/lib/components/admin/StatOverridesEditor.svelte`.
- Replaces the raw JSON `statOverrides` field in the item editor.
- Table rows: `10, 20, ..., maxLevel`.
- Add/remove stat columns from `config.statRegistry`.

---

## 12. Tests

### Engine tests

- Formula-driven health/vitality/substat outputs match the previously hardcoded values with the seeded formulas.
- Missing/invalid formulas fall back to hardcoded values.

### Build-code tests

- Encode/decode round-trip.
- Migration from legacy code works.
- Invalid code returns null and does not crash.

### Build persistence tests

- Create/list/update/delete builds.
- 100-build limit enforced.
- Override allows more.

### RBAC tests

- Admin role has all permissions; `editor` can edit items but not users.
- API key scopes with colons and wildcards normalize to dot permissions.
- Custom roles can be created and enforce their permissions.
- Multiple roles merge permissions correctly.

### API key tests

- Anonymous rate limit.
- Key scopes enforced.

---

## 13. Execution order

1. Stabilize repo.
2. Seed data & fix config UI.
3. Auto item IDs.
4. Move engine to shared + port missing mechanics.
5. Build-code encode/decode/migrate/validate.
6. localStorage + legacy migration.
7. Online build persistence + short links.
8. Builder UI integration.
9. RBAC + API key scopes.
10. Formula-driven engine + admin UI editors.
11. Tests.
12. Final `check/test/build`.

---

## 13. Open questions

- API key `read` scope is optional for public endpoints; public read remains open.
- Short links are editable only by the owner.
- Old AOGearBuilder localStorage keys are removed after migration.
