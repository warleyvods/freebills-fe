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
  useColorModeValue
} from "@chakra-ui/react";
import { RiAddLine, RiCloseLine, RiPencilLine } from "react-icons/ri";
import SidebarWithHeader from "../../components/SideBar";


import NextLink from 'next/link';
import { ConfirmationDialog } from "../../components/Dialog/ConfirmationDialog";
import { useUsers } from "../../hooks/useUsers";
import { useDeleteUser } from "../../hooks/useDeleteUser";


interface ColumnsProps {
  name: string;
}

const LinkItems: Array<ColumnsProps> = [
  {name: 'Nome'},
  {name: 'CPF'},
  {name: 'Idade'},
  {name: 'Dt. Criação'},
  {name: 'Opções'},
];

export default function UserList() {
  const mainColor = useColorModeValue('white', 'gray.800');
  const buttonColor = useColorModeValue('green', 'green');
  const description = "Você está prestes a deletar um usuário, deseja continuar?"

  const {data, isLoading, isFetching, error} = useUsers();

  const deleteUser = useDeleteUser()

  const handleDeleteUser = async (userId: number) => {
    await deleteUser.mutateAsync(userId)
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
                  {data.map(user => {
                    return (
                      <Tr key={user.id}>
                        <Td>
                          <Box>
                            <Text fontWeight={"bold"} color={mainColor == 'white' ? 'gray.700' : 'purple.400'}
                            >{user.name}
                            </Text>
                            <Text fontSize={"sm"} color={"gray.300"}>email@email.com</Text>
                          </Box>
                        </Td>
                        <Td pl={0} pr={0}>
                          <Flex justify={"center"}>
                            <Text>{user.cpf}</Text>
                          </Flex>
                        </Td>
                        <Td pl={0} pr={0}>
                          <Flex justify={"center"}>
                            <Flex justify={"center"}>
                              <Text>{user.age}</Text>
                            </Flex>
                          </Flex>
                        </Td>
                        <Td pl={0} pr={0}>
                          <Flex justify={"center"}>
                            <Text fontWeight={"bold"}>2020/01/20</Text>
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
                                  trigger={(onOpen) => <IconButton
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
            </>
          )}
        </Box>
      </Flex>
    </Box>
    </SidebarWithHeader>
  );
}
