import { FC } from "react";
import { Box, Button, Field, Fieldset, Flex, Input } from "@chakra-ui/react";
import { COLOR } from "@/features/scoreManagementV2/const/color.ts";
import { playerList } from "@/features/scoreManagementV2/const/playerList.ts";
import { usePlayerName } from "@/features/scoreManagementV2/hooks/usePlayerName.ts";

type InputPlayerNameProps = {
  onSubmit: () => void;
};

export const InputPlayerName: FC<InputPlayerNameProps> = ({ onSubmit }) => {
  const [, onPlayerNameChange] = usePlayerName();
  return (
    <Flex
      align={"center"}
      direction={"column"}
      w={"100vw"}
      h={"100vh"}
      color={COLOR.BLACK}
      fontWeight={"bold"}
      textAlign={"center"}
      bgColor={COLOR.GREEN_PRIMARY}
    >
      player名を入力してな
      <Fieldset.Root size="lg" maxW="md">
        <Fieldset.Content>
          <Field.Root>
            {playerList.map((player, index) => (
              <Box key={index} w={"100%"}>
                <Field.Label>{player.name}</Field.Label>
                <Input
                  name={player.name}
                  onChange={onPlayerNameChange}
                  placeholder={player.placeHolder}
                />
              </Box>
            ))}
          </Field.Root>
        </Fieldset.Content>
        <Button onClick={onSubmit}>次へ</Button>
      </Fieldset.Root>
    </Flex>
  );
};
