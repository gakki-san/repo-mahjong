import { ComponentProps, FC } from "react";
import { Box, Button, Flex, NumberInput } from "@chakra-ui/react";
import { COLOR } from "@/const/color";

type InputChildrenTsumoProps = {
  handleChildrenPoint: ComponentProps<typeof NumberInput.Root>["onValueChange"];
  handleParentPoint: ComponentProps<typeof NumberInput.Root>["onValueChange"];
  handleSetScore: () => void;
  closeInputChildrenTsumoModal: () => void;
};

export const InputPointChildrenTsumo: FC<InputChildrenTsumoProps> = ({
  handleChildrenPoint,
  handleParentPoint,
  handleSetScore,
  closeInputChildrenTsumoModal,
}) => {
  const handleBack = () => {
    closeInputChildrenTsumoModal();
  };
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
      子
      <NumberInput.Root
        onValueChange={handleChildrenPoint}
        w={"200px"}
        margin={"10px 0px 40px 0px"}
        max={48000}
      >
        <NumberInput.Control />
        <NumberInput.Input />
      </NumberInput.Root>
      親
      <NumberInput.Root
        onValueChange={handleParentPoint}
        w={"200px"}
        max={48000}
        mt={"20px"}
      >
        <NumberInput.Control />
        <NumberInput.Input />
      </NumberInput.Root>
      <Flex gap={"20px"}>
        <Button
          textStyle="1xl"
          mt={"50px"}
          fontWeight="bold"
          onClick={handleSetScore}
          paddingInline={"50px"}
        >
          決定
        </Button>
        <Button
          mt={"50px"}
          color={COLOR.WHITE}
          fontWeight={"bold"}
          bg={COLOR.BLACK}
          onClick={handleBack}
          paddingInline={"50px"}
        >
          戻る
        </Button>
      </Flex>
    </Box>
  );
};
