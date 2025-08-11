"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, Clock, Edit3, TrendingUp, TrendingDown, Target, History, Brain } from "lucide-react"

interface PendingDecision {
  id: string
  symbol: string
  signal: "BUY" | "SELL" | "HOLD"
  confidence: number
  targetPrice: number
  stopLoss: number
  quantity: number
  timeframe: string
  reasoning: string[]
  expectedReturn: number
  riskLevel: "LOW" | "MEDIUM" | "HIGH"
  timestamp: string
  status: "PENDING" | "APPROVED" | "REJECTED" | "MODIFIED"
}

interface DecisionHistory {
  id: string
  symbol: string
  signal: "BUY" | "SELL" | "HOLD"
  userAction: "APPROVED" | "REJECTED" | "MODIFIED"
  originalPrice: number
  modifiedPrice?: number
  timestamp: string
  notes?: string
}

export function AIDecisionManager() {
  const [pendingDecisions, setPendingDecisions] = useState<PendingDecision[]>([
    {
      id: "1",
      symbol: "AAPL",
      signal: "BUY",
      confidence: 87,
      targetPrice: 195.5,
      stopLoss: 178.2,
      quantity: 100,
      timeframe: "1-2 weeks",
      reasoning: [
        "Technical breakout above key resistance at $185 with strong volume confirmation",
        "RSI showing bullish divergence while maintaining healthy levels (67.8)",
        "MACD crossover signal indicates momentum shift to the upside",
        "Institutional accumulation detected through volume profile analysis",
      ],
      expectedReturn: 7.2,
      riskLevel: "MEDIUM",
      timestamp: new Date().toISOString(),
      status: "PENDING",
    },
    {
      id: "2",
      symbol: "TSLA",
      signal: "SELL",
      confidence: 78,
      targetPrice: 220.0,
      stopLoss: 245.0,
      quantity: 50,
      timeframe: "3-5 days",
      reasoning: [
        "Bearish divergence detected in momentum indicators",
        "Resistance level proving difficult to break with declining volume",
        "Overbought conditions suggest potential pullback incoming",
      ],
      expectedReturn: -4.5,
      riskLevel: "HIGH",
      timestamp: new Date().toISOString(),
      status: "PENDING",
    },
  ])

  const [decisionHistory, setDecisionHistory] = useState<DecisionHistory[]>([
    {
      id: "h1",
      symbol: "NVDA",
      signal: "BUY",
      userAction: "APPROVED",
      originalPrice: 450.0,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: "h2",
      symbol: "MSFT",
      signal: "SELL",
      userAction: "REJECTED",
      originalPrice: 380.0,
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      notes: "Market conditions too volatile",
    },
  ])

  const [editingDecision, setEditingDecision] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<PendingDecision>>({})
  const [userNotes, setUserNotes] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const symbols = ["GOOGL", "AMZN", "META", "NFLX", "AMD"]
        const signals = ["BUY", "SELL", "HOLD"] as const
        const newDecision: PendingDecision = {
          id: Date.now().toString(),
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
          signal: signals[Math.floor(Math.random() * signals.length)],
          confidence: Math.floor(Math.random() * 30) + 65,
          targetPrice: Math.random() * 500 + 100,
          stopLoss: Math.random() * 400 + 80,
          quantity: Math.floor(Math.random() * 200) + 50,
          timeframe: ["1-2 days", "3-5 days", "1-2 weeks"][Math.floor(Math.random() * 3)],
          reasoning: [
            "AI detected favorable market conditions",
            "Technical indicators align with signal direction",
            "Risk-reward ratio meets criteria",
          ],
          expectedReturn: (Math.random() - 0.3) * 15,
          riskLevel: ["LOW", "MEDIUM", "HIGH"][Math.floor(Math.random() * 3)] as "LOW" | "MEDIUM" | "HIGH",
          timestamp: new Date().toISOString(),
          status: "PENDING",
        }
        setPendingDecisions((prev) => [newDecision, ...prev.slice(0, 4)])
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const handleApprove = (decisionId: string) => {
    const decision = pendingDecisions.find((d) => d.id === decisionId)
    if (!decision) return

    const historyEntry: DecisionHistory = {
      id: `h_${decisionId}`,
      symbol: decision.symbol,
      signal: decision.signal,
      userAction: "APPROVED",
      originalPrice: decision.targetPrice,
      timestamp: new Date().toISOString(),
      notes: userNotes || undefined,
    }

    setDecisionHistory((prev) => [historyEntry, ...prev])
    setPendingDecisions((prev) => prev.filter((d) => d.id !== decisionId))
    setUserNotes("")
  }

  const handleReject = (decisionId: string) => {
    const decision = pendingDecisions.find((d) => d.id === decisionId)
    if (!decision) return

    const historyEntry: DecisionHistory = {
      id: `h_${decisionId}`,
      symbol: decision.symbol,
      signal: decision.signal,
      userAction: "REJECTED",
      originalPrice: decision.targetPrice,
      timestamp: new Date().toISOString(),
      notes: userNotes || undefined,
    }

    setDecisionHistory((prev) => [historyEntry, ...prev])
    setPendingDecisions((prev) => prev.filter((d) => d.id !== decisionId))
    setUserNotes("")
  }

  const handleModify = (decisionId: string) => {
    const decision = pendingDecisions.find((d) => d.id === decisionId)
    if (!decision) return

    setEditingDecision(decisionId)
    setEditForm({
      targetPrice: decision.targetPrice,
      stopLoss: decision.stopLoss,
      quantity: decision.quantity,
    })
  }

  const handleSaveModification = (decisionId: string) => {
    const decision = pendingDecisions.find((d) => d.id === decisionId)
    if (!decision) return

    setPendingDecisions((prev) =>
      prev.map((d) => (d.id === decisionId ? { ...d, ...editForm, status: "MODIFIED" as const } : d)),
    )

    const historyEntry: DecisionHistory = {
      id: `h_${decisionId}`,
      symbol: decision.symbol,
      signal: decision.signal,
      userAction: "MODIFIED",
      originalPrice: decision.targetPrice,
      modifiedPrice: editForm.targetPrice,
      timestamp: new Date().toISOString(),
      notes: userNotes || undefined,
    }

    setDecisionHistory((prev) => [historyEntry, ...prev])
    setEditingDecision(null)
    setEditForm({})
    setUserNotes("")
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

  const getActionColor = (action: string) => {
    switch (action) {
      case "APPROVED":
        return "text-green-400"
      case "REJECTED":
        return "text-red-400"
      default:
        return "text-blue-400"
    }
  }

  return (
    <div className="space-y-6">
      {/* Pending Decisions */}
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Clock className="mr-2 h-5 w-5 text-orange-400" />
            Pending AI Decisions ({pendingDecisions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pendingDecisions.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No pending decisions. AI is monitoring markets...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingDecisions.map((decision) => (
                <div key={decision.id} className="p-6 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <Badge variant="secondary" className={getSignalColor(decision.signal)}>
                        {getSignalIcon(decision.signal)}
                        <span className="ml-2 font-bold">
                          {decision.signal} {decision.symbol}
                        </span>
                      </Badge>
                      <Badge variant="outline" className="border-slate-600 text-slate-300">
                        {decision.confidence}% Confidence
                      </Badge>
                      <Badge variant="outline" className={`border-slate-600 ${getRiskColor(decision.riskLevel)}`}>
                        {decision.riskLevel} Risk
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-400">Expected Return</div>
                      <div className={`font-bold ${decision.expectedReturn >= 0 ? "text-green-400" : "text-red-400"}`}>
                        {decision.expectedReturn >= 0 ? "+" : ""}
                        {decision.expectedReturn.toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  {editingDecision === decision.id ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-slate-700/50 rounded-lg">
                      <div>
                        <Label htmlFor="targetPrice" className="text-slate-300">
                          Target Price
                        </Label>
                        <Input
                          id="targetPrice"
                          type="number"
                          step="0.01"
                          value={editForm.targetPrice || ""}
                          onChange={(e) =>
                            setEditForm((prev) => ({ ...prev, targetPrice: Number.parseFloat(e.target.value) }))
                          }
                          className="bg-slate-800 border-slate-600 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="stopLoss" className="text-slate-300">
                          Stop Loss
                        </Label>
                        <Input
                          id="stopLoss"
                          type="number"
                          step="0.01"
                          value={editForm.stopLoss || ""}
                          onChange={(e) =>
                            setEditForm((prev) => ({ ...prev, stopLoss: Number.parseFloat(e.target.value) }))
                          }
                          className="bg-slate-800 border-slate-600 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="quantity" className="text-slate-300">
                          Quantity
                        </Label>
                        <Input
                          id="quantity"
                          type="number"
                          value={editForm.quantity || ""}
                          onChange={(e) =>
                            setEditForm((prev) => ({ ...prev, quantity: Number.parseInt(e.target.value) }))
                          }
                          className="bg-slate-800 border-slate-600 text-white"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-slate-400">Target Price</span>
                        <div className="text-lg font-bold text-green-400">${decision.targetPrice.toFixed(2)}</div>
                      </div>
                      <div>
                        <span className="text-sm text-slate-400">Stop Loss</span>
                        <div className="text-lg font-bold text-red-400">${decision.stopLoss.toFixed(2)}</div>
                      </div>
                      <div>
                        <span className="text-sm text-slate-400">Quantity</span>
                        <div className="text-lg font-bold text-white">{decision.quantity} shares</div>
                      </div>
                      <div>
                        <span className="text-sm text-slate-400">Timeframe</span>
                        <div className="text-lg font-bold text-white">{decision.timeframe}</div>
                      </div>
                    </div>
                  )}

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-white mb-2">AI Reasoning</h4>
                    <div className="space-y-1">
                      {decision.reasoning.map((reason, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <span className="text-purple-400 mt-1">•</span>
                          <span className="text-sm text-slate-300">{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="notes" className="text-slate-300">
                      Notes (Optional)
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Add your thoughts or reasoning..."
                      value={userNotes}
                      onChange={(e) => setUserNotes(e.target.value)}
                      className="bg-slate-800 border-slate-600 text-white mt-1"
                      rows={2}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-slate-500">
                      Generated: {new Date(decision.timestamp).toLocaleString()}
                    </div>
                    <div className="flex space-x-2">
                      {editingDecision === decision.id ? (
                        <>
                          <Button
                            onClick={() => handleSaveModification(decision.id)}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Save Changes
                          </Button>
                          <Button
                            onClick={() => setEditingDecision(null)}
                            variant="outline"
                            className="border-slate-600 text-slate-300"
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            onClick={() => handleApprove(decision.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleModify(decision.id)}
                            variant="outline"
                            className="border-blue-600 text-blue-400 hover:bg-blue-600/10"
                          >
                            <Edit3 className="mr-2 h-4 w-4" />
                            Modify
                          </Button>
                          <Button
                            onClick={() => handleReject(decision.id)}
                            variant="outline"
                            className="border-red-600 text-red-400 hover:bg-red-600/10"
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Decision History */}
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <History className="mr-2 h-5 w-5 text-blue-400" />
            Decision History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {decisionHistory.length === 0 ? (
            <div className="text-center py-4 text-slate-400">
              <p>No decision history yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {decisionHistory.slice(0, 10).map((history) => (
                <div key={history.id} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Badge variant="secondary" className={getSignalColor(history.signal)}>
                      {getSignalIcon(history.signal)}
                      <span className="ml-2">
                        {history.signal} {history.symbol}
                      </span>
                    </Badge>
                    <Badge variant="outline" className={`border-slate-600 ${getActionColor(history.userAction)}`}>
                      {history.userAction}
                    </Badge>
                    {history.modifiedPrice && (
                      <span className="text-sm text-slate-400">
                        ${history.originalPrice.toFixed(2)} → ${history.modifiedPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500">{new Date(history.timestamp).toLocaleString()}</div>
                    {history.notes && <div className="text-xs text-slate-400 max-w-xs truncate">"{history.notes}"</div>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
