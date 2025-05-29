import { describe, expect, it } from "vitest";
import { genarateArrayDirection } from "./index";

describe("genarateArrayDirection", () => {
  it("Add a logic explanation", () => {
    expect(genarateArrayDirection(0)).toEqual([0, 1, 2, 3]);
    expect(genarateArrayDirection(1)).toEqual([1, 2, 3, 0]);
    expect(genarateArrayDirection(2)).toEqual([2, 3, 0, 1]);
    expect(genarateArrayDirection(3)).toEqual([3, 0, 1, 2]);
  });
});
