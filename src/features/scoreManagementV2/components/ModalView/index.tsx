import { FC, ReactNode } from "react";
import { Flex, FlexProps } from "@chakra-ui/react";
import { COLOR } from "@/features/scoreManagementV2/const/color.ts";
import { Modal, ModalContent } from "@chakra-ui/modal";

type ModalProps = {
  children: ReactNode;
} & FlexProps;

export const ModalView: FC<ModalProps> = ({ children, ...props }) => {
  return (
    <Modal isCentered isOpen onClose={() => {}}>
      <ModalContent
        w="100vw"
        h="100vh"
        bg={COLOR.GREEN_PRIMARY}
        borderRadius={0}
        shadow="none"
      >
        <Flex
          align="center"
          justify="center"
          direction="column"
          w="100%"
          h="100%"
          {...props}
        >
          {children}
        </Flex>
      </ModalContent>
    </Modal>
  );
};
