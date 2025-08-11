import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, Brain, TrendingUp, TrendingDown } from "lucide-react"

const signals = [
  {
    asset: "AAPL",
    signal: "BUY",
    confidence: 87,
    price: "$182.45",
    target: "$195.00",
    reasoning: "Strong technical breakout with high volume. RSI oversold recovery.",
    timeframe: "4H",
  },
  {
    asset: "EUR/USD",
    signal: "SELL",
    confidence: 73,
    price: "1.0856",
    target: "1.0720",
    reasoning: "ECB dovish stance, USD strength expected to continue.",
    timeframe: "1D",
  },
  {
    asset: "BTC/USD",
    signal: "HOLD",
    confidence: 65,
    price: "$43,567",
    target: "$45,000",
    reasoning: "Consolidation phase, waiting for clear directional break.",
    timeframe: "1H",
  },
]

export function TradingSignals() {
  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Brain className="mr-2 h-5 w-5 text-purple-400" />
          AI Trading Signals
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {signals.map((signal, index) => (
          <div key={index} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-white">{signal.asset}</span>
                <Badge
                  variant="secondary"
                  className={
                    signal.signal === "BUY"
                      ? "bg-green-500/20 text-green-400"
                      : signal.signal === "SELL"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-yellow-500/20 text-yellow-400"
                  }
                >
                  {signal.signal}
                </Badge>
                <Badge variant="outline" className="border-slate-600 text-slate-300">
                  {signal.confidence}% confidence
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                {signal.signal === "BUY" ? (
                  <TrendingUp className="h-4 w-4 text-green-400" />
                ) : signal.signal === "SELL" ? (
                  <TrendingDown className="h-4 w-4 text-red-400" />
                ) : (
                  <Zap className="h-4 w-4 text-yellow-400" />
                )}
                <span className="text-sm text-slate-400">{signal.timeframe}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <span className="text-sm text-slate-400">Current Price</span>
                <div className="font-semibold text-white">{signal.price}</div>
              </div>
              <div>
                <span className="text-sm text-slate-400">Target</span>
                <div className="font-semibold text-white">{signal.target}</div>
              </div>
            </div>

            <p className="text-sm text-slate-300 mb-3">{signal.reasoning}</p>

            <Button
              size="sm"
              className={
                signal.signal === "BUY"
                  ? "bg-green-600 hover:bg-green-700"
                  : signal.signal === "SELL"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-slate-600 hover:bg-slate-700"
              }
            >
              Execute Trade
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
