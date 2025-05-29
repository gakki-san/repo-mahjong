import { FC } from "react";
import { Button } from "@chakra-ui/react";
import { COLOR } from "@/const/color";

type BackButtonProps = {
  handleBack: () => void;
};

export const BackButton: FC<BackButtonProps> = ({ handleBack }) => {
  return (
    <Button
      mt={"50px"}
      color={COLOR.BLACK}
      fontWeight={"bold"}
      bg={COLOR.WHITE}
      border={"solid"}
      borderColor={COLOR.BLACK}
      onClick={handleBack}
      paddingInline={"50px"}
    >
      戻る
    </Button>
  );
};
