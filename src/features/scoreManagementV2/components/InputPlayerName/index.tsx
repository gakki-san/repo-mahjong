import { COLOR } from "@/features/scoreManagementV2/const/color.ts";
import { Box, Button, Field, Fieldset, Flex, Input } from "@chakra-ui/react";
import { playerList } from "@/features/scoreManagementV2/const/playerList.ts";
import React, { FC } from "react";

type InputPlayerNameProps = {
  onPlayerNameChange: React.ChangeEventHandler<HTMLInputElement>;
  closeModal: () => void;
};

export const InputPlayerName: FC<InputPlayerNameProps> = ({
  onPlayerNameChange,
  closeModal,
}) => {
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

        <Button onClick={closeModal} type="submit">
          set
        </Button>
      </Fieldset.Root>
    </Flex>
  );
};
