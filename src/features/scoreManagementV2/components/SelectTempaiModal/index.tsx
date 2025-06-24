import { FC } from "react";
import { Box, Checkbox, Flex, Stack } from "@chakra-ui/react";
import { ReachFlagsProps } from "../../hooks/useReachFlags";
import { Player } from "../../hooks/useScore";
import { COLOR } from "../../const/color";
import { DecisionButton } from "@/features/scoreManagementV2/components/DecisionButton";
import { BackButton } from "@/features/scoreManagementV2/components/BackButton";

type SelectTempaiModalProps = {
  playersName: string[];
  isTEMPAI: ReachFlagsProps;
  toggle: (player: Player) => void;
  handleDecide: () => void;
  handleBack: () => void;
};
export const SelectTempaiModal: FC<SelectTempaiModalProps> = ({
  playersName,
  isTEMPAI,
  toggle,
  handleDecide,
  handleBack,
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
              checked={isTEMPAI[player]}
              onChange={() => toggle(player)}
            >
              <Checkbox.HiddenInput />
              <Checkbox.Control
                color={COLOR.BLACK}
                backgroundColor={COLOR.WHITE}
              />
              <Checkbox.Label>{name}</Checkbox.Label>
            </Checkbox.Root>
          );
        })}
      </Stack>
      <Flex gap={"20px"}>
        <DecisionButton handleDecisionButton={handleDecide} />
        <BackButton handleBack={handleBack} />
      </Flex>
    </Box>
  );
};
