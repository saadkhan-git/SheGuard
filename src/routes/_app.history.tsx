import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { MapPin, Inbox, Siren, Share2, ShieldAlert } from "lucide-react";
import { Panel, PageTitle } from "@/components/sheguard/AppShell";
import { DemoBadge } from "@/components/sheguard/Brand";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppStore } from "@/lib/app-store";
import type { HistoryEvent } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/history")({
  head: () => ({
    meta: [
      { title: "Emergency History — SheGuard" },
      { name: "description", content: "Review past SOS alerts and location shares." },
      { property: "og:title", content: "Emergency History — SheGuard" },
      { property: "og:description", content: "Your SheGuard emergency event log." },
    ],
  }),
  component: HistoryPage,
});

const icons = { "SOS Alert": Siren, "Location Share": Share2, "Risk Check": ShieldAlert };
const badge: Record<HistoryEvent["status"], string> = {
  "Sent (demo)": "bg-success-soft text-success",
  Cancelled: "bg-muted text-muted-foreground",
  Pending: "bg-warning-soft text-foreground",
};
const fmt = (d: string) => new Date(d).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

function HistoryPage() {
  const { history } = useAppStore();
  const [type, setType] = useState("all");
  const [sort, setSort] = useState("new");
  const [sel, setSel] = useState<HistoryEvent | null>(null);
  const list = useMemo(() => {
    const l = history.filter((h) => type === "all" || h.type === type);
    return [...l].sort((a, b) => (sort === "new" ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)));
  }, [history, type, sort]);

  return (
    <div className="mx-auto max-w-4xl">
      <PageTitle title="Emergency History" subtitle="Sample records — not genuine emergencies." action={<DemoBadge />} />
      <div className="mb-4 flex flex-wrap gap-3">
        <Select value={type} onValueChange={setType}>
          <SelectTrigger className="w-44" aria-label="Filter by type"><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="all">All events</SelectItem><SelectItem value="SOS Alert">SOS Alerts</SelectItem><SelectItem value="Location Share">Location Shares</SelectItem><SelectItem value="Risk Check">Risk Checks</SelectItem></SelectContent>
        </Select>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-40" aria-label="Sort"><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="new">Newest first</SelectItem><SelectItem value="old">Oldest first</SelectItem></SelectContent>
        </Select>
      </div>
      {list.length === 0 ? (
        <Panel className="flex flex-col items-center py-12 text-center">
          <Inbox className="h-10 w-10 text-muted-foreground" />
          <p className="mt-2 font-semibold">No events found</p>
          <p className="text-sm text-muted-foreground">Try a different filter.</p>
        </Panel>
      ) : (
        <ul className="space-y-3">
          {list.map((h) => {
            const Icon = icons[h.type];
            return (
              <li key={h.id}>
                <Panel className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 p-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-primary-soft text-primary"><Icon className="h-5 w-5" /></span>
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-2 font-semibold">{h.type}<span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", badge[h.status])}>{h.status}</span></p>
                    <p className="text-sm text-muted-foreground">{fmt(h.date)}</p>
                    <p className={cn("flex items-center gap-1 text-xs", h.locationAvailable ? "text-success" : "text-destructive")}><MapPin className="h-3 w-3" />{h.locationAvailable ? "Location available" : "Location unavailable"}</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-primary" onClick={() => setSel(h)}>View</Button>
                </Panel>
              </li>
            );
          })}
        </ul>
      )}
      <Dialog open={!!sel} onOpenChange={() => setSel(null)}>
        <DialogContent className="max-w-sm">
          <DialogTitle>{sel?.type}</DialogTitle>
          <DialogDescription>Demo record</DialogDescription>
          {sel && (
            <dl className="grid gap-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Date</dt><dd>{fmt(sel.date)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Status</dt><dd>{sel.status}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Location</dt><dd>{sel.locationAvailable ? "Available" : "Unavailable"}</dd></div>
              <p className="mt-2 rounded-lg bg-muted p-3">{sel.note}</p>
            </dl>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
