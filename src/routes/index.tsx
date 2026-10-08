import { createFileRoute, Link } from "@tanstack/react-router";
import { Siren, MapPin, Users, Smartphone, ShieldAlert, History, Heart } from "lucide-react";
import { Logo } from "@/components/sheguard/Brand";
import { Button } from "@/components/ui/button";
import hero from "@/assets/hero-woman.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SheGuard — Stay Safe, Stay Empowered" },
      { name: "description", content: "SheGuard is a smart companion for women's safety: one-tap SOS, live location and trusted contacts." },
      { property: "og:title", content: "SheGuard — Stay Safe, Stay Empowered" },
      { property: "og:description", content: "One-tap SOS, live location, trusted contacts and risk checks for women's safety." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Siren, label: "One-Tap SOS" },
  { icon: MapPin, label: "Live Location" },
  { icon: Users, label: "Trusted Contacts" },
  { icon: Smartphone, label: "Shake-to-Alert" },
  { icon: ShieldAlert, label: "Risk Indication" },
  { icon: History, label: "Emergency History" },
];

function Landing() {
  return (
    <div className="min-h-screen bg-hero">
      <header className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-5">
        <Logo />
        <nav className="flex items-center gap-6 text-sm font-medium">
          <a href="#features" className="hidden hover:text-primary md:inline">Features</a>
          <Link to="/login" className="hidden hover:text-primary sm:inline">Login</Link>
          <Button asChild variant="pill"><Link to="/register">Get Started</Link></Button>
        </nav>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-8 px-5 pb-10 pt-4 md:grid-cols-2 md:pt-10">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Stay Safe<br /><span className="text-primary">Stay Empowered</span>
          </h1>
          <p className="mt-5 max-w-md text-muted-foreground">
            <strong className="text-foreground">SheGuard</strong> is your smart companion for <strong className="text-foreground">women safety</strong>. Get instant help, share your <strong className="text-foreground">location</strong>, and stay connected with your <strong className="text-foreground">trusted circle</strong> — always.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="pill" size="lg"><Link to="/register">Get Started</Link></Button>
            <Button asChild variant="outline" size="lg" className="rounded-full"><a href="#features">Learn More</a></Button>
          </div>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-md">
          <div className="absolute inset-[8%] rounded-[45%_45%_50%_50%/35%_35%_65%_65%] border-[10px] border-primary/15 bg-primary-soft/60" aria-hidden />
          <img src={hero} alt="Woman walking confidently with SheGuard" width={1024} height={1024} className="relative h-full w-full object-contain" />
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-5 pb-12">
        <div className="grid grid-cols-2 gap-3 rounded-2xl border bg-card p-4 shadow-card sm:grid-cols-3 lg:grid-cols-6">
          {features.map((f) => (
            <div key={f.label} className="flex flex-col items-center gap-2 rounded-xl p-3 text-center">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-primary-soft text-primary"><f.icon className="h-5 w-5" aria-hidden /></span>
              <span className="text-sm font-semibold">{f.label}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t bg-card/60">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-6 text-sm text-muted-foreground">
          <span>© 2026 SheGuard · Smart Women Safety & Emergency Alert System</span>
          <span className="flex items-center gap-1 font-script text-xl text-primary">Because every woman deserves to feel safe <Heart className="h-4 w-4" aria-hidden /></span>
        </div>
      </footer>
    </div>
  );
}
