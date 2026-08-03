# @aotools/web

SvelteKit 5 frontend for Arcane Odyssey build tools.

## Routes

| Route | Page |
|-------|------|
| `/` | Landing page |
| `/builder` | Gear builder (equip items, enchants, modifiers, gems, magics) |
| `/b/[shortId]` | Shared build viewer |
| `/atlas` | Game data atlas (collapsible item/modifier browser) |
| `/admin` | Admin dashboard (items, modifiers, config, formulas) |
| `/admin/platform` | Admin platform (users, API keys, roles) |

## Tech

- **SvelteKit 5** with runes (`$state`, `$derived`, `$props`)
- **Tailwind CSS** — dark theme, all inline utility classes
- **lucide-svelte** — icons
- No component library — all UI is raw HTML + Tailwind

## Running

```bash
pnpm dev        # http://localhost:3000
pnpm build      # Production build
pnpm check      # svelte-check type checking
```

## Key files

| File | Purpose |
|------|---------|
| `src/lib/builder/BuildManager.svelte.ts` | Core builder state machine |
| `src/lib/adminSchemas.ts` | Admin form schema definitions |
| `src/lib/utils.ts` | Display constants (colors, labels, icons) |
| `src/lib/components/ui/` | Reusable UI primitives (FilterBar, FilterChip, modals) |
| `src/lib/components/admin/` | Admin-specific editors (SchemaForm, StatOverridesEditor) |
| `src/lib/components/Builder/` | Builder components (GearSlot, PickerModal, BuildStats) |
