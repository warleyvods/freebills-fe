import {
  Box,
  Button,
  Center,
  Circle,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  LightMode,
  SimpleGrid,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useColorModeValue,
  VStack
} from "@chakra-ui/react";
import { RiAddLine, RiArrowDownLine, RiArrowUpLine } from "react-icons/ri";
import TagW from "../../../components/Tag";
import { useMe } from "../../../hooks/users/useMe";
import { ConfirmationDialog } from "../../../components/Dialog/ConfirmationDialog";
import { Pagination } from "../../../components/Pagination";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useDeleteTransaction } from "../../../hooks/transactions/useDeleteTransaction";
import { category, NewTransactionModal } from "../../../components/Modals/Transaction";
import { numberFormat } from "../../../components/Utils/utils";
import React, { useCallback, useState } from "react";
import CardsDashboard from "../../../components/Cards/CardsDashboard";
import { Formik } from 'formik';
import { useIsFetching } from "react-query";
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, SearchIcon, SmallCloseIcon } from "@chakra-ui/icons";
import SidebarWithHeader from "../../../components/SideBar";
import { useTransactionExpense } from "../../../hooks/transactions/useTransactionExpense";
import { MdAccountBalance, MdOutlineAttachMoney } from "react-icons/md";
import { useDashboardExpense } from "../../../hooks/dashboard/useDashboardExpense";
import CardsSkeleton from "../../../components/Cards/CardsSkeleton";
import { useAccounts } from "../../../hooks/accounts/useAccounts";
import { formatDate } from "../../../utils/chartData";

interface ColumnsProps {
  name: string;
}

const LinkItems: Array<ColumnsProps> = [
  {name: 'Descrição'},
  {name: 'Situação'},
  {name: 'Conta'},
  {name: 'Data'},
  {name: 'Categoria'},
  {name: 'Tipo'},
  {name: 'Valor'},
  {name: 'Opções'},
];

export default function TransactionRevenue() {
  const searchIconColor = useColorModeValue("gray.700", "gray.200");
  const mainTeal = useColorModeValue("teal.300", "teal.300");
  const inputBg = useColorModeValue("white", "gray.800");
  const mainColor = useColorModeValue('white', 'gray.800')
  const isFetching = useIsFetching(['transaction'])
  const [keyword, setKeyword] = useState("");
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())
  const [page, setPage] = useState(0)
  const {data: user} = useMe();
  const {data: dash} = useDashboardExpense(user?.id, month, year);
  const {data: transactions, isLoading, error} = useTransactionExpense(page, keyword, month, year);
  const {mutate: deleteTransaction} = useDeleteTransaction();
  const {data: accounts} = useAccounts(user?.id)
  const padding = "1px";

  function capitalizeFirstLetter(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  const incrementMonth = useCallback(() => {
    setMonth((month) => {
      if (month >= 1 && month < 12) {
        return ++month
      }
      return month;
    })
  }, [])

  const decreaseMonth = useCallback(() => {
    setMonth((month) => {
      if (month > 1 && month <= 12) {
        return --month
      }
      return month;
    })
  }, [])

  function handleDeleteTransaction(transactionId: number) {
    deleteTransaction(transactionId)
  }

  return (
    <SidebarWithHeader>

      <SimpleGrid columns={{sm: 1, md: 2, xl: 4}} spacing='24px' pb={5}>
        {!!dash ? (
          <>
            <CardsDashboard description={"Saldo Atual"}
                            value={numberFormat(dash?.totalBalance)}
                            color={"blue.600"}
                            icon={MdOutlineAttachMoney}
                            path={"/transactions"}
            />
            <CardsDashboard description={"Despesas Pendentes"}
                            value={numberFormat(dash?.totalExpensePending)}
                            color={"red.600"}
                            icon={RiArrowUpLine}
            />
            <CardsDashboard description={"Despesas Pagas"}
                            value={numberFormat(dash?.totalExpenseReceived)}
                            color={"red.600"}
                            icon={RiArrowDownLine}
            />
            <CardsDashboard description={"Total"}
                            value={numberFormat(dash?.totalExpense)}
                            color={"red.600"}
                            icon={MdAccountBalance}
            />
          </>
        ) : (
          <>
            <CardsSkeleton />
            <CardsSkeleton />
            <CardsSkeleton />
            <CardsSkeleton />
          </>
        )}

      </SimpleGrid>

      <Box boxShadow={"lg"} borderRadius={25}>
        <Flex w="100%" maxWidth={"auto"} mx={"auto"}>
          <Box flex={1} borderRadius={8} pl={8} pr={8} pb={8} pt={2} bg={mainColor}>
            <HStack pl={10} justify={"center"}>
              <IconButton
                onClick={decreaseMonth}
                color={"red.600"}
                isRound={true}
                variant={"ghost"}
                aria-label={"button account"}
                icon={<ChevronLeftIcon w={8} h={8} />}
                size={"lg"}
              />
              <HStack p={0}>
                <Text fontWeight={"bold"}>{
                  capitalizeFirstLetter(new Date(`"${month}"`).toLocaleDateString('pt-BR', {
                    month: 'long',
                  }).toString())
                }
                </Text>
                <Text fontWeight={"bold"}>{
                  new Date().toLocaleDateString('pt-BR', {
                    year: 'numeric',
                  })}
                </Text>
              </HStack>
              <IconButton
                onClick={incrementMonth}
                color={"red.600"}
                colorScheme={"gray"}
                variant={"ghost"}
                isRound={true}
                aria-label={"button account"}
                icon={<ChevronRightIcon w={8} h={8} />}
                size={"lg"}
              />
            </HStack>
            <Flex mb={8} justify={"space-between"} align={"center"}>
              <HStack spacing={20}>
                <Heading size={"lg"} fontWeight={"bold"}>
                  Despesas
                  {isFetching > 0 && <Spinner size={"sm"} color={"gray.500"} ml={4} />}
                </Heading>
                <Formik initialValues={{keyword: ""}}
                        onSubmit={(values) => {
                          setKeyword(values.keyword)
                          setPage(0)
                        }}
                >
                  {({handleSubmit, handleChange, values, errors, isSubmitting}) =>
                    <>
                      <form onSubmit={handleSubmit}>

                        <InputGroup
                          bg={inputBg}
                          borderRadius="15px"
                          w="250px"
                          _focus={{
                            borderColor: {mainTeal},
                          }}
                          _active={{
                            borderColor: {mainTeal},
                          }}
                        >
                          <InputLeftElement>
                            <IconButton
                              bg="inherit"
                              borderRadius="inherit"
                              _hover={{
                                bg: "none"
                              }}
                              _active={{
                                bg: "inherit",
                                transform: "none",
                                borderColor: "transparent",
                              }}
                              _focus={{
                                boxShadow: "none",
                              }}
                              icon={<SearchIcon color={searchIconColor} w="15px" h="15px" />}
                              aria-label={"button"} />
                          </InputLeftElement>
                          <Input
                            name={"keyword"}
                            fontSize="xs"
                            py="11px"
                            type={"text"}
                            placeholder="Pesquisar..."
                            borderRadius="inherit"
                            onChange={handleChange}
                            value={values.keyword}
                          />
                        </InputGroup>
                      </form>
                    </>
                  }
                </Formik>
              </HStack>

              <NewTransactionModal
                transactionType={'EXPENSE'}
                trigger={(open) =>
                <LightMode>
                  <Button as={"a"}
                          onClick={open}
                          size={"sm"}
                          fontSize={"sm"}
                          colorScheme={"red"}
                          leftIcon={<Icon as={RiAddLine} fontSize={"20"} />}
                  >Adicionar nova despesa
                  </Button>
                </LightMode>
              } />

            </Flex>

            {isLoading ? (
              <Flex justify={"center"}>
                <Spinner />
              </Flex>
            ) : error ? (
              <Flex justify={"center"}>
                <Text fontWeight={"bold"} fontSize={"24px"}>Falha ao obter transações</Text>
              </Flex>
            ) : transactions.content.length === 0 ? (
              <Center>
                <VStack>
                  <Image boxSize='200px'
                         src="https://web.mobills.com.br/static/media/mobills-illustration.19b7ceda.svg"
                         alt="React Logo" />
                  <Text fontWeight={"bold"} fontSize={"24px"} pb={10}>Não há despesas</Text>
                </VStack>
              </Center>
            ) : (
              <>
                <Table bg={mainColor}>
                  <Thead>
                    <Tr>
                      {LinkItems.map((columns, index) => (
                        <Th key={columns.name}>
                          <Flex
                            justify={index == 0 ? 'start' : 'center' && index == (LinkItems.length - 1) ? 'flex-end' : 'center'}>
                            {columns.name}
                          </Flex>
                        </Th>
                      ))}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {transactions.content.map(transaction => {
                      return (
                        <Tr key={transaction.id}>
                          <Td p={padding}>
                            <Flex justify={"flex-start"} ml={"20px"}>
                              <Text fontWeight={"bold"}>{transaction.description}</Text>
                            </Flex>
                          </Td>
                          <Td p={"14px"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            {transaction.paid ? (
                              <Tooltip label='Pago' placement='auto-start'>
                                <Circle size='24px' bg='#38A169' color='white'>
                                  <CheckIcon h={"12px"} />
                                </Circle>
                              </Tooltip>

                            ) : (
                              <Tooltip label='Pendente' placement='auto-start'>
                                <Circle size='24px' bg='#C53030' color='white'>
                                  <SmallCloseIcon h={"14px"} />
                                </Circle>
                              </Tooltip>
                            )}
                          </Td>
                          <Td p={padding}>
                            <Flex justify={"center"}>
                              <Text fontWeight={"bold"}>
                                {accounts?.filter(acc => acc.id === transaction.accountId).map((acc) => (
                                  acc.description
                                ))}
                              </Text>
                            </Flex>
                          </Td>
                          <Td textAlign={"center"} p={padding}>
                            {formatDate(transaction.date)}
                          </Td>
                          <Td pl={0} pr={0} pt={padding} pb={padding}>
                            <Flex justify={"center"}>
                              <Text fontWeight={"bold"}>{category[transaction.transactionCategory]}</Text>
                            </Flex>
                          </Td>
                          <Td textAlign={"center"} p={padding}>
                            {transaction.transactionType === 'REVENUE' ? (
                              <TagW colorScheme={"green"} label={"RECEITA"} />) : (
                              <TagW colorScheme={"red"} label={"DESPESA"} />)}
                          </Td>
                          <Td textAlign={"center"}>
                            <Text fontWeight={"bold"}>{numberFormat(transaction.amount)}</Text>
                          </Td>
                          <Td pl={0} pr={0} pt={padding} pb={padding}>
                            <Flex justify={"flex-end"}>
                              <HStack>
                                <NewTransactionModal
                                  transactionType={'EXPENSE'}
                                  transactionId={transaction.id}
                                  edit={true}
                                  trigger={(open) =>
                                    <LightMode>
                                      <IconButton
                                        onClick={open}
                                        colorScheme={"facebook"}
                                        aria-label={"edit transaction"}
                                        size="sm"
                                        icon={<Icon as={BiEdit} fontSize={"16"} />}
                                      />
                                    </LightMode>
                                  } />

                                <LightMode>
                                  <ConfirmationDialog
                                    onOk={() => handleDeleteTransaction(transaction.id)}
                                    trigger={(onOpen) => <IconButton
                                      as={"a"}
                                      colorScheme={"red"}
                                      aria-label={"Call Segun"}
                                      size="sm"
                                      icon={<Icon as={BiTrash} fontSize={"16"} />}
                                      onClick={onOpen} />}
                                    title={"Deletar Despesa"} mainColor={mainColor} buttonText={"Deletar"}
                                    description={"Deseja deletar essa despesa?"} />
                                </LightMode>
                              </HStack>
                            </Flex>
                          </Td>
                        </Tr>
                      )
                    })}
                  </Tbody>
                </Table>
                <Pagination totalCountOfRegisters={transactions.totalElements} currentPage={page}
                            onPageChange={setPage} />
              </>
            )}
          </Box>
        </Flex>
      </Box>
    </SidebarWithHeader>
  )
};
