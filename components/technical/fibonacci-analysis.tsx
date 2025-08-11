"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Target } from "lucide-react"

interface FibonacciLevel {
  level: number
  price: number
  type: "RETRACEMENT" | "EXTENSION"
  significance: "HIGH" | "MEDIUM" | "LOW"
}

export function FibonacciAnalysis({ symbol = "AAPL" }: { symbol?: string }) {
  const [swingHigh] = useState(189.5)
  const [swingLow] = useState(175.2)
  const [currentPrice] = useState(182.45)
  const [analysisType, setAnalysisType] = useState<"RETRACEMENT" | "EXTENSION">("RETRACEMENT")

  // Calculate Fibonacci levels
  const fibLevels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1.0, 1.272, 1.618]

  const fibonacciLevels: FibonacciLevel[] = fibLevels.map((level) => {
    const price =
      analysisType === "RETRACEMENT"
        ? swingHigh - (swingHigh - swingLow) * level
        : swingLow + (swingHigh - swingLow) * level

    const significance = [0.382, 0.5, 0.618].includes(level)
      ? "HIGH"
      : [0.236, 0.786, 1.272, 1.618].includes(level)
        ? "MEDIUM"
        : "LOW"

    return {
      level,
      price,
      type: analysisType,
      significance,
    }
  })

  const getSignificanceColor = (significance: string) => {
    switch (significance) {
      case "HIGH":
        return "text-red-400"
      case "MEDIUM":
        return "text-yellow-400"
      default:
        return "text-slate-400"
    }
  }

  const isNearLevel = (price: number) => {
    return Math.abs(currentPrice - price) < 2.0
  }

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center">
            <Target className="mr-2 h-5 w-5 text-yellow-400" />
            Fibonacci Analysis - {symbol}
          </CardTitle>
          <div className="flex space-x-2">
            <Button
              variant={analysisType === "RETRACEMENT" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setAnalysisType("RETRACEMENT")}
              className="text-xs"
            >
              Retracement
            </Button>
            <Button
              variant={analysisType === "EXTENSION" ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setAnalysisType("EXTENSION")}
              className="text-xs"
            >
              Extension
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 p-3 bg-slate-800/50 rounded-lg">
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-slate-400">Swing High:</span>
              <div className="font-semibold text-green-400">${swingHigh.toFixed(2)}</div>
            </div>
            <div>
              <span className="text-slate-400">Swing Low:</span>
              <div className="font-semibold text-red-400">${swingLow.toFixed(2)}</div>
            </div>
            <div>
              <span className="text-slate-400">Current:</span>
              <div className="font-semibold text-white">${currentPrice.toFixed(2)}</div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {fibonacciLevels.map((fib, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                isNearLevel(fib.price) ? "bg-yellow-500/20 border border-yellow-500/30" : "bg-slate-800/50"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Badge variant="outline" className={`border-slate-600 ${getSignificanceColor(fib.significance)}`}>
                  {(fib.level * 100).toFixed(1)}%
                </Badge>
                <span className="font-semibold text-white">${fib.price.toFixed(2)}</span>
                {isNearLevel(fib.price) && (
                  <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400">
                    NEAR
                  </Badge>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <span className={`text-sm ${getSignificanceColor(fib.significance)}`}>{fib.significance}</span>
                {currentPrice > fib.price ? (
                  <TrendingUp className="h-4 w-4 text-green-400" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-400" />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-slate-800/30 rounded-lg">
          <h4 className="text-sm font-semibold text-white mb-2">Key Levels Analysis</h4>
          <div className="text-xs text-slate-300 space-y-1">
            <p>• 38.2% and 61.8% are the most significant retracement levels</p>
            <p>• 50% level often acts as psychological support/resistance</p>
            <p>• Extensions beyond 161.8% suggest strong momentum continuation</p>
            {isNearLevel(fibonacciLevels.find((f) => f.level === 0.618)?.price || 0) && (
              <p className="text-yellow-400">⚠ Price approaching critical 61.8% level</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
