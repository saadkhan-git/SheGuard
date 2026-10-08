import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Users, ShieldAlert, History, ShieldCheck, Smartphone, Wifi, WifiOff } from "lucide-react";
import { Panel } from "@/components/sheguard/AppShell";
import { SosButton, SosStatus, type SosState } from "@/components/sheguard/SosButton";
import { DemoBadge } from "@/components/sheguard/Brand";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/app-store";
import { demoUser, demoLocation } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — SheGuard" },
      { name: "description", content: "Your SheGuard safety dashboard with SOS, location and contacts." },
      { property: "og:title", content: "Dashboard — SheGuard" },
      { property: "og:description", content: "SOS, location, contacts and risk status at a glance." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [state, setState] = useState<SosState>("idle");
  const { contacts, history, settings, online } = useAppStore();
  const tiles = [
    { to: "/location", icon: MapPin, title: "Location", desc: `${demoLocation.lat}, ${demoLocation.lng}`, cta: "View" },
    { to: "/contacts", icon: Users, title: "Contacts", desc: `${contacts.length} trusted contacts`, cta: "Manage" },
    { to: "/risk", icon: ShieldAlert, title: "Risk Check", desc: "Last result: Medium", cta: "Check Now" },
    { to: "/history", icon: History, title: "History", desc: `${history.length} emergency events`, cta: "View" },
  ] as const;

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold">Good Morning, {demoUser.firstName}</h1>
          <p className="text-sm text-muted-foreground">You are safe. Stay alert and take care!</p>
        </div>
        <DemoBadge />
      </div>

      <div className="grid gap-5 md:grid-cols-[1.3fr_1fr]">
        <Panel className="flex flex-col items-center gap-6 py-10">
          <SosButton onState={setState} />
          <SosStatus state={state} />
        </Panel>
        <div className="grid gap-5">
          <Panel>
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-success-soft text-success"><ShieldCheck className="h-6 w-6" /></span>
              <div>
                <h2 className="font-semibold">Safety Status</h2>
                <p className="mt-1 text-lg font-bold text-success">You are safe</p>
                <p className="text-sm text-muted-foreground">Stay alert and keep your trusted contacts informed.</p>
              </div>
            </div>
          </Panel>
          <div className="grid grid-cols-2 gap-5">
            <Panel className="p-4">
              <Smartphone className="h-5 w-5 text-primary" />
              <p className="mt-2 text-sm font-semibold">Shake-to-Alert</p>
              <p className="text-xs text-muted-foreground">{settings.shake ? "● Enabled" : "○ Disabled"}</p>
            </Panel>
            <Panel className="p-4">
              {online ? <Wifi className="h-5 w-5 text-success" /> : <WifiOff className="h-5 w-5 text-warning" />}
              <p className="mt-2 text-sm font-semibold">Connectivity</p>
              <p className="text-xs text-muted-foreground">{online ? "● Online" : "○ Offline (simulated)"}</p>
            </Panel>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {tiles.map((t) => (
          <Panel key={t.to} className="flex flex-col items-center p-4 text-center">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-primary-soft text-primary"><t.icon className="h-5 w-5" /></span>
            <p className="mt-2 font-semibold">{t.title}</p>
            <p className="text-xs text-muted-foreground">{t.desc}</p>
            <Button asChild variant="soft" size="sm" className="mt-3 w-full"><Link to={t.to}>{t.cta}</Link></Button>
          </Panel>
        ))}
      </div>

      <Panel>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold">Recent emergency history</h2>
          <Link to="/history" className="text-sm text-primary">See all</Link>
        </div>
        <ul className="divide-y">
          {history.slice(0, 3).map((h) => (
            <li key={h.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
              <span className="min-w-0 truncate font-medium">{h.type}</span>
              <span className="shrink-0 text-muted-foreground">{new Date(h.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })} · {h.status}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
