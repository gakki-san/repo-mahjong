import { FC } from "react";
import { Button } from "@chakra-ui/react";
import { COLOR } from "@/features/scoreManagement/const/color.ts";
import { ModalView } from "@/features/scoreManagementV2/components/ModalView";

type AlreadyReachModalProps = {
  resetReach: () => void;
  noResetReach: () => void;
};

export const AlreadyReachModal: FC<AlreadyReachModalProps> = ({
  resetReach,
  noResetReach,
}) => {
  return (
    <ModalView>
      貴様、既に立直しているな？ 立直取り消す？
      <Button
        mt={"20px"}
        color={COLOR.WHITE}
        bg={COLOR.BLACK}
        onClick={resetReach}
      >
        はい
      </Button>
      <Button
        mt={"20px"}
        color={COLOR.WHITE}
        bg={COLOR.BLACK}
        onClick={noResetReach}
      >
        いいえ
      </Button>
    </ModalView>
  );
};
