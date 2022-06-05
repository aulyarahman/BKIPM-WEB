import { Button } from "@chakra-ui/button";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { FC, ReactNode } from "react";
import { uiStore } from "store";

export type ModalsTypes = {
  isOpen?: boolean;
  setOpen?(v: boolean): void;
  title?: string;
  children?: ReactNode;
  sizes?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
};

export const Modals: FC<ModalsTypes> = (props) => {
  const { isOpen, setOpen, children, title } = props;
  const uiState = uiStore((v) => v.setUi);
  const modalOpen = uiStore((v) => v.modal) as boolean;

  const onCLose = () => {
    if (modalOpen) {
      uiState({ modal: false });
      return;
    }
    if (setOpen) {
      setOpen(false);
      return;
    }
  };
  return (
    <Modal
      isCentered
      allowPinchZoom
      isOpen={isOpen ? isOpen : modalOpen}
      size={props.sizes || "xl"}
      onClose={onCLose}
    >
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent rounded={"xl"} h={"fit-content"}>
        {/* <ModalHeader>{title}</ModalHeader> */}
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};
