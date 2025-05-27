import { describe, it, expect } from "vitest";
import { handleTsumo } from "./index.ts";
import { SCORE } from "../../const/score.ts";
import type { ScoreMap } from "../../hooks/useScore.ts";
import type { ReachFlagsProps } from "../../hooks/useReachFlags.ts";

describe("handleTsumo", () => {
  const players = ["p1", "p2", "p3", "p4"];

  it("本場なしのときスコアを正しく更新する", () => {
    const initialScore: ScoreMap = [0, 0, 0, 0];
    const reachFlags: ReachFlagsProps = {
      0: false,
      1: false,
      2: false,
      3: false,
    };
    const result = handleTsumo(
      /* winner */ 0,
      /* points */ 1000,
      players,
      initialScore,
      reachFlags,
      /* countHonba */ 0,
      0,
    );
    // 親が1000点を3人から得る → +3000
    // 他は1000点ずつ失う → -1000
    expect(result).toEqual<[number, number, number, number]>([
      3000, -1000, -1000, -1000,
    ]);
  });

  it("立直フラグと本場数を考慮してスコアを更新する", () => {
    const initialScore: ScoreMap = [0, 0, 0, 0];
    const reachFlags: ReachFlagsProps = {
      0: false,
      1: true,
      2: false,
      3: false,
    };
    const honba = 1;
    const result = handleTsumo(
      /* winner */ 0,
      /* points */ 1000,
      players,
      initialScore,
      reachFlags,
      honba,
      0,
    );
    if (!result) return;
    const reachBonus = Object.values(reachFlags).filter(Boolean).length * 1000; // 立直ボーナス
    const honbaBonus = honba * SCORE.HONBA_300;
    const winnerGain = 1000 * (players.length - 1) + reachBonus + honbaBonus;
    const loserPenalty = -(1000 + honba * SCORE.HONBA_100);

    expect(result[0]).toBe(winnerGain);
    expect(result.slice(1)).toEqual([loserPenalty, loserPenalty, loserPenalty]);
  });

  it("全員立直かつ２本場、立直なし３本場", () => {
    const initialScore: ScoreMap = [10000, 12000, 15000, 8000];
    // 全員立直
    const allReach: ReachFlagsProps = { 0: true, 1: true, 2: true, 3: true };
    expect(handleTsumo(2, 500, players, initialScore, allReach, 2, 0)).toEqual([
      9300, 11300, 21100, 7300,
    ]);

    // 誰も立直なし
    const noReach: ReachFlagsProps = { 0: false, 1: false, 2: false, 3: false };
    expect(handleTsumo(1, 500, players, initialScore, noReach, 3, 0)).toEqual([
      9200, 14400, 14200, 7200,
    ]);
  });
});
