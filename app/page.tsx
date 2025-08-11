import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { MarketOverview } from "@/components/dashboard/market-overview"
import { TradingSignals } from "@/components/dashboard/trading-signals"
import { PortfolioSummary } from "@/components/dashboard/portfolio-summary"
import { RecentTrades } from "@/components/dashboard/recent-trades"
import { TradingChart } from "@/components/charts/trading-chart"
import { LivePrices } from "@/components/market/live-prices"
import { CryptoPrices } from "@/components/market/crypto-prices"
import { ForexRates } from "@/components/market/forex-rates"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <TradingChart symbol="AAPL" />
            </div>
            <div>
              <PortfolioSummary />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Suspense fallback={<div className="h-64 bg-slate-900 rounded-lg animate-pulse" />}>
                <MarketOverview />
              </Suspense>
              <Suspense fallback={<div className="h-96 bg-slate-900 rounded-lg animate-pulse" />}>
                <TradingSignals />
              </Suspense>
            </div>
            <div className="space-y-6">
              <LivePrices />
              <RecentTrades />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CryptoPrices />
            <ForexRates />
          </div>
        </main>
      </div>
    </div>
  )
}
