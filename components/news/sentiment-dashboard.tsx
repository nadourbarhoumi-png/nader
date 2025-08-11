"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Heart, MessageCircle, BarChart3 } from "lucide-react"

interface SentimentData {
  source: string
  sentiment: number
  volume: number
  change24h: number
  trending: boolean
}

interface SocialMetrics {
  platform: string
  mentions: number
  sentiment: number
  engagement: number
  influencerScore: number
}

export function SentimentDashboard({ symbol = "AAPL" }: { symbol?: string }) {
  const [overallSentiment, setOverallSentiment] = useState({
    score: 0.67,
    trend: "BULLISH",
    confidence: 84,
    change24h: 0.12,
  })

  const [sentimentSources, setSentimentSources] = useState<SentimentData[]>([
    { source: "Financial News", sentiment: 0.72, volume: 1247, change24h: 0.08, trending: true },
    { source: "Social Media", sentiment: 0.61, volume: 8934, change24h: 0.15, trending: true },
    { source: "Analyst Reports", sentiment: 0.78, volume: 23, change24h: -0.02, trending: false },
    { source: "Earnings Calls", sentiment: 0.85, volume: 4, change24h: 0.23, trending: true },
    { source: "SEC Filings", sentiment: 0.45, volume: 12, change24h: -0.05, trending: false },
  ])

  const [socialMetrics, setSocialMetrics] = useState<SocialMetrics[]>([
    { platform: "Twitter/X", mentions: 12847, sentiment: 0.63, engagement: 89234, influencerScore: 76 },
    { platform: "Reddit", mentions: 3421, sentiment: 0.58, engagement: 45123, influencerScore: 82 },
    { platform: "StockTwits", mentions: 8934, sentiment: 0.71, engagement: 23456, influencerScore: 68 },
    { platform: "Discord", mentions: 1567, sentiment: 0.55, engagement: 8934, influencerScore: 71 },
  ])

  const [sentimentHistory, setSentimentHistory] = useState(
    Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      sentiment: 0.5 + (Math.random() - 0.5) * 0.4,
      volume: Math.floor(Math.random() * 1000) + 500,
    })),
  )

  // Simulate real-time sentiment updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update overall sentiment
      setOverallSentiment((prev) => ({
        ...prev,
        score: Math.max(0, Math.min(1, prev.score + (Math.random() - 0.5) * 0.1)),
        confidence: Math.max(50, Math.min(95, prev.confidence + (Math.random() - 0.5) * 5)),
        change24h: (Math.random() - 0.5) * 0.3,
      }))

      // Update sentiment sources
      setSentimentSources((prev) =>
        prev.map((source) => ({
          ...source,
          sentiment: Math.max(0, Math.min(1, source.sentiment + (Math.random() - 0.5) * 0.05)),
          volume: Math.max(1, source.volume + Math.floor((Math.random() - 0.5) * 100)),
          change24h: (Math.random() - 0.5) * 0.2,
          trending: Math.random() > 0.7,
        })),
      )

      // Update social metrics
      setSocialMetrics((prev) =>
        prev.map((social) => ({
          ...social,
          mentions: Math.max(1, social.mentions + Math.floor((Math.random() - 0.5) * 200)),
          sentiment: Math.max(0, Math.min(1, social.sentiment + (Math.random() - 0.5) * 0.03)),
          engagement: Math.max(1, social.engagement + Math.floor((Math.random() - 0.5) * 1000)),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getSentimentColor = (sentiment: number) => {
    if (sentiment > 0.6) return "text-green-400"
    if (sentiment < 0.4) return "text-red-400"
    return "text-yellow-400"
  }

  const getSentimentBg = (sentiment: number) => {
    if (sentiment > 0.6) return "bg-green-500"
    if (sentiment < 0.4) return "bg-red-500"
    return "bg-yellow-500"
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return (
    <div className="space-y-6">
      <Card className="bg-slate-900/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-purple-400" />
            Market Sentiment Analysis - {symbol}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Overall Sentiment */}
          <div className="p-6 bg-slate-800/50 rounded-lg mb-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Overall Market Sentiment</h3>
                <div className="flex items-center space-x-3">
                  <span className={`text-2xl font-bold ${getSentimentColor(overallSentiment.score)}`}>
                    {(overallSentiment.score * 100).toFixed(0)}%
                  </span>
                  <Badge
                    variant="secondary"
                    className={
                      overallSentiment.trend === "BULLISH"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }
                  >
                    {overallSentiment.trend === "BULLISH" ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {overallSentiment.trend}
                  </Badge>
                  <Badge variant="outline" className="border-slate-600 text-slate-300">
                    {overallSentiment.confidence}% confidence
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-400">24h Change</div>
                <div className={`font-bold ${overallSentiment.change24h >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {overallSentiment.change24h >= 0 ? "+" : ""}
                  {(overallSentiment.change24h * 100).toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Sentiment Bar */}
            <div className="w-full bg-slate-700 rounded-full h-3 mb-2">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${getSentimentBg(overallSentiment.score)}`}
                style={{ width: `${overallSentiment.score * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Bearish</span>
              <span>Neutral</span>
              <span>Bullish</span>
            </div>
          </div>

          {/* Sentiment Sources */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Sentiment by Source</h4>
              <div className="space-y-3">
                {sentimentSources.map((source, index) => (
                  <div key={index} className="p-3 bg-slate-800/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-white">{source.source}</span>
                        {source.trending && (
                          <Badge variant="secondary" className="bg-orange-500/20 text-orange-400 text-xs">
                            TRENDING
                          </Badge>
                        )}
                      </div>
                      <span className={`text-sm font-semibold ${getSentimentColor(source.sentiment)}`}>
                        {(source.sentiment * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>{formatNumber(source.volume)} mentions</span>
                      <span className={source.change24h >= 0 ? "text-green-400" : "text-red-400"}>
                        {source.change24h >= 0 ? "+" : ""}
                        {(source.change24h * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media Metrics */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-3">Social Media Sentiment</h4>
              <div className="space-y-3">
                {socialMetrics.map((social, index) => (
                  <div key={index} className="p-3 bg-slate-800/30 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-white">{social.platform}</span>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-3 w-3 text-slate-400" />
                          <span className="text-xs text-slate-400">{formatNumber(social.mentions)}</span>
                        </div>
                      </div>
                      <span className={`text-sm font-semibold ${getSentimentColor(social.sentiment)}`}>
                        {(social.sentiment * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-3 w-3" />
                        <span>{formatNumber(social.engagement)}</span>
                      </div>
                      <span>Influence: {social.influencerScore}/100</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sentiment Timeline */}
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-white mb-3">24-Hour Sentiment Timeline</h4>
            <div className="h-32 bg-slate-800/30 rounded-lg p-4 flex items-end justify-between">
              {sentimentHistory.map((data, index) => (
                <div key={index} className="flex flex-col items-center space-y-1">
                  <div
                    className={`w-2 rounded-t transition-all duration-300 ${getSentimentBg(data.sentiment)}`}
                    style={{ height: `${data.sentiment * 80}px` }}
                  />
                  {index % 4 === 0 && <span className="text-xs text-slate-500">{data.hour}h</span>}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
