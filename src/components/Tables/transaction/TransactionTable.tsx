import {
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
  useBreakpointValue,
  VStack
} from '@chakra-ui/react'
import React, { useState } from "react";
import { CheckIcon, InfoIcon, SmallCloseIcon } from "@chakra-ui/icons";
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
import { numberFormat } from "../../Utils/utils";

type ProductTableProps = {
  content: Transaction[];
  handleTableHeadButtonClick?: (activeButton: string) => void;
  onDeleteUser?: (userId: number) => void;
  isLoading: boolean;
  error: any;
}

export default function ProductsTable({content, isLoading, error,}: ProductTableProps) {

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
        <SkeletonTable mobile={isMobile} />
      ) :
      error ? (
        <Flex justify="center">
          <Text>Falha ao obter dados dos produtos</Text>
        </Flex>
      ) : (
        <div style={{backgroundColor: "white"}}>
          <Table variant={isMobile ? 'unstyled' : 'simple'} bg={"white"}>
            {!isMobile && (
              <Thead borderTop={"1px"} borderColor={"gray.100"} h={"35px"} bg={"gray.50"}>
                <Tr>
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
                  _hover={{bg: "gray.10"}}
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
                      /* ISMOBILE AQUI */
                      <Td p={"5px"}>

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
                      <Td  pb={0} pt={0}>
                        <Flex justify="center">
                          {transaction.paid ? (
                            <Tooltip label='Pago' placement='auto-start'>
                              <Circle size='20px' bg='lime.400' color='lime.600' border={"1px"} borderColor={"lime.500"}>
                                <CheckIcon h={"10px"} />
                              </Circle>
                            </Tooltip>

                          ) : (
                            <Tooltip label='Pendente' placement='auto-start'>
                              <Circle size='20px' bg='littlePink.400' color='littlePink.600' border={"1px"} borderColor={"littlePink.500"}>
                                <SmallCloseIcon h={"14px"} />
                              </Circle>
                            </Tooltip>
                          )}
                        </Flex>
                      </Td>

                      {/*CONTA*/}
                      <Td  pb={0} pt={0}>
                        <Flex justify={"center"}>
                          <Text fontWeight={"medium"}>
                            {accounts?.filter(acc => acc.id === transaction.accountId).map((acc) => (
                              acc.description
                            ))}
                          </Text>
                        </Flex>
                      </Td>

                      {/*DATA*/}
                      <Td  pb={0} pt={0}>
                        <Flex justify="center">
                          {formatDate(transaction.date)}
                        </Flex>
                      </Td>

                      {/*CATEGORIA*/}
                      <Td  pb={0} pt={0}>
                        <Flex justify="center">
                          <Text fontWeight={"medium"}>{category[transaction.transactionCategory]}</Text>
                        </Flex>
                      </Td>

                      {/*TIPO*/}
                      <Td  pb={0} pt={0}>
                        <Flex justify="center">
                          <Tag variant={transaction.transactionType === 'REVENUE' ? "green" : "red"}
                               label={transaction.transactionType === 'REVENUE' ? "RECEITA" : "DESPESA"}
                          />
                        </Flex>
                      </Td>

                      {/*VALOR*/}
                      <Td  pb={0} pt={0}>
                        <Flex justify="center">
                          <Text fontWeight={"bold"}>{numberFormat(transaction.amount)}</Text>
                        </Flex>
                      </Td>

                      {/*OPÇÕES*/}
                      <Td  pb={0} pt={0}>
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
                            transactionType={'EXPENSE'}
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
        </div>
      )
  )
};
