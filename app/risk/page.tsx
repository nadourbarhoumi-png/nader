"use client"

import { RiskDashboard } from "@/components/risk/risk-dashboard"
import { PositionSizing } from "@/components/risk/position-sizing"
import { StopLossManager } from "@/components/risk/stop-loss-manager"
import { DrawdownProtection } from "@/components/risk/drawdown-protection"

export default function RiskManagementPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Risk Management Center</h1>
          <p className="text-slate-400">Comprehensive risk controls and portfolio protection systems</p>
        </div>

        {/* Risk Overview Dashboard */}
        <RiskDashboard />

        {/* Position Sizing Calculator */}
        <PositionSizing />

        {/* Stop Loss Management */}
        <StopLossManager />

        {/* Drawdown Protection */}
        <DrawdownProtection />
      </div>
    </div>
  )
}
