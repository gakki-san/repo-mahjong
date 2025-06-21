import { describe, expect, it } from "vitest";
import { calculateScore } from "@/features/scoreManagementV2/logics/calculateScore/index.ts";
import { ScoreMap } from "@/features/scoreManagementV2/hooks/useScore.ts";

describe("calculateWinnerScore", () => {
  const parent = 1;
  it("和了点数がscoreに反映される", () => {
    const winner = 0;
    const score = [25000, 25000, 25000, 25000] as ScoreMap;
    const point = 8000;
    expect(calculateScore(winner, score, point, parent)).toEqual([
      33000, 21000, 23000, 23000,
    ]);
  });

  it("和了者と親が同じ", () => {
    const winner = 1;
    const score = [21000, 28000, 23000, 28000] as ScoreMap;
    const point = 6000;
    expect(calculateScore(winner, score, point, parent)).toEqual([
      19000, 34000, 21000, 26000,
    ]);
  });

  it("和了者2のみ点数が加算される", () => {
    const winner = 2;
    const score = [26000, 24000, 18000, 32000] as ScoreMap;
    const point = 10000;
    expect(calculateScore(winner, score, point, parent)).toEqual([
      23500, 19000, 28000, 29500,
    ]);
  });

  it("和了者3のみ点数が加算される", () => {
    const winner = 3;
    const score = [30000, 20000, 25000, 25000] as ScoreMap;
    const point = 12000;
    expect(calculateScore(winner, score, point, parent)).toEqual([
      27000, 14000, 22000, 37000,
    ]);
  });

  it("winnerがnullのときはundefinedを返す", () => {
    const winner = null;
    const score = [25000, 25000, 25000, 25000] as ScoreMap;
    const point = 8000;
    expect(calculateScore(winner, score, point, parent)).toEqual(undefined);
  });

  it("pointがnullのときはundefinedを返す", () => {
    const winner = 0;
    const score = [25000, 25000, 25000, 25000] as ScoreMap;
    const point = null;
    expect(calculateScore(winner, score, point, parent)).toEqual(undefined);
  });
});
