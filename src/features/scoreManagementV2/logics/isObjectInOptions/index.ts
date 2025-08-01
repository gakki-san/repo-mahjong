type Options = {
  value: number;
  label: string;
};

export const isObjectInOptions = (
  arr: number[] | Options[],
): arr is Options[] => {
  return (
    Array.isArray(arr) &&
    arr.length > 0 &&
    typeof arr[0] === "object" &&
    "value" in arr[0] &&
    "label" in arr[0]
  );
};
