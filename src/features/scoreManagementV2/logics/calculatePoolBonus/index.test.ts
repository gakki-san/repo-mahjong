import { describe, expect, it } from "vitest";
import { calculatePoolBonus } from "./index";
import { ScoreMap } from "@/features/scoreManagementV2/hooks/useScore.ts";

describe("calculatePoolBonus", () => {
  const score = [25000, 25000, 25000, 25000] as ScoreMap;
  it("供託をscoreに反映される", () => {
    const poolBonus = 1;
    const winner = 0;
    expect(calculatePoolBonus(score, poolBonus, winner)).toEqual([
      26000, 25000, 25000, 25000,
    ]);
  });

  it("winnerが他のプレイヤーでも正しく加算される", () => {
    const poolBonus = 2;
    const winner = 3;
    expect(calculatePoolBonus(score, poolBonus, winner)).toEqual([
      25000, 25000, 25000, 27000,
    ]);
  });

  it("供託がなければ、scoreに変動はない", () => {
    const poolBonus = 0;
    const winner = 0;
    expect(calculatePoolBonus(score, poolBonus, winner)).toEqual([
      25000, 25000, 25000, 25000,
    ]);
  });
});
