import { describe, expect, it } from "vitest";
import { assessRisk } from "@/lib/risk";

describe("assessRisk", () => {
  it("is LOW with no or one yes", () => {
    expect(assessRisk({}).level).toBe("LOW");
    expect(assessRisk({ night: true }).level).toBe("LOW");
  });
  it("is MEDIUM with two yes answers", () => {
    expect(assessRisk({ alone: true, unfamiliar: true }).level).toBe("MEDIUM");
  });
  it("is HIGH when being followed", () => {
    expect(assessRisk({ followed: true }).level).toBe("HIGH");
  });
});
