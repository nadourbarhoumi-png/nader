import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PieChart, DollarSign } from "lucide-react"

export function PortfolioSummary() {
  return (
    <Card className="bg-slate-900/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <PieChart className="mr-2 h-5 w-5 text-blue-400" />
          Portfolio Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-slate-800/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Total Balance</span>
            <DollarSign className="h-4 w-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-white">$127,456.78</div>
          <Badge variant="secondary" className="bg-green-500/20 text-green-400 mt-2">
            +12.34% Today
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-slate-800/50 rounded-lg">
            <span className="text-xs text-slate-400">P&L Today</span>
            <div className="text-lg font-semibold text-green-400">+$2,456.78</div>
          </div>
          <div className="p-3 bg-slate-800/50 rounded-lg">
            <span className="text-xs text-slate-400">Open Positions</span>
            <div className="text-lg font-semibold text-white">7</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-400">Stocks</span>
            <span className="text-sm text-white">65%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: "65%" }}></div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-400">Forex</span>
            <span className="text-sm text-white">25%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: "25%" }}></div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-400">Crypto</span>
            <span className="text-sm text-white">10%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div className="bg-purple-500 h-2 rounded-full" style={{ width: "10%" }}></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
