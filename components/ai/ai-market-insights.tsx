"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Globe, Lightbulb } from "lucide-react"

interface MarketInsight {
  title: string
  category: "TECHNICAL" | "FUNDAMENTAL" | "MACRO" | "SENTIMENT"
  impact: "HIGH" | "MEDIUM" | "LOW"
  timeframe: string
  description: string
  confidence: number
  actionable: boolean
}

export function AIMarketInsights() {
  const [insights, setInsights] = useState<MarketInsight[]>([
    {
      title: "Tech Sector Rotation Detected",
      category: "TECHNICAL",
      impact: "HIGH",
      timeframe: "1-2 weeks",
      description:
        "AI models detect significant capital rotation from growth to value within tech sector. FAANG stocks showing relative weakness while semiconductor and enterprise software showing strength.",
      confidence: 89,
      actionable: true,
    },
    {
      title: "Federal Reserve Policy Shift Probability",
      category: "MACRO",
      impact: "HIGH",
      timeframe: "2-4 weeks",
      description:
        "Natural language processing of Fed communications suggests 73% probability of dovish pivot. Key phrases and sentiment analysis indicate growing concern about economic slowdown.",
      confidence: 73,
      actionable: true,
    },
    {
      title: "Earnings Season Momentum Building",
      category: "FUNDAMENTAL",
      impact: "MEDIUM",
      timeframe: "3-5 days",
      description:
        "Pre-earnings option flow and analyst revision patterns suggest positive surprise potential for Q4 earnings. Historical patterns show 67% accuracy for similar setups.",
      confidence: 82,
      actionable: false,
    },
    {
      title: "Social Sentiment Divergence Alert",
      category: "SENTIMENT",
      impact: "MEDIUM",
      timeframe: "1-3 days",
      description:
        "Retail sentiment extremely bullish while institutional positioning shows defensive bias. This divergence historically precedes 5-10% market corrections within 2 weeks.",
      confidence: 76,
      actionable: true,
    },
  ])

  const [marketRegime, setMarketRegime] = useState({
    current: "RISK-ON",
    confidence: 78,
    duration: "12 days",
    nextRegime: "TRANSITION",
    probability: 34,
  })

  // Simulate AI insights updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update market regime
      setMarketRegime((prev) => ({
        ...prev,
        confidence: Math.max(50, Math.min(95, prev.confidence + (Math.random() - 0.5) * 10)),
        probability: Math.max(10, Math.min(90, prev.probability + (Math.random() - 0.5) * 15)),
      }))

      // Occasionally add new insights
      if (Math.random() > 0.8) {
        const newInsights = [
          {
            title: "Volatility Regime Change Detected",
            category: "TECHNICAL" as const,
            impact: "HIGH" as const,
            timeframe: "1-2 days",
            description:
              "VIX term structure inversion suggests imminent volatility spike. Historical analysis shows 85% accuracy for similar patterns.",
            confidence: Math.floor(Math.random() * 20) + 75,
            actionable: true,
          },
          {
            title: "Cross-Asset Correlation Breakdown",
            category: "MACRO" as const,
            impact: "MEDIUM" as const,
            timeframe: "1 week",
            description:
              "Traditional stock-bond correlation showing signs of breakdown. This typically precedes major market regime shifts.",
            confidence: Math.floor(Math.random() * 20) + 70,
            actionable: false,
          },
        ]

        const newInsight = newInsights[Math.floor(Math.random() * newInsights.length)]
        setInsights((prev) => [newInsight, ...prev.slice(0, 3)])
      }
    }, 12000)

    return () => clearInterval(interval)
  }, [])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "TECHNICAL":
        return "bg-blue-500/20 text-blue-400"
      case "FUNDAMENTAL":
        return "bg-green-500/20 text-green-400"
      case "MACRO":
        return "bg-purple-500/20 text-purple-400"
      default:
        return "bg-orange-500/20 text-orange-400"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "HIGH":
        return "text-red-400"
      case "MEDIUM":
        return "text-yellow-400"
      default:
        return "text-slate-400"
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Brain className="mr-2 h-5 w-5 text-cyan-400" />
            AI Market Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Market Regime */}
          <div className="p-4 bg-slate-800/50 rounded-lg mb-6 border border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-white flex items-center">
                <Globe className="mr-2 h-4 w-4 text-blue-400" />
                Current Market Regime
              </h4>
              <Badge variant="outline" className="border-slate-600 text-slate-300">
                {marketRegime.confidence}% confidence
              </Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <span className="text-xs text-slate-400">Current</span>
                <div className="font-semibold text-green-400">{marketRegime.current}</div>
              </div>
              <div>
                <span className="text-xs text-slate-400">Duration</span>
                <div className="font-semibold text-white">{marketRegime.duration}</div>
              </div>
              <div>
                <span className="text-xs text-slate-400">Next Regime</span>
                <div className="font-semibold text-yellow-400">{marketRegime.nextRegime}</div>
              </div>
              <div>
                <span className="text-xs text-slate-400">Probability</span>
                <div className="font-semibold text-white">{marketRegime.probability}%</div>
              </div>
            </div>
          </div>

          {/* Insights */}
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-semibold text-white">{insight.title}</h4>
                    <Badge variant="secondary" className={getCategoryColor(insight.category)}>
                      {insight.category}
                    </Badge>
                    {insight.actionable && (
                      <Badge variant="outline" className="border-green-500 text-green-400">
                        <Lightbulb className="h-3 w-3 mr-1" />
                        Actionable
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-semibold ${getImpactColor(insight.impact)}`}>{insight.impact}</span>
                    <Badge variant="outline" className="border-slate-600 text-slate-300">
                      {insight.confidence}%
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-slate-300 mb-2">{insight.description}</p>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Timeframe: {insight.timeframe}</span>
                  <span>Generated by AI Market Analysis Engine</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
