import {
  Button,
  Circle,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter, ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { ReactNode, useCallback } from "react";
import { CustomIcon } from "../Icons/House";
import { AlertIcon } from "../../utils/chartData";

interface ModalProps {
  onOk: () => void;
  onCancel?: () => void;
  trigger: (onOpen?: () => void, onClose?: () => void) => ReactNode;
  mainColor: string;
  title?: string;
  disabled?: boolean;
  description: string;
  buttonText: string;
  variant?: string;
}

export function ConfirmationDialog({onOk, onCancel, trigger, mainColor, disabled, description, buttonText, variant, title }: ModalProps) {
  const {isOpen, onOpen, onClose} = useDisclosure();

  const handleCancel = useCallback(() => {
    onCancel?.();
    onClose();
  }, [onClose, onCancel])

  const handleOk = useCallback(() => {
    onOk();
    onClose();
  }, [onClose, onOk])

  return(
    <>
      {trigger(disabled ? () => {} : onOpen, onClose)}
      <Modal size={"lg"} onClose={handleCancel} isOpen={isOpen} isCentered>
        <ModalOverlay
          bg='blackAlpha.500'
          backdropFilter='blur(1px)'
        />
        <ModalContent bg={mainColor}>
          {/*<ModalHeader fontWeight={"medium"}>{title}</ModalHeader>*/}
          {/*<ModalCloseButton />*/}
          <ModalBody justifyContent={"center"} p={"24px"}>
            <Flex direction={{ base: 'column', md: 'row' }} alignItems={{ base: 'center', md: 'flex-start' }} gap={3}>
              <Circle size={"2.5rem"} bg={variant == 'danger' ? 'littlePink.450' : '#FEFCE8'}>
                <CustomIcon value={AlertIcon} color={variant == 'danger' ? 'customRed.500' : '#EAB308'} />
              </Circle>
              <Flex direction={"column"} gap={2} ml={{ base: 0, md: 3 }}>
                <Text fontSize={"md"} fontWeight={"medium"} textAlign={{ base: 'center', md: 'start'}}>{title}</Text>
                <Text fontSize={"sm"} fontWeight={"normal"} textAlign={{ base: 'center', md: 'start'}}>{description}</Text>
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter borderBottomRadius={"md"} bg={"gray.50"}>
            <Stack spacing={2} direction={{ base: 'column', md: 'row' }} w={"full"} justify={{ base: 'center', md: 'flex-end' }}>
              <Button variant={"cancel"} onClick={handleCancel}>Cancelar</Button>
              <Button variant={variant} onClick={handleOk}>{buttonText}</Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
