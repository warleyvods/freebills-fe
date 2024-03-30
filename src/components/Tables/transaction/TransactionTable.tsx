import {
  Box,
  Button, Circle,
  Flex,
  HStack,
  Icon,
  IconButton,
  LightMode,
  Skeleton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useBreakpointValue, useColorMode, useColorModeValue,
  VStack
} from '@chakra-ui/react'
import React, { useState } from "react";
import { CheckIcon, DeleteIcon, InfoIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { SkeletonTable } from "../../Skeletons/SkeletonTable";
import { Transaction } from "../../../hooks/transactions/useTransactionById";
import { PayTransactionModal } from "../../Modals/Transaction/PayTransaction";
import { BankSlipModal } from "../../Modals/Transaction/BankSlip";
import { category, NewTransactionModal } from "../../Modals/Transaction";
import { BiEdit, BiTrash } from "react-icons/bi";
import { ConfirmationDialog } from "../../Dialog/ConfirmationDialog";
import { useDeleteTransaction } from "../../../hooks/transactions/useDeleteTransaction";
import Tag from "../../Tag/Tag";
import { useAccounts } from "../../../hooks/accounts/useAccounts";
import { formatDate } from "../../../utils/chartData";
import { moneyFormat } from "../../Utils/utils";
import NextLink from "next/link";
import { CircleTag } from "../../Tag/CircleTag";

type ProductTableProps = {
  content: Transaction[];
  handleTableHeadButtonClick?: (activeButton: string) => void;
  onDeleteUser?: (userId: number) => void;
  isLoading: boolean;
  error: any;
}

export default function ProductsTable({content, isLoading, error,}: ProductTableProps) {
  const { colorMode } = useColorMode();
  const bg = useColorModeValue("white", "gray.700");
  const tableBg = useColorModeValue("gray.100", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.100");

  //STATES
  const isMobile = useBreakpointValue({base: true, md: true, lg: false});
  const [showIconButton, setShowIconButton] = useState({});
  const [selectedProducts, setSelectedProducts] = React.useState([]);
  const allProducts = content?.map((product) => product.id);
  const allChecked = allProducts?.every((productId) => selectedProducts.includes(productId));
  const isIndeterminate = selectedProducts.some(Boolean) && !allChecked;
  const showFloatMenu = allChecked || isIndeterminate;
  const {data: accounts} = useAccounts();
  const {mutate: deleteTransaction} = useDeleteTransaction();

  //FUNCTIONS
  function handleDeleteTransaction(transactionId: number) {
    deleteTransaction(transactionId)
  }

  return (
    isLoading ? (
        <SkeletonTable isMobile={isMobile} />
      ) :
      error ? (
        <Flex justify="center">
          <Text>Falha ao obter dados dos produtos</Text>
        </Flex>
      ) : (
        <Table variant={isMobile ? 'unstyled' : 'simple'} bg={bg}>
          {!isMobile && (
            <Thead borderColor={borderColor} h={"35px"} bg={tableBg}>
              <Tr borderColor={"none"}>
                <Th textAlign="start">Descrição</Th>
                <Th textAlign="center">Situação</Th>
                <Th textAlign="center">Conta</Th>
                <Th textAlign="center">Data</Th>
                <Th textAlign="center">Categoria</Th>
                <Th textAlign="center">Tipo</Th>
                <Th textAlign="center">Valor</Th>
                <Th textAlign="center">Opções</Th>
              </Tr>
            </Thead>
          )}
          <Tbody>
            {content?.map((transaction, index) => (
              <Tr
                key={transaction.id}
                _hover={{ bg: colorMode === 'light' ? 'gray.50' : '#333537' }}
                h={"0px"}
              >
                {isMobile ? (
                  isLoading ? (
                    <Td p={"5px"}>
                      <Flex p={4}
                            borderWidth={1}
                            borderRadius="md"
                            boxShadow="sm"
                            h={"100px"}
                            justify={"space-between"}
                            alignItems={"center"}
                      >
                        <HStack spacing={"15px"}>
                          <Skeleton h='48px' w='48px' borderRadius={"5px"} />
                          <VStack spacing={"5px"} justify={"flex-start"} alignItems={"flex-start"}>
                            <Skeleton h='16px' w='120px' borderRadius={"5px"} />
                            <Skeleton h='16px' w='120px' borderRadius={"5px"} />
                          </VStack>
                        </HStack>
                        <VStack spacing={"0"} justify={"flex-start"} alignItems={"flex-start"}>
                          <Skeleton h='16px' w='60px' borderRadius={"5px"} />
                        </VStack>
                      </Flex>
                    </Td>
                  ) : (
                    <Td p={"2px"}>
                      <NewTransactionModal
                        transactionType={transaction.transactionType}
                        transactionId={transaction.id}
                        edit={true}
                        trigger={(open) => (
                          <Flex pl={"5px"} pr={"8px"} pb={"2px"} pt={"2px"}
                                borderWidth={1}
                                borderRadius="md"
                                boxShadow="sm"
                            // borderColor={"red"}
                                justify={"space-between"}
                                onClick={open}
                          >
                            <Flex direction={"row"} w={"full"} p={0} h={"50px"} alignItems={"center"}
                                  justify={"space-between"}>
                              <HStack>
                                <Circle size={"42px"} bg={"gray.200"} />
                                <VStack spacing={0} alignItems={"start"}>
                                  <Text fontWeight={"bold"} size={"0.95rem"}>{transaction.description}</Text>
                                  <Text fontWeight={"medium"} size={"0.95rem"}>
                                    {category[transaction.transactionCategory]} | {
                                    accounts?.filter(acc => acc.id === transaction.accountId)
                                      .map((acc) => (
                                        acc.description
                                      ))} </Text>
                                </VStack>
                              </HStack>

                              <VStack spacing={1} alignItems={"end"}>
                                <Text fontWeight={"bold"}>{moneyFormat(transaction.amount)}</Text>
                                {transaction.paid ? (
                                  <Tooltip label='Pago' placement='auto-start'>
                                    <Circle size='20px' bg='lime.400' color='lime.600' border={"1px"}
                                            borderColor={"lime.500"}>
                                      <CheckIcon h={"10px"} />
                                    </Circle>
                                  </Tooltip>

                                ) : (
                                  <Tooltip label='Pendente' placement='auto-start'>
                                    <Circle size='20px' bg='littlePink.400' color='littlePink.600' border={"1px"}
                                            borderColor={"littlePink.500"}>
                                      <SmallCloseIcon h={"14px"} />
                                    </Circle>
                                  </Tooltip>
                                )}
                              </VStack>
                            </Flex>
                          </Flex>
                        )}
                      />
                    </Td>
                  )
                ) : (
                  <>
                    {/*DESCRIÇÃO*/}
                    <Td pl={5} pb={"15px"} pt={"15px"}>
                      <Flex justify="flex-start">
                        <Text fontWeight={"medium"}>{transaction.description}</Text>
                      </Flex>
                    </Td>

                    {/*SITUAÇÃO*/}
                    <Td pb={0} pt={0}>
                      <Flex justify="center">
                          <CircleTag isPaid={transaction.paid} />
                      </Flex>
                    </Td>

                    {/*CONTA*/}
                    <Td pb={0} pt={0}>
                      <Flex justify={"center"}>
                        <Text fontWeight={"medium"}>
                          {accounts?.filter(acc => acc.id === transaction.accountId).map((acc) => (
                            acc.description
                          ))}
                        </Text>
                      </Flex>
                    </Td>

                    {/*DATA*/}
                    <Td pb={0} pt={0}>
                      <Flex justify="center">
                        {formatDate(transaction.date)}
                      </Flex>
                    </Td>

                    {/*CATEGORIA*/}
                    <Td pb={0} pt={0}>
                      <Flex justify="center">
                        <Text fontWeight={"medium"}>{category[transaction.transactionCategory]}</Text>
                      </Flex>
                    </Td>

                    {/*TIPO*/}
                    <Td pb={0} pt={0}>
                      <Flex justify="center">
                        <Tag variant={transaction.transactionType === 'REVENUE' ? "green" : "red"}
                             label={transaction.transactionType === 'REVENUE' ? "RECEITA" : "DESPESA"}
                        />
                      </Flex>
                    </Td>

                    {/*VALOR*/}
                    <Td pb={0} pt={0}>
                      <Flex justify="center">
                        <Text fontWeight={"bold"}>{moneyFormat(transaction.amount)}</Text>
                      </Flex>
                    </Td>

                    {/*OPÇÕES*/}
                    <Td pb={0} pt={0}>
                      <HStack justify={"flex-end"}>
                        {
                          transaction.paid ? null : (
                            <PayTransactionModal
                              title={"Pagar Transação"} mainColor={"white"} buttonText={"Pagar"}
                              description={"Deseja pagar esta transação?"}
                              onOk={() => null}
                              trigger={(onOpen) =>
                                <LightMode>
                                  <Tooltip label='Pagar' placement='auto-start'>
                                    <IconButton
                                      as={Button}
                                      isRound={true}
                                      variant={"solid"}
                                      colorScheme={"green"}
                                      aria-label={"pay"}
                                      size={"sm"}
                                      icon={<Icon as={CheckIcon} fontSize={"12"} />}
                                      onClick={onOpen} />
                                  </Tooltip>
                                </LightMode>
                              } />
                          )
                        }

                        {!transaction.bankSlip ? null :
                          (
                            <BankSlipModal
                              mainColor={"white"}
                              barCode={transaction.barCode}
                              onOk={() => null}
                              trigger={(onOpen) =>
                                <LightMode>
                                  <Tooltip label='Pagar' placement='auto-start'>
                                    <IconButton
                                      as={Button}
                                      colorScheme={"purple"}
                                      aria-label={"pay"}
                                      size={"sm"}
                                      icon={<Icon as={InfoIcon} fontSize={"12"} />}
                                      onClick={onOpen} />
                                  </Tooltip>
                                </LightMode>
                              }
                            />
                          )
                        }
                        <NewTransactionModal
                          transactionType={transaction.transactionType}
                          edit={true}
                          transactionId={transaction.id}
                          trigger={(open) => (
                            <LightMode>
                              <IconButton
                                onClick={open}
                                colorScheme={"facebook"}
                                aria-label={"edit transaction"}
                                size="sm"
                                icon={<Icon as={BiEdit} fontSize={"16"} />}
                              />
                            </LightMode>
                          )}
                        />
                        <LightMode>
                          <ConfirmationDialog
                            title={"Deletar Transação"}
                            mainColor={"white"}
                            buttonText={"Deletar"}
                            description={"Deseja deletar essa transação?"}
                            variant={"danger"}
                            onOk={() => handleDeleteTransaction(transaction.id)}
                            trigger={(onOpen) => <IconButton
                              as={"a"}
                              colorScheme={"red"}
                              aria-label={"Call Segun"}
                              size="sm"
                              icon={<Icon as={BiTrash} fontSize={"16"} />}
                              onClick={onOpen} />}
                          />
                        </LightMode>
                      </HStack>
                    </Td>
                  </>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      )
  )
};
