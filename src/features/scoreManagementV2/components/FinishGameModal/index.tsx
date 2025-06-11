import { FC } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { COLOR } from "../../const/color";

type FinishGameModalProps = {
  gameData: GameData[];
  handleBack: () => void;
};

type GameData = {
  id: string;
  name: string;
  score: string;
};

export const FinishGameModal: FC<FinishGameModalProps> = ({
  gameData,
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
      <Box mb={"20px"} fontSize={"30px"} fontWeight={"bold"}>
        終局結果
      </Box>
      {gameData.map((item) => (
        <Flex
          key={item.id}
          justify={"space-between"}
          gap={"10px"}
          w={"150px"}
          mt={"10px"}
          fontSize={"20px"}
          textAlign={"center"}
        >
          <Box>{item.name}</Box>
          <Box>{item.score}</Box>
        </Flex>
      ))}
      <Button
        mt={"20px"}
        color={COLOR.BLACK}
        fontWeight={"bold"}
        bg={"none"}
        border={"solid"}
        onClick={handleBack}
      >
        戻る
      </Button>
    </Box>
  );
};
