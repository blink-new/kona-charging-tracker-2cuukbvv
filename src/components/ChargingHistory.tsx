import React, { useState, useMemo } from 'react'
import { useChargingData } from '@/context/ChargingDataContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Download, 
  Search, 
  Filter,
  Calendar,
  Battery,
  Zap,
  Clock,
  MapPin
} from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const ChargingHistory = () => {
  const { chargingSessions, exportToExcel } = useChargingData()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [sortBy, setSortBy] = useState('date')

  const filteredSessions = useMemo(() => {
    let filtered = [...chargingSessions]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(session => 
        session.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.chargeType.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply type filter
    if (filterType !== 'all') {
      if (filterType === 'charging') {
        filtered = filtered.filter(session => session.isCharging)
      } else if (filterType === 'ac') {
        filtered = filtered.filter(session => session.chargeType === 'AC')
      } else if (filterType === 'dc') {
        filtered = filtered.filter(session => session.chargeType === 'DC')
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return b.timestamp.getTime() - a.timestamp.getTime()
        case 'battery':
          return b.batteryLevel - a.batteryLevel
        case 'duration':
          return (b.sessionDurationMinutes || 0) - (a.sessionDurationMinutes || 0)
        default:
          return 0
      }
    })

    return filtered
  }, [chargingSessions, searchTerm, filterType, sortBy])

  const formatDuration = (minutes?: number) => {
    if (!minutes) return '-'
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Historique des Recharges</h1>
          <p className="text-gray-600 mt-2">
            {filteredSessions.length} session{filteredSessions.length > 1 ? 's' : ''} trouvée{filteredSessions.length > 1 ? 's' : ''}
          </p>
        </div>
        <Button onClick={exportToExcel} className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Exporter Excel</span>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filtres</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Recherche</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Localisation, type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="charging">En charge</SelectItem>
                  <SelectItem value="ac">AC seulement</SelectItem>
                  <SelectItem value="dc">DC seulement</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Trier par</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="battery">Niveau batterie</SelectItem>
                  <SelectItem value="duration">Durée</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('')
                  setFilterType('all')
                  setSortBy('date')
                }}
                className="w-full"
              >
                Réinitialiser
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Sessions de Recharge</CardTitle>
          <CardDescription>Historique détaillé de toutes vos sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Date/Heure</TableHead>
                  <TableHead>Batterie</TableHead>
                  <TableHead>État</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Durée</TableHead>
                  <TableHead>Puissance</TableHead>
                  <TableHead>Localisation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="font-medium">
                            {session.timestamp.toLocaleDateString('fr-FR')}
                          </p>
                          <p className="text-sm text-gray-500">
                            {session.timestamp.toLocaleTimeString('fr-FR')}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Battery className="h-4 w-4 text-green-600" />
                        <span className="font-medium">{session.batteryLevel}%</span>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <Badge variant={session.isCharging ? "default" : "secondary"}>
                        {session.isCharging ? 'En charge' : 'Arrêté'}
                      </Badge>
                    </TableCell>
                    
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={session.chargeType === 'DC' ? 'border-orange-200 text-orange-700' : 'border-blue-200 text-blue-700'}
                      >
                        {session.chargeType}
                      </Badge>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>{formatDuration(session.sessionDurationMinutes)}</span>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Zap className="h-4 w-4 text-yellow-600" />
                        <span>{session.power ? `${session.power.toFixed(1)} kW` : '-'}</span>
                      </div>
                    </TableCell>
                    
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="truncate max-w-[150px]">{session.location || '-'}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredSessions.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Aucune session trouvée avec ces filtres</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ChargingHistory