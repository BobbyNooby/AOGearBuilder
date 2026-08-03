# @aotools/shared

Shared TypeScript engine and schema types consumed by both `@aotools/web` and `@aotools/api`.

## Engine

| File | Exports |
|------|---------|
| `src/engine/build-calcs.ts` | `computeItemStats`, `getSlotStats`, `validateSlotItem`, `aggregateBuildStats`, `effectiveMagicSlots`, `effectiveFsSlots` |
| `src/engine/formulas.ts` | `evalFormula`, `evalFormulaDef` — safe math evaluator (locked scope) |
| `src/engine/load-jsonc.ts` | `stripJsoncComments`, `parseJsonc` — JSONC comment stripper |

## Schemas (TypeScript interfaces)

| File | Interfaces |
|------|-----------|
| `src/schema/item.ts` | `Item`, `ItemType` |
| `src/schema/game-config.ts` | `GameConfig`, `StatDef`, `BuildType`, `PlayerTransform`, `DEFAULT_MAX_LEVEL` |
| `src/schema/modifier.ts` | `ModifierDef`, `Rule`, `ModifierType` |
| `src/schema/formulas.ts` | `Formulas`, `FormulaDef` |
| `src/schema/build.ts` | `BuildObject`, `SlotBuildData` |

## Build code

| File | Purpose |
|------|---------|
| `src/buildCode/encode.ts` | Build object → shareable short code |
| `src/buildCode/decode.ts` | Short code → BuildObject |
| `src/buildCode/legacy.ts` | Old AOGearBuilder format migration |
| `src/buildCode/validate.ts` | Code format validation |
| `src/buildCode/base64.ts` | URL-safe base64 encoding |

## RBAC

| File | Purpose |
|------|---------|
| `src/rbac.ts` | `PERMISSIONS` enum + `hasPermission()` |

## Running

```bash
pnpm build      # TypeScript compilation
pnpm dev        # Watch mode
```
