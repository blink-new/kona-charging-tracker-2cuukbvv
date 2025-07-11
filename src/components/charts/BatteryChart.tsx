import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { ChargingSession } from '@/context/ChargingDataContext'

interface BatteryChartProps {
  data: ChargingSession[]
}

const BatteryChart: React.FC<BatteryChartProps> = ({ data }) => {
  const chartData = data
    .slice()
    .reverse()
    .map((session) => ({
      time: session.timestamp.toLocaleDateString('fr-FR'),
      batteryLevel: session.batteryLevel,
      isCharging: session.isCharging,
    }))

  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { payload: any }[]; label?: string }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="text-blue-600">●</span> Batterie: {data.batteryLevel}%
            </p>
            <p className="text-sm">
              <span className={data.isCharging ? "text-green-600" : "text-gray-600"}>●</span>
              {data.isCharging ? 'En charge' : 'Arrêté'}
            </p>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="time" 
            stroke="#666"
            fontSize={12}
            tickLine={false}
          />
          <YAxis 
            stroke="#666"
            fontSize={12}
            tickLine={false}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="batteryLevel"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#2563eb', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default BatteryChart