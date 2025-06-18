import { describe, expect, it } from "vitest";
import { calculateReachBonus } from "./index";
import { ScoreMap } from "@/features/scoreManagementV2/hooks/useScore.ts";

describe("calculateReachBonus", () => {
  it("立直分の点数を勝者scoreに反映させることができる", () => {
    const score: ScoreMap = [25000, 25000, 25000, 25000];
    const winner = 0;
    const countReachPlayer = 2;
    expect(calculateReachBonus(score, winner, countReachPlayer)).toEqual([
      27000, 25000, 25000, 25000,
    ]);
  });

  it("立直分の点数を勝者scoreに反映させることができる。winner別パターン", () => {
    const score: ScoreMap = [30000, 20000, 35000, 15000];
    const winner = 1;
    const countReachPlayer = 3;
    expect(calculateReachBonus(score, winner, countReachPlayer)).toEqual([
      30000, 23000, 35000, 15000,
    ]);
  });

  it("立直している人がいなければ、scoreに反映されない", () => {
    const score: ScoreMap = [25000, 25000, 25000, 25000];
    const winner = 1;
    const countReachPlayer = 0;
    expect(calculateReachBonus(score, winner, countReachPlayer)).toEqual([
      25000, 25000, 25000, 25000,
    ]);
  });
});
