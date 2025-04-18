import { FC, useState } from "react";
import { Box, Text, Flex, NativeSelect, Button } from "@chakra-ui/react";
import { COLOR } from "@/const/color";

type Props = {
  close: () => void;
};

export const ScoreSelectPanel: FC<Props> = ({ close }) => {
  const [score, setScore] = useState<string | null>(null);
  const completeButton = () => {
    if (score === null) {
      return alert("点数を選択してください");
    }
    close();
  };
  return (
    <Box>
      <Box>
        <Text
          textStyle="3xl"
          fontWeight="bold"
          style={{ textAlign: "center", paddingTop: "50px" }}
        >
          点数を入力してください
        </Text>
      </Box>
      <Flex justify="center" mt={"20px"}>
        <NativeSelect.Root
          w="240px"
          key={"num"}
          size={"md"}
          style={{ backgroundColor: COLOR.WHITE }}
        >
          <NativeSelect.Field
            placeholder="点数を選択してください"
            onChange={(event) => setScore(event.currentTarget.value)}
          >
            <option value="25000" aria-setsize={20}>
              25000
            </option>
            <option value="35000" style={{ fontSize: "20px" }}>
              35000
            </option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Flex>
      <Flex justify={"center"} mt={"20px"}>
        <Button onClick={completeButton}>完了</Button>
      </Flex>
    </Box>
  );
};
