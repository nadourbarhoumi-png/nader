"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, Target, PieChart, TrendingUp, AlertTriangle } from "lucide-react"

interface OptimizationSuggestion {
  action: "BUY" | "SELL" | "REBALANCE"
  asset: string
  currentWeight: number
  suggestedWeight: number
  reasoning: string
  expectedImpact: number
  riskAdjustment: number
}

export function AIPortfolioOptimizer() {
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [suggestions, setSuggestions] = useState<OptimizationSuggestion[]>([
    {
      action: "REBALANCE",
      asset: "AAPL",
      currentWeight: 15.2,
      suggestedWeight: 12.5,
      reasoning: "Reduce concentration risk while maintaining growth exposure",
      expectedImpact: 2.3,
      riskAdjustment: -1.2,
    },
    {
      action: "BUY",
      asset: "VTI",
      currentWeight: 25.0,
      suggestedWeight: 30.0,
      reasoning: "Increase broad market exposure for better diversification",
      expectedImpact: 1.8,
      riskAdjustment: -0.8,
    },
    {
      action: "SELL",
      asset: "TSLA",
      currentWeight: 8.5,
      suggestedWeight: 5.0,
      reasoning: "High volatility and correlation with tech sector warrants reduction",
      expectedImpact: -0.5,
      riskAdjustment: -2.1,
    },
  ])

  const [portfolioMetrics, setPortfolioMetrics] = useState({
    currentSharpe: 1.34,
    optimizedSharpe: 1.52,
    currentVaR: -4.2,
    optimizedVaR: -3.6,
    diversificationRatio: 0.73,
    optimizedDiversification: 0.81,
  })

  const runOptimization = async () => {
    setIsOptimizing(true)

    // Simulate AI optimization process
    await new Promise((resolve) => setTimeout(resolve, 4000))

    // Generate new suggestions
    const assets = ["AAPL", "GOOGL", "MSFT", "TSLA", "VTI", "QQQ", "SPY", "BND"]
    const actions = ["BUY", "SELL", "REBALANCE"] as const

    const newSuggestions: OptimizationSuggestion[] = Array.from({ length: 3 }, () => {
      const asset = assets[Math.floor(Math.random() * assets.length)]
      const action = actions[Math.floor(Math.random() * actions.length)]
      const currentWeight = Math.random() * 20 + 5
      const suggestedWeight =
        action === "BUY"
          ? currentWeight + Math.random() * 5
          : action === "SELL"
            ? Math.max(0, currentWeight - Math.random() * 5)
            : currentWeight + (Math.random() - 0.5) * 4

      return {
        action,
        asset,
        currentWeight,
        suggestedWeight,
        reasoning: `AI-optimized allocation based on risk-return analysis and market conditions`,
        expectedImpact: (Math.random() - 0.3) * 3,
        riskAdjustment: (Math.random() - 0.5) * 2,
      }
    })

    setSuggestions(newSuggestions)

    // Update metrics
    setPortfolioMetrics((prev) => ({
      ...prev,
      optimizedSharpe: prev.currentSharpe + Math.random() * 0.3,
      optimizedVaR: prev.currentVaR + Math.random() * 0.8,
      optimizedDiversification: Math.min(0.95, prev.diversificationRatio + Math.random() * 0.15),
    }))

    setIsOptimizing(false)
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case "BUY":
        return "bg-green-500/20 text-green-400"
      case "SELL":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-blue-500/20 text-blue-400"
    }
  }

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center">
            <PieChart className="mr-2 h-5 w-5 text-green-400" />
            AI Portfolio Optimizer
          </CardTitle>
          <Button onClick={runOptimization} disabled={isOptimizing} className="bg-green-600 hover:bg-green-700">
            {isOptimizing ? (
              <>
                <Brain className="mr-2 h-4 w-4 animate-pulse" />
                Optimizing...
              </>
            ) : (
              <>
                <Target className="mr-2 h-4 w-4" />
                Optimize Portfolio
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Current vs Optimized Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-slate-800/50 rounded-lg">
            <div className="text-sm text-slate-400 mb-1">Sharpe Ratio</div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-white">{portfolioMetrics.currentSharpe.toFixed(2)}</span>
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-lg font-bold text-green-400">{portfolioMetrics.optimizedSharpe.toFixed(2)}</span>
            </div>
            <div className="text-xs text-slate-500">Current → Optimized</div>
          </div>

          <div className="p-4 bg-slate-800/50 rounded-lg">
            <div className="text-sm text-slate-400 mb-1">Value at Risk (95%)</div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-red-400">{portfolioMetrics.currentVaR.toFixed(1)}%</span>
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-lg font-bold text-green-400">{portfolioMetrics.optimizedVaR.toFixed(1)}%</span>
            </div>
            <div className="text-xs text-slate-500">Current → Optimized</div>
          </div>

          <div className="p-4 bg-slate-800/50 rounded-lg">
            <div className="text-sm text-slate-400 mb-1">Diversification Ratio</div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-white">{portfolioMetrics.diversificationRatio.toFixed(2)}</span>
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-lg font-bold text-green-400">
                {portfolioMetrics.optimizedDiversification.toFixed(2)}
              </span>
            </div>
            <div className="text-xs text-slate-500">Current → Optimized</div>
          </div>
        </div>

        {/* Optimization Suggestions */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-white flex items-center">
            <Brain className="mr-2 h-4 w-4 text-purple-400" />
            AI Optimization Suggestions
          </h4>

          {suggestions.map((suggestion, index) => (
            <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Badge variant="secondary" className={getActionColor(suggestion.action)}>
                    {suggestion.action}
                  </Badge>
                  <span className="font-semibold text-white">{suggestion.asset}</span>
                  <Badge variant="outline" className="border-slate-600 text-slate-300">
                    {suggestion.currentWeight.toFixed(1)}% → {suggestion.suggestedWeight.toFixed(1)}%
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-sm font-semibold ${suggestion.expectedImpact >= 0 ? "text-green-400" : "text-red-400"}`}
                  >
                    {suggestion.expectedImpact >= 0 ? "+" : ""}
                    {suggestion.expectedImpact.toFixed(1)}% return
                  </span>
                  <span className={`text-xs ${suggestion.riskAdjustment <= 0 ? "text-green-400" : "text-red-400"}`}>
                    {suggestion.riskAdjustment <= 0 ? "" : "+"}
                    {suggestion.riskAdjustment.toFixed(1)}% risk
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-300">{suggestion.reasoning}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-slate-800/30 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5" />
            <div className="text-xs text-slate-300">
              <p className="font-semibold mb-1">AI Optimization Disclaimer:</p>
              <p>
                Suggestions based on historical data and current market conditions. Past performance does not guarantee
                future results. Consider your risk tolerance and investment objectives before implementing changes.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
