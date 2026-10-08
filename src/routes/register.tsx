import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { BrandPanel, Logo } from "@/components/sheguard/Brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create Account — SheGuard" },
      { name: "description", content: "Join SheGuard for a safer tomorrow." },
      { property: "og:title", content: "Create Account — SheGuard" },
      { property: "og:description", content: "Register for SheGuard and add your emergency contact." },
    ],
  }),
  component: Register,
});

const fields = [
  { id: "name", label: "Full Name", ph: "Enter your name", type: "text" },
  { id: "email", label: "Email Address", ph: "you@example.com", type: "email" },
  { id: "phone", label: "Phone Number", ph: "+91 98765 43210", type: "tel" },
  { id: "pw", label: "Password", ph: "Create a password", type: "password" },
  { id: "pw2", label: "Confirm Password", ph: "Confirm your password", type: "password" },
] as const;

function Register() {
  const nav = useNavigate();
  const [v, setV] = useState<Partial<Record<"name"|"email"|"phone"|"pw"|"pw2", string>>>({});
  const [err, setErr] = useState<Partial<Record<"name"|"email"|"phone"|"pw"|"pw2", string>>>({});
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const n: Partial<Record<"name"|"email"|"phone"|"pw"|"pw2", string>> = {};
    if (!v.name?.trim()) n.name = "Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(v.email ?? "")) n.email = "Enter a valid email.";
    if ((v.phone ?? "").replace(/\D/g, "").length < 10) n.phone = "Enter a 10-digit phone number.";
    if ((v.pw ?? "").length < 6) n.pw = "At least 6 characters.";
    if (v.pw !== v.pw2) n.pw2 = "Passwords do not match.";
    setErr(n);
    if (Object.keys(n).length) return;
    toast.success("Account created (demo only)");
    nav({ to: "/dashboard" });
  };
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setV({ ...v, [k]: e.target.value });

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <BrandPanel />
      <div className="flex items-center justify-center bg-background p-6">
        <form onSubmit={submit} noValidate className="w-full max-w-md space-y-4">
          <Logo className="md:hidden" />
          <div>
            <h1 className="text-2xl font-bold">Create Your Account</h1>
            <p className="text-sm text-muted-foreground">Join SheGuard for a safer tomorrow</p>
          </div>
          {fields.map((f) => (
            <div key={f.id} className="space-y-1.5">
              <Label htmlFor={f.id}>{f.label}</Label>
              <Input id={f.id} type={f.type} placeholder={f.ph} value={v[f.id] ?? ""} onChange={set(f.id)} aria-invalid={!!err[f.id]} />
              {err[f.id] && <p className="text-xs text-destructive">{err[f.id]}</p>}
            </div>
          ))}
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium">Emergency Contact (Optional)</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5"><Label htmlFor="ecn">Name</Label><Input id="ecn" placeholder="e.g. Mother" /></div>
              <div className="space-y-1.5"><Label htmlFor="ecp">Phone Number</Label><Input id="ecp" type="tel" placeholder="+91 98765 43210" /></div>
            </div>
          </fieldset>
          <Button type="submit" className="w-full">Register</Button>
          <p className="text-center text-sm text-muted-foreground">Already have an account? <Link to="/login" className="font-medium text-primary">Login</Link></p>
        </form>
      </div>
    </div>
  );
}
