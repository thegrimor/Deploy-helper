// Terrain layout coordinates use the same % system as zones.js:
//   x/width  → % of 60" table (left-right axis)
//   y/height → % of 44" table (top-bottom axis)
//
// Source images are portrait (44"W × 60"H). Each crop is transposed (portrait→landscape).
// Coordinate conversion from portrait inch measurements to code %:
//   code_x     = portrait_y_start / 60 * 100
//   code_y     = portrait_x_start / 44 * 100
//   code_width = portrait_y_span  / 60 * 100   (portrait vertical → landscape horizontal)
//   code_height= portrait_x_span  / 44 * 100   (portrait horizontal → landscape vertical)

export const TERRAIN_LAYOUTS = [
  {
    id: 'take-and-hold',
    deploymentId: 'dawn-of-war',
    name: 'Take and Hold',
    shortName: 'T&H',
    image: '/scenarios/take-and-hold.jpg',
    terrain: [
      // ── Attacker zone (code_y: 0–27.27%, portrait_x: 0–12") ──
      // crop: portrait(x=0–12", y=2–17")  → code(x=3.33, y=0, w=25, h=27.27)
      { image: '/terrain/att_top.png', x:  3.33, y:  0,    width: 25,    height: 27.27 },
      // crop: portrait(x=0–12", y=18–42") → code(x=30, y=0, w=40, h=27.27)
      { image: '/terrain/att_co.png',  x: 30,    y:  0,    width: 40,    height: 27.27 },
      // crop: portrait(x=0–12", y=43–58") → code(x=71.67, y=0, w=25, h=27.27)
      { image: '/terrain/att_bot.png', x: 71.67, y:  0,    width: 25,    height: 27.27 },

      // ── Neutral zone – upper cluster EF+GH (portrait_y: 4–22") ──
      // EF: portrait(x=13–27", y=4–17")   → code(x=6.67, y=29.55, w=21.67, h=31.82)
      { image: '/terrain/ef_top.png',  x:  6.67, y: 29.55, width: 21.67, height: 31.82 },
      // GH: portrait(x=15–28", y=13–22")  → code(x=21.67, y=34.09, w=15, h=29.55)
      { image: '/terrain/gh_top.png',  x: 21.67, y: 34.09, width: 15,    height: 29.55 },

      // ── Neutral zone – AB pair ──
      // AB upper: portrait(x=14–28", y=16–25") → code(x=26.67, y=31.82, w=15, h=31.82)
      { image: '/terrain/ab_top.png',  x: 26.67, y: 31.82, width: 15,    height: 31.82 },
      // AB lower: portrait(x=14–28", y=35–44") → code(x=58.33, y=31.82, w=15, h=31.82)
      { image: '/terrain/ab_bot.png',  x: 58.33, y: 31.82, width: 15,    height: 31.82 },

      // ── Neutral zone – lower cluster GH+EF (portrait_y: 38–56") ──
      // GH: portrait(x=15–28", y=38–47")  → code(x=63.33, y=34.09, w=15, h=29.55)
      { image: '/terrain/gh_bot.png',  x: 63.33, y: 34.09, width: 15,    height: 29.55 },
      // EF: portrait(x=13–27", y=43–56")  → code(x=71.67, y=29.55, w=21.67, h=31.82)
      { image: '/terrain/ef_bot.png',  x: 71.67, y: 29.55, width: 21.67, height: 31.82 },

      // ── Defender zone (code_y: 72.73–100%, portrait_x: 32–44") ──
      // crop: portrait(x=32–44", y=3–24")  → code(x=5, y=72.73, w=35, h=27.27)
      { image: '/terrain/def_top.png', x:  5,    y: 72.73, width: 35,    height: 27.27 },
      // crop: portrait(x=32–44", y=25–43") → code(x=41.67, y=72.73, w=30, h=27.27)
      { image: '/terrain/def_co.png',  x: 41.67, y: 72.73, width: 30,    height: 27.27 },
      // crop: portrait(x=32–44", y=43–58") → code(x=71.67, y=72.73, w=25, h=27.27)
      { image: '/terrain/def_bot.png', x: 71.67, y: 72.73, width: 25,    height: 27.27 },
    ],
  },
]
