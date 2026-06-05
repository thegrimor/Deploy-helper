import styles from './DeploymentZoneSelector.module.css'

export default function DeploymentZoneSelector({ missions, selectedMission, onSelect }) {
  return (
    <nav className={styles.selector} aria-label="Mission type">
      <h2 className={styles.heading}>Mission Type</h2>
      <ul className={styles.list} role="list">
        {missions.map((mission) => (
          <li key={mission.id}>
            <button
              className={`${styles.missionBtn} ${
                selectedMission.id === mission.id ? styles.active : ''
              }`}
              onClick={() => onSelect(mission)}
              aria-pressed={selectedMission.id === mission.id}
            >
              <span className={styles.shortName}>{mission.shortName}</span>
              <span className={styles.fullName}>{mission.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
