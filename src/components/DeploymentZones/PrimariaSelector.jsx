import styles from './DeploymentZoneSelector.module.css'

export default function PrimariaSelector({ primarias, selectedPrimaria, onSelect }) {
  function handleChange(e) {
    const primaria = primarias.find(p => p.id === e.target.value)
    if (primaria) onSelect(primaria)
  }

  return (
    <nav className={styles.selector} aria-label="Primary mission">
      <label className={styles.heading} htmlFor="primaria-select">Primary Mission</label>
      <select
        id="primaria-select"
        className={styles.select}
        value={selectedPrimaria.id}
        onChange={handleChange}
      >
        {primarias.map((p) => (
          <option key={p.id} value={p.id}>
            {p.shortName} — {p.name}
          </option>
        ))}
      </select>
    </nav>
  )
}
