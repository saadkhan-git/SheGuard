import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard, Siren, MapPin, Users, ShieldAlert, History, User, Settings, LogOut, Menu, X, Wifi, WifiOff,
} from "lucide-react";
import { Logo } from "./Brand";
import { useAppStore } from "@/lib/app-store";
import { demoUser } from "@/lib/mock-data";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/sos", label: "SOS", icon: Siren },
  { to: "/location", label: "Location", icon: MapPin },
  { to: "/contacts", label: "Contacts", icon: Users },
  { to: "/risk", label: "Risk Check", icon: ShieldAlert },
  { to: "/history", label: "History", icon: History },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

const mobileNav = [navItems[0], navItems[2], navItems[1], navItems[3], navItems[5]];

function SideNav({ onNavigate }: { onNavigate?: () => void }) {
  const navigate = useNavigate();
  return (
    <div className="flex h-full flex-col bg-sidebar p-4 text-sidebar-foreground">
      <Logo inverted tagline={false} className="px-2 py-2" />
      <nav aria-label="Main" className="mt-6 flex-1 space-y-1">
        {navItems.map((i) => (
          <Link
            key={i.to}
            to={i.to}
            onClick={onNavigate}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-2 focus-visible:outline-sidebar-ring"
            activeProps={{ className: "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary" }}
          >
            <i.icon className="h-4 w-4 shrink-0" aria-hidden />
            {i.label}
          </Link>
        ))}
      </nav>
      <button
        onClick={() => { toast("Logged out (demo)"); navigate({ to: "/login" }); }}
        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      >
        <LogOut className="h-4 w-4" aria-hidden /> Logout
      </button>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { online, setOnline, pending } = useAppStore();
  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 lg:block">
        <SideNav />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setOpen(false)} />
          <div className="relative h-full w-64">
            <SideNav onNavigate={() => setOpen(false)} />
            <button aria-label="Close menu" onClick={() => setOpen(false)} className="absolute right-3 top-4 rounded-md p-1 text-sidebar-foreground hover:bg-sidebar-accent">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b bg-card/90 px-4 py-3 backdrop-blur sm:px-6">
          <div className="flex min-w-0 items-center gap-2">
            <button aria-label="Open menu" onClick={() => setOpen(true)} className="rounded-md p-2 hover:bg-muted lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
            <button
              onClick={() => { setOnline(!online); toast(online ? "Simulated offline mode" : "Back online (simulated)"); }}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
                online ? "bg-success-soft text-success" : "bg-warning-soft text-foreground",
              )}
              aria-label={`Connection: ${online ? "online" : "offline"}. Click to simulate toggle.`}
            >
              {online ? <Wifi className="h-3.5 w-3.5" /> : <WifiOff className="h-3.5 w-3.5" />}
              {online ? "Online" : "Offline"}
              {pending > 0 && <span className="rounded-full bg-primary px-1.5 text-[10px] text-primary-foreground">{pending} pending</span>}
            </button>
          </div>
          <Link to="/profile" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-soft text-sm font-bold text-primary">S</span>
            <span className="hidden text-right leading-tight sm:block">
              <span className="block text-sm font-semibold">{demoUser.firstName}</span>
              <span className="block text-[11px] text-success">● Online</span>
            </span>
          </Link>
        </header>

        {!online && (
          <div role="status" className="flex flex-wrap items-center justify-between gap-2 border-b bg-warning-soft px-4 py-2 text-sm sm:px-6">
            <span><strong>You're offline.</strong> Actions will be queued on this device (simulation).</span>
            <button onClick={() => { setOnline(true); toast("Reconnected (simulated)"); }} className="rounded-md bg-card px-3 py-1 text-xs font-semibold shadow-card hover:bg-muted">Retry</button>
          </div>
        )}

        <main className="flex-1 px-4 pb-24 pt-6 sm:px-6 lg:pb-10">{children}</main>
      </div>

      <nav aria-label="Quick" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t bg-card lg:hidden">
        {mobileNav.map((i) => (
          <Link key={i.to} to={i.to} className="flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium text-muted-foreground" activeProps={{ className: "text-primary" }}>
            {i.to === "/sos" ? (
              <span className="-mt-6 grid h-12 w-12 place-items-center rounded-full bg-sos text-primary-foreground shadow-sos"><i.icon className="h-5 w-5" /></span>
            ) : (
              <i.icon className="h-5 w-5" aria-hidden />
            )}
            {i.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function PageTitle({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
      <div className="min-w-0">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return <section className={cn("rounded-2xl border bg-card p-5 shadow-card", className)}>{children}</section>;
}
