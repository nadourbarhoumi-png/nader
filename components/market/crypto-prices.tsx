"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bitcoin, TrendingUp, TrendingDown } from "lucide-react"

interface CryptoData {
  symbol: string
  name: string
  price: number
  change24h: number
  changePercent24h: number
  marketCap: string
  volume24h: string
}

export function CryptoPrices() {
  const [cryptos, setCryptos] = useState<CryptoData[]>([
    {
      symbol: "BTC",
      name: "Bitcoin",
      price: 43567.89,
      change24h: 1234.56,
      changePercent24h: 2.91,
      marketCap: "850.2B",
      volume24h: "28.4B",
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      price: 2634.78,
      change24h: -45.23,
      changePercent24h: -1.69,
      marketCap: "316.8B",
      volume24h: "15.2B",
    },
    {
      symbol: "BNB",
      name: "BNB",
      price: 345.67,
      change24h: 12.34,
      changePercent24h: 3.7,
      marketCap: "53.1B",
      volume24h: "2.1B",
    },
    {
      symbol: "SOL",
      name: "Solana",
      price: 98.45,
      change24h: 5.67,
      changePercent24h: 6.11,
      marketCap: "42.3B",
      volume24h: "1.8B",
    },
    {
      symbol: "ADA",
      name: "Cardano",
      price: 0.4567,
      change24h: -0.0234,
      changePercent24h: -4.88,
      marketCap: "16.2B",
      volume24h: "456M",
    },
  ])

  // Simulate real-time crypto price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptos((prevCryptos) =>
        prevCryptos.map((crypto) => {
          const randomChange = (Math.random() - 0.5) * (crypto.price * 0.02) // 2% max change
          const newPrice = Math.max(0.0001, crypto.price + randomChange)
          const change24h = newPrice - crypto.price
          const changePercent24h = (change24h / crypto.price) * 100

          return {
            ...crypto,
            price: newPrice,
            change24h: change24h,
            changePercent24h: changePercent24h,
          }
        }),
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Bitcoin className="mr-2 h-5 w-5 text-orange-400" />
          Cryptocurrency Prices
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {cryptos.map((crypto) => (
            <div
              key={crypto.symbol}
              className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800/70 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">{crypto.symbol.slice(0, 2)}</span>
                </div>
                <div>
                  <div className="font-semibold text-white">{crypto.symbol}</div>
                  <div className="text-xs text-slate-400">{crypto.name}</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="font-semibold text-white">
                    ${crypto.price < 1 ? crypto.price.toFixed(4) : crypto.price.toFixed(2)}
                  </div>
                  <div className="text-xs text-slate-400">MCap: {crypto.marketCap}</div>
                </div>

                <div className="flex items-center space-x-2">
                  {crypto.changePercent24h >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-400" />
                  )}
                  <div className="text-right">
                    <div
                      className={`font-semibold ${crypto.changePercent24h >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {crypto.change24h >= 0 ? "+" : ""}$
                      {crypto.change24h < 1 ? crypto.change24h.toFixed(4) : crypto.change24h.toFixed(2)}
                    </div>
                    <Badge
                      variant="secondary"
                      className={
                        crypto.changePercent24h >= 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                      }
                    >
                      {crypto.changePercent24h >= 0 ? "+" : ""}
                      {crypto.changePercent24h.toFixed(2)}%
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
