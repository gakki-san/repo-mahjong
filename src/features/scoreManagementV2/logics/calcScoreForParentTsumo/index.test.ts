import { describe, expect, it } from "vitest";
import { ScoreMap } from "@/features/scoreManagementV2/hooks/useScore.ts";
import { calcScoreForParentTsumo } from "@/features/scoreManagementV2/logics/calcScoreForParentTsumo/index.ts";

describe("parentWinForTsumo", () => {
  it("和了者と親が同じ", () => {
    const winner = 1;
    const score = [21000, 28000, 23000, 28000] as ScoreMap;
    const point = 4000;
    expect(calcScoreForParentTsumo(score, winner, point)).toEqual([
      17000, 40000, 19000, 24000,
    ]);
  });

  it("和了者と親が同じ", () => {
    const winner = 1;
    const score = [25000, 25000, 25000, 25000] as ScoreMap;
    const point = 1000;
    expect(calcScoreForParentTsumo(score, winner, point)).toEqual([
      24000, 28000, 24000, 24000,
    ]);
  });
});
