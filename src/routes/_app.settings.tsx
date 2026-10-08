import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, MapPin, Smartphone, Moon, Globe, Info, LifeBuoy, Lock, Trash2, Wifi, WifiOff, ChevronRight } from "lucide-react";
import { Panel, PageTitle } from "@/components/sheguard/AppShell";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useAppStore, type Settings } from "@/lib/app-store";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({
    meta: [
      { title: "Settings & Privacy — SheGuard" },
      { name: "description", content: "Control notifications, location, shake-to-alert and privacy." },
      { property: "og:title", content: "Settings & Privacy — SheGuard" },
      { property: "og:description", content: "SheGuard preferences and privacy controls." },
    ],
  }),
  component: SettingsPage,
});

const toggles: { key: keyof Settings; label: string; desc: string; icon: typeof Bell }[] = [
  { key: "notifications", label: "Notifications", desc: "Alert reminders and updates", icon: Bell },
  { key: "location", label: "Location Services", desc: "Include location in alerts (browser permission required)", icon: MapPin },
  { key: "shake", label: "Shake to Alert", desc: "Shake your phone to open the SOS flow", icon: Smartphone },
  { key: "shareHistory", label: "Save emergency history", desc: "Keep a log of events on this device", icon: Lock },
  { key: "darkMode", label: "Dark Mode", desc: "Coming soon", icon: Moon },
];

function SettingsPage() {
  const { settings, setSetting, setHistory, online, setOnline, pending, setPending } = useAppStore();
  const [clear, setClear] = useState(false);
  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <PageTitle title="Settings" subtitle="Changes apply to this demo session only." />
      <Panel className="divide-y p-2">
        {toggles.map((t) => (
          <div key={t.key} className="flex items-center gap-3 px-3 py-3">
            <t.icon className="h-4 w-4 shrink-0 text-primary" />
            <div className="min-w-0 flex-1"><p className="text-sm font-medium">{t.label}</p><p className="text-xs text-muted-foreground">{t.desc}</p></div>
            <Switch checked={settings[t.key] as boolean} disabled={t.key === "darkMode"} onCheckedChange={(v) => { setSetting(t.key, v); toast(`${t.label} ${v ? "on" : "off"}`); }} aria-label={t.label} />
          </div>
        ))}
        <div className="flex items-center gap-3 px-3 py-3"><Globe className="h-4 w-4 text-primary" /><p className="flex-1 text-sm font-medium">Language</p><span className="text-sm text-muted-foreground">{settings.language}</span></div>
        <div className="flex items-center gap-3 px-3 py-3"><Info className="h-4 w-4 text-primary" /><p className="flex-1 text-sm font-medium">About SheGuard</p><ChevronRight className="h-4 w-4 text-muted-foreground" /></div>
        <div className="flex items-center gap-3 px-3 py-3"><LifeBuoy className="h-4 w-4 text-primary" /><p className="flex-1 text-sm font-medium">Help & Support</p><ChevronRight className="h-4 w-4 text-muted-foreground" /></div>
      </Panel>

      <Panel>
        <h2 className="flex items-center gap-2 font-semibold">{online ? <Wifi className="h-4 w-4 text-success" /> : <WifiOff className="h-4 w-4 text-warning" />} Offline status</h2>
        <p className="mt-1 text-sm text-muted-foreground">Currently <strong>{online ? "online" : "offline"}</strong> (simulated). {pending} pending action{pending === 1 ? "" : "s"}.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => setOnline(!online)}>Simulate {online ? "offline" : "online"}</Button>
          <Button variant="soft" size="sm" disabled={!online || pending === 0} onClick={() => { setPending(0); toast("Pending queue cleared (demo — nothing sent)"); }}>Retry pending</Button>
        </div>
      </Panel>

      <Panel>
        <h2 className="font-semibold">Emergency history</h2>
        <p className="mt-1 text-sm text-muted-foreground">Remove all saved events from this device.</p>
        <Button variant="destructive" size="sm" className="mt-3" onClick={() => setClear(true)}><Trash2 /> Clear history</Button>
      </Panel>

      <Dialog open={clear} onOpenChange={setClear}>
        <DialogContent className="max-w-sm">
          <DialogTitle>Clear all history?</DialogTitle>
          <DialogDescription>This cannot be undone in this session.</DialogDescription>
          <div className="flex justify-end gap-2"><Button variant="outline" onClick={() => setClear(false)}>Cancel</Button><Button variant="destructive" onClick={() => { setHistory([]); setClear(false); toast("History cleared"); }}>Clear</Button></div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
