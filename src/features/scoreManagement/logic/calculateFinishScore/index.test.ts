// tests/calculateFinishScore.test.ts
import { describe, it, expect } from "vitest";
import { calculateFinishScore } from "../../logic/calculateFinishScore";
import type { ScoreMap } from "../../hooks/useScore";

describe("calculateFinishScore (umaRule = 0, returnPoint = 30000)", () => {
  it("should handle a clear 1–4 ordering without ties", () => {
    const score: ScoreMap = [45000, 25000, 15000, 10000];
    const result = calculateFinishScore(score, 30000, 0);

    expect(result).toEqual<ScoreMap>([
      45000 - 30000 + 20000 + 10000,
      25000 - 30000 + 5000,
      15000 - 30000 - 5000,
      10000 - 30000 - 10000,
    ]);
    expect(result).toEqual<ScoreMap>([45000, 0, -20000, -30000]);
  });

  it("should handle a tie for 2nd/3rd place correctly", () => {
    const score: ScoreMap = [25000, 35000, 25000, 15000];
    const result = calculateFinishScore(score, 30000, 0);

    expect(result).toEqual<ScoreMap>([0, 35000, -10000, -25000]);
  });
});
