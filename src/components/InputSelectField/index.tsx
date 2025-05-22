import { COLOR } from "@/const/color";
import { Field, NativeSelect } from "@chakra-ui/react";
import { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { FormValues } from "../ScoreSelectPanel";

type InputSelectFieldProps = {
  errors: FieldErrors<FormValues>;
  register: UseFormRegister<FormValues>;
  options: number[] | Options[];
  placeholder: string;
  name: "startingScore" | "returnPoint" | "umaRule";
};

type Options = {
  value: number;
  label: string;
};

export const InputSelectField: FC<InputSelectFieldProps> = ({
  errors,
  register,
  options,
  placeholder,
  name,
}) => {
  const isObjectInOptions = (arr: number[] | Options[]): arr is Options[] => {
    return (
      Array.isArray(arr) &&
      arr.length > 0 &&
      typeof arr[0] === "object" &&
      "value" in arr[0] &&
      "label" in arr[0]
    );
  };
  return (
    <Field.Root invalid={!!errors[name]} display={"flex"} alignItems={"center"}>
      <NativeSelect.Root w="240px" size="md" bg={COLOR.WHITE}>
        <NativeSelect.Field
          {...register(name, { required: "必須です" })}
          placeholder={placeholder}
        >
          {isObjectInOptions(options)
            ? options.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))
            : options.map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
      <Field.ErrorText>{errors[name]?.message}</Field.ErrorText>
    </Field.Root>
  );
};
