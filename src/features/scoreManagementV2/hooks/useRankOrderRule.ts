import { useAtom } from "jotai";
import {
  RankOrderRule,
  rankScoreRuleAtom,
} from "@/globalState/rankOrderRule.ts";

type RankOrderRuleReturn = [RankOrderRule | null, (num: RankOrderRule) => void];

export const useRankOrderRule = (): RankOrderRuleReturn => {
  const [rankOrderRule, setRankOrderRule] = useAtom(rankScoreRuleAtom);

  const handleSet = (num: RankOrderRule) => {
    setRankOrderRule(num);
  };
  return [rankOrderRule, handleSet];
};
