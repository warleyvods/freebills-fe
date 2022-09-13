import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  LightMode
} from '@chakra-ui/react'
import { ReactNode, useCallback } from "react";

interface ModalProps {
  onOk: () => void;
  onCancel?: () => void;
  trigger: (onOpen?: () => void, onClose?: () => void) => ReactNode;
  mainColor: string;
  title: string;
  disabled?: boolean;
  description: string;
  buttonText: string;
}

export function PayTransactionModal({
  onOk,
  onCancel,
  trigger,
  mainColor,
  title,
  disabled,
  description,
  buttonText
}: ModalProps) {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const handleCancel = useCallback(() => {
    onCancel?.();
    onClose();
  }, [onClose, onCancel])

  const handleOk = useCallback(() => {
    onOk();
    onClose();
  }, [onClose, onOk])

  return (
    <>
      {trigger(disabled ? () => {
      } : onOpen, onClose)}
      <Modal onClose={handleCancel} isOpen={isOpen} isCentered>
        <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(10px)'
        />
        <ModalContent bg={mainColor}>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody justifyContent={"center"}>
            <h1>{description}</h1>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={2}>
              <LightMode>
                <Button colorScheme={"red"} onClick={handleCancel}>Cancelar</Button>
                <Button colorScheme={"blue"} onClick={handleOk}>{buttonText}</Button>
              </LightMode>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
