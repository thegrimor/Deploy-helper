import styles from './DeploymentZoneSelector.module.css'

export default function TerrainLayoutSelector({ layouts, selectedLayout, onSelect }) {
  if (!layouts || layouts.length === 0) return null

  function handleChange(e) {
    const layout = layouts.find(l => l.id === e.target.value)
    if (layout) onSelect(layout)
  }

  return (
    <nav className={styles.selector} aria-label="Terrain layout">
      <label className={styles.heading} htmlFor="terrain-select">Terrain Layout</label>
      <select
        id="terrain-select"
        className={styles.select}
        value={selectedLayout?.id ?? ''}
        onChange={handleChange}
      >
        {layouts.map((layout) => (
          <option key={layout.id} value={layout.id}>
            {layout.shortName} — {layout.name}
          </option>
        ))}
      </select>
    </nav>
  )
}
