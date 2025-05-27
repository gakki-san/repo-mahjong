import { ChangeEventHandler, FC } from "react";
import { Box, Button, Field, Fieldset, Flex, Input } from "@chakra-ui/react";
import { COLOR } from "@/features/scoreManagement/const/color";

type PlayerList = {
  name: string;
  placeHolder: string;
};

type InputPlayerNameProps = {
  playerList: PlayerList[];
  handleSetPlayerName: ChangeEventHandler<HTMLInputElement>;
  closeModal: () => void;
};

export const InputPlayerName: FC<InputPlayerNameProps> = ({
  playerList,
  handleSetPlayerName,
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
                  onChange={handleSetPlayerName}
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
