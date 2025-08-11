"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"

interface PriceData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: string
  marketCap?: string
}

export function LivePrices() {
  const [prices, setPrices] = useState<PriceData[]>([
    { symbol: "AAPL", name: "Apple Inc.", price: 182.45, change: 2.34, changePercent: 1.3, volume: "45.2M" },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 2834.56, change: -12.45, changePercent: -0.44, volume: "23.1M" },
    { symbol: "MSFT", name: "Microsoft Corp.", price: 378.9, change: 5.67, changePercent: 1.52, volume: "32.8M" },
    { symbol: "TSLA", name: "Tesla Inc.", price: 234.67, change: -8.9, changePercent: -3.65, volume: "67.4M" },
    { symbol: "AMZN", name: "Amazon.com Inc.", price: 3456.78, change: 23.45, changePercent: 0.68, volume: "28.9M" },
    { symbol: "NVDA", name: "NVIDIA Corp.", price: 567.89, change: 15.67, changePercent: 2.84, volume: "41.2M" },
  ])

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prevPrices) =>
        prevPrices.map((stock) => {
          const randomChange = (Math.random() - 0.5) * 2
          const newPrice = Math.max(0.01, stock.price + randomChange)
          const change = newPrice - stock.price
          const changePercent = (change / stock.price) * 100

          return {
            ...stock,
            price: newPrice,
            change: change,
            changePercent: changePercent,
          }
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Activity className="mr-2 h-5 w-5 text-green-400" />
          Live Market Prices
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {prices.map((stock) => (
            <div
              key={stock.symbol}
              className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div>
                  <div className="font-semibold text-white">{stock.symbol}</div>
                  <div className="text-xs text-slate-400">{stock.name}</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="font-semibold text-white">${stock.price.toFixed(2)}</div>
                  <div className="text-xs text-slate-400">Vol: {stock.volume}</div>
                </div>

                <div className="flex items-center space-x-2">
                  {stock.changePercent >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-400" />
                  )}
                  <div className="text-right">
                    <div className={`font-semibold ${stock.changePercent >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {stock.change >= 0 ? "+" : ""}
                      {stock.change.toFixed(2)}
                    </div>
                    <Badge
                      variant="secondary"
                      className={
                        stock.changePercent >= 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                      }
                    >
                      {stock.changePercent >= 0 ? "+" : ""}
                      {stock.changePercent.toFixed(2)}%
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
