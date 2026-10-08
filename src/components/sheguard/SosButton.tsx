import { useState } from "react";
import { Siren, AlertTriangle, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/app-store";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export type SosState = "idle" | "preparing" | "ready" | "queued";

export function SosButton({ size = "lg", onState }: { size?: "md" | "lg"; onState?: (s: SosState) => void }) {
  const [confirm, setConfirm] = useState(false);
  const { online, pending, setPending, addHistory } = useAppStore();

  const start = () => {
    setConfirm(false);
    onState?.("preparing");
    setTimeout(() => {
      if (!online) {
        setPending(pending + 1);
        onState?.("queued");
        addHistory({ type: "SOS Alert", date: new Date().toISOString(), status: "Pending", locationAvailable: true, note: "Queued while offline (demo)." });
        toast.warning("Offline: SOS queued on this device (demo — nothing sent)");
      } else {
        onState?.("ready");
        addHistory({ type: "SOS Alert", date: new Date().toISOString(), status: "Sent (demo)", locationAvailable: true, note: "Demo alert prepared. No real message was sent." });
        toast("Demo alert prepared — no real message was sent");
      }
    }, 1400);
  };

  return (
    <>
      <button
        onClick={() => setConfirm(true)}
        aria-label="Start SOS emergency flow"
        className={cn(
          "animate-sos-pulse mx-auto grid place-items-center rounded-full bg-sos text-primary-foreground shadow-sos transition-transform hover:scale-105 focus-visible:outline-4 focus-visible:outline-offset-8 focus-visible:outline-ring",
          size === "lg" ? "h-44 w-44" : "h-32 w-32",
        )}
      >
        <span className="flex flex-col items-center">
          <Siren className={size === "lg" ? "h-9 w-9" : "h-7 w-7"} aria-hidden />
          <span className={cn("font-extrabold tracking-wider", size === "lg" ? "text-4xl" : "text-2xl")}>SOS</span>
        </span>
      </button>
      <Dialog open={confirm} onOpenChange={setConfirm}>
        <DialogContent className="max-w-sm text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary-soft text-primary"><AlertTriangle className="h-7 w-7" /></span>
          <DialogTitle className="text-center text-xl">Are you sure?</DialogTitle>
          <DialogDescription className="text-center">Do you want to start the emergency assistance flow? This is a demo — no real alerts are sent.</DialogDescription>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={() => setConfirm(false)}>Cancel</Button>
            <Button onClick={start}>Start SOS</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function SosStatus({ state }: { state: SosState }) {
  if (state === "idle") return <p className="text-sm text-muted-foreground">Tap to start the emergency flow</p>;
  if (state === "preparing") return <p className="inline-flex items-center gap-2 text-sm font-medium text-primary"><Loader2 className="h-4 w-4 animate-spin" /> Preparing alert…</p>;
  if (state === "queued") return <p className="text-sm font-medium text-foreground">⏳ Pending — queued while offline (demo)</p>;
  return <p className="text-sm font-medium text-success">✓ Alert prepared (demo — not delivered)</p>;
}
