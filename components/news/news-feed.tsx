"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Newspaper, TrendingUp, TrendingDown, Clock, ExternalLink, Filter } from "lucide-react"

interface NewsArticle {
  id: string
  title: string
  summary: string
  source: string
  publishedAt: string
  sentiment: "BULLISH" | "BEARISH" | "NEUTRAL"
  sentimentScore: number
  marketImpact: "HIGH" | "MEDIUM" | "LOW"
  relevantSymbols: string[]
  category: "EARNINGS" | "MACRO" | "SECTOR" | "COMPANY" | "GEOPOLITICAL"
  url: string
}

export function NewsFeed({ symbol }: { symbol?: string }) {
  const [articles, setArticles] = useState<NewsArticle[]>([
    {
      id: "1",
      title: "Apple Reports Strong Q4 Earnings, Beats Revenue Expectations",
      summary:
        "Apple Inc. reported quarterly revenue of $89.5 billion, surpassing analyst estimates of $87.2 billion. iPhone sales showed resilience despite market headwinds.",
      source: "Reuters",
      publishedAt: "2024-01-15T14:30:00Z",
      sentiment: "BULLISH",
      sentimentScore: 0.78,
      marketImpact: "HIGH",
      relevantSymbols: ["AAPL"],
      category: "EARNINGS",
      url: "#",
    },
    {
      id: "2",
      title: "Federal Reserve Signals Potential Rate Cuts in 2024",
      summary:
        "Fed Chair Powell indicated that the central bank may consider rate cuts if inflation continues to moderate, providing relief to growth stocks.",
      source: "Bloomberg",
      publishedAt: "2024-01-15T13:15:00Z",
      sentiment: "BULLISH",
      sentimentScore: 0.65,
      marketImpact: "HIGH",
      relevantSymbols: ["SPY", "QQQ", "AAPL", "GOOGL"],
      category: "MACRO",
      url: "#",
    },
    {
      id: "3",
      title: "Tech Sector Faces Regulatory Scrutiny in Europe",
      summary:
        "European regulators announce new antitrust investigations targeting major tech companies, potentially impacting future growth prospects.",
      source: "Financial Times",
      publishedAt: "2024-01-15T12:45:00Z",
      sentiment: "BEARISH",
      sentimentScore: -0.52,
      marketImpact: "MEDIUM",
      relevantSymbols: ["GOOGL", "META", "AMZN"],
      category: "SECTOR",
      url: "#",
    },
    {
      id: "4",
      title: "AI Chip Demand Continues to Surge, NVIDIA Benefits",
      summary:
        "Strong demand for AI infrastructure drives semiconductor growth, with NVIDIA reporting record data center revenue.",
      source: "CNBC",
      publishedAt: "2024-01-15T11:20:00Z",
      sentiment: "BULLISH",
      sentimentScore: 0.71,
      marketImpact: "HIGH",
      relevantSymbols: ["NVDA", "AMD", "TSM"],
      category: "SECTOR",
      url: "#",
    },
  ])

  const [filter, setFilter] = useState<"ALL" | "BULLISH" | "BEARISH" | "HIGH_IMPACT">("ALL")
  const [isLoading, setIsLoading] = useState(false)

  // Simulate real-time news updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newArticles = [
          {
            title: "Market Volatility Increases Amid Economic Uncertainty",
            summary: "VIX spikes as investors react to mixed economic signals and geopolitical tensions.",
            sentiment: "BEARISH" as const,
            sentimentScore: -0.43,
            marketImpact: "MEDIUM" as const,
            category: "MACRO" as const,
            relevantSymbols: ["VIX", "SPY"],
          },
          {
            title: "Breakthrough in Renewable Energy Technology Announced",
            summary: "Major advancement in solar panel efficiency could revolutionize clean energy sector.",
            sentiment: "BULLISH" as const,
            sentimentScore: 0.68,
            marketImpact: "MEDIUM" as const,
            category: "SECTOR" as const,
            relevantSymbols: ["ENPH", "SEDG"],
          },
          {
            title: "Cryptocurrency Market Shows Signs of Recovery",
            summary: "Bitcoin and major altcoins rally as institutional adoption continues to grow.",
            sentiment: "BULLISH" as const,
            sentimentScore: 0.59,
            marketImpact: "MEDIUM" as const,
            category: "SECTOR" as const,
            relevantSymbols: ["BTC", "ETH"],
          },
        ]

        const randomArticle = newArticles[Math.floor(Math.random() * newArticles.length)]
        const newArticle: NewsArticle = {
          id: Date.now().toString(),
          ...randomArticle,
          source: ["Reuters", "Bloomberg", "CNBC", "Financial Times"][Math.floor(Math.random() * 4)],
          publishedAt: new Date().toISOString(),
          url: "#",
        }

        setArticles((prev) => [newArticle, ...prev.slice(0, 9)])
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [])

  const filteredArticles = articles.filter((article) => {
    switch (filter) {
      case "BULLISH":
        return article.sentiment === "BULLISH"
      case "BEARISH":
        return article.sentiment === "BEARISH"
      case "HIGH_IMPACT":
        return article.marketImpact === "HIGH"
      default:
        return true
    }
  })

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "BULLISH":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "BEARISH":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "BULLISH":
        return <TrendingUp className="h-3 w-3" />
      case "BEARISH":
        return <TrendingDown className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "EARNINGS":
        return "bg-blue-500/20 text-blue-400"
      case "MACRO":
        return "bg-purple-500/20 text-purple-400"
      case "SECTOR":
        return "bg-cyan-500/20 text-cyan-400"
      case "COMPANY":
        return "bg-green-500/20 text-green-400"
      default:
        return "bg-orange-500/20 text-orange-400"
    }
  }

  const refreshNews = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center">
            <Newspaper className="mr-2 h-5 w-5 text-blue-400" />
            Market News Feed
            {symbol && <span className="ml-2 text-slate-400">- {symbol}</span>}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={refreshNews}
              disabled={isLoading}
              className="text-slate-400 hover:text-white"
            >
              <Filter className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>

        <div className="flex space-x-2">
          {["ALL", "BULLISH", "BEARISH", "HIGH_IMPACT"].map((filterOption) => (
            <Button
              key={filterOption}
              variant={filter === filterOption ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setFilter(filterOption as any)}
              className="text-xs"
            >
              {filterOption.replace("_", " ")}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:bg-slate-800/70 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2 flex-wrap gap-2">
                  <Badge variant="secondary" className={getSentimentColor(article.sentiment)}>
                    {getSentimentIcon(article.sentiment)}
                    <span className="ml-1">{article.sentiment}</span>
                  </Badge>
                  <Badge variant="secondary" className={getCategoryColor(article.category)}>
                    {article.category}
                  </Badge>
                  <Badge variant="outline" className={`border-slate-600 ${getImpactColor(article.marketImpact)}`}>
                    {article.marketImpact} IMPACT
                  </Badge>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <span>{article.source}</span>
                  <span>•</span>
                  <span>{new Date(article.publishedAt).toLocaleTimeString()}</span>
                </div>
              </div>

              <h3 className="font-semibold text-white mb-2 hover:text-blue-400 cursor-pointer">{article.title}</h3>

              <p className="text-sm text-slate-300 mb-3">{article.summary}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-400">Symbols:</span>
                  <div className="flex space-x-1">
                    {article.relevantSymbols.slice(0, 3).map((sym) => (
                      <Badge key={sym} variant="outline" className="border-slate-600 text-slate-300 text-xs">
                        {sym}
                      </Badge>
                    ))}
                    {article.relevantSymbols.length > 3 && (
                      <Badge variant="outline" className="border-slate-600 text-slate-300 text-xs">
                        +{article.relevantSymbols.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-400">
                    Sentiment: {(article.sentimentScore * 100).toFixed(0)}%
                  </span>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 hover:text-white">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
