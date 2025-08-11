import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, TrendingUp, TrendingDown } from "lucide-react"

const recentTrades = [
  {
    asset: "AAPL",
    type: "BUY",
    quantity: "100",
    price: "$182.45",
    pnl: "+$234.56",
    time: "2 min ago",
    positive: true,
  },
  {
    asset: "EUR/USD",
    type: "SELL",
    quantity: "10,000",
    price: "1.0856",
    pnl: "-$45.23",
    time: "15 min ago",
    positive: false,
  },
  {
    asset: "TSLA",
    type: "BUY",
    quantity: "50",
    price: "$234.67",
    pnl: "+$567.89",
    time: "1 hour ago",
    positive: true,
  },
  {
    asset: "BTC/USD",
    type: "SELL",
    quantity: "0.5",
    price: "$43,567",
    pnl: "+$1,234.56",
    time: "2 hours ago",
    positive: true,
  },
]

export function RecentTrades() {
  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Activity className="mr-2 h-5 w-5 text-orange-400" />
          Recent Trades
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentTrades.map((trade, index) => (
          <div key={index} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-white">{trade.asset}</span>
                <Badge
                  variant="outline"
                  className={trade.type === "BUY" ? "border-green-500 text-green-400" : "border-red-500 text-red-400"}
                >
                  {trade.type}
                </Badge>
              </div>
              {trade.positive ? (
                <TrendingUp className="h-4 w-4 text-green-400" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-400" />
              )}
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-400">
                {trade.quantity} @ {trade.price}
              </span>
              <span className={trade.positive ? "text-green-400" : "text-red-400"}>{trade.pnl}</span>
            </div>

            <div className="text-xs text-slate-500 mt-1">{trade.time}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
