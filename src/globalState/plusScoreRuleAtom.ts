import { atomWithStorage } from "jotai/utils";

export type PlusScoreRule = 25000 | 30000;

export const plusScoreRuleAtom = atomWithStorage<PlusScoreRule | null>(
  "plusScoreRule",
  null,
);
