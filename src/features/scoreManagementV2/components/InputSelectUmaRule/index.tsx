import { COLOR } from "../../const/color";
import { Field, NativeSelect } from "@chakra-ui/react";
import React, { FC } from "react";

type InputSelectFieldProps = {
  input: string;
  handleInputValue: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  option: Options[];
  placeholder: string;
  isSubmit: boolean;
};

type Options = {
  value: number;
  label: string;
};

export const InputSelectUmaRule: FC<InputSelectFieldProps> = ({
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
          {option.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
      <Field.ErrorText>必須項目です</Field.ErrorText>
    </Field.Root>
  );
};
