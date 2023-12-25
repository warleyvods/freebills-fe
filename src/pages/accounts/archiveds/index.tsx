import React from 'react';
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  LightMode,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  VStack
} from "@chakra-ui/react";
import { useAccountArchived } from "../../../hooks/accounts/useAccountsArchived";
import { ConfirmationDialog } from "../../../components/Dialog/ConfirmationDialog";
import { BiTrash } from "react-icons/bi";
import { useUpdateArchiveAccount } from "../../../hooks/accounts/useUpdateArchiveAcc";
import { useDeleteAccount } from "../../../hooks/accounts/useDeleteAccount";
import { RepeatIcon } from "@chakra-ui/icons";
import { accountType, numberFormat } from "../../../components/Utils/utils";
import SideBarLayout from "../../../components/SidebarLayout/SideBarLayout";
import HeadingTable from "../../../components/Tables/HeadingTable";

interface ColumnsProps {
  name: string;
}

const items: Array<ColumnsProps> = [
  {name: 'Descrição'},
  {name: 'Tipo da Conta'},
  {name: 'Saldo Atual'},
  {name: 'Opções'},
];

export default function ArchivedAccount() {
  const mainColor = useColorModeValue('white', 'gray.800');
  const {data: accounts, isLoading, isFetching, error} = useAccountArchived();
  const {mutate: deleteAccount} = useDeleteAccount();
  const updateArchiveAcc = useUpdateArchiveAccount();


  function handleDeleteAccount(accountId: number) {
    deleteAccount(accountId);
  }

  function handleRestoreAccount(id: number) {
    const archived = false;
    updateArchiveAcc.mutate({id, archived})
  }

  return (
    <SideBarLayout>
      <Box>
        <Flex w="100%" maxWidth={"auto"} mx={"auto"} flexDirection={"column"}>
            <HeadingTable title={"Contas arquivadas"} isLoading={isLoading} />
            {isLoading ? (
              <Flex justify={"center"}>
                <Spinner />
              </Flex>
            ) : error ? (
              <Flex justify={"center"}>
                <Text>Falha ao obter dados</Text>
              </Flex>
            ) : accounts.length === 0 ? (
              <Center>
                <VStack>
                  <Image boxSize='200px'
                         src="https://cdn-icons-png.flaticon.com/512/5058/5058385.png"
                         alt="React Logo" />
                  <Text fontWeight={"bold"} fontSize={"24px"} pb={10}>Não há contas</Text>
                </VStack>
              </Center>
            ) : (
              <>
                <Table bg={mainColor}>
                  <Thead>
                    <Tr>
                      {items.map((columns, index) => (
                        <Th key={columns.name}>
                          <Flex
                            justify={index == 0 ? 'start' : 'center' && index == (items.length - 1) ? 'flex-end' : 'center'}>
                            {columns.name}
                          </Flex>
                        </Th>
                      ))}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {accounts.map(account => {
                      return (
                        <Tr key={account.id}>
                          <Td>
                            <Box>
                              <Text fontSize={"md"} fontWeight={"bold"}>{account.description}</Text>
                            </Box>
                          </Td>
                          <Td pl={0} pr={0}>
                            <Flex justify={"center"}>
                              <Text fontWeight={"normal"}>{accountType[account.accountType]}</Text>
                            </Flex>
                          </Td>
                          <Td pl={0} pr={0}>
                            <Flex justify={"center"}>
                              <Text fontWeight={"normal"}>{numberFormat(account.amount)}</Text>
                            </Flex>
                          </Td>
                          <Td pl={0} pr={0}>
                            <Flex justify={"flex-end"}>
                              <HStack>
                                <LightMode>
                                  <Button
                                    onClick={() => handleRestoreAccount(account.id)}
                                    size={"sm"}
                                    fontSize={"sm"}
                                    colorScheme={"facebook"}
                                    leftIcon={<RepeatIcon />}
                                  >
                                    Restaurar
                                  </Button>
                                </LightMode>

                                <LightMode>
                                  <ConfirmationDialog
                                    onOk={() => handleDeleteAccount(account.id)}
                                    trigger={(onOpen) => <IconButton
                                      as={"a"}
                                      colorScheme={"red"}
                                      aria-label={"Call Segun"}
                                      size="sm"
                                      icon={<Icon as={BiTrash} fontSize={"16"} />}
                                      onClick={onOpen} />}
                                    title={"Deletar Conta"} mainColor={mainColor} buttonText={"Deletar"}
                                    description={`
                                    Você tem certeza que deseja deletar a conta ${account.description}? 
                                    Atenção: Ao deletar essa conta, todas as receitas, despesas e transferências associadas a ela serão deletadas.`}
                                    variant={"danger"}
                                  />
                                </LightMode>
                              </HStack>
                            </Flex>
                          </Td>
                        </Tr>
                      )
                    })}
                  </Tbody>
                </Table>
              </>
            )}
        </Flex>
      </Box>
    </SideBarLayout>
  )
};

