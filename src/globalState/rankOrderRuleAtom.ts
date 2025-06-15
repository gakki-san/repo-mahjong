import { atomWithStorage } from "jotai/utils";

export type RankOrderRuleAtom = 0 | 1 | 2 | 3;

export const rankScoreRuleAtom = atomWithStorage<RankOrderRuleAtom | null>(
  "rankOrderRule",
  null,
);
