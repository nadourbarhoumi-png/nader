import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

const marketData = [
  { symbol: "S&P 500", price: "4,567.89", change: "+1.23%", positive: true },
  { symbol: "NASDAQ", price: "14,234.56", change: "+0.87%", positive: true },
  { symbol: "DOW", price: "34,567.12", change: "-0.45%", positive: false },
  { symbol: "EUR/USD", price: "1.0856", change: "+0.12%", positive: true },
  { symbol: "GBP/USD", price: "1.2734", change: "-0.23%", positive: false },
  { symbol: "BTC/USD", price: "43,567.89", change: "+2.45%", positive: true },
]

export function MarketOverview() {
  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-green-400" />
          Market Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {marketData.map((item) => (
            <div key={item.symbol} className="p-4 bg-slate-800/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">{item.symbol}</span>
                {item.positive ? (
                  <TrendingUp className="h-4 w-4 text-green-400" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-400" />
                )}
              </div>
              <div className="text-lg font-semibold text-white">{item.price}</div>
              <Badge
                variant="secondary"
                className={item.positive ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}
              >
                {item.change}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
