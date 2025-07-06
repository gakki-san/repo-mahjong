import { describe, it, expect } from "vitest";
import { calculatePenalty } from "../../logics/calculatePenalty";
import type { ReachFlags } from "../../hooks/useReachFlags";
import { SCORE } from "../../const/score";
import { ScoreMap } from "@/globalState/scoreAtom.ts";

describe("calculatePenalty", () => {
  const baseScore: ScoreMap = [25000, 25000, 25000, 25000];

  it("returns unchanged score when tempaiCount is 0 or 4", () => {
    const emptyFlags: ReachFlags = {
      0: false,
      1: false,
      2: false,
      3: false,
    };
    const allFlags: ReachFlags = { 0: true, 1: true, 2: true, 3: true };
    expect(calculatePenalty(baseScore, 0, emptyFlags)).toEqual(baseScore);
    expect(calculatePenalty(baseScore, 4, allFlags)).toEqual(baseScore);
  });

  it("applies correct adjustments when tempaiCount is 1", () => {
    // only player 2 (index 1) is tenpai
    const flags: ReachFlags = { 0: false, 1: true, 2: false, 3: false };
    const result = calculatePenalty(baseScore, 1, flags);
    // gain = SCORE.TRIPLE, loss = -SCORE.SINGLE
    expect(result[1]).toBe(baseScore[1] + SCORE.TRIPLE);
    for (const i of [0, 2, 3]) {
      expect(result[i]).toBe(baseScore[i] - SCORE.SINGLE);
    }
  });

  it("applies correct adjustments when tempaiCount is 2", () => {
    // players 0 and 3 are tenpai
    const flags: ReachFlags = { 0: true, 1: false, 2: false, 3: true };
    const result = calculatePenalty(baseScore, 2, flags);
    // gain = SCORE.DOUBLE, loss = -SCORE.DOUBLE
    for (const i of [0, 3]) {
      expect(result[i]).toBe(baseScore[i] + SCORE.DOUBLE);
    }
    for (const i of [1, 2]) {
      expect(result[i]).toBe(baseScore[i] - SCORE.DOUBLE);
    }
  });

  it("applies correct adjustments when tempaiCount is 3", () => {
    // players 1,2,3 are tenpai
    const flags: ReachFlags = { 0: false, 1: true, 2: true, 3: true };
    const result = calculatePenalty(baseScore, 3, flags);
    // gain = SCORE.SINGLE, loss = -SCORE.TRIPLE
    for (const i of [1, 2, 3]) {
      expect(result[i]).toBe(baseScore[i] + SCORE.SINGLE);
    }
    expect(result[0]).toBe(baseScore[0] - SCORE.TRIPLE);
  });
});
