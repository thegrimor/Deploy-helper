import Header from './components/Header/Header.jsx'
import Battlefield from './components/Battlefield/Battlefield.jsx'
import DeploymentZoneSelector from './components/DeploymentZones/DeploymentZoneSelector.jsx'
import TerrainLayoutSelector from './components/DeploymentZones/TerrainLayoutSelector.jsx'
import PrimariaSelector from './components/DeploymentZones/PrimariaSelector.jsx'
import InfoPanel from './components/InfoPanel/InfoPanel.jsx'
import { useBattlefield } from './hooks/useBattlefield.js'
import styles from './App.module.css'

export default function App() {
  const {
    missions, selectedMission, selectMission,
    primarias, selectedPrimaria, selectPrimaria,
    terrainLayouts, selectedTerrainLayout, selectTerrainLayout,
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
          <TerrainLayoutSelector
            layouts={terrainLayouts}
            selectedLayout={selectedTerrainLayout}
            onSelect={selectTerrainLayout}
          />
          <PrimariaSelector
            primarias={primarias}
            selectedPrimaria={selectedPrimaria}
            onSelect={selectPrimaria}
          />
          <InfoPanel mission={selectedMission} primaria={selectedPrimaria} terrainLayout={selectedTerrainLayout} />
        </aside>
        <section className={styles.battlefieldSection}>
          <Battlefield mission={selectedMission} terrainLayout={selectedTerrainLayout} />
        </section>
      </main>
    </div>
  )
}
