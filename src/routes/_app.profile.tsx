import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, User, Users, SlidersHorizontal } from "lucide-react";
import { Panel, PageTitle } from "@/components/sheguard/AppShell";
import { Button } from "@/components/ui/button";
import { demoUser } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/profile")({
  head: () => ({
    meta: [
      { title: "Profile — SheGuard" },
      { name: "description", content: "Your SheGuard profile and preferences." },
      { property: "og:title", content: "Profile — SheGuard" },
      { property: "og:description", content: "Manage personal info and emergency contacts." },
    ],
  }),
  component: Profile,
});

function Profile() {
  const rows = [
    { label: "Personal Information", icon: User, to: "/profile" },
    { label: "Emergency Contacts", icon: Users, to: "/contacts" },
    { label: "Preferences", icon: SlidersHorizontal, to: "/settings" },
  ] as const;
  return (
    <div className="mx-auto max-w-md">
      <PageTitle title="Profile" />
      <Panel className="flex flex-col items-center text-center">
        <span className="grid h-24 w-24 place-items-center rounded-full bg-primary-soft text-3xl font-bold text-primary">SK</span>
        <p className="mt-3 text-lg font-bold">{demoUser.name}</p>
        <p className="text-sm text-muted-foreground">{demoUser.email}</p>
        <p className="text-sm text-muted-foreground">{demoUser.phone}</p>
        <Button variant="outline" size="sm" className="mt-3 text-primary" onClick={() => toast("Editing is disabled in this demo")}>Edit Profile</Button>
      </Panel>
      <Panel className="mt-4 p-2">
        {rows.map((r) => (
          <Link key={r.label} to={r.to} className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium hover:bg-muted">
            <r.icon className="h-4 w-4 text-primary" /> <span className="flex-1">{r.label}</span> <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Link>
        ))}
      </Panel>
    </div>
  );
}
