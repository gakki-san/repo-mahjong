// src/logic/countReachPlayers.spec.ts
import { describe, it, expect } from "vitest";
import { countReachPlayers } from "../../logic/countReachPlayers";
import type { ReachFlagsProps } from "../../hooks/useReachFlags";

describe("countReachPlayers", () => {
  it("returns 0 when no one is in Reach", () => {
    const flags: ReachFlagsProps = { 0: false, 1: false, 2: false, 3: false };
    expect(countReachPlayers(flags)).toBe(0);
  });

  it("returns 1 when exactly one player is in Reach", () => {
    const flags: ReachFlagsProps = { 0: true, 1: false, 2: false, 3: false };
    expect(countReachPlayers(flags)).toBe(1);
  });

  it("returns correct count with a mix of true/false", () => {
    const flags: ReachFlagsProps = { 0: true, 1: true, 2: false, 3: true };
    expect(countReachPlayers(flags)).toBe(3);
  });

  it("returns 4 when all players are in Reach", () => {
    const flags: ReachFlagsProps = { 0: true, 1: true, 2: true, 3: true };
    expect(countReachPlayers(flags)).toBe(4);
  });
});
