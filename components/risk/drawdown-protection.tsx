"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingDown, Shield, AlertTriangle } from "lucide-react"

interface DrawdownMetrics {
  currentDrawdown: number
  maxDrawdown: number
  peakValue: number
  currentValue: number
  drawdownDuration: number
  recoveryTime: number
  protectionLevel: "NONE" | "MODERATE" | "AGGRESSIVE"
  isProtectionActive: boolean
}

export function DrawdownProtection() {
  const [metrics, setMetrics] = useState<DrawdownMetrics>({
    currentDrawdown: -2.3,
    maxDrawdown: -8.7,
    peakValue: 130456.78,
    currentValue: 127456.78,
    drawdownDuration: 5,
    recoveryTime: 12,
    protectionLevel: "MODERATE",
    isProtectionActive: false,
  })

  const [protectionRules, setProtectionRules] = useState([
    {
      id: "1",
      name: "Daily Loss Limit",
      threshold: -5.0,
      action: "STOP_TRADING",
      isActive: true,
      triggered: false,
    },
    {
      id: "2",
      name: "Maximum Drawdown",
      threshold: -10.0,
      action: "REDUCE_POSITIONS",
      isActive: true,
      triggered: false,
    },
    {
      id: "3",
      name: "Consecutive Losses",
      threshold: 5,
      action: "PAUSE_TRADING",
      isActive: true,
      triggered: false,
    },
    {
      id: "4",
      name: "Volatility Spike",
      threshold: 25.0,
      action: "HEDGE_PORTFOLIO",
      isActive: false,
      triggered: false,
    },
  ])

  const [drawdownHistory, setDrawdownHistory] = useState(
    Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      drawdown: Math.max(-15, (Math.random() - 0.7) * 10),
      portfolioValue: 127456.78 + (Math.random() - 0.5) * 10000,
    })),
  )

  // Simulate real-time drawdown monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => {
        const valueChange = (Math.random() - 0.5) * 1000
        const newCurrentValue = Math.max(50000, prev.currentValue + valueChange)
        const newPeakValue = Math.max(prev.peakValue, newCurrentValue)
        const newDrawdown = ((newCurrentValue - newPeakValue) / newPeakValue) * 100

        return {
          ...prev,
          currentValue: newCurrentValue,
          peakValue: newPeakValue,
          currentDrawdown: newDrawdown,
          maxDrawdown: Math.min(prev.maxDrawdown, newDrawdown),
          drawdownDuration: newDrawdown < -1 ? prev.drawdownDuration + 1 : 0,
        }
      })

      // Check protection rules
      setProtectionRules((prev) =>
        prev.map((rule) => {
          let shouldTrigger = false

          switch (rule.name) {
            case "Daily Loss Limit":
              shouldTrigger = metrics.currentDrawdown <= rule.threshold
              break
            case "Maximum Drawdown":
              shouldTrigger = metrics.currentDrawdown <= rule.threshold
              break
            case "Consecutive Losses":
              shouldTrigger = metrics.drawdownDuration >= rule.threshold
              break
            case "Volatility Spike":
              shouldTrigger = Math.random() > 0.95 // Simulate volatility spike
              break
          }

          return {
            ...rule,
            triggered: rule.isActive && shouldTrigger,
          }
        }),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [metrics])

  const getDrawdownColor = (drawdown: number) => {
    if (drawdown > -3) return "text-green-400"
    if (drawdown > -6) return "text-yellow-400"
    return "text-red-400"
  }

  const getDrawdownBg = (drawdown: number) => {
    if (drawdown > -3) return "bg-green-500"
    if (drawdown > -6) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case "STOP_TRADING":
        return "text-red-400"
      case "REDUCE_POSITIONS":
        return "text-yellow-400"
      case "PAUSE_TRADING":
        return "text-orange-400"
      default:
        return "text-blue-400"
    }
  }

  const toggleProtection = () => {
    setMetrics((prev) => ({ ...prev, isProtectionActive: !prev.isProtectionActive }))
  }

  const toggleRule = (id: string) => {
    setProtectionRules((prev) => prev.map((rule) => (rule.id === id ? { ...rule, isActive: !rule.isActive } : rule)))
  }

  const triggeredRules = protectionRules.filter((rule) => rule.triggered)

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center">
              <TrendingDown className="mr-2 h-5 w-5 text-red-400" />
              Drawdown Protection System
            </CardTitle>
            <Button
              onClick={toggleProtection}
              variant={metrics.isProtectionActive ? "secondary" : "outline"}
              className={metrics.isProtectionActive ? "bg-green-600 hover:bg-green-700" : "border-slate-600"}
            >
              <Shield className="mr-2 h-4 w-4" />
              {metrics.isProtectionActive ? "Protection ON" : "Protection OFF"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Current Drawdown Status */}
          <div className="p-6 bg-slate-800/50 rounded-lg mb-6 border border-slate-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getDrawdownColor(metrics.currentDrawdown)}`}>
                  {metrics.currentDrawdown.toFixed(1)}%
                </div>
                <div className="text-sm text-slate-400">Current Drawdown</div>
              </div>
              <div className="text-center">
                <div className={`text-3xl font-bold ${getDrawdownColor(metrics.maxDrawdown)}`}>
                  {metrics.maxDrawdown.toFixed(1)}%
                </div>
                <div className="text-sm text-slate-400">Max Drawdown</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{metrics.drawdownDuration}</div>
                <div className="text-sm text-slate-400">Days in Drawdown</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">
                  ${(metrics.peakValue - metrics.currentValue).toFixed(0)}
                </div>
                <div className="text-sm text-slate-400">Loss from Peak</div>
              </div>
            </div>

            {/* Drawdown Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-slate-400 mb-2">
                <span>Drawdown Level</span>
                <span>{metrics.currentDrawdown.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-300 ${getDrawdownBg(metrics.currentDrawdown)}`}
                  style={{ width: `${Math.min(100, Math.abs(metrics.currentDrawdown) * 10)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Active Alerts */}
          {triggeredRules.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                <AlertTriangle className="mr-2 h-4 w-4 text-red-400" />
                Active Protection Alerts
              </h4>
              <div className="space-y-2">
                {triggeredRules.map((rule) => (
                  <div key={rule.id} className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                        <span className="text-sm text-white">{rule.name} triggered</span>
                        <Badge variant="secondary" className="bg-red-500/20 text-red-400">
                          {rule.action.replace("_", " ")}
                        </Badge>
                      </div>
                      <Button size="sm" variant="outline" className="border-red-500 text-red-400 bg-transparent">
                        Take Action
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Protection Rules */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-white mb-3">Protection Rules</h4>
            <div className="space-y-3">
              {protectionRules.map((rule) => (
                <div key={rule.id} className="p-4 bg-slate-800/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRule(rule.id)}
                        className={rule.isActive ? "text-green-400" : "text-slate-400"}
                      >
                        {rule.isActive ? "ON" : "OFF"}
                      </Button>
                      <span className="text-white">{rule.name}</span>
                      <Badge variant="outline" className="border-slate-600 text-slate-300">
                        {rule.threshold}
                        {rule.name.includes("Loss") || rule.name.includes("Drawdown") ? "%" : ""}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm ${getActionColor(rule.action)}`}>{rule.action.replace("_", " ")}</span>
                      {rule.triggered && <AlertTriangle className="h-4 w-4 text-red-400" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Drawdown History Chart */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">30-Day Drawdown History</h4>
            <div className="h-32 bg-slate-800/30 rounded-lg p-4 flex items-end justify-between">
              {drawdownHistory.slice(-30).map((data, index) => (
                <div key={index} className="flex flex-col items-center space-y-1">
                  <div
                    className={`w-2 rounded-t transition-all duration-300 ${getDrawdownBg(data.drawdown)}`}
                    style={{ height: `${Math.max(5, Math.abs(data.drawdown) * 8)}px` }}
                  />
                  {index % 5 === 0 && <span className="text-xs text-slate-500">{data.day}d</span>}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
