"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calculator, Target, AlertTriangle } from "lucide-react"

interface PositionSizeCalculation {
  symbol: string
  entryPrice: number
  stopLoss: number
  riskPerTrade: number
  portfolioValue: number
  recommendedShares: number
  positionValue: number
  riskAmount: number
  riskRewardRatio: number
  maxPositionSize: number
}

export function PositionSizing() {
  const [calculation, setCalculation] = useState<PositionSizeCalculation>({
    symbol: "AAPL",
    entryPrice: 182.45,
    stopLoss: 178.2,
    riskPerTrade: 2.0,
    portfolioValue: 127456.78,
    recommendedShares: 0,
    positionValue: 0,
    riskAmount: 0,
    riskRewardRatio: 0,
    maxPositionSize: 0,
  })

  const [takeProfit, setTakeProfit] = useState(195.5)
  const [isCalculating, setIsCalculating] = useState(false)

  const calculatePositionSize = async () => {
    setIsCalculating(true)

    // Simulate calculation delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const riskAmount = (calculation.portfolioValue * calculation.riskPerTrade) / 100
    const riskPerShare = Math.abs(calculation.entryPrice - calculation.stopLoss)
    const recommendedShares = Math.floor(riskAmount / riskPerShare)
    const positionValue = recommendedShares * calculation.entryPrice
    const maxPositionSize = (positionValue / calculation.portfolioValue) * 100
    const potentialProfit = Math.abs(takeProfit - calculation.entryPrice)
    const riskRewardRatio = potentialProfit / riskPerShare

    setCalculation((prev) => ({
      ...prev,
      recommendedShares,
      positionValue,
      riskAmount,
      riskRewardRatio,
      maxPositionSize,
    }))

    setIsCalculating(false)
  }

  const getRiskColor = (risk: number) => {
    if (risk <= 2) return "text-green-400"
    if (risk <= 5) return "text-yellow-400"
    return "text-red-400"
  }

  const getRiskRewardColor = (ratio: number) => {
    if (ratio >= 2) return "text-green-400"
    if (ratio >= 1) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Calculator className="mr-2 h-5 w-5 text-blue-400" />
          Position Size Calculator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Parameters */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white mb-3">Trade Parameters</h4>

            <div className="space-y-2">
              <Label htmlFor="symbol" className="text-slate-300">
                Symbol
              </Label>
              <Input
                id="symbol"
                value={calculation.symbol}
                onChange={(e) => setCalculation((prev) => ({ ...prev, symbol: e.target.value }))}
                className="bg-slate-800 border-slate-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="entryPrice" className="text-slate-300">
                Entry Price ($)
              </Label>
              <Input
                id="entryPrice"
                type="number"
                step="0.01"
                value={calculation.entryPrice}
                onChange={(e) =>
                  setCalculation((prev) => ({ ...prev, entryPrice: Number.parseFloat(e.target.value) || 0 }))
                }
                className="bg-slate-800 border-slate-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stopLoss" className="text-slate-300">
                Stop Loss ($)
              </Label>
              <Input
                id="stopLoss"
                type="number"
                step="0.01"
                value={calculation.stopLoss}
                onChange={(e) =>
                  setCalculation((prev) => ({ ...prev, stopLoss: Number.parseFloat(e.target.value) || 0 }))
                }
                className="bg-slate-800 border-slate-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="takeProfit" className="text-slate-300">
                Take Profit ($)
              </Label>
              <Input
                id="takeProfit"
                type="number"
                step="0.01"
                value={takeProfit}
                onChange={(e) => setTakeProfit(Number.parseFloat(e.target.value) || 0)}
                className="bg-slate-800 border-slate-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="riskPerTrade" className="text-slate-300">
                Risk Per Trade (%)
              </Label>
              <Input
                id="riskPerTrade"
                type="number"
                step="0.1"
                min="0.1"
                max="10"
                value={calculation.riskPerTrade}
                onChange={(e) =>
                  setCalculation((prev) => ({ ...prev, riskPerTrade: Number.parseFloat(e.target.value) || 0 }))
                }
                className="bg-slate-800 border-slate-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="portfolioValue" className="text-slate-300">
                Portfolio Value ($)
              </Label>
              <Input
                id="portfolioValue"
                type="number"
                value={calculation.portfolioValue}
                onChange={(e) =>
                  setCalculation((prev) => ({ ...prev, portfolioValue: Number.parseFloat(e.target.value) || 0 }))
                }
                className="bg-slate-800 border-slate-600 text-white"
              />
            </div>

            <Button
              onClick={calculatePositionSize}
              disabled={isCalculating}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isCalculating ? "Calculating..." : "Calculate Position Size"}
            </Button>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white mb-3">Recommended Position</h4>

            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-white">{calculation.recommendedShares}</div>
                <div className="text-sm text-slate-400">Shares</div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-slate-400">Position Value</div>
                  <div className="font-semibold text-white">${calculation.positionValue.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">Risk Amount</div>
                  <div className="font-semibold text-red-400">${calculation.riskAmount.toFixed(2)}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-slate-400">Position Size</div>
                  <div className={`font-semibold ${getRiskColor(calculation.maxPositionSize)}`}>
                    {calculation.maxPositionSize.toFixed(1)}%
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-400">Risk:Reward</div>
                  <div className={`font-semibold ${getRiskRewardColor(calculation.riskRewardRatio)}`}>
                    1:{calculation.riskRewardRatio.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="p-4 bg-slate-800/30 rounded-lg">
              <h5 className="text-sm font-semibold text-white mb-2 flex items-center">
                <Target className="mr-2 h-4 w-4 text-green-400" />
                Risk Assessment
              </h5>
              <div className="space-y-2 text-sm">
                {calculation.maxPositionSize > 10 && (
                  <div className="flex items-center space-x-2 text-red-400">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Position size exceeds 10% - consider reducing</span>
                  </div>
                )}
                {calculation.riskRewardRatio < 1 && (
                  <div className="flex items-center space-x-2 text-yellow-400">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Risk:Reward ratio below 1:1 - consider better entry/exit</span>
                  </div>
                )}
                {calculation.riskPerTrade > 5 && (
                  <div className="flex items-center space-x-2 text-red-400">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Risk per trade exceeds 5% - high risk strategy</span>
                  </div>
                )}
                {calculation.maxPositionSize <= 10 &&
                  calculation.riskRewardRatio >= 1 &&
                  calculation.riskPerTrade <= 5 && (
                    <div className="text-green-400">✓ Position parameters within acceptable risk limits</div>
                  )}
              </div>
            </div>

            {/* Quick Presets */}
            <div className="space-y-2">
              <h5 className="text-sm font-semibold text-white">Risk Presets</h5>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCalculation((prev) => ({ ...prev, riskPerTrade: 1.0 }))}
                  className="border-slate-600 text-slate-300"
                >
                  Conservative (1%)
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCalculation((prev) => ({ ...prev, riskPerTrade: 2.0 }))}
                  className="border-slate-600 text-slate-300"
                >
                  Moderate (2%)
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCalculation((prev) => ({ ...prev, riskPerTrade: 3.0 }))}
                  className="border-slate-600 text-slate-300"
                >
                  Aggressive (3%)
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
