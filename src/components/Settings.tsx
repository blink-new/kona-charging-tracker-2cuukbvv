import React, { useState } from 'react'
import { useChargingData } from '@/context/ChargingDataContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { toast } from 'react-hot-toast'
import { 
 
  Wifi, 
  Shield, 
  Clock, 
  Download,
  AlertTriangle,
  CheckCircle,
  Key
} from 'lucide-react'

const Settings = () => {
  const { bluelinkConfig, setBluelinkConfig, exportToExcel } = useChargingData()
  const [formData, setFormData] = useState(bluelinkConfig)
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setBluelinkConfig(formData)
      toast.success('Configuration sauvegardée avec succès')
    } catch {
      toast.error('Erreur lors de la sauvegarde')
    } finally {
      setIsLoading(false)
    }
  }

  const handleTest = async () => {
    setIsLoading(true)
    try {
      // Simulate connection test
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success('Connexion Bluelink réussie')
      setFormData(prev => ({ ...prev, isConnected: true }))
    } catch {
      toast.error('Échec de la connexion Bluelink')
      setFormData(prev => ({ ...prev, isConnected: false }))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-600 mt-2">Configuration et paramètres de l'application</p>
      </div>

      {/* Bluelink Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Wifi className="h-5 w-5" />
            <span>Configuration Bluelink</span>
          </CardTitle>
          <CardDescription>
            Configurez vos identifiants pour accéder aux données de votre véhicule
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Connection Status */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              {formData.isConnected ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              )}
              <div>
                <p className="font-medium">État de la connexion</p>
                <p className="text-sm text-gray-600">
                  {formData.isConnected ? 'Connecté à Bluelink' : 'Non connecté'}
                </p>
              </div>
            </div>
            <Badge variant={formData.isConnected ? "default" : "secondary"}>
              {formData.isConnected ? 'Connecté' : 'Déconnecté'}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Bluelink</Label>
              <Input
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pin">Code PIN</Label>
              <Input
                id="pin"
                type="password"
                placeholder="****"
                maxLength={4}
                value={formData.pin}
                onChange={(e) => setFormData(prev => ({ ...prev, pin: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <Button onClick={handleTest} disabled={isLoading} variant="outline">
              {isLoading ? 'Test en cours...' : 'Tester la connexion'}
            </Button>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Synchronization Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Synchronisation Automatique</span>
          </CardTitle>
          <CardDescription>
            Configurez la fréquence de récupération des données
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Synchronisation automatique</Label>
              <p className="text-sm text-gray-600">
                Récupérer automatiquement les données du véhicule
              </p>
            </div>
            <Switch
              checked={formData.autoSync}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, autoSync: checked }))
              }
            />
          </div>

          {formData.autoSync && (
            <div className="space-y-2">
              <Label>Intervalle de synchronisation</Label>
              <Select 
                value={formData.syncInterval.toString()} 
                onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, syncInterval: parseInt(value) }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">Toutes les 10 minutes</SelectItem>
                  <SelectItem value="30">Toutes les 30 minutes</SelectItem>
                  <SelectItem value="60">Toutes les heures</SelectItem>
                  <SelectItem value="120">Toutes les 2 heures</SelectItem>
                  <SelectItem value="360">Toutes les 6 heures</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Gestion des Données</span>
          </CardTitle>
          <CardDescription>
            Exportez et gérez vos données de recharge
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button onClick={exportToExcel} className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Exporter vers Excel</span>
            </Button>
            
            <Button variant="outline" className="flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Rapport PDF</span>
            </Button>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-medium">Format d'export</h4>
            <p className="text-sm text-gray-600">
              Les données sont exportées au format CSV compatible Excel avec les colonnes :
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>• Date/Heure</div>
              <div>• Niveau batterie (%)</div>
              <div>• État de charge</div>
              <div>• Type de charge</div>
              <div>• Temps restant</div>
              <div>• Localisation</div>
              <div>• Puissance (kW)</div>
              <div>• Durée session</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Sécurité et Confidentialité</span>
          </CardTitle>
          <CardDescription>
            Informations sur la sécurité de vos données
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Key className="h-4 w-4 text-green-600" />
                <span className="font-medium">Stockage sécurisé</span>
              </div>
              <p className="text-sm text-gray-600">
                Vos identifiants sont stockés de manière chiffrée dans le navigateur
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-blue-600" />
                <span className="font-medium">API non officielle</span>
              </div>
              <p className="text-sm text-gray-600">
                Cette application utilise une API non officielle qui peut cesser de fonctionner
              </p>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-800">Important</p>
                <p className="text-sm text-yellow-700">
                  Vos données personnelles restent sur votre appareil. 
                  Aucune information n'est transmise à des serveurs tiers.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Settings