import { describe, expect, it } from "vitest";
import { getWinnerIndexInRotateDirection } from "./index";
import { CurrentDirection } from "../../hooks/useCurrentDirection";
import { Player } from "../../hooks/useScore";

describe("getWinnerIndexInRotateDirection", () => {
  it("Add a logic explanation", () => {
    const base: CurrentDirection[] = [0, 1, 2, 3];
    expect(getWinnerIndexInRotateDirection(base, 0 as Player)).toBe(0);
    expect(getWinnerIndexInRotateDirection(base, 1 as Player)).toBe(1);
    expect(getWinnerIndexInRotateDirection(base, 2 as Player)).toBe(2);
    expect(getWinnerIndexInRotateDirection(base, 3 as Player)).toBe(3);

    const rot1: CurrentDirection[] = [1, 2, 3, 0];
    expect(getWinnerIndexInRotateDirection(rot1, 1 as Player)).toBe(0);
    expect(getWinnerIndexInRotateDirection(rot1, 2 as Player)).toBe(1);
    expect(getWinnerIndexInRotateDirection(rot1, 3 as Player)).toBe(2);
    expect(getWinnerIndexInRotateDirection(rot1, 0 as Player)).toBe(3);

    const rot2: CurrentDirection[] = [2, 3, 0, 1];
    expect(getWinnerIndexInRotateDirection(rot2, 2 as Player)).toBe(0);
    expect(getWinnerIndexInRotateDirection(rot2, 3 as Player)).toBe(1);
    expect(getWinnerIndexInRotateDirection(rot2, 0 as Player)).toBe(2);
    expect(getWinnerIndexInRotateDirection(rot2, 1 as Player)).toBe(3);

    const rot3: CurrentDirection[] = [3, 0, 1, 2];
    expect(getWinnerIndexInRotateDirection(rot3, 3 as Player)).toBe(0);
    expect(getWinnerIndexInRotateDirection(rot3, 0 as Player)).toBe(1);
    expect(getWinnerIndexInRotateDirection(rot3, 1 as Player)).toBe(2);
    expect(getWinnerIndexInRotateDirection(rot3, 2 as Player)).toBe(3);
  });
});
