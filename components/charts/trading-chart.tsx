"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, BarChart3, Maximize2 } from "lucide-react"

interface ChartData {
  time: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

interface TradingChartProps {
  symbol: string
  data?: ChartData[]
}

export function TradingChart({ symbol, data = [] }: TradingChartProps) {
  const [timeframe, setTimeframe] = useState("1H")
  const [chartType, setChartType] = useState("candlestick")
  const [currentPrice, setCurrentPrice] = useState(0)
  const [priceChange, setPriceChange] = useState(0)
  const [isPositive, setIsPositive] = useState(true)

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      const basePrice = 182.45
      const randomChange = (Math.random() - 0.5) * 2
      const newPrice = basePrice + randomChange
      const change = ((newPrice - basePrice) / basePrice) * 100

      setCurrentPrice(newPrice)
      setPriceChange(change)
      setIsPositive(change >= 0)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const timeframes = ["1M", "5M", "15M", "1H", "4H", "1D", "1W"]

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="mr-2 h-5 w-5 text-blue-400" />
              {symbol}
            </CardTitle>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white">${currentPrice.toFixed(2)}</span>
              <Badge
                variant="secondary"
                className={isPositive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}
              >
                {isPositive ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {priceChange >= 0 ? "+" : ""}
                {priceChange.toFixed(2)}%
              </Badge>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-1">
            {timeframes.map((tf) => (
              <Button
                key={tf}
                variant={timeframe === tf ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setTimeframe(tf)}
                className={`text-xs ${
                  timeframe === tf ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {tf}
              </Button>
            ))}
          </div>

          <div className="flex space-x-1">
            <Button
              variant={chartType === "candlestick" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setChartType("candlestick")}
              className="text-xs text-slate-400 hover:text-white"
            >
              Candles
            </Button>
            <Button
              variant={chartType === "line" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setChartType("line")}
              className="text-xs text-slate-400 hover:text-white"
            >
              Line
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-96 bg-slate-800/30 rounded-lg flex items-center justify-center relative overflow-hidden">
          {/* Simulated candlestick chart */}
          <div className="absolute inset-0 p-4">
            <svg width="100%" height="100%" className="text-slate-600">
              {/* Grid lines */}
              <defs>
                <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Simulated candlesticks */}
              {Array.from({ length: 20 }, (_, i) => {
                const x = (i + 1) * 30
                const isGreen = Math.random() > 0.5
                const bodyHeight = Math.random() * 20 + 10
                const wickTop = Math.random() * 15
                const wickBottom = Math.random() * 15
                const y = 150 + (Math.random() - 0.5) * 100

                return (
                  <g key={i}>
                    {/* Wick */}
                    <line
                      x1={x}
                      y1={y - wickTop}
                      x2={x}
                      y2={y + bodyHeight + wickBottom}
                      stroke={isGreen ? "#10b981" : "#ef4444"}
                      strokeWidth="1"
                    />
                    {/* Body */}
                    <rect
                      x={x - 6}
                      y={y}
                      width="12"
                      height={bodyHeight}
                      fill={isGreen ? "#10b981" : "#ef4444"}
                      opacity="0.8"
                    />
                  </g>
                )
              })}
            </svg>
          </div>

          {/* Chart overlay info */}
          <div className="absolute top-4 left-4 bg-slate-900/80 rounded-lg p-3 text-sm">
            <div className="grid grid-cols-2 gap-4 text-slate-300">
              <div>
                <span className="text-slate-500">O:</span> 181.23
              </div>
              <div>
                <span className="text-slate-500">H:</span> 184.56
              </div>
              <div>
                <span className="text-slate-500">L:</span> 180.12
              </div>
              <div>
                <span className="text-slate-500">C:</span> {currentPrice.toFixed(2)}
              </div>
            </div>
          </div>
        </div>

        {/* Volume chart */}
        <div className="h-20 bg-slate-800/30 rounded-lg mt-4 flex items-end justify-center p-2">
          {Array.from({ length: 20 }, (_, i) => {
            const height = Math.random() * 60 + 10
            return (
              <div key={i} className="bg-slate-600 mx-0.5 rounded-t" style={{ height: `${height}%`, width: "4%" }} />
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
