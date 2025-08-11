"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shield, Settings } from "lucide-react"

interface StopLossOrder {
  id: string
  symbol: string
  type: "STOP_LOSS" | "TAKE_PROFIT" | "TRAILING_STOP"
  triggerPrice: number
  currentPrice: number
  quantity: number
  status: "ACTIVE" | "TRIGGERED" | "CANCELLED"
  trailingAmount?: number
  highWaterMark?: number
}

export function StopLossManager() {
  const [orders, setOrders] = useState<StopLossOrder[]>([
    {
      id: "1",
      symbol: "AAPL",
      type: "STOP_LOSS",
      triggerPrice: 178.2,
      currentPrice: 182.45,
      quantity: 100,
      status: "ACTIVE",
    },
    {
      id: "2",
      symbol: "AAPL",
      type: "TAKE_PROFIT",
      triggerPrice: 195.5,
      currentPrice: 182.45,
      quantity: 100,
      status: "ACTIVE",
    },
    {
      id: "3",
      symbol: "GOOGL",
      type: "TRAILING_STOP",
      triggerPrice: 2750.0,
      currentPrice: 2834.56,
      quantity: 10,
      status: "ACTIVE",
      trailingAmount: 50.0,
      highWaterMark: 2834.56,
    },
    {
      id: "4",
      symbol: "MSFT",
      type: "STOP_LOSS",
      triggerPrice: 365.0,
      currentPrice: 378.9,
      quantity: 50,
      status: "ACTIVE",
    },
  ])

  const [newOrder, setNewOrder] = useState({
    symbol: "",
    type: "STOP_LOSS" as const,
    triggerPrice: 0,
    quantity: 0,
    trailingAmount: 0,
  })

  // Simulate real-time price updates and trailing stop adjustments
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          const priceChange = (Math.random() - 0.5) * 2
          const newCurrentPrice = Math.max(0.01, order.currentPrice + priceChange)

          let updatedOrder = { ...order, currentPrice: newCurrentPrice }

          // Handle trailing stop logic
          if (order.type === "TRAILING_STOP" && order.trailingAmount && order.highWaterMark) {
            const newHighWaterMark = Math.max(order.highWaterMark, newCurrentPrice)
            const newTriggerPrice = newHighWaterMark - order.trailingAmount

            updatedOrder = {
              ...updatedOrder,
              highWaterMark: newHighWaterMark,
              triggerPrice: newTriggerPrice,
            }
          }

          // Check if order should be triggered
          if (order.status === "ACTIVE") {
            if (
              (order.type === "STOP_LOSS" && newCurrentPrice <= order.triggerPrice) ||
              (order.type === "TAKE_PROFIT" && newCurrentPrice >= order.triggerPrice) ||
              (order.type === "TRAILING_STOP" && newCurrentPrice <= updatedOrder.triggerPrice)
            ) {
              updatedOrder.status = "TRIGGERED"
            }
          }

          return updatedOrder
        }),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const addOrder = () => {
    if (newOrder.symbol && newOrder.triggerPrice && newOrder.quantity) {
      const order: StopLossOrder = {
        id: Date.now().toString(),
        symbol: newOrder.symbol.toUpperCase(),
        type: newOrder.type,
        triggerPrice: newOrder.triggerPrice,
        currentPrice: newOrder.triggerPrice + (Math.random() - 0.5) * 10, // Simulate current price
        quantity: newOrder.quantity,
        status: "ACTIVE",
        ...(newOrder.type === "TRAILING_STOP" && {
          trailingAmount: newOrder.trailingAmount,
          highWaterMark: newOrder.triggerPrice + newOrder.trailingAmount,
        }),
      }

      setOrders((prev) => [order, ...prev])
      setNewOrder({ symbol: "", type: "STOP_LOSS", triggerPrice: 0, quantity: 0, trailingAmount: 0 })
    }
  }

  const cancelOrder = (id: string) => {
    setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, status: "CANCELLED" } : order)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-green-500/20 text-green-400"
      case "TRIGGERED":
        return "bg-blue-500/20 text-blue-400"
      default:
        return "bg-slate-500/20 text-slate-400"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "STOP_LOSS":
        return "bg-red-500/20 text-red-400"
      case "TAKE_PROFIT":
        return "bg-green-500/20 text-green-400"
      default:
        return "bg-purple-500/20 text-purple-400"
    }
  }

  const getDistanceToTrigger = (order: StopLossOrder) => {
    const distance = ((order.triggerPrice - order.currentPrice) / order.currentPrice) * 100
    return distance
  }

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Shield className="mr-2 h-5 w-5 text-red-400" />
            Stop Loss & Take Profit Manager
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add New Order */}
          <div className="p-4 bg-slate-800/50 rounded-lg mb-6 border border-slate-700">
            <h4 className="text-sm font-semibold text-white mb-3">Create New Order</h4>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
              <Input
                placeholder="Symbol"
                value={newOrder.symbol}
                onChange={(e) => setNewOrder((prev) => ({ ...prev, symbol: e.target.value }))}
                className="bg-slate-800 border-slate-600 text-white"
              />
              <select
                value={newOrder.type}
                onChange={(e) => setNewOrder((prev) => ({ ...prev, type: e.target.value as any }))}
                className="bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-white text-sm"
              >
                <option value="STOP_LOSS">Stop Loss</option>
                <option value="TAKE_PROFIT">Take Profit</option>
                <option value="TRAILING_STOP">Trailing Stop</option>
              </select>
              <Input
                type="number"
                placeholder="Trigger Price"
                value={newOrder.triggerPrice || ""}
                onChange={(e) =>
                  setNewOrder((prev) => ({ ...prev, triggerPrice: Number.parseFloat(e.target.value) || 0 }))
                }
                className="bg-slate-800 border-slate-600 text-white"
              />
              <Input
                type="number"
                placeholder="Quantity"
                value={newOrder.quantity || ""}
                onChange={(e) => setNewOrder((prev) => ({ ...prev, quantity: Number.parseInt(e.target.value) || 0 }))}
                className="bg-slate-800 border-slate-600 text-white"
              />
              {newOrder.type === "TRAILING_STOP" && (
                <Input
                  type="number"
                  placeholder="Trail Amount"
                  value={newOrder.trailingAmount || ""}
                  onChange={(e) =>
                    setNewOrder((prev) => ({ ...prev, trailingAmount: Number.parseFloat(e.target.value) || 0 }))
                  }
                  className="bg-slate-800 border-slate-600 text-white"
                />
              )}
              <Button onClick={addOrder} className="bg-blue-600 hover:bg-blue-700">
                Add Order
              </Button>
            </div>
          </div>

          {/* Active Orders */}
          <div className="space-y-3">
            {orders.map((order) => (
              <div key={order.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="font-semibold text-white">{order.symbol}</span>
                    <Badge variant="secondary" className={getTypeColor(order.type)}>
                      {order.type.replace("_", " ")}
                    </Badge>
                    <Badge variant="secondary" className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                    <span className="text-sm text-slate-400">{order.quantity} shares</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {order.status === "ACTIVE" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => cancelOrder(order.id)}
                        className="text-slate-400 hover:text-white"
                      >
                        Cancel
                      </Button>
                    )}
                    <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400">Current Price:</span>
                    <div className="font-semibold text-white">${order.currentPrice.toFixed(2)}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Trigger Price:</span>
                    <div className="font-semibold text-white">${order.triggerPrice.toFixed(2)}</div>
                  </div>
                  <div>
                    <span className="text-slate-400">Distance:</span>
                    <div
                      className={`font-semibold ${Math.abs(getDistanceToTrigger(order)) < 2 ? "text-red-400" : "text-slate-300"}`}
                    >
                      {getDistanceToTrigger(order).toFixed(1)}%
                    </div>
                  </div>
                  {order.type === "TRAILING_STOP" && order.trailingAmount && (
                    <div>
                      <span className="text-slate-400">Trail Amount:</span>
                      <div className="font-semibold text-white">${order.trailingAmount.toFixed(2)}</div>
                    </div>
                  )}
                </div>

                {Math.abs(getDistanceToTrigger(order)) < 2 && order.status === "ACTIVE" && (
                  <div className="mt-3 p-2 bg-red-500/10 border border-red-500/30 rounded text-sm text-red-400">
                    ⚠ Order is close to trigger price ({Math.abs(getDistanceToTrigger(order)).toFixed(1)}% away)
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
