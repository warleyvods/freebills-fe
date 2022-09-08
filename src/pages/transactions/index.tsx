import SidebarWithHeader from "../../components/SideBar";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
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
  Tr,
  useColorModeValue
} from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";
import TagW from "../../components/Tag";
import { useTransaction } from "../../hooks/transactions/useTransaction";
import { useMe } from "../../hooks/users/useMe";
import { ConfirmationDialog } from "../../components/Dialog/ConfirmationDialog";
import { Pagination } from "../../components/Pagination";
import { BiTrash } from "react-icons/bi";
import { GrEdit } from "react-icons/gr";
import { useDeleteTransaction } from "../../hooks/transactions/useDeleteTransaction";
import { NewTransactionModal } from "../../components/Modals/NewTransaction";
import { dateFormat, numberFormat } from "../../components/Utils/utils";
import React, { useCallback, useState } from "react";
import CardsDashboard from "../../components/Cards/CardsDashboard";
import { useDashboard } from "../../hooks/dashboard/useDashboard";
import { Formik } from 'formik';
import { useIsFetching } from "react-query";
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from "@chakra-ui/icons";

interface ColumnsProps {
  name: string;
}

const LinkItems: Array<ColumnsProps> = [
  {name: 'Descrição'},
  {name: 'Situação'},
  {name: 'Data'},
  {name: 'Categoria'},
  {name: 'Tipo'},
  {name: 'Valor'},
  {name: 'Opções'},
];

export default function Transaction() {
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
  const {data: dash} = useDashboard(user?.id, month, year);
  const {data: transactions, isLoading, error} = useTransaction(page, keyword, month, year);
  const {mutate: deleteTransaction} = useDeleteTransaction();
  const padding = "1px";

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
        <CardsDashboard description={"Saldo Atual"} value={dash?.totalBalance} color={"blue"} />
        <CardsDashboard description={"Receitas"} value={dash?.totalRevenue} color={"green"} />
        <CardsDashboard description={"Despesas"} value={dash?.totalExpensive} color={"red"} />
        <CardsDashboard description={"Cartões"} value={dash?.totalExpensiveCards} color={"purple"} />
      </SimpleGrid>

      <Box boxShadow={"lg"} borderRadius={25}>
        <Flex w="100%" maxWidth={"auto"} mx={"auto"}>
          <Box flex={1} borderRadius={8} p={8} bg={mainColor}>
            <Flex mb={8} justify={"space-between"} align={"center"}>
              <HStack spacing={20}>
                <Heading size={"lg"} fontWeight={"bold"}>
                  Transações
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
                <IconButton
                  onClick={decreaseMonth}
                  color={"white"}
                  colorScheme={"gray"}
                  isRound={true}
                  aria-label={"button account"}
                  icon={<ChevronLeftIcon w={8} h={8} />}
                  size={"lg"}
                />
                <HStack p={0}>
                  <Text fontWeight={"bold"}>{
                    new Date(`"${month}"`).toLocaleDateString('pt-BR', {
                      month: 'long',
                    })}
                  </Text>
                  <Text fontWeight={"bold"}>{
                    new Date().toLocaleDateString('pt-BR', {
                      year: 'numeric',
                    })}
                  </Text>
                </HStack>
                <IconButton
                  onClick={incrementMonth}
                  color={"white"}
                  colorScheme={"gray"}
                  isRound={true}
                  aria-label={"button account"}
                  icon={<ChevronRightIcon w={8} h={8} />}
                  size={"lg"}
                />
              </HStack>
              <LightMode>
                <NewTransactionModal trigger={(open) =>
                  <Button as={"a"}
                          onClick={open}
                          size={"sm"}
                          fontSize={"sm"}
                          colorScheme={"facebook"}
                          leftIcon={<Icon as={RiAddLine} fontSize={"20"} />}
                  >Adicionar novo
                  </Button>
                } />
              </LightMode>
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
                <Text fontWeight={"bold"} fontSize={"24px"} pb={10}>Não há transações</Text>
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
                          <Td p={padding} textAlign={"center"}>
                            {transaction.paid ? (<TagW colorScheme={"green"} label={"PAGO"} />) : (
                              <TagW colorScheme={"red"} label={"PENDENTE"} />)}
                          </Td>
                          <Td textAlign={"center"} p={padding}>
                            {dateFormat(transaction.date)}
                          </Td>
                          <Td pl={0} pr={0} pt={padding} pb={padding}>
                            <Flex justify={"center"}>
                              <Text fontWeight={"bold"}>{transaction.transactionCategory}</Text>
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
                                <LightMode>
                                  <IconButton
                                    as={"a"}
                                    colorScheme={"facebook"}
                                    aria-label={"edit transaction"}
                                    size="sm"
                                    variant={"ghost"}
                                    icon={<Icon as={GrEdit} fontSize={"16"} color={"red"} />}
                                  />
                                </LightMode>

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
                                    title={"Deletar Usuário"} mainColor={mainColor} buttonText={"Deletar"}
                                    description={"Teste teste"} />
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
