// Coordinates in % of the battlefield (viewBox 0 0 120 88, proportional to 60"x44")
// x: 0=left short edge, 100=right short edge
// y: 0=top long edge, 100=bottom long edge

export const MISSIONS = [
  {
    id: 'dawn-of-war',
    name: 'Dawn of War',
    shortName: 'DoW',
    description:
      'Attacker and Defender deploy in the two long-table halves split by the centre line. Each player controls their half of the board.',
    zones: [
      {
        role: 'attacker',
        label: 'Attacker',
        shape: 'rect',
        x: 0, y: 0, width: 100, height: 50,
      },
      {
        role: 'defender',
        label: 'Defender',
        shape: 'rect',
        x: 0, y: 50, width: 100, height: 50,
      },
    ],
  },
  {
    id: 'hammer-and-anvil',
    name: 'Hammer & Anvil',
    shortName: 'H&A',
    description:
      'Deployment zones run across the short edges of the table. Each player gets a 12" strip from their table edge, leaving a wide central no-man\'s land.',
    zones: [
      {
        role: 'attacker',
        label: 'Attacker',
        shape: 'rect',
        x: 0, y: 0, width: 20, height: 100,
      },
      {
        role: 'defender',
        label: 'Defender',
        shape: 'rect',
        x: 80, y: 0, width: 20, height: 100,
      },
    ],
  },
  {
    id: 'search-and-destroy',
    name: 'Search & Destroy',
    shortName: 'S&D',
    description:
      'Diagonal deployment — the table is divided corner-to-corner. Each player deploys in one triangular half of the board.',
    zones: [
      {
        role: 'attacker',
        label: 'Attacker',
        shape: 'polygon',
        points: [[0, 0], [100, 0], [0, 100]],
      },
      {
        role: 'defender',
        label: 'Defender',
        shape: 'polygon',
        points: [[100, 0], [100, 100], [0, 100]],
      },
    ],
  },
  {
    id: 'sweeping-engagement',
    name: 'Sweeping Engagement',
    shortName: 'SE',
    description:
      'Each player\'s deployment zone occupies a quarter of the table at diagonally opposite corners, with two neutral corner quarters.',
    zones: [
      {
        role: 'attacker',
        label: 'Attacker',
        shape: 'rect',
        x: 0, y: 0, width: 50, height: 50,
      },
      {
        role: 'defender',
        label: 'Defender',
        shape: 'rect',
        x: 50, y: 50, width: 50, height: 50,
      },
    ],
  },
  {
    id: 'crucible-of-battle',
    name: 'Crucible of Battle',
    shortName: 'CoB',
    description:
      'Attacker and Defender zones occupy the long-edge strips, leaving a large central contested area.',
    zones: [
      {
        role: 'attacker',
        label: 'Attacker',
        shape: 'rect',
        x: 0, y: 0, width: 25, height: 100,
      },
      {
        role: 'defender',
        label: 'Defender',
        shape: 'rect',
        x: 75, y: 0, width: 25, height: 100,
      },
    ],
  },
]
