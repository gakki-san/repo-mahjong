import { useAtom } from "jotai";
import {
  RankOrderRuleAtom,
  rankScoreRuleAtom,
} from "@/globalState/rankOrderRuleAtom.ts";

type RankOrderRuleReturn = [
  RankOrderRuleAtom | null,
  (num: RankOrderRuleAtom) => void,
];

export const useRankOrderRule = (): RankOrderRuleReturn => {
  const [rankOrderRule, setRankOrderRule] = useAtom(rankScoreRuleAtom);

  const handleSet = (num: RankOrderRuleAtom) => {
    setRankOrderRule(num);
  };
  return [rankOrderRule, handleSet];
};
