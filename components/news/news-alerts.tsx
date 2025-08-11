"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, AlertTriangle, TrendingUp, X } from "lucide-react"

interface NewsAlert {
  id: string
  title: string
  message: string
  type: "BREAKING" | "EARNINGS" | "SENTIMENT" | "TECHNICAL"
  severity: "HIGH" | "MEDIUM" | "LOW"
  symbol: string
  timestamp: string
  actionable: boolean
  dismissed: boolean
}

export function NewsAlerts() {
  const [alerts, setAlerts] = useState<NewsAlert[]>([
    {
      id: "1",
      title: "Breaking: Apple Announces Major Product Launch",
      message:
        "Apple scheduled surprise product announcement for next week, potentially impacting stock price significantly.",
      type: "BREAKING",
      severity: "HIGH",
      symbol: "AAPL",
      timestamp: new Date().toISOString(),
      actionable: true,
      dismissed: false,
    },
    {
      id: "2",
      title: "Sentiment Alert: TSLA Social Buzz Spike",
      message: "Tesla social media mentions increased 340% in last hour with 78% positive sentiment.",
      type: "SENTIMENT",
      severity: "MEDIUM",
      symbol: "TSLA",
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      actionable: true,
      dismissed: false,
    },
    {
      id: "3",
      title: "Earnings Preview: Microsoft Reports Tomorrow",
      message: "MSFT earnings expected after market close. Analyst consensus: $2.78 EPS, revenue $56.1B.",
      type: "EARNINGS",
      severity: "MEDIUM",
      symbol: "MSFT",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      actionable: false,
      dismissed: false,
    },
  ])

  // Simulate new alerts
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        const alertTypes = ["BREAKING", "EARNINGS", "SENTIMENT", "TECHNICAL"] as const
        const severities = ["HIGH", "MEDIUM", "LOW"] as const
        const symbols = ["AAPL", "GOOGL", "MSFT", "TSLA", "AMZN", "NVDA"]

        const alertTemplates = [
          {
            title: "Volume Spike Alert",
            message: "Unusual trading volume detected - 300% above average",
            type: "TECHNICAL" as const,
          },
          {
            title: "News Sentiment Shift",
            message: "Rapid sentiment change from neutral to bullish in last 30 minutes",
            type: "SENTIMENT" as const,
          },
          {
            title: "Analyst Upgrade",
            message: "Major investment bank upgrades rating to Strong Buy",
            type: "BREAKING" as const,
          },
        ]

        const template = alertTemplates[Math.floor(Math.random() * alertTemplates.length)]
        const newAlert: NewsAlert = {
          id: Date.now().toString(),
          title: template.title,
          message: template.message,
          type: template.type,
          severity: severities[Math.floor(Math.random() * severities.length)],
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
          timestamp: new Date().toISOString(),
          actionable: Math.random() > 0.5,
          dismissed: false,
        }

        setAlerts((prev) => [newAlert, ...prev.slice(0, 9)])
      }
    }, 20000)

    return () => clearInterval(interval)
  }, [])

  const dismissAlert = (id: string) => {
    setAlerts((prev) => prev.map((alert) => (alert.id === id ? { ...alert, dismissed: true } : alert)))
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "BREAKING":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "EARNINGS":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "SENTIMENT":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      default:
        return "bg-green-500/20 text-green-400 border-green-500/30"
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "HIGH":
        return "text-red-400"
      case "MEDIUM":
        return "text-yellow-400"
      default:
        return "text-slate-400"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "HIGH":
        return <AlertTriangle className="h-4 w-4 text-red-400" />
      case "MEDIUM":
        return <TrendingUp className="h-4 w-4 text-yellow-400" />
      default:
        return <Bell className="h-4 w-4 text-slate-400" />
    }
  }

  const activeAlerts = alerts.filter((alert) => !alert.dismissed)

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center">
            <Bell className="mr-2 h-5 w-5 text-orange-400" />
            News & Market Alerts
            {activeAlerts.length > 0 && (
              <Badge variant="secondary" className="ml-2 bg-red-500/20 text-red-400">
                {activeAlerts.length}
              </Badge>
            )}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {activeAlerts.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No active alerts</p>
            <p className="text-sm">You'll be notified of important market events</p>
          </div>
        ) : (
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {activeAlerts.map((alert) => (
              <div key={alert.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 relative">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getSeverityIcon(alert.severity)}
                    <div>
                      <h4 className="font-semibold text-white text-sm">{alert.title}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary" className={getTypeColor(alert.type)}>
                          {alert.type}
                        </Badge>
                        <Badge variant="outline" className="border-slate-600 text-slate-300">
                          {alert.symbol}
                        </Badge>
                        <Badge variant="outline" className={`border-slate-600 ${getSeverityColor(alert.severity)}`}>
                          {alert.severity}
                        </Badge>
                        {alert.actionable && (
                          <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                            ACTIONABLE
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => dismissAlert(alert.id)}
                    className="h-6 w-6 text-slate-400 hover:text-white"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>

                <p className="text-sm text-slate-300 mb-3">{alert.message}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">{new Date(alert.timestamp).toLocaleTimeString()}</span>
                  {alert.actionable && (
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-xs border-slate-600 bg-transparent">
                        View Details
                      </Button>
                      <Button size="sm" className="text-xs bg-blue-600 hover:bg-blue-700">
                        Take Action
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
