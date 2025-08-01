import React, { FC } from "react";
import { Field, NativeSelect } from "@chakra-ui/react";
import { COLOR } from "@/features/scoreManagementV2/const/color.ts";

type InputSelectPointProps = {
  input: string;
  handleInputValue: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  option: number[];
  placeholder: string;
  isSubmit: boolean;
};

export const InputSelectPoint: FC<InputSelectPointProps> = ({
  input,
  handleInputValue,
  option,
  placeholder,
  isSubmit,
}) => {
  const isError = isSubmit && input === "";
  return (
    <Field.Root invalid={isError} width="240px">
      <NativeSelect.Root bg={COLOR.WHITE}>
        <NativeSelect.Field
          placeholder={placeholder}
          value={input}
          onChange={handleInputValue}
        >
          {option.map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
      <Field.ErrorText>必須項目です</Field.ErrorText>
    </Field.Root>
  );
};
