import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import Sidebar from '@/components/Sidebar'
import Dashboard from '@/components/Dashboard'
import ChargingHistory from '@/components/ChargingHistory'
import Settings from '@/components/Settings'
import { ChargingDataProvider } from '@/context/ChargingDataContext'

function App() {
  return (
    <ChargingDataProvider>
      <Router>
        <div className="flex h-screen bg-gray-50">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/history" element={<ChargingHistory />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
          <Toaster />
        </div>
      </Router>
    </ChargingDataProvider>
  )
}

export default App