"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe, TrendingUp, TrendingDown } from "lucide-react"

interface ForexPair {
  pair: string
  name: string
  rate: number
  change: number
  changePercent: number
  high24h: number
  low24h: number
}

export function ForexRates() {
  const [forexPairs, setForexPairs] = useState<ForexPair[]>([
    {
      pair: "EUR/USD",
      name: "Euro / US Dollar",
      rate: 1.0856,
      change: 0.0012,
      changePercent: 0.11,
      high24h: 1.089,
      low24h: 1.0834,
    },
    {
      pair: "GBP/USD",
      name: "British Pound / US Dollar",
      rate: 1.2734,
      change: -0.0023,
      changePercent: -0.18,
      high24h: 1.2789,
      low24h: 1.2701,
    },
    {
      pair: "USD/JPY",
      name: "US Dollar / Japanese Yen",
      rate: 149.67,
      change: 0.45,
      changePercent: 0.3,
      high24h: 150.12,
      low24h: 149.23,
    },
    {
      pair: "AUD/USD",
      name: "Australian Dollar / US Dollar",
      rate: 0.6789,
      change: 0.0034,
      changePercent: 0.5,
      high24h: 0.6823,
      low24h: 0.6756,
    },
    {
      pair: "USD/CAD",
      name: "US Dollar / Canadian Dollar",
      rate: 1.3456,
      change: -0.0012,
      changePercent: -0.09,
      high24h: 1.3478,
      low24h: 1.3434,
    },
  ])

  // Simulate real-time forex updates
  useEffect(() => {
    const interval = setInterval(() => {
      setForexPairs((prevPairs) =>
        prevPairs.map((pair) => {
          const randomChange = (Math.random() - 0.5) * 0.01 // Small forex movements
          const newRate = Math.max(0.0001, pair.rate + randomChange)
          const change = newRate - pair.rate
          const changePercent = (change / pair.rate) * 100

          return {
            ...pair,
            rate: newRate,
            change: change,
            changePercent: changePercent,
            high24h: Math.max(pair.high24h, newRate),
            low24h: Math.min(pair.low24h, newRate),
          }
        }),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Globe className="mr-2 h-5 w-5 text-blue-400" />
          Forex Rates
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {forexPairs.map((pair) => (
            <div
              key={pair.pair}
              className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <Globe className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white">{pair.pair}</div>
                  <div className="text-xs text-slate-400">{pair.name}</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="font-semibold text-white">{pair.rate.toFixed(4)}</div>
                  <div className="text-xs text-slate-400">
                    H: {pair.high24h.toFixed(4)} L: {pair.low24h.toFixed(4)}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {pair.changePercent >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-400" />
                  )}
                  <div className="text-right">
                    <div className={`font-semibold ${pair.changePercent >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {pair.change >= 0 ? "+" : ""}
                      {pair.change.toFixed(4)}
                    </div>
                    <Badge
                      variant="secondary"
                      className={
                        pair.changePercent >= 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                      }
                    >
                      {pair.changePercent >= 0 ? "+" : ""}
                      {pair.changePercent.toFixed(2)}%
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
