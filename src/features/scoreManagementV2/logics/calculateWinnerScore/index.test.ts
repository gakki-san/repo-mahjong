import { describe, expect, it } from "vitest";
import { calculateWinnerScore } from "@/features/scoreManagementV2/logics/calculateWinnerScore/index.ts";
import { ScoreMap } from "@/features/scoreManagementV2/hooks/useScore.ts";

describe("calculateWinnerScore", () => {
  it("和了点数がscoreに反映される", () => {
    const winner = 0;
    const score = [25000, 25000, 25000, 25000] as ScoreMap;
    const point = 8000;
    expect(calculateWinnerScore(winner, score, point)).toEqual([
      33000, 25000, 25000, 25000,
    ]);
  });

  it("和了者1のみ点数が加算される", () => {
    const winner = 1;
    const score = [21000, 28000, 23000, 28000] as ScoreMap;
    const point = 6000;
    expect(calculateWinnerScore(winner, score, point)).toEqual([
      21000, 34000, 23000, 28000,
    ]);
  });

  it("和了者2のみ点数が加算される", () => {
    const winner = 2;
    const score = [26000, 24000, 18000, 32000] as ScoreMap;
    const point = 10000;
    expect(calculateWinnerScore(winner, score, point)).toEqual([
      26000, 24000, 28000, 32000,
    ]);
  });

  it("和了者3のみ点数が加算される", () => {
    const winner = 3;
    const score = [30000, 20000, 25000, 25000] as ScoreMap;
    const point = 5000;
    expect(calculateWinnerScore(winner, score, point)).toEqual([
      30000, 20000, 25000, 30000,
    ]);
  });
});
