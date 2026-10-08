import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AlertTriangle, ShieldCheck, ShieldAlert } from "lucide-react";
import { Panel, PageTitle } from "@/components/sheguard/AppShell";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { assessRisk, riskActions, riskQuestions, type RiskLevel } from "@/lib/risk";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/risk")({
  head: () => ({
    meta: [
      { title: "Risk Check — SheGuard" },
      { name: "description", content: "Answer a few questions to see an illustrative risk level." },
      { property: "og:title", content: "Risk Check — SheGuard" },
      { property: "og:description", content: "Quick situational risk indication with safety tips." },
    ],
  }),
  component: RiskPage,
});

const style: Record<RiskLevel, { box: string; text: string; Icon: typeof ShieldCheck }> = {
  LOW: { box: "bg-success-soft", text: "text-success", Icon: ShieldCheck },
  MEDIUM: { box: "bg-warning-soft", text: "text-warning", Icon: AlertTriangle },
  HIGH: { box: "bg-primary-soft", text: "text-destructive", Icon: ShieldAlert },
};

function RiskPage() {
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [result, setResult] = useState<ReturnType<typeof assessRisk> | null>(null);
  const complete = riskQuestions.every((q) => q.id in answers);

  if (result) {
    const s = style[result.level];
    return (
      <div className="mx-auto max-w-xl">
        <PageTitle title="Risk Result" subtitle="Illustrative, rule-based result — not an AI prediction." />
        <Panel className={cn("border-0", s.box)}>
          <div className="flex items-center gap-3">
            <s.Icon className={cn("h-10 w-10", s.text)} aria-hidden />
            <p className="text-xl font-bold">Risk Level: <span className={s.text}>{result.level}</span></p>
          </div>
          <h2 className="mt-5 font-semibold">Reasons</h2>
          <ul className="mt-1 list-inside list-disc text-sm">
            {result.reasons.length ? result.reasons.map((r) => <li key={r}>{r}</li>) : <li>No risk factors reported</li>}
          </ul>
          <h2 className="mt-5 font-semibold">Suggested Actions</h2>
          <ul className="mt-2 grid gap-2">
            {riskActions[result.level].map((a) => <li key={a} className="rounded-lg bg-card px-3 py-2 text-sm shadow-card">{a}</li>)}
          </ul>
        </Panel>
        <Button className="mt-5 w-full" onClick={() => { setResult(null); setAnswers({}); }}>Reassess</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <PageTitle title="Risk Indication" subtitle="Answer a few questions to check your risk level." />
      <Panel>
        <ol className="space-y-5">
          {riskQuestions.map((q, i) => (
            <li key={q.id}>
              <p className="font-medium">{i + 1}. {q.q}</p>
              <RadioGroup
                className="mt-2 flex gap-6"
                value={q.id in answers ? (answers[q.id] ? "yes" : "no") : ""}
                onValueChange={(v) => setAnswers({ ...answers, [q.id]: v === "yes" })}
                aria-label={q.q}
              >
                {["yes", "no"].map((v) => (
                  <div key={v} className="flex items-center gap-2">
                    <RadioGroupItem id={`${q.id}-${v}`} value={v} />
                    <Label htmlFor={`${q.id}-${v}`} className="capitalize">{v}</Label>
                  </div>
                ))}
              </RadioGroup>
            </li>
          ))}
        </ol>
        <Button className="mt-6 w-full" disabled={!complete} onClick={() => setResult(assessRisk(answers))}>Check Risk</Button>
        {!complete && <p className="mt-2 text-center text-xs text-muted-foreground">Answer all questions to continue</p>}
      </Panel>
    </div>
  );
}
