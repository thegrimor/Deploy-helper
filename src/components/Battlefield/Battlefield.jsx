import styles from './Battlefield.module.css'

// ViewBox proportional to a 60" x 44" table
const VB_W = 120
const VB_H = 88

const ZONE_FILL = {
  attacker: 'var(--color-zone-attacker)',
  defender: 'var(--color-zone-defender)',
  neutral:  'var(--color-zone-neutral)',
}

const ZONE_FILL_SOLID = {
  attacker: 'var(--color-zone-attacker-solid)',
  defender: 'var(--color-zone-defender-solid)',
  neutral:  'var(--color-text-secondary)',
}

function toX(pct) { return (pct / 100) * VB_W }
function toY(pct) { return (pct / 100) * VB_H }

// Geometric centroid of a polygon (Shoelace formula)
function polygonCentroid(points) {
  let area = 0
  let cx = 0
  let cy = 0
  const n = points.length
  for (let i = 0; i < n; i++) {
    const [x0, y0] = points[i]
    const [x1, y1] = points[(i + 1) % n]
    const cross = x0 * y1 - x1 * y0
    area += cross
    cx += (x0 + x1) * cross
    cy += (y0 + y1) * cross
  }
  area /= 2
  cx /= 6 * area
  cy /= 6 * area
  return { cx, cy }
}

function ZoneShape({ zone }) {
  const isNeutral = zone.role === 'neutral'
  const fill = isNeutral ? 'none' : (ZONE_FILL[zone.role] ?? ZONE_FILL.neutral)
  const common = {
    fill,
    stroke: isNeutral ? 'var(--color-text-secondary)' : 'var(--color-zone-stroke)',
    strokeWidth: isNeutral ? 0.5 : 0.6,
    strokeDasharray: isNeutral ? '1 0.5' : 'none',
    opacity: isNeutral ? 0.9 : 1,
  }

  if (zone.shape === 'rect') {
    return (
      <rect
        x={toX(zone.x)} y={toY(zone.y)}
        width={toX(zone.width)} height={toY(zone.height)}
        {...common}
      />
    )
  }
  if (zone.shape === 'polygon') {
    const pts = zone.points
      .map(([px, py]) => `${toX(px)},${toY(py)}`)
      .join(' ')
    return <polygon points={pts} {...common} />
  }
  if (zone.shape === 'ellipse') {
    return (
      <ellipse
        cx={toX(zone.cx)} cy={toY(zone.cy)}
        rx={toX(zone.rx)} ry={toY(zone.ry)}
        {...common}
      />
    )
  }
  return null
}

function ZoneLabel({ zone }) {
  let cx, cy

  if (zone.labelPos) {
    cx = toX(zone.labelPos.x)
    cy = toY(zone.labelPos.y)
  } else if (zone.shape === 'rect') {
    cx = toX(zone.x + zone.width / 2)
    cy = toY(zone.y + zone.height / 2)
  } else if (zone.shape === 'polygon') {
    const c = polygonCentroid(zone.points)
    cx = toX(c.cx)
    cy = toY(c.cy)
  } else if (zone.shape === 'ellipse') {
    cx = toX(zone.cx)
    cy = toY(zone.cy)
  }

  const isNeutral = zone.role === 'neutral'

  return (
    <text
      x={cx} y={cy}
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize={isNeutral ? 3.5 : 4.5}
      fontFamily="var(--font-label, 'Georgia', serif)"
      fill={isNeutral ? 'var(--color-text-secondary)' : 'var(--color-text-primary)'}
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
  // Vertical lines every 6" (= 12 SVG units on 120-unit wide board)
  for (let x = 12; x < VB_W; x += 12) {
    lines.push(
      <line key={`v${x}`} x1={x} y1={0} x2={x} y2={VB_H}
        stroke="var(--color-battlefield-grid)" strokeWidth={0.2} />
    )
  }
  // Horizontal lines every ~6" (44/7.33 ≈ 6")
  const hStep = VB_H / 7.33
  for (let y = hStep; y < VB_H; y += hStep) {
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
  const hStep = VB_H / 7.33

  for (let x = stepX; x < VB_W; x += stepX) {
    marks.push(
      <line key={`tx-t${x}`} x1={x} y1={0} x2={x} y2={tickLen}
        stroke="var(--color-text-secondary)" strokeWidth={0.35} opacity={0.5} />,
      <line key={`tx-b${x}`} x1={x} y1={VB_H} x2={x} y2={VB_H - tickLen}
        stroke="var(--color-text-secondary)" strokeWidth={0.35} opacity={0.5} />
    )
  }
  for (let y = hStep; y < VB_H; y += hStep) {
    marks.push(
      <line key={`ty-l${y.toFixed(1)}`} x1={0} y1={y} x2={tickLen} y2={y}
        stroke="var(--color-text-secondary)" strokeWidth={0.35} opacity={0.5} />,
      <line key={`ty-r${y.toFixed(1)}`} x1={VB_W} y1={y} x2={VB_W - tickLen} y2={y}
        stroke="var(--color-text-secondary)" strokeWidth={0.35} opacity={0.5} />
    )
  }
  return <>{marks}</>
}

function RulerLabels() {
  const labels = []
  const stepX = 12
  const hStep = VB_H / 7.33
  const textStyle = { userSelect: 'none', pointerEvents: 'none' }
  const commonProps = {
    fontSize: 2.2,
    fontFamily: 'var(--font-body)',
    fill: 'var(--color-text-secondary)',
    opacity: 0.7,
    style: textStyle,
  }

  // Top and bottom edges: 6" increments along the 60" axis
  for (let x = stepX; x < VB_W; x += stepX) {
    const inches = Math.round((x / VB_W) * 60)
    labels.push(
      <text key={`lx-t${x}`} x={x} y={2.8} textAnchor="middle" {...commonProps}>
        {inches}&quot;
      </text>,
      <text key={`lx-b${x}`} x={x} y={VB_H - 1.2} textAnchor="middle" {...commonProps}>
        {inches}&quot;
      </text>
    )
  }

  // Left and right edges: ~6" increments along the 44" axis
  for (let y = hStep; y < VB_H; y += hStep) {
    const inches = Math.round((y / VB_H) * 44)
    labels.push(
      <text key={`ly-l${y.toFixed(1)}`} x={1.8} y={y}
        textAnchor="start" dominantBaseline="middle" {...commonProps}>
        {inches}&quot;
      </text>,
      <text key={`ly-r${y.toFixed(1)}`} x={VB_W - 1.8} y={y}
        textAnchor="end" dominantBaseline="middle" {...commonProps}>
        {inches}&quot;
      </text>
    )
  }
  return <>{labels}</>
}

function Crosshair() {
  return (
    <>
      <line x1={VB_W / 2} y1={0} x2={VB_W / 2} y2={VB_H}
        stroke="var(--color-text-secondary)" strokeWidth={0.25}
        strokeDasharray="1 1" opacity={0.25} />
      <line x1={0} y1={VB_H / 2} x2={VB_W} y2={VB_H / 2}
        stroke="var(--color-text-secondary)" strokeWidth={0.25}
        strokeDasharray="1 1" opacity={0.25} />
    </>
  )
}

function TerrainPiece({ piece }) {
  if (piece.image) {
    return (
      <image
        href={piece.image}
        x={toX(piece.x)} y={toY(piece.y)}
        width={toX(piece.width)} height={toY(piece.height)}
        preserveAspectRatio="none"
        opacity={0.9}
      />
    )
  }

  const cx = toX(piece.x + piece.width / 2)
  const cy = toY(piece.y + piece.height / 2)
  return (
    <g transform={`rotate(${piece.rotate ?? 0}, ${cx}, ${cy})`}>
      <rect
        x={toX(piece.x)} y={toY(piece.y)}
        width={toX(piece.width)} height={toY(piece.height)}
        fill="#5a5850" stroke="#8a8878" strokeWidth={0.35}
        opacity={0.85} rx={0.3}
      />
      {piece.label && (
        <text
          x={cx} y={cy}
          textAnchor="middle" dominantBaseline="middle"
          fontSize={2.2} fontFamily="var(--font-label, 'Georgia', serif)"
          fill="var(--color-text-secondary)" opacity={0.9}
          style={{ userSelect: 'none', pointerEvents: 'none' }}
        >
          {piece.label}
        </text>
      )}
    </g>
  )
}

function ObjectiveMarker({ obj }) {
  const cx = toX(obj.x)
  const cy = toY(obj.y)
  const r = 2.8
  const pts = `${cx},${cy - r} ${cx + r},${cy} ${cx},${cy + r} ${cx - r},${cy}`
  return (
    <g>
      <polygon
        points={pts}
        fill="#1a2a1a"
        stroke="var(--color-text-accent)" strokeWidth={0.45} opacity={0.92}
      />
      <text
        x={cx} y={cy}
        textAnchor="middle" dominantBaseline="middle"
        fontSize={2.6} fill="var(--color-text-accent)" opacity={0.9}
        style={{ userSelect: 'none', pointerEvents: 'none' }}
      >☠</text>
      {obj.label && (
        <text
          x={cx} y={cy + r + 1.4}
          textAnchor="middle" dominantBaseline="middle"
          fontSize={1.8} fontFamily="var(--font-label, 'Georgia', serif)"
          fill="var(--color-text-accent)" opacity={0.75}
          style={{ userSelect: 'none', pointerEvents: 'none' }}
        >
          {obj.label}
        </text>
      )}
    </g>
  )
}

export default function Battlefield({ mission, terrainLayout }) {
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

          {/* Deployment zones — attacker and defender first, neutral overlays last */}
          {mission.zones
            .filter(z => z.role !== 'neutral')
            .map((zone, i) => <ZoneShape key={i} zone={zone} />)}
          {mission.zones
            .filter(z => z.role === 'neutral')
            .map((zone, i) => <ZoneShape key={`n${i}`} zone={zone} />)}

          {/* Terrain pieces from selected layout */}
          {(terrainLayout?.terrain ?? []).map((piece, i) => (
            <TerrainPiece key={`t-${i}`} piece={piece} />
          ))}

          {/* Centre crosshair */}
          <Crosshair />

          {/* Zone labels */}
          {mission.zones.map((zone, i) => (
            <ZoneLabel key={`lbl-${i}`} zone={zone} />
          ))}

          {/* Ruler ticks + labels */}
          <RulerMarks />
          <RulerLabels />

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
