import { AIDecisionEngine } from "@/components/ai/ai-decision-engine"
import { AIMarketInsights } from "@/components/ai/ai-market-insights"
import { AIPortfolioOptimizer } from "@/components/ai/ai-portfolio-optimizer"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"

export default function AISignalsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 space-y-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">AI Trading Signals</h1>
            <p className="text-slate-400">
              Advanced AI-powered market analysis, decision engine, and portfolio optimization
            </p>
          </div>

          <AIDecisionEngine symbol="AAPL" />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <AIMarketInsights />
            <AIPortfolioOptimizer />
          </div>
        </main>
      </div>
    </div>
  )
}
