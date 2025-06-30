import { ScoreMap } from "@/globalState/scoreAtom.ts";

export const formatGameData = (playersName: string[], score: ScoreMap) => {
  return playersName.map((name, index) => {
    const raw = score[index] / 1000;
    const scoreValue = raw === 0 ? "0" : `${raw > 0 ? "+" : ""}${raw}`;
    return {
      id: (index + 1).toString(),
      name: name,
      score: scoreValue,
    };
  });
};
