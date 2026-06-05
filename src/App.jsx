import Header from './components/Header/Header.jsx'
import Battlefield from './components/Battlefield/Battlefield.jsx'
import DeploymentZoneSelector from './components/DeploymentZones/DeploymentZoneSelector.jsx'
import PrimariaSelector from './components/DeploymentZones/PrimariaSelector.jsx'
import InfoPanel from './components/InfoPanel/InfoPanel.jsx'
import { useBattlefield } from './hooks/useBattlefield.js'
import styles from './App.module.css'

export default function App() {
  const {
    missions, selectedMission, selectMission,
    primarias, selectedPrimaria, selectPrimaria,
  } = useBattlefield()

  return (
    <div className={styles.appShell}>
      <Header />
      <main className={styles.main}>
        <aside className={styles.sidebar}>
          <DeploymentZoneSelector
            missions={missions}
            selectedMission={selectedMission}
            onSelect={selectMission}
          />
          <PrimariaSelector
            primarias={primarias}
            selectedPrimaria={selectedPrimaria}
            onSelect={selectPrimaria}
          />
          <InfoPanel mission={selectedMission} primaria={selectedPrimaria} />
        </aside>
        <section className={styles.battlefieldSection}>
          <Battlefield mission={selectedMission} />
        </section>
      </main>
    </div>
  )
}
