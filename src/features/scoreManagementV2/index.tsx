import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { COLOR } from "@/features/scoreManagementV2/const/color.ts";
import { NavLink } from "react-router-dom";

function Home() {
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
          <NavLink to={"/setup"}>
            <Button>点数管理V2</Button>
          </NavLink>
          <Box>点数計算</Box>
        </Flex>
      </Flex>
    </>
  );
}

export default Home;
