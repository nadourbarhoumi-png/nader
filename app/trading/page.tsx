"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TradingInterface } from "@/components/trading/trading-interface"
import { AutomatedTrading } from "@/components/trading/automated-trading"

export default function TradingPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Live Trading Center</h1>
          <p className="text-slate-400">Execute trades manually or let AI bots trade automatically</p>
        </div>

        <Tabs defaultValue="manual" className="space-y-6">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="manual" className="data-[state=active]:bg-slate-700">
              Manual Trading
            </TabsTrigger>
            <TabsTrigger value="automated" className="data-[state=active]:bg-slate-700">
              Automated Trading
            </TabsTrigger>
          </TabsList>

          <TabsContent value="manual">
            <TradingInterface />
          </TabsContent>

          <TabsContent value="automated">
            <AutomatedTrading />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
