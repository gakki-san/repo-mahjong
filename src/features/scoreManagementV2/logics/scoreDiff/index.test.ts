import { describe, expect, it } from "vitest";
import { calculateScoreDiff } from "./calculateScoreDiff.ts";

// この関数の目標
// 他プレイヤーの点数から自プレイヤーの点数を引いた点数を計算する。

describe("scoreDiff", () => {
  it("スコア配列1：自プレイヤーのスコアとの差を返す", () => {
    const score = [21000, 23000, 33000, 23000];
    expect(calculateScoreDiff(0, score)).toEqual([0, 2000, 12000, 2000]);
    expect(calculateScoreDiff(1, score)).toEqual([-2000, 0, 10000, 0]);
    expect(calculateScoreDiff(2, score)).toEqual([-12000, -10000, 0, -10000]);
    expect(calculateScoreDiff(3, score)).toEqual([-2000, 0, 10000, 0]);
  });

  it("スコア配列2：すべて異なる値", () => {
    const score = [28000, 26000, 24000, 22000];
    expect(calculateScoreDiff(0, score)).toEqual([0, -2000, -4000, -6000]);
  });

  it("スコア配列3", () => {
    const score = [27000, 29000, 18000, 26000];
    expect(calculateScoreDiff(2, score)).toEqual([9000, 11000, 0, 8000]);
  });

  it("スコア配列4：同点含む", () => {
    const score = [30000, 20000, 25000, 25000];
    expect(calculateScoreDiff(3, score)).toEqual([5000, -5000, 0, 0]);
  });
});
