import { useState, useCallback } from 'react'
import { MISSIONS } from '../components/DeploymentZones/zones.js'

export function useBattlefield() {
  const [selectedMission, setSelectedMission] = useState(MISSIONS[0])

  const selectMission = useCallback((mission) => {
    setSelectedMission(mission)
  }, [])

  return {
    missions: MISSIONS,
    selectedMission,
    selectMission,
  }
}
