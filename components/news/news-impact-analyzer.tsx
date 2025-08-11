"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, TrendingUp, TrendingDown, Zap } from "lucide-react"

interface NewsImpact {
  headline: string
  symbol: string
  predictedImpact: number
  confidence: number
  timeframe: string
  category: "EARNINGS" | "MACRO" | "SECTOR" | "REGULATORY"
  historicalAccuracy: number
  keyFactors: string[]
}

export function NewsImpactAnalyzer() {
  const [impacts, setImpacts] = useState<NewsImpact[]>([
    {
      headline: "Apple Reports Strong iPhone Sales in China",
      symbol: "AAPL",
      predictedImpact: 3.2,
      confidence: 87,
      timeframe: "1-2 days",
      category: "EARNINGS",
      historicalAccuracy: 73,
      keyFactors: ["Revenue beat", "China market recovery", "Supply chain stability"],
    },
    {
      headline: "Fed Signals Dovish Stance on Interest Rates",
      symbol: "SPY",
      predictedImpact: 1.8,
      confidence: 92,
      timeframe: "Same day",
      category: "MACRO",
      historicalAccuracy: 89,
      keyFactors: ["Rate cut expectations", "Inflation data", "Economic outlook"],
    },
    {
      headline: "EU Proposes New AI Regulation Framework",
      symbol: "GOOGL",
      predictedImpact: -2.1,
      confidence: 76,
      timeframe: "1 week",
      category: "REGULATORY",
      historicalAccuracy: 68,
      keyFactors: ["Compliance costs", "Market restrictions", "Competitive impact"],
    },
    {
      headline: "Semiconductor Shortage Shows Signs of Easing",
      symbol: "NVDA",
      predictedImpact: 4.5,
      confidence: 81,
      timeframe: "2-3 days",
      category: "SECTOR",
      historicalAccuracy: 75,
      keyFactors: ["Supply chain recovery", "Demand normalization", "Inventory levels"],
    },
  ])

  const [aggregateImpact, setAggregateImpact] = useState({
    marketSentiment: 0.68,
    volatilityExpected: 1.34,
    sectorRotation: "TECH_POSITIVE",
    riskLevel: "MEDIUM",
  })

  // Simulate real-time impact analysis updates
  useEffect(() => {
    const interval = setInterval(() => {
      setImpacts((prev) =>
        prev.map((impact) => ({
          ...impact,
          predictedImpact: impact.predictedImpact + (Math.random() - 0.5) * 0.5,
          confidence: Math.max(50, Math.min(95, impact.confidence + (Math.random() - 0.5) * 5)),
        })),
      )

      setAggregateImpact((prev) => ({
        ...prev,
        marketSentiment: Math.max(0, Math.min(1, prev.marketSentiment + (Math.random() - 0.5) * 0.1)),
        volatilityExpected: Math.max(0.5, Math.min(3.0, prev.volatilityExpected + (Math.random() - 0.5) * 0.2)),
      }))
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const getImpactColor = (impact: number) => {
    if (impact > 2) return "text-green-400"
    if (impact > 0) return "text-green-300"
    if (impact > -2) return "text-red-300"
    return "text-red-400"
  }

  const getImpactIcon = (impact: number) => {
    return impact > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "EARNINGS":
        return "bg-blue-500/20 text-blue-400"
      case "MACRO":
        return "bg-purple-500/20 text-purple-400"
      case "SECTOR":
        return "bg-green-500/20 text-green-400"
      default:
        return "bg-orange-500/20 text-orange-400"
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence > 80) return "text-green-400"
    if (confidence > 60) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Target className="mr-2 h-5 w-5 text-cyan-400" />
            News Impact Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Aggregate Market Impact */}
          <div className="p-4 bg-slate-800/50 rounded-lg mb-6 border border-slate-700">
            <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
              <Zap className="mr-2 h-4 w-4 text-yellow-400" />
              Aggregate Market Impact
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <span className="text-xs text-slate-400">Market Sentiment</span>
                <div
                  className={`font-semibold ${aggregateImpact.marketSentiment > 0.6 ? "text-green-400" : aggregateImpact.marketSentiment < 0.4 ? "text-red-400" : "text-yellow-400"}`}
                >
                  {(aggregateImpact.marketSentiment * 100).toFixed(0)}%
                </div>
              </div>
              <div>
                <span className="text-xs text-slate-400">Expected Volatility</span>
                <div className="font-semibold text-white">{aggregateImpact.volatilityExpected.toFixed(1)}x</div>
              </div>
              <div>
                <span className="text-xs text-slate-400">Sector Rotation</span>
                <div className="font-semibold text-green-400">{aggregateImpact.sectorRotation.replace("_", " ")}</div>
              </div>
              <div>
                <span className="text-xs text-slate-400">Risk Level</span>
                <div
                  className={`font-semibold ${aggregateImpact.riskLevel === "HIGH" ? "text-red-400" : aggregateImpact.riskLevel === "MEDIUM" ? "text-yellow-400" : "text-green-400"}`}
                >
                  {aggregateImpact.riskLevel}
                </div>
              </div>
            </div>
          </div>

          {/* Individual Impact Analysis */}
          <div className="space-y-4">
            {impacts.map((impact, index) => (
              <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-white text-sm mb-2">{impact.headline}</h4>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant="secondary" className={getCategoryColor(impact.category)}>
                        {impact.category}
                      </Badge>
                      <Badge variant="outline" className="border-slate-600 text-slate-300">
                        {impact.symbol}
                      </Badge>
                      <Badge variant="outline" className="border-slate-600 text-slate-400">
                        {impact.timeframe}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      {getImpactIcon(impact.predictedImpact)}
                      <span className={`font-bold text-lg ${getImpactColor(impact.predictedImpact)}`}>
                        {impact.predictedImpact > 0 ? "+" : ""}
                        {impact.predictedImpact.toFixed(1)}%
                      </span>
                    </div>
                    <div className="text-xs text-slate-400">
                      Confidence: <span className={getConfidenceColor(impact.confidence)}>{impact.confidence}%</span>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <span className="text-xs text-slate-400">Key Factors:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {impact.keyFactors.map((factor, idx) => (
                      <Badge key={idx} variant="outline" className="border-slate-600 text-slate-300 text-xs">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Historical Accuracy: {impact.historicalAccuracy}%</span>
                  <span>AI Impact Model v2.1</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
