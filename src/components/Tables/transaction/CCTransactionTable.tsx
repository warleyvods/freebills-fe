import {
  Flex,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  VStack
} from '@chakra-ui/react'
import React from "react";
import { EditIcon, HamburgerIcon } from "@chakra-ui/icons";
import { SkeletonTable } from "../../Skeletons/SkeletonTable";
import { BiTrash } from "react-icons/bi";
import { ConfirmationDialog } from "../../Dialog/ConfirmationDialog";
import { useDeleteTransaction } from "../../../hooks/transactions/useDeleteTransaction";
import { useAccounts } from "../../../hooks/accounts/useAccounts";
import { formatDate } from "../../../utils/chartData";
import { moneyFormat } from "../../Utils/utils";
import { useCategories } from "../../../hooks/category/useCategories";
import { CCTransaction } from "../../../hooks/cc-transactions/type";
import { NewCCTransactionModal } from "../../Modals/Transaction/CCTransaction";

type CCTransactionProps = {
  content: CCTransaction[];
  handleTableHeadButtonClick?: (activeButton: string) => void;
  onDeleteUser?: (userId: number) => void;
  isLoading: boolean;
  error: any;
}

export default function CCTransactionTable({content, isLoading, error}: CCTransactionProps) {
  const { colorMode } = useColorMode();
  const bg = useColorModeValue("white", "gray.700");
  const tableBg = useColorModeValue("gray.100", "gray.800");
  const borderColor = useColorModeValue("gray.100", "gray.100");

  //STATES
  const isMobile = useBreakpointValue({base: true, md: true, lg: false});
  const {data: categories, isLoading: isCategoryLoading} = useCategories();
  const {data: accounts} = useAccounts();
  const {mutate: deleteTransaction} = useDeleteTransaction();

  //FUNCTIONS
  function handleDeleteCCTransaction(ccTransactionId: number) {
    deleteTransaction(ccTransactionId)
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
                <Th textAlign="center">Data</Th>
                <Th textAlign="center">Categoria</Th>
                <Th textAlign="center">Valor</Th>
                <Th textAlign="end">Opções</Th>
              </Tr>
            </Thead>
          )}
          <Tbody>
            {content?.map((transaction, index) => (
              <Tr
                key={transaction.id}
                _hover={{bg: colorMode === 'light' ? 'gray.50' : '#333537'}}
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
                        -
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
                        { isCategoryLoading ? (
                          <Spinner size={"sm"} />
                          ) : (
                          <Text fontWeight={"medium"}>
                            {categories.content?.filter(cat => cat.id === Number(transaction.categoryId))
                              .map((category) => (
                                category.name
                              ))}
                          </Text>
                        )}
                      </Flex>
                    </Td>

                    {/*VALOR*/}
                    <Td pb={0} pt={0}>
                      <Flex justify="center">
                        <Text fontWeight={"bold"}>{moneyFormat(transaction.amount)}</Text>
                      </Flex>
                    </Td>

                    {/*OPÇÕES*/}
                    <Td pb={0} pt={0} pr={3} textAlign={"end"}>
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          aria-label='Options'
                          icon={<HamburgerIcon />}
                          variant='solid'
                        />
                        <MenuList>
                          <NewCCTransactionModal
                            edit={true}
                            ccTransactionId={transaction.id}
                            trigger={onOpen => (
                                <MenuItem onClick={onOpen} icon={<EditIcon />}>
                                  Editar
                                </MenuItem>
                            )}
                          />
                          <ConfirmationDialog
                            title={"Deletar Transação"}
                            mainColor={"white"}
                            buttonText={"Deletar"}
                            description={"Deseja deletar essa transação?"}
                            variant={"danger"}
                            onOk={() => handleDeleteCCTransaction(transaction.id)}
                            trigger={(onOpen) => (
                              <MenuItem onClick={onOpen} icon={<Icon as={BiTrash} fontSize={"13px"} />}>
                                Deletar
                              </MenuItem>
                            )}
                          />
                        </MenuList>
                      </Menu>
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
