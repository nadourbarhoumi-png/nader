"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, BarChart3, Settings } from "lucide-react"

interface IndicatorData {
  name: string
  value: number
  signal: "BUY" | "SELL" | "NEUTRAL"
  description: string
  period: number
}

export function TechnicalIndicators({ symbol = "AAPL" }: { symbol?: string }) {
  const [indicators, setIndicators] = useState<IndicatorData[]>([
    { name: "RSI (14)", value: 67.8, signal: "NEUTRAL", description: "Relative Strength Index", period: 14 },
    { name: "MACD", value: 2.34, signal: "BUY", description: "Moving Average Convergence Divergence", period: 12 },
    { name: "SMA (20)", value: 181.45, signal: "BUY", description: "Simple Moving Average", period: 20 },
    { name: "EMA (50)", value: 179.23, signal: "BUY", description: "Exponential Moving Average", period: 50 },
    { name: "Bollinger Upper", value: 185.67, signal: "SELL", description: "Bollinger Band Upper", period: 20 },
    { name: "Bollinger Lower", value: 177.89, signal: "BUY", description: "Bollinger Band Lower", period: 20 },
    { name: "Stochastic %K", value: 78.9, signal: "SELL", description: "Stochastic Oscillator", period: 14 },
    { name: "Williams %R", value: -23.4, signal: "BUY", description: "Williams Percent Range", period: 14 },
  ])

  // Simulate real-time indicator updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIndicators((prevIndicators) =>
        prevIndicators.map((indicator) => {
          let newValue = indicator.value
          let newSignal = indicator.signal

          // Simulate indicator calculations with realistic ranges
          switch (indicator.name.split(" ")[0]) {
            case "RSI":
              newValue = Math.max(0, Math.min(100, indicator.value + (Math.random() - 0.5) * 5))
              newSignal = newValue > 70 ? "SELL" : newValue < 30 ? "BUY" : "NEUTRAL"
              break
            case "MACD":
              newValue = indicator.value + (Math.random() - 0.5) * 0.5
              newSignal = newValue > 0 ? "BUY" : "SELL"
              break
            case "SMA":
            case "EMA":
              newValue = indicator.value + (Math.random() - 0.5) * 2
              newSignal = newValue > 182 ? "SELL" : newValue < 180 ? "BUY" : "NEUTRAL"
              break
            case "Bollinger":
              newValue = indicator.value + (Math.random() - 0.5) * 1
              break
            case "Stochastic":
              newValue = Math.max(0, Math.min(100, indicator.value + (Math.random() - 0.5) * 8))
              newSignal = newValue > 80 ? "SELL" : newValue < 20 ? "BUY" : "NEUTRAL"
              break
            case "Williams":
              newValue = Math.max(-100, Math.min(0, indicator.value + (Math.random() - 0.5) * 10))
              newSignal = newValue > -20 ? "SELL" : newValue < -80 ? "BUY" : "NEUTRAL"
              break
          }

          return { ...indicator, value: newValue, signal: newSignal }
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case "BUY":
        return "bg-green-500/20 text-green-400"
      case "SELL":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-yellow-500/20 text-yellow-400"
    }
  }

  const getSignalIcon = (signal: string) => {
    switch (signal) {
      case "BUY":
        return <TrendingUp className="h-3 w-3" />
      case "SELL":
        return <TrendingDown className="h-3 w-3" />
      default:
        return <BarChart3 className="h-3 w-3" />
    }
  }

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-purple-400" />
            Technical Indicators - {symbol}
          </CardTitle>
          <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {indicators.map((indicator, index) => (
            <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-white text-sm">{indicator.name}</span>
                  <Badge variant="secondary" className={getSignalColor(indicator.signal)}>
                    {getSignalIcon(indicator.signal)}
                    <span className="ml-1">{indicator.signal}</span>
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold text-white">{indicator.value.toFixed(2)}</div>
                  <div className="text-xs text-slate-400">{indicator.description}</div>
                </div>

                {/* Visual indicator bar */}
                <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      indicator.signal === "BUY"
                        ? "bg-green-500"
                        : indicator.signal === "SELL"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                    }`}
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(
                          0,
                          indicator.name.includes("RSI") || indicator.name.includes("Stochastic")
                            ? indicator.value
                            : indicator.name.includes("Williams")
                              ? indicator.value + 100
                              : 50,
                        ),
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
