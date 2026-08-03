# CONTRIBUTING — AOGearBuilder

> For AI coding agents and new contributors: this document explains the project
> architecture, conventions, key files, and how to make changes. For day-to-day
> commands see `README.md`.

---

## 1. What this repo is

**AOGearBuilder is a full-stack monorepo for Arcane Odyssey (Roblox) build tools.**

Provides a **gear builder** (equip items, enchants, modifiers, gems, magics, calculate
stats), an **admin dashboard** (CRUD items/modifiers/config/formulas with RBAC), and a
**public API** (read-only + API-key-scoped write).

Core philosophy: game rules and balance formulas live in editable JSONC config and/or
MongoDB. When Vetex ships a balance patch, a maintainer edits config — no code deploy.

| Package | Role | Stack |
|---------|------|-------|
| `packages/api` | Backend REST API | ElysiaJS, Bun, MongoDB |
| `packages/web` | Frontend SPA | SvelteKit 5 (runes), Tailwind CSS |
| `packages/shared` | Shared engine + types | TypeScript |

Managed with **pnpm workspaces** and **Turborepo**.

---

## 2. How data flows

```
game-config.jsonc ──── pnpm seed:config ────► MongoDB ◄──── admin website edits
      ▲                                          │               (live, instant)
      │                                          │
      └──── pnpm seed:config:dump ◄──────────────┘
              (snapshot MongoDB → JSONC)
```

**MongoDB is the live database.** The JSONC files are a git-friendly snapshot for review,
bootstrapping, and coordinated changes. Neither direction "owns" the data.

| I want to... | |
|---|---|
| Edit an item (scaling, stats, rarity) | Admin website → MongoDB. Live immediately. |
| Add a new item | Admin website → MongoDB. |
| Edit a modifier/enchant/faction | Admin website → MongoDB. |
| Tune a formula param (vitality cap, EP) | Admin website → MongoDB. |
| Make a large coordinated config change | Edit JSONC → PR → `pnpm seed:config`. Reviewable diff. |
| Capture current DB state into git | `pnpm seed:config:dump` → commit updated JSONC. |
| Bootstrap a fresh deploy | `pnpm db:seed`. |
| Reset config to a known state | Git checkout old JSONC → `pnpm seed:config`. |

---

## 3. Architecture

```
game-config.jsonc ──seedGameConfig.ts──► MongoDB (config)
items.json (seed) ──seedItems.ts──────► MongoDB (items)
                                           │
                    ┌──────────────────────┼──────────────────────┐
                    ▼                      ▼                      ▼
              Elysia API              Elysia API             Elysia API
           /api/public/*           /api/admin/*           /api/admin/*
           (read-only)             (CRUD, RBAC)           (config CRUD)
                    │                      │                      │
                    ▼                      ▼                      ▼
           builder/+page.server.ts  admin/+page.server.ts  admin/+page.server.ts
                    │                      │                      │
                    ▼                      ▼                      ▼
           BuildManager.svelte.ts   +page.svelte           +page.svelte
           GearSlot → PickerModal   SchemaForm              SchemaForm
           BuildStats               FilterBar               ConfigSection
```

---

## 4. Data models

### Item fields
| Field | Type | Notes |
|-------|------|-------|
| id | string | Unique ID |
| name | string | Display name |
| type | ItemType | armor, weapon, shipPart, accessory, gem, enchant, modifier, magic |
| equipType | string? | chestpiece, legging, helmet, neck, arm, waist, back, bladed, dual bladed, etc. |
| rarity | string | None through Sunken |
| minLevel | number | Minimum equip level |
| maxLevel | number? | null = uncapped (Sunken items) |
| scaling | Record<string, number> | Per-stat multiplier |
| statOverrides | Record<number, Record<string, number>>? | Per-level manual fixes |
| jewelSlots | number? | 0-3 gem sockets |
| statType | string? | Normal, Magic, Strength, Vitality, Arcanium |
| description | string? | Flavor text |
| imageUrl | string? | Full image URL |
| obtainedBy | string[]? | Source tags |
| tags | string[]? | endgame, boss-drop, etc. |
| isEndgame | boolean? | Current endgame gear flag |
| requiresMagic | string[]? | Arcanium armor magic matching |

### GameConfig sections
| Section | Type | Contents |
|---------|------|----------|
| maxLevel | number | Level cap (175) |
| scalings | object | power, defense, substat constants + rounding |
| statRegistry | Record<string, StatDef> | All stats with category, epPerPoint, scaling type |
| buildTypes | BuildType[] | 7 build types with conditions, colors, ability slots |
| playerConstraints | object | Validation rules (equipTypeExclusive, namePatternExclusive, statTypeMatch) |
| arcaniumAttunements | object | 20 magics with stat bonuses |
| amuletVariants | object | poor/dull/fair tiers with level ranges and scaling |

### StatType colors (for borders/labels)
| StatType | Color | Used for |
|----------|-------|----------|
| Magic | #02B1EB (blue) | Item border |
| Arcanium | #02B1EB (blue) | Item border |
| Strength | #FF6060 (red) | Item border |
| Vitality | #00FF00 (green) | Item border |

### Rarity colors + order
| Rarity | Color |
|--------|-------|
| None | #FFFFFF |
| Common | #7D7D7F |
| Uncommon | #817346 |
| Rare | #6765EC |
| Epic | #8B00FF |
| Legendary | #00FF00 |
| Exotic | #FF0000 |
| Mystic | #a0f |
| Seasonal | #C001C2 |
| Mythical | #FFD700 |
| Sunken | #00CED1 |

---

## 5. Package layouts

### `packages/shared`
```
src/
  schema/           TypeScript types (Item, GameConfig, ModifierDef, Formulas)
  engine/
    build-calcs.ts    computeItemStats, getSlotStats, validateSlotItem,
                     aggregateBuildStats, effectiveMagicSlots, effectiveFsSlots
    formulas.ts       Safe formula evaluator (locked math scope)
    load-jsonc.ts     JSONC parser (strips // comments)
  buildCode/
    encode.ts         Build object → short code string
    decode.ts         Short code → BuildObject
    legacy.ts         Old AOGearBuilder format migration
```

### `packages/api`
```
src/
  index.ts             ElysiaJS entry point
  config.ts            Environment config
  db.ts                MongoDB connection
  routes/              items.ts, modifiers.ts, public.ts, admin.ts
  middleware/           adminGuard.ts (RBAC), rateLimit.ts
  scripts/             seedItems.ts, seedGameConfig.ts, dumpGameConfig.ts, seedImages.ts
  test/                integration.test.ts (19 tests, in-memory MongoDB)
```

### `packages/web`
```
src/routes/
  admin/+page.svelte     Items grid, modifiers, config editor, formulas
  admin/platform/        User/API-key management
  builder/+page.svelte   Gear builder

src/lib/
  adminSchemas.ts         Form schemas + default values
  utils.ts                Display constants (colors, labels, icons)
  builder/BuildManager.svelte.ts   Core builder state machine

src/lib/components/
  Item.svelte             Thumbnail: image, border, statType overlay, gem slots
  ItemTooltip.svelte      Tooltip: name, rarity+type, stats with icons, EP
  TooltipTrigger.svelte   Hover trigger with viewport edge-flip

  ui/
    FilterBar.svelte       Dynamic filter system
    FilterChip.svelte      Removable chip badge
    ConfigSection.svelte   Collapsible panel
    FullscreenModal.svelte Fullscreen overlay
    Toast.svelte           Toast stack

  admin/
    SchemaForm.svelte         Dynamic form renderer
    StatOverridesEditor.svelte Grid editor for overrides
    ModifierEffectsEditor.svelte Modifier rule-type editor

  Builder/
    GearSlot.svelte       Slot UI with picker trigger
    PickerModal.svelte    Fullscreen picker + FilterBar
    BuildStats.svelte     Stats breakdown table
```

---

## 6. Tech stack & conventions

### Svelte 5 runes (all state must use these)
```ts
let search = $state('');
let filtered = $derived(items.filter(i => i.name.includes(search)));
let sorted = $derived.by(() => { let list = [...items]; list.sort(); return list; });
$effect(() => { console.log(search); });
let { items, onSelect }: { items: any[]; onSelect: (id: string) => void } = $props();
```

### Styling
- **Tailwind CSS** — all inline utility classes
- **Dark theme**: `bg-black`, `text-white`, `border-white/xx`, `border-gray-600`
- **lucide-svelte** — icon library
- **No component library** — no shadcn-svelte, no bits-ui. All UI is raw HTML + Tailwind.

### Imports
```ts
// Web package — local
import { rarityColors } from '$lib/utils';
import Item from '$lib/components/Item.svelte';

// Any package — shared
import { computeItemStats, type GameConfig } from '@aotools/shared';

// Page data (SSR)
let { data }: { data: any } = $props();
```

## 7. FilterBar — the reusable filter pattern

```svelte
<script lang="ts">
  import FilterBar from '$lib/components/ui/FilterBar.svelte';
  import type { ActiveFilter, FilterCategory, SortOption } from '$lib/components/ui/FilterBar.svelte';

  let filters: ActiveFilter[] = $state([]);
  let sort = $state('rarity_desc');

  const categories: FilterCategory[] = $derived.by(() => [
    {
      key: 'rarity',
      label: 'Rarity',
      options: rarities.map(r => ({
        value: r, label: r,
        count: items.filter(i => i.rarity === r).length
      }))
    }
  ]);
</script>

<FilterBar {categories} sortOptions={...} {filters} {sort}
  onChange={(f, s) => { filters = f; sort = s; }}
/>
```

**Behaviors:**
- Dropdown categories: checkbox multi-select, OR within category
- Toggle mode categories: click cycles include/exclude, AND within category
- Cross-category: AND between categories
- Chips show active filters with × to remove
- `onChange(filters, sort)` — update both atomically

---

## 8. Key files for common tasks

| Task | Files |
|------|-------|
| Add a field to items | `shared/schema/item.ts` → `web/lib/adminSchemas.ts` |
| Add a filter category | `admin/+page.svelte` (categories + filteredItems) |
| Add a config section | `game-config.jsonc` → `shared/schema/game-config.ts` → `adminSchemas.ts` |
| Fix a calculation bug | `build-calcs.ts` → `api/test/integration.test.ts` |
| Change display colors/labels | `utils.ts` → `Item.svelte` → `ItemTooltip.svelte` |
| Add a UI component | `web/lib/components/ui/` |

---

## 9. RBAC & permissions

```ts
import { hasPermission, PERMISSIONS } from '@aotools/shared';

let permissions = $derived(data.permissions ?? []);
let canWriteItems = $derived(hasPermission(permissions, PERMISSIONS.ITEMS_WRITE));
```

Scopes: `ITEMS_READ/WRITE`, `MODIFIERS_READ/WRITE`, `CONFIG_READ/WRITE`, `FORMULAS_READ/WRITE`, `STATS_READ`, `USERS_READ/WRITE`, `API_KEYS_READ/WRITE`.

---

## 10. Commands

```bash
pnpm dev                           # API (4000) + Web (3000) in parallel
pnpm build                         # Build all
pnpm check                         # Type-check all
pnpm test                          # Integration tests
pnpm db:seed                       # Seed from data/ files
pnpm --filter api seed:config       # JSONC → MongoDB
pnpm --filter api seed:config:dump  # MongoDB → JSONC
pnpm --filter api normalize:images  # Migrate old image keys → imageUrl
```

---

## 11. Gotchas

- **imageUrl**: The only image key. Full URL. No `image` or `imageId` fallbacks.
- **equipType labels**: Use `equipTypeLabel[equipType]` from utils.ts.
- **statType border priority**: `statTypeBorderColors[statType]` wins over `rarityColors[rarity]`.
- **Svelte 5**: `$state()`/`$derived()`/`$derived.by()`. No legacy reactivity.
- **No component library**: All UI is raw HTML + Tailwind. Primitives in `ui/`.
- **FilterBar onChange**: `(filters, sort)` — update both atomically.
- **`$derived.by()`**: Use like a variable, not a function call.
- **TooltipTrigger**: `position: fixed` + viewport edge-flip.
- **StatOverridesEditor**: `onchange` not `oninput` (avoids cursor reset).
- **RBAC**: Frontend checks are visual guards. Real auth in API middleware.
- **Seed ≠ sync**: `seed:config` overwrites MongoDB. `dump:config` overwrites JSONC.
