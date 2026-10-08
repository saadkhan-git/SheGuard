import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { BrandPanel, Logo } from "@/components/sheguard/Brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — SheGuard" },
      { name: "description", content: "Log in to your SheGuard account." },
      { property: "og:title", content: "Login — SheGuard" },
      { property: "og:description", content: "Welcome back to SheGuard." },
    ],
  }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState<{ email?: string; pw?: string }>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const n: typeof err = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) n.email = "Enter a valid email address.";
    if (pw.length < 6) n.pw = "Password must be at least 6 characters.";
    setErr(n);
    if (Object.keys(n).length) return;
    toast.success("Logged in (demo — no real authentication)");
    nav({ to: "/dashboard" });
  };

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <BrandPanel />
      <div className="flex items-center justify-center bg-background p-6">
        <form onSubmit={submit} noValidate className="w-full max-w-sm space-y-5 rounded-2xl border bg-card p-7 shadow-card">
          <Logo className="md:hidden" />
          <div>
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-sm text-muted-foreground">Login to continue to your account</p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!err.email} />
            {err.email && <p className="text-xs text-destructive">{err.email}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pw">Password</Label>
            <div className="relative">
              <Input id="pw" type={show ? "text" : "password"} placeholder="Enter your password" value={pw} onChange={(e) => setPw(e.target.value)} aria-invalid={!!err.pw} className="pr-10" />
              <button type="button" onClick={() => setShow(!show)} aria-label={show ? "Hide password" : "Show password"} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground">
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {err.pw && <p className="text-xs text-destructive">{err.pw}</p>}
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2"><Checkbox /> Remember me</label>
            <button type="button" onClick={() => toast("Password reset is not available in this demo")} className="text-primary hover:underline">Forgot password?</button>
          </div>
          <Button type="submit" className="w-full">Login</Button>
          <p className="text-center text-sm text-muted-foreground">Don't have an account? <Link to="/register" className="font-medium text-primary">Register</Link></p>
        </form>
      </div>
    </div>
  );
}
