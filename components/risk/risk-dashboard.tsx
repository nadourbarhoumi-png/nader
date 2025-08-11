"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, AlertTriangle, BarChart3 } from "lucide-react"

interface RiskMetrics {
  portfolioValue: number
  dailyPnL: number
  maxDailyLoss: number
  currentDrawdown: number
  maxDrawdown: number
  sharpeRatio: number
  volatility: number
  beta: number
  var95: number
  riskScore: number
}

interface PositionRisk {
  symbol: string
  position: number
  marketValue: number
  unrealizedPnL: number
  riskLevel: "LOW" | "MEDIUM" | "HIGH"
  stopLoss: number
  takeProfit: number
  positionSize: number
  correlation: number
}

export function RiskDashboard() {
  const [riskMetrics, setRiskMetrics] = useState<RiskMetrics>({
    portfolioValue: 127456.78,
    dailyPnL: 2456.78,
    maxDailyLoss: -5000,
    currentDrawdown: -2.3,
    maxDrawdown: -8.7,
    sharpeRatio: 1.34,
    volatility: 18.5,
    beta: 1.12,
    var95: -4.2,
    riskScore: 73,
  })

  const [positions, setPositions] = useState<PositionRisk[]>([
    {
      symbol: "AAPL",
      position: 100,
      marketValue: 18245,
      unrealizedPnL: 456.78,
      riskLevel: "MEDIUM",
      stopLoss: 178.2,
      takeProfit: 195.5,
      positionSize: 14.3,
      correlation: 0.67,
    },
    {
      symbol: "GOOGL",
      position: 10,
      marketValue: 28345,
      unrealizedPnL: -234.56,
      riskLevel: "HIGH",
      stopLoss: 2750.0,
      takeProfit: 3100.0,
      positionSize: 22.2,
      correlation: 0.72,
    },
    {
      symbol: "MSFT",
      position: 50,
      marketValue: 18945,
      unrealizedPnL: 789.12,
      riskLevel: "LOW",
      stopLoss: 365.0,
      takeProfit: 395.0,
      positionSize: 14.9,
      correlation: 0.58,
    },
  ])

  const [riskAlerts, setRiskAlerts] = useState([
    {
      type: "DRAWDOWN",
      message: "Portfolio approaching maximum drawdown limit",
      severity: "HIGH",
      timestamp: new Date().toISOString(),
    },
    {
      type: "CONCENTRATION",
      message: "GOOGL position exceeds 20% portfolio allocation",
      severity: "MEDIUM",
      timestamp: new Date(Date.now() - 1800000).toISOString(),
    },
  ])

  // Simulate real-time risk updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRiskMetrics((prev) => ({
        ...prev,
        dailyPnL: prev.dailyPnL + (Math.random() - 0.5) * 200,
        currentDrawdown: Math.max(-15, Math.min(0, prev.currentDrawdown + (Math.random() - 0.5) * 0.5)),
        riskScore: Math.max(0, Math.min(100, prev.riskScore + (Math.random() - 0.5) * 5)),
        var95: prev.var95 + (Math.random() - 0.5) * 0.3,
      }))

      setPositions((prev) =>
        prev.map((pos) => ({
          ...pos,
          unrealizedPnL: pos.unrealizedPnL + (Math.random() - 0.5) * 100,
          marketValue: pos.marketValue + (Math.random() - 0.5) * 500,
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getRiskColor = (level: string) => {
    switch (level) {
      case "LOW":
        return "text-green-400"
      case "MEDIUM":
        return "text-yellow-400"
      default:
        return "text-red-400"
    }
  }

  const getRiskBg = (level: string) => {
    switch (level) {
      case "LOW":
        return "bg-green-500/20 text-green-400"
      case "MEDIUM":
        return "bg-yellow-500/20 text-yellow-400"
      default:
        return "bg-red-500/20 text-red-400"
    }
  }

  const getDrawdownColor = (drawdown: number) => {
    if (drawdown > -3) return "text-green-400"
    if (drawdown > -6) return "text-yellow-400"
    return "text-red-400"
  }

  const totalPositionValue = positions.reduce((sum, pos) => sum + pos.marketValue, 0)
  const totalUnrealizedPnL = positions.reduce((sum, pos) => sum + pos.unrealizedPnL, 0)

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Shield className="mr-2 h-5 w-5 text-green-400" />
            Risk Management Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Risk Metrics Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 bg-slate-800/50 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">Portfolio Value</div>
              <div className="text-xl font-bold text-white">${riskMetrics.portfolioValue.toLocaleString()}</div>
              <div className={`text-sm ${riskMetrics.dailyPnL >= 0 ? "text-green-400" : "text-red-400"}`}>
                {riskMetrics.dailyPnL >= 0 ? "+" : ""}${riskMetrics.dailyPnL.toFixed(2)} today
              </div>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">Current Drawdown</div>
              <div className={`text-xl font-bold ${getDrawdownColor(riskMetrics.currentDrawdown)}`}>
                {riskMetrics.currentDrawdown.toFixed(1)}%
              </div>
              <div className="text-sm text-slate-400">Max: {riskMetrics.maxDrawdown.toFixed(1)}%</div>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">Risk Score</div>
              <div
                className={`text-xl font-bold ${riskMetrics.riskScore > 70 ? "text-red-400" : riskMetrics.riskScore > 40 ? "text-yellow-400" : "text-green-400"}`}
              >
                {riskMetrics.riskScore}/100
              </div>
              <div className="text-sm text-slate-400">
                {riskMetrics.riskScore > 70 ? "High Risk" : riskMetrics.riskScore > 40 ? "Medium Risk" : "Low Risk"}
              </div>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-lg">
              <div className="text-sm text-slate-400 mb-1">VaR (95%)</div>
              <div className="text-xl font-bold text-red-400">{riskMetrics.var95.toFixed(1)}%</div>
              <div className="text-sm text-slate-400">Daily risk</div>
            </div>
          </div>

          {/* Risk Alerts */}
          {riskAlerts.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                <AlertTriangle className="mr-2 h-4 w-4 text-red-400" />
                Risk Alerts
              </h4>
              <div className="space-y-2">
                {riskAlerts.map((alert, index) => (
                  <div key={index} className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                        <span className="text-sm text-white">{alert.message}</span>
                        <Badge variant="secondary" className="bg-red-500/20 text-red-400">
                          {alert.severity}
                        </Badge>
                      </div>
                      <span className="text-xs text-slate-500">{new Date(alert.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Position Risk Analysis */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
              <BarChart3 className="mr-2 h-4 w-4 text-blue-400" />
              Position Risk Analysis
            </h4>
            <div className="space-y-3">
              {positions.map((position, index) => (
                <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="font-semibold text-white">{position.symbol}</span>
                      <Badge variant="secondary" className={getRiskBg(position.riskLevel)}>
                        {position.riskLevel} RISK
                      </Badge>
                      <Badge variant="outline" className="border-slate-600 text-slate-300">
                        {position.positionSize.toFixed(1)}% of portfolio
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-white">${position.marketValue.toLocaleString()}</div>
                      <div className={`text-sm ${position.unrealizedPnL >= 0 ? "text-green-400" : "text-red-400"}`}>
                        {position.unrealizedPnL >= 0 ? "+" : ""}${position.unrealizedPnL.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Stop Loss:</span>
                      <div className="font-semibold text-red-400">${position.stopLoss.toFixed(2)}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Take Profit:</span>
                      <div className="font-semibold text-green-400">${position.takeProfit.toFixed(2)}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Correlation:</span>
                      <div className="font-semibold text-white">{position.correlation.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Summary */}
          <div className="mt-6 p-4 bg-slate-800/30 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-slate-400">Sharpe Ratio:</span>
                <div className="font-semibold text-white">{riskMetrics.sharpeRatio.toFixed(2)}</div>
              </div>
              <div>
                <span className="text-slate-400">Volatility:</span>
                <div className="font-semibold text-white">{riskMetrics.volatility.toFixed(1)}%</div>
              </div>
              <div>
                <span className="text-slate-400">Beta:</span>
                <div className="font-semibold text-white">{riskMetrics.beta.toFixed(2)}</div>
              </div>
              <div>
                <span className="text-slate-400">Total P&L:</span>
                <div className={`font-semibold ${totalUnrealizedPnL >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {totalUnrealizedPnL >= 0 ? "+" : ""}${totalUnrealizedPnL.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
