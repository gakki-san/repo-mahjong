import { describe, expect, it } from "vitest";
import { calculateRoundBonusToScore } from "./index";
import { ScoreMap } from "@/features/scoreManagementV2/hooks/useScore.ts";

describe("calculateRoundBonusToScore", () => {
  const initialScore: ScoreMap = [25000, 25000, 25000, 25000];

  it("本場が1でloserがいる場合はloserから本場分を引く", () => {
    const roundBonus = 1;
    const winner = 0;
    const loser = 1;
    expect(
      calculateRoundBonusToScore(initialScore, roundBonus, winner, loser),
    ).toEqual([25300, 24700, 25000, 25000]);
  });

  it("3本場でloserがいる場合はloserから本場分を引く", () => {
    const roundBonus = 3;
    const winner = 0;
    const loser = 1;
    expect(
      calculateRoundBonusToScore(initialScore, roundBonus, winner, loser),
    ).toEqual([25900, 24100, 25000, 25000]);
  });

  it("loserがnullの時はwinner以外の全員から本場分を引く", () => {
    const roundBonus = 1;
    const winner = 0;
    const loser = null;
    expect(
      calculateRoundBonusToScore(initialScore, roundBonus, winner, loser),
    ).toEqual([25300, 24900, 24900, 24900]);
  });

  it("loserがnullで2本場のとき", () => {
    const roundBonus = 2;
    const winner = 0;
    const loser = null;
    expect(
      calculateRoundBonusToScore(initialScore, roundBonus, winner, loser),
    ).toEqual([25600, 24800, 24800, 24800]);
  });

  it("本場が0ならスコアは変わらない (loserあり)", () => {
    const roundBonus = 0;
    const winner = 0;
    const loser = 1;
    expect(
      calculateRoundBonusToScore(initialScore, roundBonus, winner, loser),
    ).toEqual(initialScore);
  });

  it("本場が0ならスコアは変わらない (loserなし)", () => {
    const roundBonus = 0;
    const winner = 0;
    const loser = null;
    expect(
      calculateRoundBonusToScore(initialScore, roundBonus, winner, loser),
    ).toEqual(initialScore);
  });
});
