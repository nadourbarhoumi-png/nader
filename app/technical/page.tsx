import { TechnicalIndicators } from "@/components/technical/technical-indicators"
import { PatternRecognition } from "@/components/technical/pattern-recognition"
import { FibonacciAnalysis } from "@/components/technical/fibonacci-analysis"
import { VolumeAnalysis } from "@/components/technical/volume-analysis"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"

export default function TechnicalAnalysisPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 space-y-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">Technical Analysis</h1>
            <p className="text-slate-400">
              Advanced technical indicators, pattern recognition, and market analysis tools
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <TechnicalIndicators symbol="AAPL" />
            <PatternRecognition symbol="AAPL" />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <FibonacciAnalysis symbol="AAPL" />
            <VolumeAnalysis symbol="AAPL" />
          </div>
        </main>
      </div>
    </div>
  )
}
