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
      'Diagonal deployment across opposite table corners, with a 9" exclusion circle ' +
      'around the centre point. The closest corners of the two zones are only ~12.7" apart, ' +
      'enabling aggressive early engagement.',
    zones: [
      {
        role: 'attacker',
        label: 'Attacker',
        shape: 'polygon',
        // Top-left triangle
        points: [[0, 0], [100, 0], [0, 100]],
        labelPos: { x: 20, y: 30 },
      },
      {
        role: 'defender',
        label: 'Defender',
        shape: 'polygon',
        // Bottom-right triangle
        points: [[100, 0], [100, 100], [0, 100]],
        labelPos: { x: 80, y: 70 },
      },
      {
        // 9" exclusion circle from centre — shown as neutral overlay
        role: 'neutral',
        label: '9"',
        shape: 'ellipse',
        // Centre at 50%,50% with radii: 9/60*100=15% on x, 9/44*100=20.45% on y
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
      'A Hammer & Anvil variant with stepped zones. Each zone is 14" deep at the table\'s ' +
      'long edges and bulges to 20" deep in the central strip (between 8" from each long edge). ' +
      'The closest points are only 20" apart, rewarding aggressive mid-table play.',
    zones: [
      {
        // Attacker: left short edge
        // Outer portions (y: 0-18.18% and y: 81.82-100%, i.e. within 8" of long edges): 14" deep
        // Inner portion (y: 18.18-81.82%): 20" deep
        // 14" from short edge → x: 14/60*100 = 23.33%
        // 20" from short edge → x: 20/60*100 = 33.33%
        // 8" from long edge → y: 8/44*100 = 18.18%
        role: 'attacker',
        label: 'Attacker',
        shape: 'polygon',
        points: [
          [0, 0], [23.33, 0],
          [23.33, 18.18], [33.33, 18.18],
          [33.33, 81.82],
          [23.33, 81.82], [23.33, 100], [0, 100],
        ],
        labelPos: { x: 12, y: 50 },
      },
      {
        // Defender: right short edge (mirror)
        role: 'defender',
        label: 'Defender',
        shape: 'polygon',
        points: [
          [76.67, 0], [100, 0], [100, 100], [76.67, 100],
          [76.67, 81.82], [66.67, 81.82],
          [66.67, 18.18],
          [76.67, 18.18],
        ],
        labelPos: { x: 88, y: 50 },
      },
    ],
  },
  {
    id: 'crucible-of-battle',
    name: 'Crucible of Battle',
    shortName: 'CoB',
    description:
      'Short-edge deployment with the widest gap of all missions: 27.8" between zones. ' +
      'Each player occupies a 16" strip, maximising the distance armies must travel ' +
      'to engage and rewarding strong mid-board control.',
    zones: [
      {
        role: 'attacker',
        label: 'Attacker',
        shape: 'rect',
        x: 0, y: 0, width: 26.83, height: 100,
      },
      {
        role: 'defender',
        label: 'Defender',
        shape: 'rect',
        x: 73.17, y: 0, width: 26.83, height: 100,
      },
    ],
  },
]
