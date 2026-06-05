import { useState, useCallback } from 'react'
import { MISSIONS } from '../components/DeploymentZones/zones.js'
import { PRIMARIAS } from '../components/DeploymentZones/primarias.js'

export function useBattlefield() {
  const [selectedMission, setSelectedMission] = useState(MISSIONS[0])
  const [selectedPrimaria, setSelectedPrimaria] = useState(PRIMARIAS[0])

  const selectMission = useCallback((mission) => {
    setSelectedMission(mission)
  }, [])

  const selectPrimaria = useCallback((primaria) => {
    setSelectedPrimaria(primaria)
  }, [])

  return {
    missions: MISSIONS,
    selectedMission,
    selectMission,
    primarias: PRIMARIAS,
    selectedPrimaria,
    selectPrimaria,
  }
}
