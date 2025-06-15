import { Button, Flex, Image } from "@chakra-ui/react";
import { COLOR } from "@/features/scoreManagementV2/const/color.ts";
import { NavLink } from "react-router";

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
          <NavLink to={"/setup/inputname"}>
            <Button>点数管理V2</Button>
          </NavLink>
          <Button>点数計算</Button>
        </Flex>
      </Flex>
    </>
  );
}

export default Home;
