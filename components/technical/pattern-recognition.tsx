"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, TrendingUp, TrendingDown, Target } from "lucide-react"

interface CandlestickPattern {
  name: string
  type: "BULLISH" | "BEARISH" | "REVERSAL" | "CONTINUATION"
  confidence: number
  description: string
  timeDetected: string
  targetPrice?: number
  stopLoss?: number
}

export function PatternRecognition({ symbol = "AAPL" }: { symbol?: string }) {
  const [patterns, setPatterns] = useState<CandlestickPattern[]>([
    {
      name: "Bullish Engulfing",
      type: "BULLISH",
      confidence: 87,
      description: "Strong bullish reversal pattern detected at support level",
      timeDetected: "2 hours ago",
      targetPrice: 188.5,
      stopLoss: 179.2,
    },
    {
      name: "Doji",
      type: "REVERSAL",
      confidence: 73,
      description: "Indecision pattern suggesting potential trend reversal",
      timeDetected: "4 hours ago",
    },
    {
      name: "Hammer",
      type: "BULLISH",
      confidence: 91,
      description: "Bullish reversal pattern with long lower shadow",
      timeDetected: "1 day ago",
      targetPrice: 185.0,
      stopLoss: 178.5,
    },
    {
      name: "Bearish Harami",
      type: "BEARISH",
      confidence: 65,
      description: "Bearish reversal pattern within previous candle body",
      timeDetected: "2 days ago",
      targetPrice: 175.0,
      stopLoss: 184.0,
    },
  ])

  const [supportResistance, setSupportResistance] = useState([
    { level: 185.5, type: "RESISTANCE", strength: "STRONG", touches: 4 },
    { level: 179.2, type: "SUPPORT", strength: "MODERATE", touches: 3 },
    { level: 190.0, type: "RESISTANCE", strength: "WEAK", touches: 2 },
    { level: 175.8, type: "SUPPORT", strength: "STRONG", touches: 5 },
  ])

  // Simulate pattern detection updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add new patterns or update existing ones
      if (Math.random() > 0.7) {
        const newPatterns = [
          "Morning Star",
          "Evening Star",
          "Three White Soldiers",
          "Three Black Crows",
          "Spinning Top",
          "Shooting Star",
          "Inverted Hammer",
          "Dark Cloud Cover",
        ]

        const randomPattern = newPatterns[Math.floor(Math.random() * newPatterns.length)]
        const newPattern: CandlestickPattern = {
          name: randomPattern,
          type: Math.random() > 0.5 ? "BULLISH" : "BEARISH",
          confidence: Math.floor(Math.random() * 40) + 60,
          description: `${randomPattern} pattern detected with ${Math.random() > 0.5 ? "high" : "moderate"} volume`,
          timeDetected: "Just now",
        }

        setPatterns((prev) => [newPattern, ...prev.slice(0, 3)])
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const getPatternColor = (type: string) => {
    switch (type) {
      case "BULLISH":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "BEARISH":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "REVERSAL":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    }
  }

  const getPatternIcon = (type: string) => {
    switch (type) {
      case "BULLISH":
        return <TrendingUp className="h-3 w-3" />
      case "BEARISH":
        return <TrendingDown className="h-3 w-3" />
      default:
        return <Target className="h-3 w-3" />
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Eye className="mr-2 h-5 w-5 text-cyan-400" />
            Candlestick Patterns - {symbol}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {patterns.map((pattern, index) => (
            <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-white">{pattern.name}</span>
                  <Badge variant="secondary" className={getPatternColor(pattern.type)}>
                    {getPatternIcon(pattern.type)}
                    <span className="ml-1">{pattern.type}</span>
                  </Badge>
                  <Badge variant="outline" className="border-slate-600 text-slate-300">
                    {pattern.confidence}% confidence
                  </Badge>
                </div>
                <span className="text-xs text-slate-500">{pattern.timeDetected}</span>
              </div>

              <p className="text-sm text-slate-300 mb-3">{pattern.description}</p>

              {(pattern.targetPrice || pattern.stopLoss) && (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {pattern.targetPrice && (
                    <div>
                      <span className="text-slate-400">Target:</span>
                      <span className="ml-2 text-green-400 font-semibold">${pattern.targetPrice.toFixed(2)}</span>
                    </div>
                  )}
                  {pattern.stopLoss && (
                    <div>
                      <span className="text-slate-400">Stop Loss:</span>
                      <span className="ml-2 text-red-400 font-semibold">${pattern.stopLoss.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Target className="mr-2 h-5 w-5 text-orange-400" />
            Support & Resistance Levels
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {supportResistance.map((level, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Badge
                    variant="secondary"
                    className={
                      level.type === "SUPPORT" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                    }
                  >
                    {level.type}
                  </Badge>
                  <span className="font-semibold text-white">${level.level.toFixed(2)}</span>
                </div>

                <div className="flex items-center space-x-4">
                  <Badge
                    variant="outline"
                    className={`border-slate-600 ${
                      level.strength === "STRONG"
                        ? "text-green-400"
                        : level.strength === "MODERATE"
                          ? "text-yellow-400"
                          : "text-slate-400"
                    }`}
                  >
                    {level.strength}
                  </Badge>
                  <span className="text-sm text-slate-400">{level.touches} touches</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
