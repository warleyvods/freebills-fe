import {
  Box,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure, VStack
} from '@chakra-ui/react'
import { ReactNode, useCallback } from "react";

interface ModalProps {
  onOk: () => void;
  onCancel?: () => void;
  trigger: (onOpen?: () => void, onClose?: () => void) => ReactNode;
  mainColor: string;
  disabled?: boolean;
  barCode: string;
}

export function BankSlipModal({
  onOk,
  onCancel,
  trigger,
  mainColor,
  disabled,
  barCode
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
        <ModalContent bg={mainColor} maxW={"auto"} w={"auto"}>
          <ModalHeader>Informações</ModalHeader>
          <ModalCloseButton />
          <ModalBody justifyContent={"center"} >
            <VStack spacing={5} >
              <Text fontWeight={"bold"} fontFamily={"Poppins"}>Código de Barras</Text>
              <Flex p={3} bg={"gray.100"} h={"40px"} w={"100%"} maxW={"auto"} justify={"center"} alignItems={"center"} border={"1px"} borderColor={"gray.200"} borderRadius={"lg"} boxShadow={"lg"}>
                <Text color={"black"} textAlign={"center"} fontSize={"18px"} fontWeight={"bold"} fontFamily={"Poppins"}>{barCode}</Text>
              </Flex>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <HStack spacing={2}>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
