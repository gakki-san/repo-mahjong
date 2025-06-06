export const RULE_OPTIONS = {
  START_SCORE: [25000, 35000],
  RETURN_POINT: [25000, 30000],
  UMA_RULE: [
    { value: 0, label: "5-10" },
    { value: 1, label: "10-20" },
    { value: 2, label: "10-30" },
    { value: 3, label: "20-30" },
  ],
};

export const SELECT_FIELDS_CONFIG = [
  {
    id: "startingScore",
    options: RULE_OPTIONS.START_SCORE,
    placeholder: "持ち点を選択してください",
    name: "startingScore" as const,
  },
  {
    id: "returnPoint",
    options: RULE_OPTIONS.RETURN_POINT,
    placeholder: "返す点数を選択してください",
    name: "returnPoint" as const,
  },
  {
    id: "umaRule",
    options: RULE_OPTIONS.UMA_RULE,
    placeholder: "ウマを選択してください",
    name: "umaRule" as const,
  },
];
