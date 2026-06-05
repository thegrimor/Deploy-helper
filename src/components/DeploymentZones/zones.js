// All coordinates are expressed as % of battlefield dimensions.
// Table: 60" wide (x axis) × 44" tall (y axis)
// x% = inches_from_left / 60 × 100
// y% = inches_from_top  / 44 × 100
//
// Key measurements:
//   12" from long edge  → y: 27.27%    (Dawn of War depth)
//   8"  from long edge  → y: 18.18%    (Sweeping Engagement shallow)
//   14" from long edge  → y: 31.82%    (Sweeping Engagement deep)
//   18" from short edge → x: 30%       (Hammer & Anvil)
//   16.1" from short edge → x: 26.83%  (Crucible of Battle)
//   9" from center (x)  → x: 15%       (Search & Destroy exclusion)
//   9" from center (y)  → y: 20.45%    (Search & Destroy exclusion)
//   12" from short edge → x: 20%       (Take and Hold)

export const MISSIONS = [
  {
    id: 'dawn-of-war',
    name: 'Dawn of War',
    shortName: 'DoW',
    description:
      'Each player deploys in a 12" strip along one of the long table edges, ' +
      'leaving a 20" no-man\'s-land across the centre. ' +
      'The most common and balanced deployment.',
    zones: [
      {
        role: 'attacker',
        label: 'Attacker',
        shape: 'rect',
        x: 0, y: 0, width: 100, height: 27.27,
      },
      {
        role: 'defender',
        label: 'Defender',
        shape: 'rect',
        x: 0, y: 72.73, width: 100, height: 27.27,
      },
    ],
  },
  {
    id: 'hammer-and-anvil',
    name: 'Hammer & Anvil',
    shortName: 'H&A',
    description:
      'Deployment zones run along the short table edges. Each player occupies an 18" strip, ' +
      'leaving a 24" central no-man\'s-land. A longer fight with more room to manoeuvre.',
    zones: [
      {
        role: 'attacker',
        label: 'Attacker',
        shape: 'rect',
        x: 0, y: 0, width: 30, height: 100,
      },
      {
        role: 'defender',
        label: 'Defender',
        shape: 'rect',
        x: 70, y: 0, width: 30, height: 100,
      },
    ],
  },
  {
    id: 'search-and-destroy',
    name: 'Search & Destroy',
    shortName: 'S&D',
    description:
      'Each player deploys in one of two diagonally opposite quadrants (quarter-table rectangles), ' +
      'with a 9" no-deploy exclusion circle around the centre of the battlefield.',
    zones: [
      {
        // Attacker: top-right quadrant
        role: 'attacker',
        label: 'Attacker',
        shape: 'rect',
        x: 50, y: 0, width: 50, height: 50,
        labelPos: { x: 75, y: 18 },
      },
      {
        // Defender: bottom-left quadrant (diagonally opposite)
        role: 'defender',
        label: 'Defender',
        shape: 'rect',
        x: 0, y: 50, width: 50, height: 50,
        labelPos: { x: 25, y: 82 },
      },
      {
        // 9" exclusion circle — neither player can deploy within 9" of centre
        // rx = 9/60*100 = 15%  ry = 9/44*100 = 20.45%
        role: 'neutral',
        label: '9"',
        shape: 'ellipse',
        cx: 50, cy: 50, rx: 15, ry: 20.45,
        labelPos: { x: 50, y: 50 },
      },
    ],
  },
  {
    id: 'sweeping-engagement',
    name: 'Sweeping Engagement',
    shortName: 'SE',
    description:
      'Stepped L-shaped zones from opposite long-edge corners. ' +
      'Each zone extends 8" from the long edge on the far half, and 14" on the near half. ' +
      'The innermost corners are only 16" apart, encouraging early contact.',
    zones: [
      {
        // Attacker: top-long-edge, deeper on the left half
        role: 'attacker',
        label: 'Attacker',
        shape: 'polygon',
        points: [
          [0, 0], [100, 0], [100, 18.18], [50, 18.18], [50, 31.82], [0, 31.82],
        ],
        labelPos: { x: 25, y: 15 },
      },
      {
        // Defender: bottom-long-edge, deeper on the right half
        role: 'defender',
        label: 'Defender',
        shape: 'polygon',
        points: [
          [50, 68.18], [100, 68.18], [100, 100], [0, 100], [0, 81.82], [50, 81.82],
        ],
        labelPos: { x: 75, y: 85 },
      },
    ],
  },
  {
    id: 'tipping-point',
    name: 'Tipping Point',
    shortName: 'TP',
    description:
      'Hammer & Anvil variant with two different zone depths. ' +
      'Each player\'s zone is 12" deep on one table half and 20" deep on the other, ' +
      'with the deep halves on opposite sides. Minimum gap: 20".',
    zones: [
      {
        // Attacker: left short edge
        // Top half (y 0-50%): 12" deep → x: 12/60*100 = 20%
        // Bottom half (y 50-100%): 20" deep → x: 20/60*100 = 33.33%
        // Step at y=50% (22" = midpoint of 44" table)
        role: 'attacker',
        label: 'Attacker',
        shape: 'polygon',
        points: [
          [0, 0], [20, 0],
          [20, 50], [33.33, 50],
          [33.33, 100], [0, 100],
        ],
        labelPos: { x: 10, y: 75 },
      },
      {
        // Defender: right short edge — deep half on TOP (mirrored)
        // Top half (y 0-50%): 20" deep → x: 66.67% to 100%
        // Bottom half (y 50-100%): 12" deep → x: 80% to 100%
        role: 'defender',
        label: 'Defender',
        shape: 'polygon',
        points: [
          [66.67, 0], [100, 0],
          [100, 100], [80, 100],
          [80, 50], [66.67, 50],
        ],
        labelPos: { x: 90, y: 25 },
      },
    ],
  },
  {
    id: 'crucible-of-battle',
    name: 'Crucible of Battle',
    shortName: 'CoB',
    description:
      'Triangular deployment: diagonally opposite corners. Each zone covers the full short edge ' +
      'and tapers to the centre of the adjacent long edge. The largest gap of all deployments.',
    zones: [
      {
        // Attacker: bottom-left triangle
        // Full left short edge → centre of bottom long edge (50%,100%)
        role: 'attacker',
        label: 'Attacker',
        shape: 'polygon',
        points: [[0, 0], [0, 100], [50, 100]],
        labelPos: { x: 17, y: 67 },
      },
      {
        // Defender: top-right triangle
        // Full right short edge → centre of top long edge (50%,0%)
        role: 'defender',
        label: 'Defender',
        shape: 'polygon',
        points: [[100, 0], [100, 100], [50, 0]],
        labelPos: { x: 83, y: 33 },
      },
    ],
  },
  {
    id: 'take-and-hold',
    name: 'Take and Hold',
    shortName: 'TaH',
    description:
      'Each player deploys in a 12" strip along one of the short table edges, ' +
      'leaving a 36" no-man\'s-land across the centre. ' +
      'The widest gap of any short-edge deployment.',
    zones: [
      {
        // Attacker: left short edge, 12" deep → x: 12/60*100 = 20%
        role: 'attacker',
        label: 'Attacker',
        shape: 'rect',
        x: 0, y: 0, width: 20, height: 100,
      },
      {
        // Defender: right short edge, 12" deep → starts at 80%
        role: 'defender',
        label: 'Defender',
        shape: 'rect',
        x: 80, y: 0, width: 20, height: 100,
      },
    ],
  },
]
