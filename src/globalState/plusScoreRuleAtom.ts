import { atom } from "jotai";

type PlusScoreRule = 25000 | 30000;

export const plusScoreRuleAtom = atom<PlusScoreRule | null>(null);
