import {
  PlusScoreRule,
  plusScoreRuleAtom,
} from "@/globalState/plusScoreRuleAtom.ts";
import { useAtom } from "jotai";

type PlusScoreRuleReturn = [PlusScoreRule | null, (num: PlusScoreRule) => void];

export const usePlusScoreRule = (): PlusScoreRuleReturn => {
  const [plusScoreRule, setPlusScoreRule] = useAtom(plusScoreRuleAtom);

  const handleAdd = (num: PlusScoreRule) => {
    setPlusScoreRule(num);
  };

  return [plusScoreRule, handleAdd];
};
