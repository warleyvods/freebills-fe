import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
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
  useToast
} from "@chakra-ui/react";
import { RiAddLine, RiCloseLine, RiPencilLine } from "react-icons/ri";

import { Pagination } from "../../components/Pagination";
import NextLink from 'next/link';
import { useUsers } from "../../hooks/users/useUsers";
import { useState } from "react";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";
import { useMutation } from "react-query";
import { ConfirmationDialog } from "../../components/Dialog/ConfirmationDialog";
import TagW from "../../components/Tag";
import { useMe } from "../../hooks/users/useMe";
import SidebarWithHeader from "../../components/SideBar";

interface ColumnsProps {
  name: string;
}

const LinkItems: Array<ColumnsProps> = [
  {name: 'Nome'},
  {name: 'Admin'},
  {name: 'Status'},
  {name: 'Dt. Criação'},
  {name: 'Dt. Ult. Acesso'},
  {name: 'Opções'},
];

export default function UserList() {
  const mainColor = useColorModeValue('white', 'gray.800');
  const buttonColor = useColorModeValue('green', 'green');
  const description = "Você está prestes a deletar um usuário, deseja continuar?"
  const {data: me} = useMe();

  const toast = useToast()
  const [page, setPage] = useState(0)
  const {data, isLoading, isFetching, error} = useUsers(page);

  const deleteUser = useMutation(async (userId: number) => {
    const response = await api.delete(`v1/user/${userId}`)
    return response.data.user;
  }, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['users'])
    }, onError: (err: any) => {
      toast({
        title: err.response.data.title,
        description: err.response.data.details,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  });

  const handleDeleteUser = async (userId: number) => {
    await deleteUser.mutateAsync(userId)
  }

  async function handlePrefetchUser(userId: number) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`v1/user/${userId}`)

      return response.data;
    }, {
      staleTime: 1000 * 60 * 10,
    })
  }

  return (
    <SidebarWithHeader>
      <Box>
        <Flex w="100%" maxWidth={"auto"} mx={"auto"}>
          <Box flex={1} borderRadius={8} p={8} bg={mainColor}>
            <Flex mb={8} justify={"space-between"} align={"center"}>
              <Heading size={"lg"} fontWeight={"bold"}>
                Usuários
                {!isLoading && isFetching && <Spinner size={"sm"} color={"gray.500"} ml={4} />}
              </Heading>
              <LightMode>
                <NextLink href={"/users/create"} passHref>

                  <Button as={"a"}
                          size={"sm"}
                          fontSize={"sm"}
                          colorScheme={buttonColor}
                          leftIcon={<Icon as={RiAddLine} fontSize={"20"} />}
                  >Adicionar novo
                  </Button>

                </NextLink>
              </LightMode>

            </Flex>

            {isLoading ? (
              <Flex justify={"center"}>
                <Spinner />
              </Flex>
            ) : error ? (
              <Flex justify={"center"}>
                <Text>Falha ao obter dados dos usuarios</Text>
              </Flex>
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
                    {data.content.map(user => {
                      return (
                        <Tr key={user.id}>
                          <Td>
                            <Box>
                              <Text onMouseEnter={() => handlePrefetchUser(user.id)}
                                    fontWeight={"bold"}
                                    color={mainColor == 'white' ? 'gray.700' : 'purple.400'}
                              >{user.name}
                              </Text>
                              <Text fontSize={"sm"} color={"gray.300"}>{user.email}</Text>
                            </Box>
                          </Td>
                          <Td pl={0} pr={0}>
                            <Flex justify={"center"}>
                              {user.admin ? (
                                <TagW colorScheme={"green"} label={"SIM"} />
                              ) : (
                                <TagW colorScheme={'red'} label={'NAO'} />
                              )}
                            </Flex>
                          </Td>
                          <Td pl={0} pr={0}>
                            <Flex justify={"center"}>
                              {user.active ? (
                                <TagW colorScheme={"green"} label={"ATIVO"} />
                              ) : (
                                <TagW colorScheme={'red'} label={'INATIVO'} />
                              )}
                            </Flex>
                          </Td>
                          <Td pl={0} pr={0}>
                            <Flex justify={"center"}>
                              <Text fontWeight={"bold"}>{user.createdAt}</Text>
                            </Flex>
                          </Td>
                          <Td pl={0} pr={0}>
                            <Flex justify={"center"}>
                              <Text fontWeight={"bold"}>{user.lastAccess}</Text>
                            </Flex>
                          </Td>
                          <Td pl={0} pr={0}>
                            <Flex justify={"flex-end"}>
                              <HStack>
                                <LightMode>
                                  <NextLink
                                    href={{
                                      pathname: '/users/[id]',
                                      query: {id: user.id},
                                    }}
                                    passHref
                                  >
                                    <Button
                                      isDisabled={user.name === 'Administrator'}
                                      size={"sm"}
                                      fontSize={"sm"}
                                      colorScheme={"facebook"}
                                      leftIcon={<Icon as={RiPencilLine} fontSize={"16"} />}
                                    >
                                      Editar
                                    </Button>
                                  </NextLink>
                                </LightMode>

                                <LightMode>
                                  <ConfirmationDialog
                                    onOk={() => handleDeleteUser(user.id)}
                                    disabled={user.name === 'Administrator' || user.id === me.id}
                                    trigger={(onOpen) => <IconButton
                                      isDisabled={user.name === 'Administrator' || user.id === me.id}
                                      as={"a"}
                                      colorScheme={"red"}
                                      aria-label={"Call Segun"}
                                      size="sm"
                                      icon={<Icon as={RiCloseLine} fontSize={"16"} />}
                                      onClick={onOpen} />}
                                    title={"Deletar Usuário"} mainColor={mainColor} buttonText={"Deletar"}
                                    description={description} />
                                </LightMode>
                              </HStack>
                            </Flex>
                          </Td>
                        </Tr>
                      )
                    })}
                  </Tbody>
                </Table>
                <Pagination totalCountOfRegisters={data.totalElements} currentPage={page} onPageChange={setPage} />
              </>
            )}
          </Box>
        </Flex>
      </Box>
    </SidebarWithHeader>
  );
}
