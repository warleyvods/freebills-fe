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
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useTransactionByCategory } from "../../../hooks/transactions/useTransactionByCategory";
import { Transaction } from "../../../hooks/transactions/useTransactionById";
import { moneyFormat } from "../../Utils/utils";
import { formatDate } from "../../../utils/chartData";

interface ModalTypes {
  onOk?: () => void;
  onCancel?: () => void;
  trigger: (onOpen?: () => void, onClose?: () => void) => ReactNode;
  category: string;
  transactionType: string;
  year?: number;
  month?: number;
}

export function CategoryInfo({
  onCancel,
  trigger,
  category,
  transactionType,
  year,
  month,
}: ModalTypes) {
  const mainColor = useColorModeValue("white", "gray.800");
  const {isOpen, onOpen, onClose} = useDisclosure();
  const modalSize = useBreakpointValue({base: "xs", md: "3xl"});
  const {
    data: transactionsResponse,
    isLoading,
    error
  } = useTransactionByCategory(category, transactionType, year, month);
  const fontSize = "inherit";

  const transactions: Transaction[] = transactionsResponse?.content || [];

  const contentView = useMemo(() => {
    if (isLoading) {
      return (
        <Center py={4}>
          <Spinner />
          <Text ml={2}>Carregando...</Text>
        </Center>
      );
    }

    if (error) {
      return (
        <Center py={4}>
          <Text>Erro ao carregar dados.</Text>
        </Center>
      );
    }

    if (transactions.length === 0) {
      return (
        <Center py={4}>
          <Text>Nenhuma transação encontrada.</Text>
        </Center>
      );
    }

    if (modalSize === "xs") {
      return (
        <Stack spacing={4}>
          {transactions.map((item: Transaction) => (
            <Box key={item.id} p={4} borderWidth="1px" borderRadius="md" boxShadow="sm">
              <Text fontSize={fontSize} fontWeight="bold">
                Descrição:
              </Text>
              <Text fontSize={fontSize}>{item.description}</Text>
              <Text fontSize={fontSize} fontWeight="bold">
                Conta:
              </Text>
              <Text fontSize={fontSize}>{item.accountId}</Text>
              <Text fontSize={fontSize} fontWeight="bold">
                Data:
              </Text>
              <Text fontSize={fontSize}>{item.date}</Text>
              <Text fontSize={fontSize} fontWeight="bold">
                Valor:
              </Text>
              <Text fontSize={fontSize}>{moneyFormat(item.amount)}</Text>
            </Box>
          ))}
        </Stack>
      );
    }

    return (
      <Table size="sm" variant='striped' colorScheme='gray'>
        <Thead>
          <Tr>
            <Th fontSize={fontSize}>Descrição</Th>
            <Th fontSize={fontSize}>Data</Th>
            <Th fontSize={fontSize}>Valor</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions.map((item: Transaction) => (
            <Tr key={item.id}>
              <Td fontSize={fontSize}>{item.description}</Td>
              <Td fontSize={fontSize}>{formatDate(item.date)}</Td>
              <Td fontSize={fontSize}>{moneyFormat(item.amount)}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    );
  }, [isLoading, error, transactions, modalSize, fontSize]);

  const handleOk = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleCancel = useCallback(() => {
    onCancel?.();
    onClose();
  }, [onClose, onCancel]);

  return (
    <>
      {trigger(onOpen, onClose)}
      <Modal onClose={handleCancel} isOpen={isOpen} isCentered size={modalSize}>
        <ModalOverlay backdropFilter="blur(3px)" />
        <ModalContent bg={mainColor}>
          <Box p={4} overflowX="auto">
            {contentView}
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
}
