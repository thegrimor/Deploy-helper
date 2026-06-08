import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.titleBlock}>
          <h1 className={styles.title}>Deploy-Helper</h1>
          <p className={styles.subtitle}>Warhammer 40,000 — Deployment Zone Trainer v0.2</p>
        </div>
        <nav className={styles.nav} aria-label="Site navigation">
          {/* Future nav items */}
        </nav>
      </div>
      <div className={styles.borderLine} aria-hidden="true" />
    </header>
  )
}
