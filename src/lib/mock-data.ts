// All data in this file is DEMO data for the SheGuard frontend prototype.

export type Contact = {
  id: string;
  name: string;
  phone: string;
  relation: string;
  primary?: boolean;
  initials: string;
};

export type HistoryEvent = {
  id: string;
  type: "SOS Alert" | "Location Share" | "Risk Check";
  date: string; // ISO
  status: "Sent (demo)" | "Cancelled" | "Pending";
  locationAvailable: boolean;
  note: string;
};

export const demoUser = {
  name: "Sarah Khan",
  firstName: "Sarah",
  email: "sarah@gmail.com",
  phone: "+91 98765 43210",
};

export const demoLocation = {
  lat: 27.1651,
  lng: 81.9919,
  accuracy: "± 10 m",
  label: "Demo location (not your real position)",
};

export const initialContacts: Contact[] = [
  { id: "c1", name: "Mother", phone: "+91 98765 43210", relation: "Family", primary: true, initials: "M" },
  { id: "c2", name: "Sister", phone: "+91 87654 32109", relation: "Family", initials: "S" },
  { id: "c3", name: "Friend", phone: "+91 76543 21098", relation: "Friend", initials: "F" },
];

export const initialHistory: HistoryEvent[] = [
  { id: "h1", type: "SOS Alert", date: "2026-10-08T22:15:00", status: "Sent (demo)", locationAvailable: true, note: "Demo SOS triggered from dashboard." },
  { id: "h2", type: "SOS Alert", date: "2026-10-02T17:42:00", status: "Cancelled", locationAvailable: false, note: "Cancelled within confirmation window." },
  { id: "h3", type: "Location Share", date: "2026-09-29T20:05:00", status: "Sent (demo)", locationAvailable: true, note: "Live location shared for 1 hour." },
  { id: "h4", type: "Risk Check", date: "2026-09-25T21:30:00", status: "Sent (demo)", locationAvailable: true, note: "Risk level: Medium." },
  { id: "h5", type: "SOS Alert", date: "2026-09-20T23:10:00", status: "Pending", locationAvailable: true, note: "Queued while offline." },
];
