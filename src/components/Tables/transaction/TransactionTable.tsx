import {
  Circle,
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
  Tooltip,
  Tr,
  useBreakpointValue,
  useColorMode,
  useColorModeValue,
  VStack,
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import React from "react";
import { CheckIcon, EditIcon, HamburgerIcon, RepeatIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { SkeletonTable } from "../../Skeletons/SkeletonTable";
import { Transaction } from "../../../hooks/transactions/useTransactionById";
import { NewTransactionModal } from "../../Modals/Transaction";
import { BiTrash } from "react-icons/bi";
import { ConfirmationDialog } from "../../Dialog/ConfirmationDialog";
import { useDeleteTransaction } from "../../../hooks/transactions/useDeleteTransaction";
import Tag from "../../Tag/Tag";
import { useAccounts } from "../../../hooks/accounts/useAccounts";
import { formatDate } from "../../../utils/chartData";
import { moneyFormat } from "../../Utils/utils";
import { CircleTag } from "../../Tag/CircleTag";
import { useDuplicateTransaction } from "../../../hooks/transactions/useDuplicateTransaction";
import { useCategories } from "../../../hooks/category/useCategories";
import { CCTransaction } from "../../../hooks/cc-transactions/type";
import { useThemeColors } from "../../../hooks/useThemeColors";
import { RiAttachmentLine, RiStickyNoteLine, RiStarLine, RiRefreshLine, RiPriceTag3Line, RiSettings3Line, RiFileList3Line } from "react-icons/ri";
import { ReceiptViewerModal } from "../../Modals/Transaction/ReceiptViewerModal";
import { MetadataEditor } from "../../Modals/Transaction/MetadataEditor";

type ProductTableProps = {
  content: Transaction[] | CCTransaction[];
  handleTableHeadButtonClick?: (activeButton: string) => void;
  onDeleteUser?: (userId: number) => void;
  isLoading: boolean;
  error: any;
}

// Componente para mostrar os metadados da transação como ícones
function TransactionMetadataIcons({ transaction }) {
  const isPaid = transaction.metadata?.hasPaidConfirmation;
  const isBankSlip = transaction.metadata?.isBankSlip;
  
  return (
    <Wrap spacing={1}>
      {transaction.metadata?.hasReceipt && (
        <WrapItem>
          <Tooltip label="Comprovante anexado" placement="top">
            <Icon as={RiAttachmentLine} color="blue.500" />
          </Tooltip>
        </WrapItem>
      )}
      {transaction.metadata?.hasObservation && (
        <WrapItem>
          <Tooltip label="Contém observação" placement="top">
            <Icon as={RiStickyNoteLine} color="purple.500" />
          </Tooltip>
        </WrapItem>
      )}
      {transaction.metadata?.isRecurring && (
        <WrapItem>
          <Tooltip label="Transação recorrente" placement="top">
            <Icon as={RiRefreshLine} color="green.500" />
          </Tooltip>
        </WrapItem>
      )}
      {isBankSlip && (
        <WrapItem>
          <Tooltip label="Boleto" placement="top">
            <Icon as={RiFileList3Line} color="teal.500" />
          </Tooltip>
        </WrapItem>
      )}
      {transaction.metadata?.isFavorite && (
        <WrapItem>
          <Tooltip label="Transação favorita" placement="top">
            <Icon as={RiStarLine} color="yellow.500" />
          </Tooltip>
        </WrapItem>
      )}
      {transaction.metadata?.tags && (
        <WrapItem>
          <Tooltip label={`Tags: ${transaction.metadata.tags}`} placement="top">
            <Icon as={RiPriceTag3Line} color="orange.500" />
          </Tooltip>
        </WrapItem>
      )}
    </Wrap>
  );
}

export default function ProductsTable({content, isLoading, error}: ProductTableProps) {
  const {colorMode} = useColorMode();
  const bg = useColorModeValue("white", "gray.700");
  const tableBg = useColorModeValue("gray.100", "gray.800");

  const { hoverRow, secondBorderColor, borderColor } = useThemeColors();

  //STATES
  const isMobile = useBreakpointValue({ base: true, md: true, lg: false });
  const [selectedProducts, setSelectedProducts] = React.useState([]);
  const allProducts = content?.map((product) => product.id);
  const allChecked = allProducts?.every((productId) => selectedProducts.includes(productId));
  const isIndeterminate = selectedProducts.some(Boolean) && !allChecked;
  const showFloatMenu = allChecked || isIndeterminate;
  const {data: categories, isLoading: isCategoryLoading} = useCategories(0, 10000);
  const {data: accounts} = useAccounts();
  const {mutate: deleteTransaction} = useDeleteTransaction();
  const {mutate: duplicateTransaction} = useDuplicateTransaction();

  //FUNCTIONS
  function handleDeleteTransaction(transactionId: number) {
    deleteTransaction(transactionId)
  }

  function handleDuplicateTransaction(transactionId: number) {
    duplicateTransaction(transactionId)
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
            <Thead borderColor={secondBorderColor} h={"35px"} bg={tableBg}>
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
                _hover={{bg: hoverRow}}
                h={"0px"}
                borderLeft={'1px'}
                borderRight={'1px'}
                borderColor={borderColor}
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
                                justify={"space-between"}
                                onClick={open}
                          >
                            <Flex direction={"row"} w={"full"} p={0} h={"50px"} alignItems={"center"}
                                  justify={"space-between"}>
                              <HStack>
                                <Circle size={"42px"} bg={"gray.200"} />
                                <VStack spacing={0} alignItems={"start"}>
                                  <Text fontWeight={"bold"} size={"0.95rem"}>{transaction.description}</Text>
                                  <TransactionMetadataIcons transaction={transaction} />
                                  <Text fontWeight={"medium"} size={"0.95rem"}>
                                    {accounts?.filter(acc => acc.id === transaction.accountId)
                                        .map((acc) => (
                                          acc.description
                                        ))}
                                  </Text>
                                </VStack>
                              </HStack>

                              <VStack spacing={1} alignItems={"end"}>
                                <Text fontWeight={"bold"}>{moneyFormat(transaction.amount)}</Text>
                                <HStack>
                                  {transaction.receiptId && (
                                    <ReceiptViewerModal
                                      transactionId={transaction.id}
                                      transactionDescription={transaction.description}
                                      trigger={(onOpen) => (
                                        <Tooltip label="Visualizar comprovante" placement="top">
                                          <Icon 
                                            as={RiAttachmentLine} 
                                            fontSize={"16px"} 
                                            color="blue.500"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              onOpen();
                                            }}
                                          />
                                        </Tooltip>
                                      )}
                                    />
                                  )}
                                  {transaction.metadata?.hasPaidConfirmation ? (
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
                                </HStack>
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
                      <Flex justify="flex-start" direction="column">
                        <Text fontWeight={"medium"}>{transaction.description}</Text>
                        <TransactionMetadataIcons transaction={transaction} />
                      </Flex>
                    </Td>

                    {/*SITUAÇÃO*/}
                    <Td pb={0} pt={0}>
                      <Flex justify="center">
                        <CircleTag isPaid={transaction.metadata?.hasPaidConfirmation ?? false} />
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
                        {isCategoryLoading ? (
                          <Spinner />
                        ) : (
                          <Text fontWeight={"medium"}>
                            {categories?.content?.filter(cat => cat.id === transaction.categoryId)
                              .map((category) => (
                                category.name
                              ))}
                          </Text>
                        )}
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
                    <Td pb={0} pt={0} textAlign={"center"}>
                      <Flex justify="center" align="center" gap={2}>
                        {transaction.receiptId && (
                          <ReceiptViewerModal
                            transactionId={transaction.id}
                            transactionDescription={transaction.description}
                            trigger={(onOpen) => (
                              <Tooltip label="Visualizar comprovante" placement="top">
                                <IconButton
                                  aria-label="Visualizar comprovante"
                                  icon={<Icon as={RiAttachmentLine} fontSize={"16px"} />}
                                  size="sm"
                                  colorScheme="blue"
                                  variant="outline"
                                  onClick={onOpen}
                                />
                              </Tooltip>
                            )}
                          />
                        )}
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            aria-label='Options'
                            icon={<HamburgerIcon />}
                            variant='solid'
                          />
                          <MenuList>
                            <NewTransactionModal
                              transactionType={transaction.transactionType}
                              edit={true}
                              transactionId={transaction.id}
                              trigger={(open) => (
                                <MenuItem icon={<EditIcon />} onClick={open}>
                                  Editar
                                </MenuItem>
                              )}
                            />
                            {transaction.receiptId && (
                              <ReceiptViewerModal
                                transactionId={transaction.id}
                                transactionDescription={transaction.description}
                                trigger={(onOpen) => (
                                  <MenuItem icon={<Icon as={RiAttachmentLine} />} onClick={onOpen}>
                                    Ver comprovante
                                  </MenuItem>
                                )}
                              />
                            )}
                            <MetadataEditor
                              transactionId={transaction.id}
                              transactionDescription={transaction.description}
                              initialMetadata={transaction.metadata}
                              trigger={(onOpen) => (
                                <MenuItem icon={<Icon as={RiSettings3Line} />} onClick={onOpen}>
                                  Editar metadados
                                </MenuItem>
                              )}
                            />
                            <ConfirmationDialog
                              title={"Duplicar Transação"}
                              mainColor={"white"}
                              buttonText={"Duplicar"}
                              description={"A duplicação cria uma nova transação com base nesta atual com a data somando mais um mês. Deseja continuar com a duplicação? "}
                              variant={"alert"}
                              onOk={() => handleDuplicateTransaction(transaction.id)}
                              trigger={(onOpen) => (
                                <MenuItem onClick={onOpen} icon={<RepeatIcon />}>
                                  Duplicar
                                </MenuItem>
                              )}
                            />
                            <ConfirmationDialog
                              title={"Deletar Transação"}
                              mainColor={"white"}
                              buttonText={"Deletar"}
                              description={"Deseja deletar essa transação?"}
                              variant={"danger"}
                              onOk={() => handleDeleteTransaction(transaction.id)}
                              trigger={(onOpen) => (
                                <MenuItem onClick={onOpen} icon={<Icon as={BiTrash} fontSize={"13px"} />}>
                                  Deletar
                                </MenuItem>
                              )}
                            />
                          </MenuList>
                        </Menu>
                      </Flex>
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
