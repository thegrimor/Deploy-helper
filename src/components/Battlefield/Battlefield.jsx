import styles from './Battlefield.module.css'

// ViewBox proportional to a 60" x 44" table
const VB_W = 120
const VB_H = 88

const ZONE_FILL = {
  attacker: 'var(--color-zone-attacker)',
  defender: 'var(--color-zone-defender)',
  neutral: 'var(--color-zone-neutral)',
}

function toSvgX(pct) { return (pct / 100) * VB_W }
function toSvgY(pct) { return (pct / 100) * VB_H }

function ZoneShape({ zone, index }) {
  const fill = ZONE_FILL[zone.role] ?? ZONE_FILL.neutral
  const common = {
    fill,
    stroke: 'var(--color-zone-stroke)',
    strokeWidth: 0.4,
    strokeDasharray: '2 1',
  }

  if (zone.shape === 'rect') {
    return (
      <rect
        key={index}
        x={toSvgX(zone.x)}
        y={toSvgY(zone.y)}
        width={toSvgX(zone.width)}
        height={toSvgY(zone.height)}
        {...common}
      />
    )
  }
  if (zone.shape === 'polygon') {
    const pts = zone.points
      .map(([px, py]) => `${toSvgX(px)},${toSvgY(py)}`)
      .join(' ')
    return <polygon key={index} points={pts} {...common} />
  }
  return null
}

function ZoneLabel({ zone }) {
  let cx, cy
  if (zone.shape === 'rect') {
    cx = toSvgX(zone.x + zone.width / 2)
    cy = toSvgY(zone.y + zone.height / 2)
  } else if (zone.shape === 'polygon') {
    const xs = zone.points.map(p => p[0])
    const ys = zone.points.map(p => p[1])
    cx = toSvgX((Math.min(...xs) + Math.max(...xs)) / 2)
    cy = toSvgY((Math.min(...ys) + Math.max(...ys)) / 2)
  }
  return (
    <text
      x={cx}
      y={cy}
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize={4.5}
      fontFamily="var(--font-label, 'Georgia', serif)"
      fill="var(--color-text-primary)"
      opacity={0.9}
      letterSpacing={0.3}
      style={{ userSelect: 'none', pointerEvents: 'none' }}
    >
      {zone.label}
    </text>
  )
}

function GridLines() {
  const lines = []
  // Vertical lines every 6" (= 12 SVG units on a 60" = 120 SVG unit wide board)
  const stepX = 12
  for (let x = stepX; x < VB_W; x += stepX) {
    lines.push(
      <line key={`v${x}`} x1={x} y1={0} x2={x} y2={VB_H}
        stroke="var(--color-battlefield-grid)" strokeWidth={0.2} />
    )
  }
  // Horizontal lines every ~6" (44" / 7.33 ≈ 6")
  const stepY = VB_H / 7.33
  for (let y = stepY; y < VB_H; y += stepY) {
    lines.push(
      <line key={`h${y.toFixed(1)}`} x1={0} y1={y} x2={VB_W} y2={y}
        stroke="var(--color-battlefield-grid)" strokeWidth={0.2} />
    )
  }
  return <>{lines}</>
}

function RulerMarks() {
  const marks = []
  const tickLen = 1.5
  const stepX = 12
  const stepY = VB_H / 7.33

  for (let x = stepX; x < VB_W; x += stepX) {
    marks.push(
      <line key={`tx-t${x}`} x1={x} y1={0} x2={x} y2={tickLen}
        stroke="var(--color-text-secondary)" strokeWidth={0.35} opacity={0.5} />,
      <line key={`tx-b${x}`} x1={x} y1={VB_H} x2={x} y2={VB_H - tickLen}
        stroke="var(--color-text-secondary)" strokeWidth={0.35} opacity={0.5} />
    )
  }
  for (let y = stepY; y < VB_H; y += stepY) {
    marks.push(
      <line key={`ty-l${y.toFixed(1)}`} x1={0} y1={y} x2={tickLen} y2={y}
        stroke="var(--color-text-secondary)" strokeWidth={0.35} opacity={0.5} />,
      <line key={`ty-r${y.toFixed(1)}`} x1={VB_W} y1={y} x2={VB_W - tickLen} y2={y}
        stroke="var(--color-text-secondary)" strokeWidth={0.35} opacity={0.5} />
    )
  }
  return <>{marks}</>
}

export default function Battlefield({ mission }) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.missionLabel} aria-hidden="true">{mission.name}</p>
      <div className={styles.svgContainer}>
        <svg
          className={styles.svg}
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={`Battlefield diagram for ${mission.name} deployment`}
        >
          {/* Board background */}
          <rect x={0} y={0} width={VB_W} height={VB_H} fill="var(--color-battlefield-bg)" />

          {/* Grid */}
          <GridLines />

          {/* Deployment zones */}
          {mission.zones.map((zone, i) => (
            <ZoneShape key={i} zone={zone} index={i} />
          ))}

          {/* Centre crosshair */}
          <line x1={VB_W / 2} y1={0} x2={VB_W / 2} y2={VB_H}
            stroke="var(--color-text-secondary)" strokeWidth={0.25}
            strokeDasharray="1 1" opacity={0.3} />
          <line x1={0} y1={VB_H / 2} x2={VB_W} y2={VB_H / 2}
            stroke="var(--color-text-secondary)" strokeWidth={0.25}
            strokeDasharray="1 1" opacity={0.3} />

          {/* Zone labels */}
          {mission.zones.map((zone, i) => (
            <ZoneLabel key={`lbl-${i}`} zone={zone} />
          ))}

          {/* Ruler ticks */}
          <RulerMarks />

          {/* Outer border */}
          <rect x={0} y={0} width={VB_W} height={VB_H}
            fill="none" stroke="var(--color-battlefield-border)" strokeWidth={0.8} />
        </svg>
      </div>
      <p className={styles.legend}>
        60&Prime; &times; 44&Prime; battlefield &middot; Grid: 6&Prime; intervals
      </p>
    </div>
  )
}
