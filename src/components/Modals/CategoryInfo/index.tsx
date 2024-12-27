import React, { ReactNode, useCallback, useMemo } from "react";
import {
  Box,
  Modal,
  ModalContent,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
  Text,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";

const additionalData = [
  {
    description: "Compra de equipamento",
    account: "Conta Corrente",
    date: "15/01/2023",
    value: "R$ 200,00",
  },
  {
    description: "Pagamento de aluguel",
    account: "Conta Poupança",
    date: "20/01/2023",
    value: "R$ 800,00",
  },
];

interface ModalTypes {
  onOk?: () => void;
  onCancel?: () => void;
  trigger: (onOpen?: () => void, onClose?: () => void) => ReactNode;
}

export function CategoryInfo({ onCancel, trigger }: ModalTypes) {
  const mainColor = useColorModeValue("white", "gray.800");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalSize = useBreakpointValue({ base: "xs", md: "3xl" });
  const fontSize = "inherit";

  const contentView = useMemo(() => {
    if (modalSize === "xs") {
      return (
        <Stack spacing={4}>
          {additionalData.map((item, index) => (
            <Box
              key={index}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              boxShadow="sm"
            >
              <Text fontSize={fontSize} fontWeight="bold">
                Descrição:
              </Text>
              <Text fontSize={fontSize}>{item.description}</Text>

              <Text fontSize={fontSize} fontWeight="bold">
                Conta:
              </Text>
              <Text fontSize={fontSize}>{item.account}</Text>

              <Text fontSize={fontSize} fontWeight="bold">
                Data:
              </Text>
              <Text fontSize={fontSize}>{item.date}</Text>

              <Text fontSize={fontSize} fontWeight="bold">
                Valor:
              </Text>
              <Text fontSize={fontSize}>{item.value}</Text>
            </Box>
          ))}
        </Stack>
      );
    }
    return (
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th fontSize={fontSize}>Descrição</Th>
            <Th fontSize={fontSize}>Conta</Th>
            <Th fontSize={fontSize}>Data</Th>
            <Th fontSize={fontSize}>Valor</Th>
          </Tr>
        </Thead>
        <Tbody>
          {additionalData.map((item, index) => (
            <Tr key={index}>
              <Td fontSize={fontSize}>{item.description}</Td>
              <Td fontSize={fontSize}>{item.account}</Td>
              <Td fontSize={fontSize}>{item.date}</Td>
              <Td fontSize={fontSize}>{item.value}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  }, [modalSize, fontSize]);

  // Close the modal and trigger additional actions if provided
  const handleOk = useCallback(() => {
    onClose();
  }, [onClose]);

  // Cancel actions and close the modal, invoking onCancel if provided
  const handleCancel = useCallback(() => {
    onCancel?.();
    onClose();
  }, [onClose, onCancel]);

  return (
    <>
      {/* Trigger for opening the modal */}
      {trigger(onOpen, onClose)}

      <Modal
        onClose={handleCancel}
        isOpen={isOpen}
        isCentered
        size={modalSize} // Dynamically set size based on screen size
      >
        <ModalOverlay backdropFilter="blur(3px)" />
        <ModalContent bg={mainColor}>
          <Box p={4} overflowX="auto">
            {/* Use memoized content to avoid flickering */}
            {contentView}
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
}
