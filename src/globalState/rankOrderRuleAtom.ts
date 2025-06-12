import { atom } from "jotai";

export type RankOrderRuleAtom = 0 | 1 | 2 | 3;

export const rankScoreRuleAtom = atom<RankOrderRuleAtom | null>(null);
