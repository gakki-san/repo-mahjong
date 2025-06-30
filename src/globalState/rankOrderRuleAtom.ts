import { atomWithStorage } from "jotai/utils";

export type RankOrderRuleAtom = "5-10" | "10-20" | "10-30" | "20-30";

export const rankScoreRuleAtom = atomWithStorage<RankOrderRuleAtom | null>(
  "rankOrderRule",
  null,
);
