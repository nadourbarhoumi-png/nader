"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, TrendingDown, Activity } from "lucide-react"

interface VolumeData {
  time: string
  volume: number
  price: number
  type: "ACCUMULATION" | "DISTRIBUTION" | "NEUTRAL"
}

export function VolumeAnalysis({ symbol = "AAPL" }: { symbol?: string }) {
  const [volumeProfile, setVolumeProfile] = useState([
    { priceLevel: 185, volume: 2500000, percentage: 15 },
    { priceLevel: 184, volume: 4200000, percentage: 25 },
    { priceLevel: 183, volume: 3800000, percentage: 23 },
    { priceLevel: 182, volume: 5100000, percentage: 30 },
    { priceLevel: 181, volume: 1800000, percentage: 11 },
    { priceLevel: 180, volume: 2200000, percentage: 13 },
  ])

  const [volumeIndicators, setVolumeIndicators] = useState({
    obv: 15420000, // On Balance Volume
    obvTrend: "BULLISH",
    vwap: 182.67, // Volume Weighted Average Price
    volumeRatio: 1.34, // Current vs Average Volume
    accumulation: 67, // Accumulation/Distribution percentage
  })

  const [recentVolume, setRecentVolume] = useState<VolumeData[]>([
    { time: "09:30", volume: 2100000, price: 181.5, type: "ACCUMULATION" },
    { time: "10:00", volume: 1800000, price: 182.1, type: "ACCUMULATION" },
    { time: "10:30", volume: 2400000, price: 182.8, type: "NEUTRAL" },
    { time: "11:00", volume: 1900000, price: 182.45, type: "DISTRIBUTION" },
    { time: "11:30", volume: 2200000, price: 183.2, type: "ACCUMULATION" },
  ])

  // Simulate real-time volume updates
  useEffect(() => {
    const interval = setInterval(() => {
      setVolumeIndicators((prev) => ({
        ...prev,
        obv: prev.obv + (Math.random() - 0.5) * 1000000,
        vwap: prev.vwap + (Math.random() - 0.5) * 0.5,
        volumeRatio: Math.max(0.5, Math.min(3.0, prev.volumeRatio + (Math.random() - 0.5) * 0.2)),
        accumulation: Math.max(0, Math.min(100, prev.accumulation + (Math.random() - 0.5) * 5)),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getVolumeTypeColor = (type: string) => {
    switch (type) {
      case "ACCUMULATION":
        return "text-green-400"
      case "DISTRIBUTION":
        return "text-red-400"
      default:
        return "text-yellow-400"
    }
  }

  const getVolumeTypeIcon = (type: string) => {
    switch (type) {
      case "ACCUMULATION":
        return <TrendingUp className="h-3 w-3" />
      case "DISTRIBUTION":
        return <TrendingDown className="h-3 w-3" />
      default:
        return <Activity className="h-3 w-3" />
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-blue-400" />
            Volume Analysis - {symbol}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-3 bg-slate-800/50 rounded-lg">
              <div className="text-xs text-slate-400 mb-1">On Balance Volume</div>
              <div className="font-semibold text-white">{(volumeIndicators.obv / 1000000).toFixed(1)}M</div>
              <Badge
                variant="secondary"
                className={
                  volumeIndicators.obvTrend === "BULLISH"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }
              >
                {volumeIndicators.obvTrend}
              </Badge>
            </div>

            <div className="p-3 bg-slate-800/50 rounded-lg">
              <div className="text-xs text-slate-400 mb-1">VWAP</div>
              <div className="font-semibold text-white">${volumeIndicators.vwap.toFixed(2)}</div>
              <div className="text-xs text-slate-400">Volume Weighted</div>
            </div>

            <div className="p-3 bg-slate-800/50 rounded-lg">
              <div className="text-xs text-slate-400 mb-1">Volume Ratio</div>
              <div className="font-semibold text-white">{volumeIndicators.volumeRatio.toFixed(2)}x</div>
              <div className="text-xs text-slate-400">vs Average</div>
            </div>

            <div className="p-3 bg-slate-800/50 rounded-lg">
              <div className="text-xs text-slate-400 mb-1">Accumulation</div>
              <div className="font-semibold text-white">{volumeIndicators.accumulation.toFixed(0)}%</div>
              <div className="text-xs text-slate-400">A/D Line</div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="text-sm font-semibold text-white mb-3">Volume Profile</h4>
            <div className="space-y-2">
              {volumeProfile.map((level, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-sm text-slate-400 w-12">${level.priceLevel}</span>
                  <div className="flex-1 bg-slate-700 rounded-full h-4 relative overflow-hidden">
                    <div
                      className="bg-blue-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${level.percentage}%` }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-xs text-white font-semibold">
                      {(level.volume / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 w-8">{level.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Recent Volume Activity</h4>
            <div className="space-y-2">
              {recentVolume.map((data, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-slate-800/30 rounded">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-slate-400">{data.time}</span>
                    <span className="text-sm text-white">{(data.volume / 1000000).toFixed(1)}M</span>
                    <span className="text-sm text-slate-300">${data.price.toFixed(2)}</span>
                  </div>
                  <Badge variant="secondary" className={`${getVolumeTypeColor(data.type)} bg-transparent`}>
                    {getVolumeTypeIcon(data.type)}
                    <span className="ml-1">{data.type}</span>
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
