import { FC } from "react";
import { Checkbox, Flex, Stack } from "@chakra-ui/react";
import { ReachFlags } from "../../hooks/useReachFlags";
import { Player } from "../../hooks/useScore";
import { COLOR } from "../../const/color";
import { DecisionButton } from "@/features/scoreManagementV2/components/DecisionButton";
import { BackButton } from "@/features/scoreManagementV2/components/BackButton";
import { ModalView } from "@/features/scoreManagementV2/components/ModalView";

type SelectTempaiModalProps = {
  playersName: string[];
  isTEMPAI: ReachFlags;
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
    <ModalView height={"70%"} mt={10}>
      誰がテンパイ？
      <Stack align="flex-center" flex="1" gap="1">
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
    </ModalView>
  );
};
