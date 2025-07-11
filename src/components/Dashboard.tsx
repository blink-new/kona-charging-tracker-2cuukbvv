import React from 'react'
import { useChargingData } from '@/context/ChargingDataContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Battery, 
  Zap, 
  Clock, 
  TrendingUp, 
  MapPin,
  Calendar,
  BarChart3
} from 'lucide-react'
import BatteryChart from '@/components/charts/BatteryChart'
import ChargingSessionsChart from '@/components/charts/ChargingSessionsChart'

const Dashboard = () => {
  const { currentStatus, chargingSessions } = useChargingData()

  // Calculate statistics
  const totalSessions = chargingSessions.length
  const averageBatteryLevel = chargingSessions.reduce((sum, session) => sum + session.batteryLevel, 0) / totalSessions
  const acSessions = chargingSessions.filter(s => s.chargeType === 'AC').length
  const dcSessions = chargingSessions.filter(s => s.chargeType === 'DC').length
  const currentlyCharging = chargingSessions.filter(s => s.isCharging).length

  const stats = [
    {
      title: 'Niveau Batterie',
      value: `${currentStatus?.batteryLevel || 0}%`,
      icon: Battery,
      color: currentStatus?.batteryLevel && currentStatus.batteryLevel > 20 ? 'text-green-600' : 'text-red-600',
      bgColor: currentStatus?.batteryLevel && currentStatus.batteryLevel > 20 ? 'bg-green-50' : 'bg-red-50',
    },
    {
      title: 'Sessions Totales',
      value: totalSessions.toString(),
      icon: BarChart3,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Niveau Moyen',
      value: `${Math.round(averageBatteryLevel)}%`,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'En Charge',
      value: currentlyCharging.toString(),
      icon: Zap,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Vue d'ensemble de votre Hyundai Kona Electric</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Current Status */}
      {currentStatus && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Zap className="h-5 w-5" />
              <span>Statut Actuel</span>
            </CardTitle>
            <CardDescription>
              Dernière mise à jour: {currentStatus.timestamp.toLocaleString('fr-FR')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Niveau de batterie</label>
                <div className="space-y-2">
                  <Progress value={currentStatus.batteryLevel} className="h-2" />
                  <p className="text-sm text-gray-600">{currentStatus.batteryLevel}%</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">État de charge</label>
                <div className="flex items-center space-x-2">
                  <Badge variant={currentStatus.isCharging ? "default" : "secondary"}>
                    {currentStatus.isCharging ? 'En charge' : 'Arrêté'}
                  </Badge>
                  <Badge variant="outline">{currentStatus.chargeType}</Badge>
                </div>
              </div>

              {currentStatus.remainingTimeMinutes && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Temps restant</label>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{currentStatus.remainingTimeMinutes} minutes</span>
                  </div>
                </div>
              )}

              {currentStatus.location && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Localisation</label>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{currentStatus.location}</span>
                  </div>
                </div>
              )}

              {currentStatus.power && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Puissance</label>
                  <div className="flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{currentStatus.power.toFixed(1)} kW</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Évolution Batterie</span>
            </CardTitle>
            <CardDescription>Niveau de batterie sur les 7 derniers jours</CardDescription>
          </CardHeader>
          <CardContent>
            <BatteryChart data={chargingSessions.slice(0, 48)} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Types de Charge</span>
            </CardTitle>
            <CardDescription>Répartition AC vs DC</CardDescription>
          </CardHeader>
          <CardContent>
            <ChargingSessionsChart acSessions={acSessions} dcSessions={dcSessions} />
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions Rapides</CardTitle>
          <CardDescription>Gérez votre véhicule et vos données</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="flex items-center space-x-3">
                <Calendar className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Planifier Recharge</p>
                  <p className="text-sm text-gray-600">Programmer une session</p>
                </div>
              </div>
            </button>
            
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Bornes Proches</p>
                  <p className="text-sm text-gray-600">Trouver des bornes</p>
                </div>
              </div>
            </button>
            
            <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <div className="flex items-center space-x-3">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium">Rapport Mensuel</p>
                  <p className="text-sm text-gray-600">Générer un rapport</p>
                </div>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard