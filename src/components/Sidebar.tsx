import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  Car, 
  History, 
  Settings, 
  Battery, 
  Zap,
  Gauge
} from 'lucide-react'
import { cn } from '@/lib/utils'

const Sidebar = () => {
  const navigation = [
    { name: 'Dashboard', href: '/', icon: Gauge },
    { name: 'Historique', href: '/history', icon: History },
    { name: 'Paramètres', href: '/settings', icon: Settings },
  ]

  return (
    <div className="bg-white border-r border-gray-200 w-64 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Car className="h-8 w-8 text-blue-600" />
            <Zap className="h-4 w-4 text-yellow-500 absolute -bottom-1 -right-1" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Kona Tracker</h1>
            <p className="text-sm text-gray-500">Hyundai Kona Electric</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-blue-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )
              }
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </NavLink>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <Battery className="h-5 w-5 text-green-600" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">Véhicule connecté</p>
            <p className="text-xs text-gray-500 truncate">Via Bluelink API</p>
          </div>
          <div className="h-2 w-2 bg-green-400 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar