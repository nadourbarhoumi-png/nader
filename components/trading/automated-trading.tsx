"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Bot, Play, Pause, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"

interface TradingBot {
  id: string
  name: string
  strategy: string
  isActive: boolean
  performance: {
    totalTrades: number
    winRate: number
    totalReturn: number
    sharpeRatio: number
    maxDrawdown: number
  }
  settings: {
    riskLevel: number
    maxPositionSize: number
    stopLoss: number
    takeProfit: number
  }
  currentSignals: Array<{
    symbol: string
    action: "BUY" | "SELL" | "HOLD"
    confidence: number
    reasoning: string
  }>
}

export function AutomatedTrading() {
  const [bots, setBots] = useState<TradingBot[]>([
    {
      id: "1",
      name: "AI Momentum Bot",
      strategy: "Technical + AI Signals",
      isActive: true,
      performance: {
        totalTrades: 247,
        winRate: 68.4,
        totalReturn: 23.7,
        sharpeRatio: 1.84,
        maxDrawdown: -4.2,
      },
      settings: {
        riskLevel: 3,
        maxPositionSize: 10000,
        stopLoss: 2.5,
        takeProfit: 5.0,
      },
      currentSignals: [
        {
          symbol: "AAPL",
          action: "BUY",
          confidence: 87,
          reasoning: "Strong momentum + positive AI sentiment",
        },
        {
          symbol: "TSLA",
          action: "HOLD",
          confidence: 62,
          reasoning: "Mixed technical signals, awaiting clarity",
        },
      ],
    },
    {
      id: "2",
      name: "News Sentiment Bot",
      strategy: "News + Sentiment Analysis",
      isActive: false,
      performance: {
        totalTrades: 156,
        winRate: 71.2,
        totalReturn: 18.9,
        sharpeRatio: 1.67,
        maxDrawdown: -3.8,
      },
      settings: {
        riskLevel: 2,
        maxPositionSize: 7500,
        stopLoss: 2.0,
        takeProfit: 4.0,
      },
      currentSignals: [
        {
          symbol: "NVDA",
          action: "BUY",
          confidence: 92,
          reasoning: "Extremely positive AI earnings sentiment",
        },
      ],
    },
    {
      id: "3",
      name: "Mean Reversion Bot",
      strategy: "Statistical Arbitrage",
      isActive: true,
      performance: {
        totalTrades: 423,
        winRate: 64.8,
        totalReturn: 15.3,
        sharpeRatio: 1.52,
        maxDrawdown: -2.9,
      },
      settings: {
        riskLevel: 1,
        maxPositionSize: 5000,
        stopLoss: 1.5,
        takeProfit: 3.0,
      },
      currentSignals: [
        {
          symbol: "MSFT",
          action: "SELL",
          confidence: 74,
          reasoning: "Overbought conditions detected",
        },
      ],
    },
  ])

  const [globalSettings, setGlobalSettings] = useState({
    masterSwitch: true,
    maxDailyLoss: 5000,
    maxConcurrentTrades: 10,
    emergencyStop: false,
  })

  const [recentActivity, setRecentActivity] = useState([
    {
      id: "1",
      botName: "AI Momentum Bot",
      action: "BUY AAPL 100 shares @ $178.25",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      status: "EXECUTED",
    },
    {
      id: "2",
      botName: "Mean Reversion Bot",
      action: "SELL MSFT 75 shares @ $412.80",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      status: "EXECUTED",
    },
    {
      id: "3",
      botName: "News Sentiment Bot",
      action: "Signal: BUY NVDA (92% confidence)",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      status: "PENDING",
    },
  ])

  // Simulate real-time bot activity
  useEffect(() => {
    const interval = setInterval(() => {
      if (globalSettings.masterSwitch && !globalSettings.emergencyStop) {
        setBots((prev) =>
          prev.map((bot) => {
            if (!bot.isActive) return bot

            // Simulate performance updates
            const performanceUpdate = {
              ...bot.performance,
              totalTrades: bot.performance.totalTrades + (Math.random() > 0.95 ? 1 : 0),
              totalReturn: bot.performance.totalReturn + (Math.random() - 0.5) * 0.1,
            }

            // Simulate new signals
            const newSignals = bot.currentSignals.map((signal) => ({
              ...signal,
              confidence: Math.max(50, Math.min(95, signal.confidence + (Math.random() - 0.5) * 5)),
            }))

            return {
              ...bot,
              performance: performanceUpdate,
              currentSignals: newSignals,
            }
          }),
        )
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [globalSettings])

  const toggleBot = (botId: string) => {
    setBots((prev) => prev.map((bot) => (bot.id === botId ? { ...bot, isActive: !bot.isActive } : bot)))
  }

  const updateBotSettings = (botId: string, settings: Partial<TradingBot["settings"]>) => {
    setBots((prev) =>
      prev.map((bot) => (bot.id === botId ? { ...bot, settings: { ...bot.settings, ...settings } } : bot)),
    )
  }

  const activeBots = bots.filter((bot) => bot.isActive).length
  const totalReturn = bots.reduce((sum, bot) => sum + bot.performance.totalReturn, 0) / bots.length

  return (
    <div className="space-y-6">
      {/* Global Controls */}
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center">
              <Bot className="mr-2 h-5 w-5 text-blue-400" />
              Automated Trading Control Center
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={globalSettings.masterSwitch ? "default" : "secondary"} className="bg-green-600">
                {activeBots} Active Bots
              </Badge>
              <Badge variant="outline" className="border-slate-600">
                Avg Return: {totalReturn.toFixed(1)}%
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Master Switch</span>
              <Switch
                checked={globalSettings.masterSwitch}
                onCheckedChange={(checked) => setGlobalSettings({ ...globalSettings, masterSwitch: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-400">Emergency Stop</span>
              <Button
                variant={globalSettings.emergencyStop ? "destructive" : "outline"}
                size="sm"
                onClick={() => setGlobalSettings({ ...globalSettings, emergencyStop: !globalSettings.emergencyStop })}
              >
                {globalSettings.emergencyStop ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
            </div>
            <div>
              <span className="text-sm text-slate-400">Max Daily Loss: ${globalSettings.maxDailyLoss}</span>
              <Slider
                value={[globalSettings.maxDailyLoss]}
                onValueChange={([value]) => setGlobalSettings({ ...globalSettings, maxDailyLoss: value })}
                max={10000}
                min={1000}
                step={500}
                className="mt-2"
              />
            </div>
            <div>
              <span className="text-sm text-slate-400">
                Max Concurrent Trades: {globalSettings.maxConcurrentTrades}
              </span>
              <Slider
                value={[globalSettings.maxConcurrentTrades]}
                onValueChange={([value]) => setGlobalSettings({ ...globalSettings, maxConcurrentTrades: value })}
                max={20}
                min={1}
                step={1}
                className="mt-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trading Bots */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {bots.map((bot) => (
          <Card key={bot.id} className="bg-slate-900/50 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white flex items-center">
                    <Bot className="mr-2 h-5 w-5 text-blue-400" />
                    {bot.name}
                  </CardTitle>
                  <p className="text-sm text-slate-400">{bot.strategy}</p>
                </div>
                <Switch checked={bot.isActive} onCheckedChange={() => toggleBot(bot.id)} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-slate-800/30 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-400">{bot.performance.winRate.toFixed(1)}%</div>
                  <div className="text-xs text-slate-400">Win Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-400">{bot.performance.totalReturn.toFixed(1)}%</div>
                  <div className="text-xs text-slate-400">Total Return</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-white">{bot.performance.sharpeRatio.toFixed(2)}</div>
                  <div className="text-xs text-slate-400">Sharpe Ratio</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-red-400">{bot.performance.maxDrawdown.toFixed(1)}%</div>
                  <div className="text-xs text-slate-400">Max Drawdown</div>
                </div>
              </div>

              {/* Current Signals */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-2">Current Signals</h4>
                <div className="space-y-2">
                  {bot.currentSignals.map((signal, index) => (
                    <div key={index} className="p-3 bg-slate-800/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="border-slate-600">
                            {signal.symbol}
                          </Badge>
                          <Badge
                            variant={
                              signal.action === "BUY"
                                ? "default"
                                : signal.action === "SELL"
                                  ? "destructive"
                                  : "secondary"
                            }
                            className={
                              signal.action === "BUY"
                                ? "bg-green-600"
                                : signal.action === "SELL"
                                  ? "bg-red-600"
                                  : "bg-yellow-600"
                            }
                          >
                            {signal.action}
                          </Badge>
                        </div>
                        <Badge variant="outline" className="border-blue-600 text-blue-400">
                          {signal.confidence}%
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-400 mt-2">{signal.reasoning}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bot Settings */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-white">Settings</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400">Risk Level: {bot.settings.riskLevel}/5</span>
                    <Slider
                      value={[bot.settings.riskLevel]}
                      onValueChange={([value]) => updateBotSettings(bot.id, { riskLevel: value })}
                      max={5}
                      min={1}
                      step={1}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <span className="text-slate-400">Max Position: ${bot.settings.maxPositionSize}</span>
                    <Slider
                      value={[bot.settings.maxPositionSize]}
                      onValueChange={([value]) => updateBotSettings(bot.id, { maxPositionSize: value })}
                      max={20000}
                      min={1000}
                      step={1000}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-green-400" />
            Recent Bot Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="p-4 bg-slate-800/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge variant="outline" className="border-slate-600">
                      {activity.botName}
                    </Badge>
                    <span className="text-white text-sm">{activity.action}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={activity.status === "EXECUTED" ? "default" : "secondary"}
                      className={activity.status === "EXECUTED" ? "bg-green-600" : "bg-yellow-600"}
                    >
                      {activity.status === "EXECUTED" ? (
                        <CheckCircle className="mr-1 h-3 w-3" />
                      ) : (
                        <AlertTriangle className="mr-1 h-3 w-3" />
                      )}
                      {activity.status}
                    </Badge>
                    <span className="text-xs text-slate-400">{activity.timestamp.toLocaleTimeString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
