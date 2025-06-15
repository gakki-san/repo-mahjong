import { COLOR } from "@/features/scoreManagementV2/const/color.ts";
import { Box, Button, Field, Fieldset, Flex, Input } from "@chakra-ui/react";
import { playerList } from "@/features/scoreManagementV2/const/playerList.ts";
import { FC } from "react";
import { usePlayerName } from "@/features/scoreManagementV2/hooks/usePlayerName.ts";
import { NavLink } from "react-router";

export const InputPlayerName: FC = () => {
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

        <NavLink to={"/setup/inputrule"}>
          <Button>次へ</Button>
        </NavLink>
      </Fieldset.Root>
    </Flex>
  );
};
