import styles from './DeploymentZoneSelector.module.css'

export default function DeploymentZoneSelector({ missions, selectedMission, onSelect }) {
  function handleChange(e) {
    const mission = missions.find(m => m.id === e.target.value)
    if (mission) onSelect(mission)
  }

  return (
    <nav className={styles.selector} aria-label="Mission type">
      <label className={styles.heading} htmlFor="mission-select">Mission Type</label>
      <select
        id="mission-select"
        className={styles.select}
        value={selectedMission.id}
        onChange={handleChange}
      >
        {missions.map((mission) => (
          <option key={mission.id} value={mission.id}>
            {mission.shortName} — {mission.name}
          </option>
        ))}
      </select>
    </nav>
  )
}
