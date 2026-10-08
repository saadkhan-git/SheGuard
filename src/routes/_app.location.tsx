import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Copy, ExternalLink, MapPin, Loader2, Ban, CloudOff } from "lucide-react";
import { Panel, PageTitle } from "@/components/sheguard/AppShell";
import { DemoBadge } from "@/components/sheguard/Brand";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { demoLocation } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/location")({
  head: () => ({
    meta: [
      { title: "Location — SheGuard" },
      { name: "description", content: "View your location and share it with trusted contacts." },
      { property: "og:title", content: "Location — SheGuard" },
      { property: "og:description", content: "Live location sharing controls in SheGuard." },
    ],
  }),
  component: LocationPage,
});

type S = "success" | "loading" | "denied" | "unavailable";

function LocationPage() {
  const [s, setS] = useState<S>("success");
  const [live, setLive] = useState(true);
  const [dur, setDur] = useState("1h");
  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <PageTitle title="Location" subtitle="Coordinates below are demo values, not your real position." action={<DemoBadge />} />
      <Tabs value={s} onValueChange={(v) => setS(v as S)}>
        <TabsList className="flex-wrap">
          <TabsTrigger value="success">Fetched</TabsTrigger>
          <TabsTrigger value="loading">Loading</TabsTrigger>
          <TabsTrigger value="denied">Permission denied</TabsTrigger>
          <TabsTrigger value="unavailable">Unavailable</TabsTrigger>
        </TabsList>
      </Tabs>

      <Panel>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <h2 className="font-semibold">Your Current Location</h2>
            {s === "success" && (
              <>
                <p className="mt-3 flex items-center gap-2 rounded-lg bg-success-soft px-3 py-2 text-sm text-success"><CheckCircle2 className="h-4 w-4" /> Location fetched successfully (demo)</p>
                <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div><dt className="text-muted-foreground">Latitude</dt><dd className="font-semibold">{demoLocation.lat}</dd></div>
                  <div><dt className="text-muted-foreground">Longitude</dt><dd className="font-semibold">{demoLocation.lng}</dd></div>
                  <div><dt className="text-muted-foreground">Accuracy</dt><dd className="font-semibold">{demoLocation.accuracy}</dd></div>
                  <div><dt className="text-muted-foreground">Time</dt><dd className="font-semibold">10:42 AM, 08 Oct 2026</dd></div>
                </dl>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="text-primary" onClick={() => toast("Demo coordinates copied")}><Copy /> Copy Location</Button>
                  <Button variant="outline" size="sm" onClick={() => toast("Maps link disabled in demo")}><ExternalLink /> Open in Maps</Button>
                </div>
              </>
            )}
            {s === "loading" && <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Fetching your location…</p>}
            {s === "denied" && (
              <div className="mt-4 rounded-lg bg-primary-soft p-4 text-sm">
                <p className="flex items-center gap-2 font-semibold text-primary"><Ban className="h-4 w-4" /> Location permission denied</p>
                <p className="mt-1 text-muted-foreground">Allow location access in your browser settings so SheGuard can include it in alerts.</p>
                <Button size="sm" className="mt-3" onClick={() => setS("success")}>Try again</Button>
              </div>
            )}
            {s === "unavailable" && (
              <div className="mt-4 rounded-lg bg-warning-soft p-4 text-sm">
                <p className="flex items-center gap-2 font-semibold"><CloudOff className="h-4 w-4" /> Location unavailable</p>
                <p className="mt-1 text-muted-foreground">GPS signal could not be found. Move to an open area and retry.</p>
                <Button size="sm" variant="outline" className="mt-3" onClick={() => setS("loading")}>Retry</Button>
              </div>
            )}
          </div>
          <div className="map-grid relative h-64 overflow-hidden rounded-xl border" aria-label="Map placeholder">
            <div className="absolute left-[30%] top-0 h-full w-3 bg-card" /><div className="absolute left-0 top-[55%] h-3 w-full bg-card" />
            {s === "success" && (
              <span className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-info/20">
                <span className="grid h-6 w-6 place-items-center rounded-full border-4 border-card bg-info"><MapPin className="h-3 w-3 text-primary-foreground" /></span>
              </span>
            )}
            <span className="absolute bottom-1 right-2 text-[10px] text-muted-foreground">Map placeholder</span>
          </div>
        </div>
      </Panel>

      <Panel>
        <div className="flex items-center justify-between gap-4">
          <div><h2 className="font-semibold">Live Location Sharing</h2><p className="text-sm text-muted-foreground">Share your live location with trusted contacts</p></div>
          <Switch checked={live} onCheckedChange={setLive} aria-label="Live location sharing" />
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
          <Select value={dur} onValueChange={setDur} disabled={!live}>
            <SelectTrigger aria-label="Duration"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="15m">15 minutes</SelectItem><SelectItem value="1h">1 hour</SelectItem><SelectItem value="8h">8 hours</SelectItem>
            </SelectContent>
          </Select>
          <Button disabled={!live || s !== "success"} onClick={() => toast("Live sharing started (demo — nothing is sent)")}>Start Sharing</Button>
        </div>
      </Panel>
    </div>
  );
}
