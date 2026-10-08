import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, MessageCircle, MessageSquare, Link2, Mail, Phone } from "lucide-react";
import { Panel, PageTitle } from "@/components/sheguard/AppShell";
import { SosButton, SosStatus, type SosState } from "@/components/sheguard/SosButton";
import { DemoBadge } from "@/components/sheguard/Brand";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/app-store";
import { demoLocation } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/sos")({
  head: () => ({
    meta: [
      { title: "SOS Emergency — SheGuard" },
      { name: "description", content: "Start the SheGuard emergency flow and share your alert." },
      { property: "og:title", content: "SOS Emergency — SheGuard" },
      { property: "og:description", content: "One-tap SOS with location and trusted contacts." },
    ],
  }),
  component: SosPage,
});

const share = [
  { label: "WhatsApp", icon: MessageCircle, cls: "bg-whatsapp" },
  { label: "SMS", icon: MessageSquare, cls: "bg-sms" },
  { label: "Copy Link", icon: Link2, cls: "bg-link-share" },
  { label: "Email", icon: Mail, cls: "bg-email-share" },
];

function SosPage() {
  const [state, setState] = useState<SosState>("idle");
  const { contacts } = useAppStore();
  const time = new Date().toLocaleString("en-IN", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short", year: "numeric" });
  return (
    <div className="mx-auto max-w-6xl">
      <PageTitle title="SOS Emergency" subtitle="Demonstration only — no real alerts are sent." action={<DemoBadge />} />
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel className="flex flex-col items-center gap-6 py-10">
          <SosButton onState={setState} />
          <SosStatus state={state} />
          {state !== "idle" && <Button variant="outline" size="sm" onClick={() => { setState("idle"); toast("Emergency flow cancelled"); }}>Cancel / reset</Button>}
        </Panel>

        <Panel>
          <h2 className="font-semibold">Share Emergency Alert</h2>
          <div className="mt-3 rounded-xl border bg-muted/50 p-4 text-sm">
            <p className="font-bold text-primary">🚨 SHEGUARD EMERGENCY ALERT 🚨</p>
            <p className="mt-2">I may need emergency assistance.</p>
            <p className="mt-2">My current location (demo):<br /><span className="break-all text-info">https://www.google.com/maps?q={demoLocation.lat},{demoLocation.lng}</span></p>
            <p className="mt-2">Time: {time}</p>
            <p className="mt-2">Please contact me immediately.</p>
          </div>
          <p className="mt-4 text-sm font-medium">Share via</p>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {share.map((s) => (
              <button key={s.label} onClick={() => toast(`${s.label} sharing is disabled in this demo`)} className={`${s.cls} inline-flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90`}>
                <s.icon className="h-4 w-4" /> {s.label}
              </button>
            ))}
          </div>
        </Panel>

        <Panel>
          <div className="mb-3 flex items-center justify-between"><h2 className="font-semibold">Will be notified</h2><Link to="/contacts" className="text-sm text-primary">Manage</Link></div>
          <ul className="space-y-2">
            {contacts.map((c) => (
              <li key={c.id} className="flex items-center gap-3 text-sm">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-primary-soft font-bold text-primary">{c.initials}</span>
                <span className="min-w-0 flex-1 truncate">{c.name}{c.primary && " · Primary"}</span>
                <Phone className="h-4 w-4 text-muted-foreground" />
              </li>
            ))}
            {contacts.length === 0 && <li className="text-sm text-destructive">No trusted contacts yet — add one first.</li>}
          </ul>
        </Panel>
        <Panel>
          <h2 className="mb-3 font-semibold">Location preview</h2>
          <div className="map-grid relative grid h-40 place-items-center overflow-hidden rounded-xl">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-info/20"><MapPin className="h-6 w-6 text-info" /></span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{demoLocation.label}</p>
        </Panel>
      </div>
    </div>
  );
}
