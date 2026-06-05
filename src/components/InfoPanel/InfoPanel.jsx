import styles from './InfoPanel.module.css'

export default function InfoPanel({ mission }) {
  return (
    <aside className={styles.panel} aria-live="polite" aria-atomic="true">
      <h3 className={styles.missionName}>{mission.name}</h3>
      <p className={styles.description}>{mission.description}</p>
      <dl className={styles.meta}>
        <div className={styles.metaRow}>
          <dt>Zones</dt>
          <dd>{mission.zones.filter(z => z.role !== 'neutral').length}</dd>
        </div>
        <div className={styles.metaRow}>
          <dt>Attacker</dt>
          <dd style={{ color: 'var(--color-zone-attacker-solid)' }}>Red</dd>
        </div>
        <div className={styles.metaRow}>
          <dt>Defender</dt>
          <dd style={{ color: 'var(--color-zone-defender-solid)' }}>Blue</dd>
        </div>
      </dl>
    </aside>
  )
}
