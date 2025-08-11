"use client"

import { useState } from "react"
import { BarChart3, TrendingUp, Newspaper, Shield, Settings, Zap, PieChart, Activity, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const navigation = [
  { name: "Dashboard", icon: BarChart3, href: "/", current: true },
  { name: "Technical Analysis", icon: TrendingUp, href: "/technical", current: false },
  { name: "AI Signals", icon: Zap, href: "/ai-signals", current: false },
  { name: "Portfolio", icon: PieChart, href: "/portfolio", current: false },
  { name: "Market News", icon: Newspaper, href: "/news", current: false },
  { name: "Risk Management", icon: Shield, href: "/risk", current: false },
  { name: "Global Markets", icon: Globe, href: "/markets", current: false },
  { name: "Live Trading", icon: Activity, href: "/trading", current: false },
]

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "bg-slate-900/50 border-r border-slate-800 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="w-full justify-start text-slate-400 hover:text-white"
        >
          <BarChart3 className="h-4 w-4" />
          {!collapsed && <span className="ml-2">Collapse</span>}
        </Button>
      </div>

      <nav className="px-2 space-y-1">
        {navigation.map((item) => (
          <Link key={item.name} href={item.href}>
            <Button
              variant={item.current ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800",
                item.current && "bg-slate-800 text-white",
                collapsed && "px-2",
              )}
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && <span className="ml-3">{item.name}</span>}
            </Button>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-4 left-2 right-2">
        <Button
          variant="ghost"
          className={cn("w-full justify-start text-slate-400 hover:text-white hover:bg-slate-800", collapsed && "px-2")}
        >
          <Settings className="h-5 w-5" />
          {!collapsed && <span className="ml-3">Settings</span>}
        </Button>
      </div>
    </div>
  )
}
