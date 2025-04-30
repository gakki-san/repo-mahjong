import { describe, expect, it } from "vitest";
import { childrenTsumo } from "./index";

const winSouthResult = {
  east: 21000,
  south: 33000,
  west: 23000,
  north: 23000,
};

const winWestResult = {
  east: 21000,
  south: 23000,
  west: 33000,
  north: 23000,
};

const winNorthResult = {
  east: 21000,
  south: 23000,
  west: 23000,
  north: 33000,
};

const score = {
  east: 25000,
  south: 25000,
  west: 25000,
  north: 25000,
};

describe("childrenTsumo", () => {
  it("Add a logic explanation", () => {
    expect(childrenTsumo(2000, 4000, "south", score)).toEqual(winSouthResult);
    expect(childrenTsumo(2000, 4000, "west", score)).toEqual(winWestResult);
    expect(childrenTsumo(2000, 4000, "north", score)).toEqual(winNorthResult);
    // expect(childrenTsumo(2000, 4000, "east", score)).toBe(
    //   "親があがってるよー。最初に押すボタン間違えた？",
    // );
  });
});
