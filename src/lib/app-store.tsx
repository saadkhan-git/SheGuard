import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { initialContacts, initialHistory, type Contact, type HistoryEvent } from "./mock-data";

export type Settings = {
  notifications: boolean;
  location: boolean;
  shake: boolean;
  darkMode: boolean;
  shareHistory: boolean;
  language: string;
};

type Store = {
  contacts: Contact[];
  setContacts: (c: Contact[]) => void;
  history: HistoryEvent[];
  setHistory: (h: HistoryEvent[]) => void;
  addHistory: (e: Omit<HistoryEvent, "id">) => void;
  settings: Settings;
  setSetting: <K extends keyof Settings>(k: K, v: Settings[K]) => void;
  online: boolean;
  setOnline: (v: boolean) => void;
  pending: number;
  setPending: (n: number) => void;
};

const Ctx = createContext<Store | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [contacts, setContacts] = useState(initialContacts);
  const [history, setHistory] = useState(initialHistory);
  const [online, setOnline] = useState(true);
  const [pending, setPending] = useState(0);
  const [settings, setSettings] = useState<Settings>({
    notifications: true,
    location: true,
    shake: true,
    darkMode: false,
    shareHistory: true,
    language: "English",
  });
  useEffect(() => {
    document.documentElement.classList.toggle("dark", settings.darkMode);
  }, [settings.darkMode]);
  return (
    <Ctx.Provider
      value={{
        contacts,
        setContacts,
        history,
        setHistory,
        addHistory: (e) => setHistory((h) => [{ ...e, id: crypto.randomUUID() }, ...h]),
        settings,
        setSetting: (k, v) => setSettings((s) => ({ ...s, [k]: v })),
        online,
        setOnline,
        pending,
        setPending,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAppStore() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAppStore must be used within AppStoreProvider");
  return c;
}
