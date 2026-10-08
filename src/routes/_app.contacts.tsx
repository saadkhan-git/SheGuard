import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Pencil, Trash2, Plus, Star, UserPlus } from "lucide-react";
import { Panel, PageTitle } from "@/components/sheguard/AppShell";
import { DemoBadge } from "@/components/sheguard/Brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppStore } from "@/lib/app-store";
import type { Contact } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/contacts")({
  head: () => ({
    meta: [
      { title: "Trusted Contacts — SheGuard" },
      { name: "description", content: "Manage the trusted contacts SheGuard alerts in an emergency." },
      { property: "og:title", content: "Trusted Contacts — SheGuard" },
      { property: "og:description", content: "Add, edit and remove your trusted circle." },
    ],
  }),
  component: ContactsPage,
});

const empty = { name: "", phone: "", relation: "Family" };

function ContactsPage() {
  const { contacts, setContacts } = useAppStore();
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(empty);
  const [err, setErr] = useState<Partial<Record<"name" | "phone", string>>>({});
  const [del, setDel] = useState<Contact | null>(null);

  const openForm = (c?: Contact) => {
    setEditId(c?.id ?? null);
    setForm(c ? { name: c.name, phone: c.phone, relation: c.relation } : empty);
    setErr({});
    setOpen(true);
  };
  const save = (e: React.FormEvent) => {
    e.preventDefault();
    const n: Partial<Record<"name" | "phone", string>> = {};
    if (!form.name.trim()) n.name = "Name is required.";
    if (form.phone.replace(/\D/g, "").length < 10) n.phone = "Enter a valid 10-digit phone number.";
    setErr(n);
    if (Object.keys(n).length) return;
    const initials = (form.name.trim()[0] ?? "?").toUpperCase();
    if (editId) setContacts(contacts.map((c) => (c.id === editId ? { ...c, ...form, initials } : c)));
    else setContacts([...contacts, { id: crypto.randomUUID(), ...form, initials, primary: contacts.length === 0 }]);
    toast.success(editId ? "Contact updated" : "Contact added (this session only)");
    setOpen(false);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <PageTitle title="Trusted Contacts" subtitle="People who receive your SOS alerts." action={<Button onClick={() => openForm()}><Plus /> Add Contact</Button>} />
      <DemoBadge className="mb-4" />
      {contacts.length === 0 ? (
        <Panel className="flex flex-col items-center py-12 text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-primary-soft text-primary"><UserPlus className="h-7 w-7" /></span>
          <h2 className="mt-3 font-semibold">No trusted contacts yet</h2>
          <p className="text-sm text-muted-foreground">Add at least one person to notify in an emergency.</p>
          <Button className="mt-4" onClick={() => openForm()}>Add your first contact</Button>
        </Panel>
      ) : (
        <ul className="space-y-3">
          {contacts.map((c) => (
            <li key={c.id}>
              <Panel className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 p-4">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-primary-soft font-bold text-primary">{c.initials}</span>
                <div className="min-w-0">
                  <p className="flex items-center gap-2 truncate font-semibold">{c.name}
                    {c.primary && <span className="inline-flex items-center gap-1 rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-semibold text-primary"><Star className="h-3 w-3" /> Primary</span>}
                  </p>
                  <p className="truncate text-sm text-muted-foreground">{c.phone} · {c.relation}</p>
                </div>
                <div className="flex gap-1">
                  {!c.primary && <Button variant="ghost" size="icon" aria-label={`Make ${c.name} primary`} onClick={() => setContacts(contacts.map((x) => ({ ...x, primary: x.id === c.id })))}><Star /></Button>}
                  <Button variant="ghost" size="icon" aria-label={`Edit ${c.name}`} onClick={() => openForm(c)}><Pencil /></Button>
                  <Button variant="ghost" size="icon" aria-label={`Delete ${c.name}`} className="text-destructive" onClick={() => setDel(c)}><Trash2 /></Button>
                </div>
              </Panel>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogTitle>{editId ? "Edit contact" : "Add contact"}</DialogTitle>
          <DialogDescription>Stored only in this browser session.</DialogDescription>
          <form onSubmit={save} noValidate className="space-y-4">
            <div className="space-y-1.5"><Label htmlFor="cn">Name</Label><Input id="cn" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} aria-invalid={!!err.name} />{err.name && <p className="text-xs text-destructive">{err.name}</p>}</div>
            <div className="space-y-1.5"><Label htmlFor="cp">Phone</Label><Input id="cp" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} aria-invalid={!!err.phone} />{err.phone && <p className="text-xs text-destructive">{err.phone}</p>}</div>
            <div className="space-y-1.5"><Label>Relationship</Label>
              <Select value={form.relation} onValueChange={(v) => setForm({ ...form, relation: v })}>
                <SelectTrigger aria-label="Relationship"><SelectValue /></SelectTrigger>
                <SelectContent>{["Family", "Friend", "Partner", "Colleague", "Other"].map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2"><Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button type="submit">Save</Button></div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!del} onOpenChange={() => setDel(null)}>
        <DialogContent className="max-w-sm">
          <DialogTitle>Remove {del?.name}?</DialogTitle>
          <DialogDescription>They will no longer receive your SOS alerts.</DialogDescription>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDel(null)}>Cancel</Button>
            <Button variant="destructive" onClick={() => { setContacts(contacts.filter((c) => c.id !== del?.id)); toast("Contact removed"); setDel(null); }}>Remove</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
