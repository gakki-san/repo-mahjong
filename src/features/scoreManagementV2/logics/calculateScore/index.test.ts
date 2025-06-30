import { describe, expect, it } from "vitest";
import { calculateScore } from "@/features/scoreManagementV2/logics/calculateScore/index.ts";
import { ScoreMap } from "@/features/scoreManagementV2/hooks/useScore.ts";

describe("calculateWinnerScore", () => {
  const parent = 1;
  it("和了点数がscoreに反映される", () => {
    const winner = 0;
    const score = [25000, 25000, 25000, 25000] as ScoreMap;
    const point = 8000;
    const loser = null;
    expect(calculateScore({ winner, score, point, parent, loser })).toEqual([
      33000, 21000, 23000, 23000,
    ]);
  });

  it("和了者と親が同じ", () => {
    const winner = 1;
    const score = [21000, 28000, 23000, 28000] as ScoreMap;
    const point = 4000;
    const loser = null;
    expect(calculateScore({ winner, score, point, parent, loser })).toEqual([
      17000, 40000, 19000, 24000,
    ]);
  });

  it("和了者2のみ点数が加算される", () => {
    const winner = 2;
    const score = [26000, 24000, 18000, 32000] as ScoreMap;
    const point = 10000;
    const loser = null;
    expect(calculateScore({ winner, score, point, parent, loser })).toEqual([
      23500, 19000, 28000, 29500,
    ]);
  });

  it("和了者3のみ点数が加算される", () => {
    const winner = 3;
    const score = [30000, 20000, 25000, 25000] as ScoreMap;
    const point = 12000;
    const loser = null;
    expect(calculateScore({ winner, score, point, parent, loser })).toEqual([
      27000, 14000, 22000, 37000,
    ]);
  });

  it("子供のツモで綺麗に割れない時", () => {
    const winner = 2;
    const score: ScoreMap = [25000, 25000, 25000, 25000];
    const point = 1100;
    const loser = null;
    expect(calculateScore({ winner, score, point, parent, loser })).toEqual([
      24700, 24500, 26100, 24700,
    ]);
  });

  it("winnerがnullのときはそのままscoreを返す", () => {
    const winner = null;
    const score = [25000, 25000, 25000, 25000] as ScoreMap;
    const point = 8000;
    const loser = null;
    expect(calculateScore({ winner, score, point, parent, loser })).toEqual([
      25000, 25000, 25000, 25000,
    ]);
  });

  it("pointがnullのときはそのままscoreを返す", () => {
    const winner = 0;
    const score = [25000, 25000, 25000, 25000] as ScoreMap;
    const point = null;
    const loser = null;
    expect(calculateScore({ winner, score, point, parent, loser })).toEqual([
      25000, 25000, 25000, 25000,
    ]);
  });

  it("ロン: 和了者0が1から上がった場合", () => {
    const winner = 0;
    const score = [25000, 25000, 25000, 25000] as ScoreMap;
    const point = 8000;
    const loser = 1;
    expect(calculateScore({ winner, score, point, parent, loser })).toEqual([
      33000, 17000, 25000, 25000,
    ]);
  });

  it("ロン: 和了者が親のパターン (親が振り込まれた場合)", () => {
    const winner = 1;
    const score = [20000, 30000, 25000, 25000] as ScoreMap;
    const point = 6000;
    const loser = 2;
    expect(calculateScore({ winner, score, point, parent, loser })).toEqual([
      20000, 36000, 19000, 25000,
    ]);
  });

  it("ロン: 和了者3が親から上がった場合", () => {
    const winner = 3;
    const score = [30000, 20000, 25000, 25000] as ScoreMap;
    const point = 10000;
    const loser = 1;
    expect(calculateScore({ winner, score, point, parent, loser })).toEqual([
      30000, 10000, 25000, 35000,
    ]);
  });
});
