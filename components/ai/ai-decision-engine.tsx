"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, TrendingUp, TrendingDown, Zap, Target, AlertTriangle } from "lucide-react"

interface AIDecision {
  symbol: string
  signal: "BUY" | "SELL" | "HOLD"
  confidence: number
  targetPrice: number
  stopLoss: number
  timeframe: string
  reasoning: string[]
  technicalScore: number
  fundamentalScore: number
  sentimentScore: number
  riskLevel: "LOW" | "MEDIUM" | "HIGH"
  expectedReturn: number
  timestamp: string
}

interface ModelPrediction {
  model: string
  prediction: "BUY" | "SELL" | "HOLD"
  confidence: number
  accuracy: number
}

export function AIDecisionEngine({ symbol = "AAPL" }: { symbol?: string }) {
  const [currentDecision, setCurrentDecision] = useState<AIDecision>({
    symbol: "AAPL",
    signal: "BUY",
    confidence: 87,
    targetPrice: 195.5,
    stopLoss: 178.2,
    timeframe: "1-2 weeks",
    reasoning: [
      "Technical breakout above key resistance at $185 with strong volume confirmation",
      "RSI showing bullish divergence while maintaining healthy levels (67.8)",
      "MACD crossover signal indicates momentum shift to the upside",
      "Fibonacci 61.8% retracement level holding as strong support",
      "Institutional accumulation detected through volume profile analysis",
      "Earnings momentum expected to continue based on sector performance",
    ],
    technicalScore: 85,
    fundamentalScore: 78,
    sentimentScore: 92,
    riskLevel: "MEDIUM",
    expectedReturn: 7.2,
    timestamp: new Date().toISOString(),
  })

  const [modelPredictions, setModelPredictions] = useState<ModelPrediction[]>([
    { model: "LSTM Neural Network", prediction: "BUY", confidence: 89, accuracy: 73.2 },
    { model: "Transformer Model", prediction: "BUY", confidence: 84, accuracy: 71.8 },
    { model: "Gradient Boosting", prediction: "BUY", confidence: 91, accuracy: 76.5 },
    { model: "Random Forest", prediction: "HOLD", confidence: 67, accuracy: 69.1 },
    { model: "Support Vector Machine", prediction: "BUY", confidence: 78, accuracy: 68.9 },
  ])

  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Simulate AI analysis updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnalyzing) {
        // Update model predictions
        setModelPredictions((prev) =>
          prev.map((model) => ({
            ...model,
            confidence: Math.max(50, Math.min(95, model.confidence + (Math.random() - 0.5) * 10)),
            prediction: Math.random() > 0.8 ? (Math.random() > 0.5 ? "BUY" : "SELL") : model.prediction,
          })),
        )

        // Update main decision occasionally
        if (Math.random() > 0.85) {
          const signals = ["BUY", "SELL", "HOLD"] as const
          const newSignal = signals[Math.floor(Math.random() * signals.length)]

          setCurrentDecision((prev) => ({
            ...prev,
            signal: newSignal,
            confidence: Math.floor(Math.random() * 30) + 65,
            technicalScore: Math.floor(Math.random() * 40) + 60,
            fundamentalScore: Math.floor(Math.random() * 40) + 60,
            sentimentScore: Math.floor(Math.random() * 40) + 60,
            timestamp: new Date().toISOString(),
          }))
        }
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [isAnalyzing])

  const runAnalysis = async () => {
    setIsAnalyzing(true)

    // Simulate AI processing time
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const newReasoningOptions = [
      [
        "Strong bullish momentum confirmed by multiple timeframe analysis",
        "Volume surge indicates institutional interest and accumulation",
        "Technical indicators align for potential breakout scenario",
        "Market structure shows higher highs and higher lows pattern",
        "Options flow suggests bullish positioning by smart money",
      ],
      [
        "Bearish divergence detected in momentum indicators",
        "Resistance level proving difficult to break with declining volume",
        "Overbought conditions suggest potential pullback incoming",
        "Market sentiment showing signs of exhaustion",
        "Risk-off environment favors defensive positioning",
      ],
      [
        "Consolidation phase with mixed signals across indicators",
        "Waiting for clear directional break above/below key levels",
        "Volume profile suggests balanced buying and selling pressure",
        "Market in transition - patience required for clarity",
        "Multiple scenarios possible - risk management paramount",
      ],
    ]

    const signals = ["BUY", "SELL", "HOLD"] as const
    const newSignal = signals[Math.floor(Math.random() * signals.length)]
    const reasoningIndex = newSignal === "BUY" ? 0 : newSignal === "SELL" ? 1 : 2

    setCurrentDecision({
      symbol,
      signal: newSignal,
      confidence: Math.floor(Math.random() * 25) + 70,
      targetPrice: 182.45 + (Math.random() - 0.5) * 20,
      stopLoss: 182.45 - Math.random() * 10,
      timeframe: ["1-2 days", "3-5 days", "1-2 weeks", "2-4 weeks"][Math.floor(Math.random() * 4)],
      reasoning: newReasoningOptions[reasoningIndex],
      technicalScore: Math.floor(Math.random() * 40) + 60,
      fundamentalScore: Math.floor(Math.random() * 40) + 60,
      sentimentScore: Math.floor(Math.random() * 40) + 60,
      riskLevel: ["LOW", "MEDIUM", "HIGH"][Math.floor(Math.random() * 3)] as "LOW" | "MEDIUM" | "HIGH",
      expectedReturn: (Math.random() - 0.3) * 15,
      timestamp: new Date().toISOString(),
    })

    setIsAnalyzing(false)
  }

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case "BUY":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "SELL":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    }
  }

  const getSignalIcon = (signal: string) => {
    switch (signal) {
      case "BUY":
        return <TrendingUp className="h-4 w-4" />
      case "SELL":
        return <TrendingDown className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "LOW":
        return "text-green-400"
      case "MEDIUM":
        return "text-yellow-400"
      default:
        return "text-red-400"
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center">
              <Brain className="mr-2 h-5 w-5 text-purple-400" />
              AI Decision Engine - {symbol}
            </CardTitle>
            <Button onClick={runAnalysis} disabled={isAnalyzing} className="bg-purple-600 hover:bg-purple-700">
              {isAnalyzing ? (
                <>
                  <Zap className="mr-2 h-4 w-4 animate-pulse" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" />
                  Run Analysis
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Decision */}
            <div className="lg:col-span-2">
              <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Badge variant="secondary" className={getSignalColor(currentDecision.signal)}>
                      {getSignalIcon(currentDecision.signal)}
                      <span className="ml-2 font-bold">{currentDecision.signal}</span>
                    </Badge>
                    <Badge variant="outline" className="border-slate-600 text-slate-300">
                      {currentDecision.confidence}% Confidence
                    </Badge>
                    <Badge variant="outline" className={`border-slate-600 ${getRiskColor(currentDecision.riskLevel)}`}>
                      {currentDecision.riskLevel} Risk
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-400">Expected Return</div>
                    <div
                      className={`font-bold ${currentDecision.expectedReturn >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {currentDecision.expectedReturn >= 0 ? "+" : ""}
                      {currentDecision.expectedReturn.toFixed(1)}%
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="text-sm text-slate-400">Target Price</span>
                    <div className="text-lg font-bold text-green-400">${currentDecision.targetPrice.toFixed(2)}</div>
                  </div>
                  <div>
                    <span className="text-sm text-slate-400">Stop Loss</span>
                    <div className="text-lg font-bold text-red-400">${currentDecision.stopLoss.toFixed(2)}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-sm text-slate-400">Timeframe: </span>
                  <span className="text-white font-semibold">{currentDecision.timeframe}</span>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-white mb-2 flex items-center">
                    <Brain className="mr-2 h-4 w-4 text-purple-400" />
                    AI Reasoning (Chain of Thought)
                  </h4>
                  <div className="space-y-2">
                    {currentDecision.reasoning.map((reason, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <span className="text-purple-400 mt-1">•</span>
                        <span className="text-sm text-slate-300">{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Model Predictions */}
              <div className="p-4 bg-slate-800/30 rounded-lg">
                <h4 className="text-sm font-semibold text-white mb-3">ML Model Consensus</h4>
                <div className="space-y-2">
                  {modelPredictions.map((model, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-slate-700/50 rounded">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-slate-300">{model.model}</span>
                        <Badge variant="secondary" className={getSignalColor(model.prediction)}>
                          {model.prediction}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-xs text-slate-400">{model.confidence}% conf</span>
                        <span className="text-xs text-slate-400">{model.accuracy}% acc</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Scoring Breakdown */}
            <div className="space-y-4">
              <div className="p-4 bg-slate-800/50 rounded-lg">
                <h4 className="text-sm font-semibold text-white mb-3">Analysis Scores</h4>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-slate-400">Technical</span>
                      <span className="text-sm text-white">{currentDecision.technicalScore}/100</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${currentDecision.technicalScore}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-slate-400">Fundamental</span>
                      <span className="text-sm text-white">{currentDecision.fundamentalScore}/100</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${currentDecision.fundamentalScore}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-slate-400">Sentiment</span>
                      <span className="text-sm text-white">{currentDecision.sentimentScore}/100</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${currentDecision.sentimentScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-800/30 rounded-lg">
                <h4 className="text-sm font-semibold text-white mb-2 flex items-center">
                  <AlertTriangle className="mr-2 h-4 w-4 text-yellow-400" />
                  Risk Assessment
                </h4>
                <div className="text-xs text-slate-300 space-y-1">
                  <p>• Position sizing: 2-3% of portfolio</p>
                  <p>• Max drawdown tolerance: 5%</p>
                  <p>• Correlation risk: Monitor sector exposure</p>
                  <p>• Volatility: Expected 15-20% annualized</p>
                </div>
              </div>

              <div className="p-4 bg-slate-800/30 rounded-lg">
                <div className="text-xs text-slate-500">
                  Last updated: {new Date(currentDecision.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
