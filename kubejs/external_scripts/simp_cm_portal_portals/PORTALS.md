# Simple Custom Portal — Documentation

This file is overwritten on every world load and on `/simp_cm_portal_reload` so it stays up to date.

## Config path

Portal definitions are loaded from JSON files in this folder: `<game dir>/<externalScriptsPath>/simp_cm_portal_portals/`.
`externalScriptsPath` is set in mod config (default: `kubejs/external_scripts`). Only `.json` files are read.

## JSON format

Each JSON file can contain one or more portal definitions. Root structure:

- **type** (required): `"simp_cm_portal:portals"` or `"iska_utils:portals"`.
- **overwritable** (optional): currently unused.
- **portals** (required): array of portal objects. You can define as many portals as you want in the same file; each entry must have a unique **id**.

### Portal object

- **id** (required): unique identifier (e.g. `"custom_dimensions-portal_void"`). Used for the block registry; only portals loaded at game startup get a block. After a reload, only the logic of existing ids is updated.
- **destination** (required): dimension resource key the portal sends to (e.g. `"minecraft:overworld"`, `"custom_dimensions:void"`).
- **baseBlock** (optional): block id for the floor of the safe-zone capsule (e.g. `"minecraft:stone"`). If empty, floor is not replaced.
- **capsuleBlock** (optional): block id for walls and ceiling of the capsule (e.g. `"minecraft:glass"`). If empty, walls/ceiling are not built.
- **box** (optional): hitbox (collision and visual) as a variable-size box centered in the block. Format: `"width height depth"` as fractions from 0 to 1, space or comma separated. Example: `"1 1 1"` or omit = full block; `"0.5 1 0.5"` = half width and depth, full height (thin pillar); `"0.5"` = cube 0.5×0.5×0.5. Invalid or empty = full block.
- **usableIn** (optional): array of dimension keys. If non-empty, the portal can only be used when the player is in one of these dimensions. Applies to both normal and return portals — use this for one-way portals (e.g. only `["minecraft:overworld"]` so the return portal in the destination does not work).
- **defaultReturn** (optional): when the player is already in **destination** and uses a portal without a stored return (e.g. a manually placed block), they are sent to this dimension. If empty, using the portal from the destination does nothing (no second portal is created elsewhere).
- **sound** (optional): block sound type for the portal block (place, break, step). Default is `glass`. See "Supported sounds" below. Example: `"rock"`.

### Supported sounds

Valid values for **sound** (use exactly as written; default if omitted or unknown: `glass`):

`rock`, `stone`, `glass`, `wood`, `metal`, `iron`, `wool`, `sand`, `gravel`, `grass`, `lily_pad`, `snow`, `powder_snow`, `ladder`, `anvil`, `slime_block`, `honey_block`, `coral_block`, `bamboo`, `bamboo_sapling`, `scaffolding`, `sweet_berry_bush`, `crop`, `hard_crop`, `vine`, `nether_wart`, `lantern`, `stem`, `nylium`, `fungus`, `roots`, `shroomlight`, `weeping_vines`, `twisting_vines`, `soul_sand`, `soul_soil`, `basalt`, `wart_block`, `netherrack`, `nether_bricks`, `nether_sprouts`, `nether_ore`, `bone_block`, `netherite_block`, `ancient_debris`, `lodestone`, `chain`, `nether_gold_ore`, `gilded_blackstone`, `candle`, `amethyst`, `amethyst_cluster`, `small_amethyst_bud`, `medium_amethyst_bud`, `large_amethyst_bud`, `tuff`, `calcite`, `dripstone_block`, `pointed_dripstone`, `copper`, `cave_vines`, `spore_blossom`, `azalea`, `flowering_azalea`, `moss_carpet`, `pink_petals`, `moss`, `big_dripleaf`, `small_dripleaf`, `rooted_dirt`, `hanging_roots`, `azalea_leaves`, `sculk_sensor`, `sculk_catalyst`, `sculk`, `sculk_vein`, `sculk_shrieker`, `glow_lichen`, `deepslate`, `deepslate_bricks`, `deepslate_tiles`, `polished_deepslate`, `froglight`, `frogspawn`, `mangrove_roots`, `muddy_mangrove_roots`, `mud`, `mud_bricks`, `packed_mud`, `hanging_sign`, `nether_wood_hanging_sign`, `bamboo_wood_hanging_sign`, `bamboo_wood`, `nether_wood`, `cherry_wood`, `cherry_sapling`, `cherry_leaves`, `cherry_wood_hanging_sign`, `chiseled_bookshelf`, `suspicious_sand`, `suspicious_gravel`, `decorated_pot`, `decorated_pot_cracked`

JSON can contain `//` and `/* */` comments; they are stripped before parsing.

## Examples

**Minimal (two-way, no safe-zone styling):**
```json
{
  "type": "simp_cm_portal:portals",
  "portals": [
    {
      "id": "my_portal_void",
      "destination": "custom_dimensions:void"
    }
  ]
}
```

**Two-way with safe-zone, default return and custom sound (e.g. overworld ↔ void):**
```json
{
  "type": "simp_cm_portal:portals",
  "portals": [
    {
      "id": "portal_void",
      "destination": "custom_dimensions:void",
      "baseBlock": "minecraft:stone",
      "capsuleBlock": "minecraft:glass",
      "sound": "rock",
      "usableIn": [],
      "defaultReturn": "minecraft:overworld"
    }
  ]
}
```

**One-way (only from overworld to void; return portal does not work):**
```json
{
  "type": "simp_cm_portal:portals",
  "portals": [
    {
      "id": "one_way_void",
      "destination": "custom_dimensions:void",
      "baseBlock": "minecraft:stone",
      "capsuleBlock": "minecraft:glass",
      "usableIn": ["minecraft:overworld"],
      "defaultReturn": ""
    }
  ]
}
```

**Custom hitbox (thin pillar, half width/depth, full height):**
```json
{
  "type": "simp_cm_portal:portals",
  "portals": [
    {
      "id": "slim_portal",
      "destination": "minecraft:the_nether",
      "box": "0.5 1 0.5"
    }
  ]
}
```
Other `box` examples: `"1 1 1"` full block; `"0.5"` small centered cube.

**Multiple portals in one file:**
```json
{
  "type": "simp_cm_portal:portals",
  "portals": [
    {
      "id": "portal_overworld",
      "destination": "minecraft:overworld",
      "baseBlock": "minecraft:grass_block",
      "capsuleBlock": "minecraft:oak_planks",
      "defaultReturn": "custom_dimensions:void"
    },
    {
      "id": "portal_void",
      "destination": "custom_dimensions:void",
      "baseBlock": "minecraft:stone",
      "capsuleBlock": "minecraft:glass",
      "usableIn": ["minecraft:overworld"],
      "defaultReturn": "minecraft:overworld"
    }
  ]
}
```

## Behaviour

- **Click**: right-click on a portal block to teleport. The target dimension is: the block’s stored **return** dimension if it has one, otherwise **defaultReturn** when already in **destination**, otherwise **destination**.
- **Same coordinates**: the destination portal (or capsule) is created at the same x, y, z as the portal you clicked.
- **Return portal**: when the mod builds a capsule in the destination, it places a portal block of the same type with a stored **return** dimension (where you came from). That block then always sends you back to that dimension.
- **Capsule only if needed**: if in the destination dimension there is already a portal with the same return dimension in a 32-block radius, the player is teleported there and no capsule is built.
- **Safe zone**: when built, the capsule has interior 3×3×4, with floor (baseBlock), walls and ceiling (capsuleBlock), and the return portal at the centre.

## Validation before building

Before building the capsule, the mod checks that no block in the zone has:
- the vanilla tag `minecraft:features_cannot_replace`
- the block is bedrock
- explosion resistance ≥ 3,600,000 (indestructible)
If any of these fail, the player gets an action-bar message (e.g. "Invalid position for portal") and no build/teleport happens.

## Command

- **/simp_cm_portal_reload** (permission level 2): reloads portal definitions from all JSON files in this folder and refreshes the destination map. Only logic is updated; new ids in JSON do not get new blocks until the game is restarted.

## Portals removed from JSON

If a portal block still exists in the world but its **id** was removed from every JSON (e.g. after a reload), the block does nothing and does not crash: click returns `PASS`. After a game restart, that block type may no longer exist depending on registration.

---
Generated by Simple Custom Portal (simp_cm_portal).
