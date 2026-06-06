import { useState, useCallback, useMemo } from 'react'
import { MISSIONS } from '../components/DeploymentZones/zones.js'
import { PRIMARIAS } from '../components/DeploymentZones/primarias.js'
import { TERRAIN_LAYOUTS } from '../components/DeploymentZones/terrainLayouts.js'

export function useBattlefield() {
  const [selectedMission, setSelectedMission] = useState(MISSIONS[0])
  const [selectedPrimaria, setSelectedPrimaria] = useState(PRIMARIAS[0])

  const terrainLayouts = useMemo(
    () => TERRAIN_LAYOUTS.filter(l => l.deploymentId === selectedMission.id),
    [selectedMission.id]
  )

  const [selectedTerrainLayout, setSelectedTerrainLayout] = useState(
    () => TERRAIN_LAYOUTS.find(l => l.deploymentId === MISSIONS[0].id) ?? null
  )

  const selectMission = useCallback((mission) => {
    setSelectedMission(mission)
    const firstLayout = TERRAIN_LAYOUTS.find(l => l.deploymentId === mission.id) ?? null
    setSelectedTerrainLayout(firstLayout)
  }, [])

  const selectPrimaria = useCallback((primaria) => {
    setSelectedPrimaria(primaria)
  }, [])

  const selectTerrainLayout = useCallback((layout) => {
    setSelectedTerrainLayout(layout)
  }, [])

  return {
    missions: MISSIONS,
    selectedMission,
    selectMission,
    primarias: PRIMARIAS,
    selectedPrimaria,
    selectPrimaria,
    terrainLayouts,
    selectedTerrainLayout,
    selectTerrainLayout,
  }
}
