import { describe, expect, it } from "vitest";
import { calcScoreForChildrenTsumo } from "./index";
import { ScoreMap } from "@/globalState/scoreAtom.ts";

describe("calcScoreForChildrenTsumo", () => {
  const parent = 1;
  it("和了者2のみ点数が加算される", () => {
    const winner = 2;
    const score = [26000, 24000, 18000, 32000] as ScoreMap;
    const point = 10000;
    expect(calcScoreForChildrenTsumo(score, winner, point, parent)).toEqual([
      23500, 19000, 28000, 29500,
    ]);
  });

  it("和了者3のみ点数が加算される", () => {
    const winner = 3;
    const score = [30000, 20000, 25000, 25000] as ScoreMap;
    const point = 12000;
    expect(calcScoreForChildrenTsumo(score, winner, point, parent)).toEqual([
      27000, 14000, 22000, 37000,
    ]);
  });

  it("子供のツモで綺麗に割れない時", () => {
    const winner = 2;
    const score: ScoreMap = [25000, 25000, 25000, 25000];
    const point = 1100;
    expect(calcScoreForChildrenTsumo(score, winner, point, parent)).toEqual([
      24700, 24500, 26100, 24700,
    ]);
  });
});
