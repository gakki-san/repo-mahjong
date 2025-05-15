import { FC } from "react";
import { Box, Button, Checkbox, Stack } from "@chakra-ui/react";
import { COLOR } from "@/const/color";
import { Player } from "@/hooks/useScore";
import { ReachFlagsProps } from "@/hooks/useReachFlags";

type SelectTempaiModalProps = {
  playersName: string[];
  isTENPAI: ReachFlagsProps;
  toggleTenpai: (player: Player) => void;
  handleCloseTENPAIModal: () => void;
};
export const SelectTempaiModal: FC<SelectTempaiModalProps> = ({
  playersName,
  isTENPAI,
  toggleTenpai,
  handleCloseTENPAIModal,
}) => {
  return (
    <Box
      pos={"absolute"}
      top={0}
      alignItems={"center"}
      justifyContent={"center"}
      flexDir={"column"}
      display={"flex"}
      w={"100vw"}
      h={"100vh"}
      p={"50px"}
      bg={COLOR.WHITE}
    >
      誰がテンパイ？
      <Stack align="flex-start" flex="1" gap="4">
        {playersName.map((name, index) => {
          const player = index as Player;
          return (
            <Checkbox.Root
              mt={"20px"}
              key={index}
              checked={isTENPAI[player]}
              onChange={() => toggleTenpai(player)}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control color={COLOR.BLACK} />
              <Checkbox.Label>{name}</Checkbox.Label>
            </Checkbox.Root>
          );
        })}
      </Stack>
      <Button
        color={COLOR.WHITE}
        fontWeight={"bold"}
        bg={COLOR.BLACK}
        onClick={handleCloseTENPAIModal}
      >
        完了
      </Button>
    </Box>
  );
};
