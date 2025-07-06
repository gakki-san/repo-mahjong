import { describe, expect, it } from "vitest";
import { calcScoreForRon } from "./index";
import { ScoreMap } from "@/globalState/scoreAtom.ts";

describe("calcScoreForRon", () => {
  it("ロン: 和了者0が1から上がった場合", () => {
    const winner = 0;
    const score = [25000, 25000, 25000, 25000] as ScoreMap;
    const point = 8000;
    const loser = 1;
    expect(calcScoreForRon(score, loser, winner, point)).toEqual([
      33000, 17000, 25000, 25000,
    ]);
  });

  it("ロン: 和了者が親のパターン (親が振り込まれた場合)", () => {
    const winner = 1;
    const score = [20000, 30000, 25000, 25000] as ScoreMap;
    const point = 6000;
    const loser = 2;
    expect(calcScoreForRon(score, loser, winner, point)).toEqual([
      20000, 36000, 19000, 25000,
    ]);
  });

  it("ロン: 和了者3が親から上がった場合", () => {
    const winner = 3;
    const score = [30000, 20000, 25000, 25000] as ScoreMap;
    const point = 10000;
    const loser = 1;
    expect(calcScoreForRon(score, loser, winner, point)).toEqual([
      30000, 10000, 25000, 35000,
    ]);
  });
});
