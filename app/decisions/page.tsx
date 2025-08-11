import { AIDecisionManager } from "@/components/ai/ai-decision-manager"

export default function DecisionsPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">AI Decision Management</h1>
          <p className="text-slate-400">
            Review, approve, modify, or reject AI trading recommendations before execution.
          </p>
        </div>

        <AIDecisionManager />
      </div>
    </div>
  )
}
