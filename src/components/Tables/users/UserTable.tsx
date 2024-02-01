import {
  Box,
  Checkbox,
  Divider,
  Flex,
  IconButton,
  Link,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  VStack
} from '@chakra-ui/react'
import NextLink from 'next/link';
import React from "react";
import { FloatingComponent } from "../components/FloatingComponent";
import Tag from "../../Tag/Tag";
import { DeleteIcon } from "@chakra-ui/icons";
import { ConfirmationDialog } from "../../Dialog/ConfirmationDialog";
import { useDeleteBatchUsers } from "../../../hooks/users/useDeleteBatchUsers";


interface Users {
  id: number;
  name: string;
  email: string;
  admin: boolean;
  active: boolean;
  createdAt: string;
  lastAccess: string;
}

type UserTableProps = {
  content: Users[];
  onDeleteUser?: (userId: number) => void;
  isLoading: boolean;
  error: any;
  handleTableHeadButtonClick?: (activeButton: string) => void;
}

export default function UserTable({content, isLoading, error, onDeleteUser}: UserTableProps) {

  const isMobile = useBreakpointValue({base: true, md: true, lg: false});
  const [selectedUsers, setSelectedUsers] = React.useState([]);
  const allUsers = content?.map((user) => user.id);
  const allChecked = allUsers?.every((userId) => selectedUsers.includes(userId));
  const isIndeterminate = selectedUsers.some(Boolean) && !allChecked;
  const showFloatMenu = allChecked || isIndeterminate;
  const deleteSelectUsers = useDeleteBatchUsers();

  const handleDeleteBatchUsers = () => {
    setSelectedUsers([]);
    deleteSelectUsers.mutate(selectedUsers);
  }

  const handleCheckAllChange = (e) => {
    if (e.target.checked) {
      const newCheckedItems = content?.map((product) => product.id);
      setSelectedUsers(newCheckedItems);
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectedUsers = (userId: number) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {''
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  return (
    isLoading ? (
      <Flex justify="center">
        <Spinner />
      </Flex>
    ) : error ? (
      <Flex justify="center">
        <Text>Falha ao obter dados dos usuários</Text>
      </Flex>
    ) : (
      <>
        <Table variant={isMobile ? 'unstyled' : 'simple'} bg={"white"}>
          {!isMobile && (
            <Thead borderTop={"1px"} borderColor={"gray.100"} h={"35px"} bg={"gray.50"}>
              <Tr>
                <Th pl={5} pt={0} pr={0} pb={0} textAlign="start" maxW={"20px"} minW={"60px"} w={"60px"}>
                  <Checkbox
                    isChecked={allChecked}
                    isIndeterminate={isIndeterminate}
                    onChange={handleCheckAllChange}
                  />
                </Th>
                <Th pl={5} pt={2} pb={1} textAlign="start">Nome</Th>
                <Th pl={5} pt={0} pr={5} pb={0} textAlign="center">Admin</Th>
                <Th pl={5} pt={0} pr={5} pb={0} textAlign="center">Status</Th>
                <Th pl={5} pt={0} pr={5} pb={0} textAlign="center">Criado em</Th>
                <Th pl={5} pt={0} pr={5} pb={0} textAlign="center">Último Acesso</Th>
              </Tr>
            </Thead>
          )}
          <Tbody>
            {content.map((user) => (
              <Tr
                key={user.id}
                _hover={{bg: "gray.10"}}
                h={"57px"}
              >
                {isMobile ? (
                  <Td p={"5px"}>
                    <NextLink href={`/users/${user.id}`} passHref>
                      <Flex p={4}
                            borderWidth={1}
                            borderRadius="md"
                            boxShadow="sm"
                            borderColor={"gray.100"}
                            justify={"space-between"}
                      >
                        <Flex direction={"column"}>
                          <VStack spacing={"0"} justify={"flex-start"} alignItems={"flex-start"} mb={"10px"}>
                            <Text fontSize="md" fontWeight="medium" color="black.400">{user.name}</Text>
                            <Text fontSize="sm" color="gray.300">{user.email}</Text>
                          </VStack>
                          <VStack spacing={"0"} justify={"flex-start"} alignItems={"flex-start"}>
                            <Tag variant={user.active ? "green" : "red"} label={user.active ? "Ativo" : "Inativo"} />
                          </VStack>
                        </Flex>
                        <VStack>
                          <ConfirmationDialog
                            title="Deletar Usuário"
                            buttonText="Deletar"
                            description="Você tem certeza de que deseja desativar sua conta? Todos os seus dados serão permanentemente removidos. Essa ação não pode ser desfeita."
                            onOk={() => onDeleteUser(user.id)}
                            mainColor={'white'}
                            variant={'danger'}
                            trigger={(onOpen) => {
                              return (
                                <IconButton
                                  margin={"20px -5px 0px 0px"}
                                  color={"customRed.500"}
                                  variant={"ghost"}
                                  aria-label={'delete'}
                                  icon={<DeleteIcon />}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onOpen();
                                  }}
                                />
                              )
                            }}
                          />
                        </VStack>
                      </Flex>
                    </NextLink>
                  </Td>
                ) : (
                  <>
                    <Td pl={5} pt={0} pr={0} pb={0} m={0}>
                      <Checkbox
                        key={user.id}
                        isChecked={selectedUsers.includes(user.id)}
                        onChange={() => handleSelectedUsers(user.id)}
                      />
                    </Td>
                    <Td pl={5} pt={2} pb={1}>
                      <Box>
                        <NextLink
                          href={{
                            pathname: "/users/[id]",
                            query: {id: user.id},
                          }}
                          passHref
                        >
                          <Link>
                            <Text fontSize="1rem" fontWeight="medium" color="black.400">
                              {user.name}
                            </Text>
                          </Link>
                        </NextLink>
                        <Text fontSize="0.875rem" color="gray.300">{user.email}</Text>
                      </Box>
                    </Td>
                    <Td pl={5} pr={5}>
                      <Flex justify="center">
                        <Tag variant={user.admin ? "green" : "red"} label={user.admin ? "Sim" : "Nao"} />
                      </Flex>
                    </Td>
                    <Td p={0}>
                      <Flex justify="center">
                        <Tag variant={user.active ? "green" : "red"} label={user.active ? "Ativo" : "Inativo"} />
                      </Flex>
                    </Td>
                    <Td p={0}>
                      <Flex justify="center">
                        <Text fontWeight="medium">{user.createdAt}</Text>
                      </Flex>
                    </Td>
                    <Td p={0}>
                      <Flex justify="center">
                        <Text fontWeight="medium">{user.lastAccess}</Text>
                      </Flex>
                    </Td>
                  </>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Flex position={"sticky"} justify={"center"} alignItems={"center"} bottom={"0px"}
              p={showFloatMenu ? "1rem" : "none"} flexDirection={"column"}>
          <FloatingComponent showFloatMenu={showFloatMenu}
                             selects={selectedUsers}
                             handleDeleteBatchSelected={handleDeleteBatchUsers} />
        </Flex>
        {showFloatMenu && <Divider />}
      </>
    )
  );
}
