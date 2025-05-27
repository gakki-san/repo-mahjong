import { Button, Flex, Image } from "@chakra-ui/react";
import { COLOR } from "./features/scoreManagement/const/color";
import { useIsBoolean } from "./features/scoreManagement/hooks/useIsBoolean";
import { InputSetUp } from "./features/scoreManagement/feature/inputSetUp";

function App() {
  const [isScoreManagement, { on: openScoreManagement }] = useIsBoolean();

  const handleOpenScoreManagement = () => {
    openScoreManagement();
  };

  return (
    <>
      <Flex
        align="center"
        direction={"column"}
        gap={"50px"}
        w="100vw"
        h="100vh"
        pt={"50px"}
        bg={COLOR.GREEN_PRIMARY}
      >
        <Image w={"100px"} h={"100px"} src={"/title.PNG"} />
        <Flex gap={"40px"}>
          <Button onClick={handleOpenScoreManagement}>点数管理</Button>
          <Button>点数計算</Button>
        </Flex>
      </Flex>
      {isScoreManagement && <InputSetUp />}
    </>
  );
}
export default App;
