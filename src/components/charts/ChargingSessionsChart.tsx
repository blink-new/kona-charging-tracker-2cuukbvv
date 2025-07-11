import React from 'react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts'

interface ChargingSessionsChartProps {
  acSessions: number
  dcSessions: number
}

const ChargingSessionsChart: React.FC<ChargingSessionsChartProps> = ({ 
  acSessions, 
  dcSessions 
}) => {
  const data = [
    {
      name: 'Charge AC',
      value: acSessions,
      color: '#10b981',
    },
    {
      name: 'Charge DC',
      value: dcSessions,
      color: '#f59e0b',
    },
  ]

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { payload: any }[] }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium">{data.name}</p>
          <p className="text-sm">
            <span style={{ color: data.color }}>●</span> {data.value} sessions
          </p>
        </div>
      )
    }
    return null
  }

  const CustomLegend = ({ payload }: { payload?: { value: string; color: string }[] }) => {
    return (
      <div className="flex justify-center space-x-6 mt-4">
        {payload?.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="text-sm text-gray-600">{entry.value}</span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ChargingSessionsChart