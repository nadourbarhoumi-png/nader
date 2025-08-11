"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, Zap, Target, Shield, Clock } from "lucide-react"

interface OrderData {
  symbol: string
  side: "BUY" | "SELL"
  type: "MARKET" | "LIMIT" | "STOP"
  quantity: number
  price?: number
  stopPrice?: number
  timeInForce: "GTC" | "IOC" | "FOK"
}

interface Position {
  symbol: string
  quantity: number
  avgPrice: number
  currentPrice: number
  pnl: number
  pnlPercent: number
  side: "LONG" | "SHORT"
}

export function TradingInterface() {
  const [orderData, setOrderData] = useState<OrderData>({
    symbol: "AAPL",
    side: "BUY",
    type: "MARKET",
    quantity: 100,
    timeInForce: "GTC",
  })

  const [positions, setPositions] = useState<Position[]>([
    {
      symbol: "AAPL",
      quantity: 100,
      avgPrice: 175.5,
      currentPrice: 178.25,
      pnl: 275.0,
      pnlPercent: 1.57,
      side: "LONG",
    },
    {
      symbol: "TSLA",
      quantity: 50,
      avgPrice: 245.8,
      currentPrice: 242.15,
      pnl: -182.5,
      pnlPercent: -1.49,
      side: "LONG",
    },
    {
      symbol: "NVDA",
      quantity: 25,
      avgPrice: 485.2,
      currentPrice: 492.75,
      pnl: 188.75,
      pnlPercent: 1.56,
      side: "LONG",
    },
  ])

  const [recentTrades, setRecentTrades] = useState([
    {
      id: "1",
      symbol: "AAPL",
      side: "BUY",
      quantity: 100,
      price: 175.5,
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      status: "FILLED",
    },
    {
      id: "2",
      symbol: "TSLA",
      side: "SELL",
      quantity: 25,
      price: 248.9,
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      status: "FILLED",
    },
    {
      id: "3",
      symbol: "NVDA",
      side: "BUY",
      quantity: 25,
      price: 485.2,
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      status: "FILLED",
    },
  ])

  const [orderBook, setOrderBook] = useState({
    bids: [
      { price: 178.24, size: 500 },
      { price: 178.23, size: 750 },
      { price: 178.22, size: 1200 },
      { price: 178.21, size: 800 },
      { price: 178.2, size: 950 },
    ],
    asks: [
      { price: 178.25, size: 600 },
      { price: 178.26, size: 850 },
      { price: 178.27, size: 1100 },
      { price: 178.28, size: 700 },
      { price: 178.29, size: 900 },
    ],
  })

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPositions((prev) =>
        prev.map((pos) => {
          const priceChange = (Math.random() - 0.5) * 2
          const newPrice = Math.max(0.01, pos.currentPrice + priceChange)
          const pnl = (newPrice - pos.avgPrice) * pos.quantity * (pos.side === "LONG" ? 1 : -1)
          const pnlPercent = (pnl / (pos.avgPrice * pos.quantity)) * 100

          return {
            ...pos,
            currentPrice: newPrice,
            pnl,
            pnlPercent,
          }
        }),
      )

      // Update order book
      setOrderBook((prev) => ({
        bids: prev.bids.map((bid) => ({
          ...bid,
          price: bid.price + (Math.random() - 0.5) * 0.02,
          size: Math.max(100, bid.size + Math.floor((Math.random() - 0.5) * 200)),
        })),
        asks: prev.asks.map((ask) => ({
          ...ask,
          price: ask.price + (Math.random() - 0.5) * 0.02,
          size: Math.max(100, ask.size + Math.floor((Math.random() - 0.5) * 200)),
        })),
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const handleOrderSubmit = () => {
    const newTrade = {
      id: Date.now().toString(),
      symbol: orderData.symbol,
      side: orderData.side,
      quantity: orderData.quantity,
      price: orderData.price || orderBook.asks[0].price,
      timestamp: new Date(),
      status: "FILLED" as const,
    }

    setRecentTrades((prev) => [newTrade, ...prev.slice(0, 9)])

    // Update positions
    setPositions((prev) => {
      const existingPos = prev.find((p) => p.symbol === orderData.symbol)
      if (existingPos) {
        const newQuantity =
          orderData.side === "BUY"
            ? existingPos.quantity + orderData.quantity
            : existingPos.quantity - orderData.quantity

        if (newQuantity === 0) {
          return prev.filter((p) => p.symbol !== orderData.symbol)
        }

        const newAvgPrice =
          orderData.side === "BUY"
            ? (existingPos.avgPrice * existingPos.quantity +
                (orderData.price || orderBook.asks[0].price) * orderData.quantity) /
              newQuantity
            : existingPos.avgPrice

        return prev.map((p) =>
          p.symbol === orderData.symbol
            ? {
                ...p,
                quantity: Math.abs(newQuantity),
                avgPrice: newAvgPrice,
                side: newQuantity > 0 ? ("LONG" as const) : ("SHORT" as const),
              }
            : p,
        )
      } else {
        return [
          ...prev,
          {
            symbol: orderData.symbol,
            quantity: orderData.quantity,
            avgPrice: orderData.price || orderBook.asks[0].price,
            currentPrice: orderBook.asks[0].price,
            pnl: 0,
            pnlPercent: 0,
            side: orderData.side === "BUY" ? ("LONG" as const) : ("SHORT" as const),
          },
        ]
      }
    })
  }

  const totalPnL = positions.reduce((sum, pos) => sum + pos.pnl, 0)
  const totalPnLPercent =
    positions.length > 0 ? (totalPnL / positions.reduce((sum, pos) => sum + pos.avgPrice * pos.quantity, 0)) * 100 : 0

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Order Entry */}
      <div className="lg:col-span-1">
        <Card className="bg-slate-900/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Target className="mr-2 h-5 w-5 text-blue-400" />
              Order Entry
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-slate-400 mb-2 block">Symbol</label>
              <Select value={orderData.symbol} onValueChange={(value) => setOrderData({ ...orderData, symbol: value })}>
                <SelectTrigger className="bg-slate-800 border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AAPL">AAPL</SelectItem>
                  <SelectItem value="TSLA">TSLA</SelectItem>
                  <SelectItem value="NVDA">NVDA</SelectItem>
                  <SelectItem value="MSFT">MSFT</SelectItem>
                  <SelectItem value="GOOGL">GOOGL</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={orderData.side === "BUY" ? "default" : "outline"}
                onClick={() => setOrderData({ ...orderData, side: "BUY" })}
                className={orderData.side === "BUY" ? "bg-green-600 hover:bg-green-700" : "border-slate-600"}
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                BUY
              </Button>
              <Button
                variant={orderData.side === "SELL" ? "default" : "outline"}
                onClick={() => setOrderData({ ...orderData, side: "SELL" })}
                className={orderData.side === "SELL" ? "bg-red-600 hover:bg-red-700" : "border-slate-600"}
              >
                <TrendingDown className="mr-2 h-4 w-4" />
                SELL
              </Button>
            </div>

            <div>
              <label className="text-sm text-slate-400 mb-2 block">Order Type</label>
              <Select
                value={orderData.type}
                onValueChange={(value: any) => setOrderData({ ...orderData, type: value })}
              >
                <SelectTrigger className="bg-slate-800 border-slate-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MARKET">Market</SelectItem>
                  <SelectItem value="LIMIT">Limit</SelectItem>
                  <SelectItem value="STOP">Stop</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm text-slate-400 mb-2 block">Quantity</label>
              <Input
                type="number"
                value={orderData.quantity}
                onChange={(e) => setOrderData({ ...orderData, quantity: Number.parseInt(e.target.value) || 0 })}
                className="bg-slate-800 border-slate-600"
              />
            </div>

            {orderData.type !== "MARKET" && (
              <div>
                <label className="text-sm text-slate-400 mb-2 block">Price</label>
                <Input
                  type="number"
                  step="0.01"
                  value={orderData.price || ""}
                  onChange={(e) =>
                    setOrderData({ ...orderData, price: Number.parseFloat(e.target.value) || undefined })
                  }
                  className="bg-slate-800 border-slate-600"
                />
              </div>
            )}

            <Button onClick={handleOrderSubmit} className="w-full bg-blue-600 hover:bg-blue-700">
              <Zap className="mr-2 h-4 w-4" />
              Place Order
            </Button>
          </CardContent>
        </Card>

        {/* Order Book */}
        <Card className="bg-slate-900/50 border-slate-700 mt-6">
          <CardHeader>
            <CardTitle className="text-white text-sm">Order Book - {orderData.symbol}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-xs text-slate-400 grid grid-cols-2 gap-4">
                <span>Price</span>
                <span className="text-right">Size</span>
              </div>

              {/* Asks */}
              {orderBook.asks.reverse().map((ask, index) => (
                <div key={`ask-${index}`} className="text-xs grid grid-cols-2 gap-4 text-red-400">
                  <span>${ask.price.toFixed(2)}</span>
                  <span className="text-right">{ask.size}</span>
                </div>
              ))}

              <div className="border-t border-slate-600 my-2"></div>

              {/* Bids */}
              {orderBook.bids.map((bid, index) => (
                <div key={`bid-${index}`} className="text-xs grid grid-cols-2 gap-4 text-green-400">
                  <span>${bid.price.toFixed(2)}</span>
                  <span className="text-right">{bid.size}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Positions & Trades */}
      <div className="lg:col-span-2">
        <Tabs defaultValue="positions" className="space-y-4">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="positions" className="data-[state=active]:bg-slate-700">
              Positions
            </TabsTrigger>
            <TabsTrigger value="trades" className="data-[state=active]:bg-slate-700">
              Recent Trades
            </TabsTrigger>
          </TabsList>

          <TabsContent value="positions">
            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center">
                    <Shield className="mr-2 h-5 w-5 text-green-400" />
                    Open Positions
                  </CardTitle>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${totalPnL >= 0 ? "text-green-400" : "text-red-400"}`}>
                      ${totalPnL.toFixed(2)}
                    </div>
                    <div className={`text-sm ${totalPnLPercent >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {totalPnLPercent >= 0 ? "+" : ""}
                      {totalPnLPercent.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {positions.map((position, index) => (
                    <div key={index} className="p-4 bg-slate-800/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Badge variant={position.side === "LONG" ? "default" : "secondary"} className="bg-blue-600">
                            {position.symbol}
                          </Badge>
                          <Badge variant="outline" className="border-slate-600">
                            {position.side}
                          </Badge>
                          <span className="text-white">{position.quantity} shares</span>
                        </div>
                        <div className="text-right">
                          <div className={`font-bold ${position.pnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                            ${position.pnl.toFixed(2)}
                          </div>
                          <div className={`text-sm ${position.pnlPercent >= 0 ? "text-green-400" : "text-red-400"}`}>
                            {position.pnlPercent >= 0 ? "+" : ""}
                            {position.pnlPercent.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-slate-400 grid grid-cols-2 gap-4">
                        <span>Avg: ${position.avgPrice.toFixed(2)}</span>
                        <span>Current: ${position.currentPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trades">
            <Card className="bg-slate-900/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-blue-400" />
                  Recent Trades
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentTrades.map((trade) => (
                    <div key={trade.id} className="p-4 bg-slate-800/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline" className="border-slate-600">
                            {trade.symbol}
                          </Badge>
                          <Badge
                            variant={trade.side === "BUY" ? "default" : "secondary"}
                            className={trade.side === "BUY" ? "bg-green-600" : "bg-red-600"}
                          >
                            {trade.side}
                          </Badge>
                          <span className="text-white">
                            {trade.quantity} @ ${trade.price.toFixed(2)}
                          </span>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="border-green-600 text-green-400">
                            {trade.status}
                          </Badge>
                          <div className="text-sm text-slate-400 mt-1">{trade.timestamp.toLocaleTimeString()}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
