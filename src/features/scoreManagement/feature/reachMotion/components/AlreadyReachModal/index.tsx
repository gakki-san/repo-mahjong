import { FC } from "react";
import { Box, Button } from "@chakra-ui/react";
import { COLOR } from "@/features/scoreManagement/const/color";

type AlreadyReachModalProps = {
  resetReach: () => void;
  noResetReach: () => void;
};

export const AlreadyReachModal: FC<AlreadyReachModalProps> = ({
  resetReach,
  noResetReach,
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
      bg={COLOR.GREEN_PRIMARY}
    >
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
    </Box>
  );
};
