import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface ChargingSession {
  id: string
  timestamp: Date
  batteryLevel: number
  isCharging: boolean
  chargeType: 'AC' | 'DC'
  remainingTimeMinutes?: number
  location?: string
  power?: number
  sessionDurationMinutes?: number
  startBatteryLevel?: number
  endBatteryLevel?: number
}

interface BluelinkConfig {
  email: string
  password: string
  pin: string
  isConnected: boolean
  autoSync: boolean
  syncInterval: number // minutes
}

interface ChargingDataContextType {
  chargingSessions: ChargingSession[]
  currentStatus: ChargingSession | null
  bluelinkConfig: BluelinkConfig
  setBluelinkConfig: (config: BluelinkConfig) => void
  addChargingSession: (session: Omit<ChargingSession, 'id'>) => void
  exportToExcel: () => void
  isLoading: boolean
}

const ChargingDataContext = createContext<ChargingDataContextType | undefined>(undefined)

export const useChargingData = () => {
  const context = useContext(ChargingDataContext)
  if (!context) {
    throw new Error('useChargingData must be used within a ChargingDataProvider')
  }
  return context
}

// Generate sample data for demonstration
const generateSampleData = (): ChargingSession[] => {
  const sessions: ChargingSession[] = []
  const now = new Date()
  
  for (let i = 0; i < 50; i++) {
    const timestamp = new Date(now.getTime() - i * 6 * 60 * 60 * 1000) // Every 6 hours
    const isCharging = Math.random() > 0.7
    const batteryLevel = 20 + Math.random() * 80
    const chargeType = Math.random() > 0.3 ? 'AC' : 'DC'
    
    sessions.push({
      id: `session-${i}`,
      timestamp,
      batteryLevel: Math.round(batteryLevel),
      isCharging,
      chargeType,
      remainingTimeMinutes: isCharging ? Math.round(Math.random() * 120) : undefined,
      location: `Location ${Math.floor(Math.random() * 10) + 1}`,
      power: chargeType === 'DC' ? 50 + Math.random() * 100 : 7 + Math.random() * 15,
      sessionDurationMinutes: !isCharging ? Math.round(30 + Math.random() * 180) : undefined,
      startBatteryLevel: !isCharging ? Math.round(Math.max(10, batteryLevel - 40)) : undefined,
      endBatteryLevel: !isCharging ? Math.round(batteryLevel) : undefined,
    })
  }
  
  return sessions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

interface ChargingDataProviderProps {
  children: ReactNode
}

export const ChargingDataProvider: React.FC<ChargingDataProviderProps> = ({ children }) => {
  const [chargingSessions, setChargingSessions] = useState<ChargingSession[]>([])
  const [currentStatus, setCurrentStatus] = useState<ChargingSession | null>(null)
  const [isLoading] = useState(false)
  const [bluelinkConfig, setBluelinkConfig] = useState<BluelinkConfig>({
    email: '',
    password: '',
    pin: '',
    isConnected: false,
    autoSync: true,
    syncInterval: 30,
  })

  useEffect(() => {
    // Load sample data on mount
    const sampleData = generateSampleData()
    setChargingSessions(sampleData)
    setCurrentStatus(sampleData[0] || null)
  }, [])

  const addChargingSession = (session: Omit<ChargingSession, 'id'>) => {
    const newSession: ChargingSession = {
      ...session,
      id: `session-${Date.now()}`,
    }
    setChargingSessions(prev => [newSession, ...prev])
    setCurrentStatus(newSession)
  }

  const exportToExcel = () => {
    // Create CSV data for Excel compatibility
    const headers = [
      'Date/Heure',
      'Niveau batterie (%)',
      'En charge',
      'Type de charge',
      'Temps restant (min)',
      'Localisation',
      'Puissance (kW)',
      'Durée session (min)',
      'Niveau début (%)',
      'Niveau fin (%)'
    ]
    
    const csvData = [
      headers.join(','),
      ...chargingSessions.map(session => [
        session.timestamp.toLocaleString('fr-FR'),
        session.batteryLevel,
        session.isCharging ? 'Oui' : 'Non',
        session.chargeType,
        session.remainingTimeMinutes || '',
        session.location || '',
        session.power ? session.power.toFixed(1) : '',
        session.sessionDurationMinutes || '',
        session.startBatteryLevel || '',
        session.endBatteryLevel || ''
      ].join(','))
    ].join('\n')
    
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `kona-charging-history-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <ChargingDataContext.Provider
      value={{
        chargingSessions,
        currentStatus,
        bluelinkConfig,
        setBluelinkConfig,
        addChargingSession,
        exportToExcel,
        isLoading,
      }}
    >
      {children}
    </ChargingDataContext.Provider>
  )
}