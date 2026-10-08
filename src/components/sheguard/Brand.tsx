import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className, tagline = true, inverted = false }: { className?: string; tagline?: boolean; inverted?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
        <ShieldCheck className="h-5 w-5" aria-hidden />
      </span>
      <span className="min-w-0 leading-tight">
        <span className={cn("block text-lg font-extrabold", inverted ? "text-sidebar-accent-foreground" : "text-foreground")}>SheGuard</span>
        {tagline && <span className={cn("block text-[11px]", inverted ? "text-sidebar-foreground" : "text-muted-foreground")}>Your Safety, Our Priority</span>}
      </span>
    </div>
  );
}

export function BrandPanel() {
  return (
    <div className="bg-brand-panel relative hidden flex-col justify-between p-10 md:flex">
      <Logo />
      <div className="flex flex-col items-center text-center">
        <span className="grid h-28 w-28 place-items-center rounded-full bg-card/70 shadow-card">
          <span className="grid h-20 w-20 place-items-center rounded-3xl bg-primary text-primary-foreground">
            <ShieldCheck className="h-10 w-10" aria-hidden />
          </span>
        </span>
        <p className="mt-6 font-script text-3xl text-primary">Safe Women</p>
        <p className="font-script text-3xl text-primary">Stronger Communities</p>
      </div>
      <p className="text-xs text-muted-foreground">B.Tech CSE mini project · Frontend prototype</p>
    </div>
  );
}

export function DemoBadge({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full bg-warning-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-foreground", className)}>
      Demo data
    </span>
  );
}
