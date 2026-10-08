// Illustrative rule-based risk scoring (not an AI/ML model).
export const riskQuestions = [
  { id: "alone", q: "Are you travelling alone?", reason: "Travelling alone" },
  { id: "night", q: "Is it late at night?", reason: "Late at night" },
  { id: "unfamiliar", q: "Are you in an unfamiliar area?", reason: "Unfamiliar location" },
  { id: "unsafe", q: "Do you feel unsafe?", reason: "Feeling unsafe" },
  { id: "followed", q: "Is someone following you?", reason: "Possibly being followed" },
] as const;

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export function assessRisk(answers: Record<string, boolean>): { level: RiskLevel; reasons: string[] } {
  const yes = riskQuestions.filter((q) => answers[q.id]);
  const reasons = yes.map((q) => q.reason);
  if (answers.followed || yes.length >= 4) return { level: "HIGH", reasons };
  if (yes.length >= 2) return { level: "MEDIUM", reasons };
  return { level: "LOW", reasons };
}

export const riskActions: Record<RiskLevel, string[]> = {
  LOW: ["Stay aware of your surroundings", "Keep your phone charged", "SheGuard is ready if needed"],
  MEDIUM: ["Stay in a well-lit area", "Inform a trusted contact", "Keep SOS ready"],
  HIGH: ["Move to a crowded, public place", "Start live location sharing", "Trigger SOS immediately if in danger"],
};
