// Terrain layout coordinates use the same % system as zones.js:
//   x/width  → % of 60" table (left-right axis)
//   y/height → % of 44" table (top-bottom axis)
//
// Source images are portrait (44"W × 60"H). Conversion from image to code:
//   code_x = portrait_y_inches / 60 * 100
//   code_y = portrait_x_inches / 44 * 100

export const TERRAIN_LAYOUTS = [
  {
    id: 'take-and-hold',
    deploymentId: 'dawn-of-war',
    name: 'Take and Hold',
    shortName: 'T&H',
    image: '/scenarios/take-and-hold.jpg',
    terrain: [
      // ── Attacker zone (code_y: 0–27.27%) ──
      // Diagonal top  — portrait(y≈7", x≈6")  → code(x≈11.67, y≈13.64)
      { label: '',   x:  9, y:  7, width: 12, height: 10, rotate:  45 },
      // CO centre     — portrait(y≈30", x≈6")  → code(x≈50,    y≈13.64)
      { label: 'CO', x: 42, y:  6, width: 15, height: 14, rotate:   0 },
      // Diagonal bot  — portrait(y≈50", x≈6")  → code(x≈83.33, y≈13.64)
      { label: '',   x: 81, y:  7, width: 12, height: 10, rotate: -45 },

      // ── Neutral zone – upper cluster EF+GH (portrait_y: 7–17") ──
      // EF — portrait(y≈7",  x≈17") → code(x≈11.67, y≈38.64)
      { label: 'EF', x:  9, y: 33, width: 14, height: 12, rotate: -15 },
      // GH — portrait(y≈14", x≈20") → code(x≈23.33, y≈45.45)
      { label: 'GH', x: 21, y: 40, width: 12, height: 11, rotate:  10 },

      // ── Neutral zone – AB pair (portrait_y: 17" and 43") ──
      // AB upper — portrait(y≈17", x≈19") → code(x≈28.33, y≈43.18)
      { label: 'AB', x: 26, y: 38, width: 14, height: 12, rotate: -20 },
      // AB lower — portrait(y≈43", x≈23") → code(x≈71.67, y≈52.27)
      { label: 'AB', x: 69, y: 47, width: 14, height: 12, rotate: -20 },

      // ── Neutral zone – lower cluster GH+EF (portrait_y: 43–53") ──
      // GH — portrait(y≈43", x≈22") → code(x≈71.67, y≈50)
      { label: 'GH', x: 69, y: 44, width: 12, height: 11, rotate:  10 },
      // EF — portrait(y≈50", x≈17") → code(x≈83.33, y≈38.64)
      { label: 'EF', x: 81, y: 33, width: 14, height: 12, rotate: -15 },

      // ── Defender zone (code_y: 72.73–100%) ──
      // Diagonal top  — portrait(y≈7",  x≈38") → code(x≈11.67, y≈86.36)
      { label: '',   x:  9, y: 83, width: 12, height: 10, rotate: -45 },
      // CO centre     — portrait(y≈30", x≈38") → code(x≈50,    y≈86.36)
      { label: 'CO', x: 42, y: 82, width: 15, height: 14, rotate:   0 },
      // Diagonal bot  — portrait(y≈50", x≈38") → code(x≈83.33, y≈86.36)
      { label: '',   x: 81, y: 83, width: 12, height: 10, rotate:  45 },
    ],
  },
]
