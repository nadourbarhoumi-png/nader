import { NewsFeed } from "@/components/news/news-feed"
import { SentimentDashboard } from "@/components/news/sentiment-dashboard"
import { NewsAlerts } from "@/components/news/news-alerts"
import { NewsImpactAnalyzer } from "@/components/news/news-impact-analyzer"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 space-y-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-2">News & Sentiment Analysis</h1>
            <p className="text-slate-400">Real-time market news, sentiment tracking, and AI-powered impact analysis</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <NewsFeed />
            </div>
            <div>
              <NewsAlerts />
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <SentimentDashboard symbol="AAPL" />
            <NewsImpactAnalyzer />
          </div>
        </main>
      </div>
    </div>
  )
}
