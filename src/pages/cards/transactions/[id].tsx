import SideBarLayout from "../../../components/SidebarLayout/SideBarLayout";
import React, { useEffect, useState } from "react";
import { Box, Button, Flex, HStack, Icon, IconButton, LightMode, Select, Spinner } from "@chakra-ui/react";
import { InternalTableHead } from "../../../components/Tables/components/InternalTableHead";
import { EmptyResultsBox } from "../../../components/Tables/components/EmptyResultsBox";
import { Pagination } from "../../../components/Pagination";
import { Options } from "../../../utils/utils";
import { RiAddLine } from "react-icons/ri";
import { useCCTransactions } from "../../../hooks/cc-transactions/useCcTransaction";
import { useRouter } from "next/router";
import { useCreditCards } from "../../../hooks/cards/useCreditCards";
import { queryClient } from "../../../services/queryClient";
import { QueryKeys } from "../../../hooks/queryKeys";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import CCTransactionTable from "../../../components/Tables/transaction/CCTransactionTable";
import { NewCCTransactionModal } from "../../../components/Modals/Transaction/CCTransaction";

const menuOptions: Options[] = [
  {value: 'description', label: 'Descrição'},
  {value: 'paid', label: 'Situação'},
  {value: 'account', label: 'Conta'},
  {value: 'date', label: 'Data'},
  {value: 'transactionCategory', label: 'Categoria'},
  {value: 'transactionType', label: 'Tipo'},
  {value: 'amount', label: 'Valor'},
];

const buttonOptions = [];

type RouteParams = {
  id: string;
}

export default function CardTransactions() {
  const router = useRouter()
  const {id} = router.query as RouteParams;

  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())
  const [active, setActive] = useState(null);
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState(null);
  const [sortComplete, setSortComplete] = useState('');
  const [size, setSize] = useState(10);
  const [selectedCard, setSelectedCard] = useState(null);

  const cardIsLoadead = Number.isFinite(selectedCard);

  const {data: creditCards, isLoading: isLoadingCreditCard} = useCreditCards(false);
  const {
    data: transactions,
    isLoading: isLoadingCcTransaction,
    error
  } = useCCTransactions(Number(id), page, size, sortComplete, keyword);

  const handleChangeYear = (year: number) => {
    setYear(year)
  };

  const handleChangeMonth = (month: number) => {
    setMonth(month)
  };

  const handleTableHeadButtonClick = (activeButton: string) => {
    setActive(activeButton === "REVENUE" ? "REVENUE" : activeButton === "EXPENSE" ? "EXPENSE" : null);
  };

  const handleDeleteProduct = (productId: number) => {
  };

  const handleSortCompleteChange = (newSortComplete: string) => {
    setSortComplete(newSortComplete);
  };

  const handleSizeChange = (newValue: number) => {
    setSize(newValue);
    setPage(0);
  };

  const handleKeyword = (keyword: string) => {
    setKeyword(keyword)
  }

  const handleCardSelect = (event: any) => {
    const selectedCardId = event.target.value;
    router.replace(`/cards/transactions/${selectedCardId}`);
    queryClient.invalidateQueries([QueryKeys.CC_TRANSACTIONS]);
  };

  useEffect(() => {
    if (!isLoadingCreditCard && id && creditCards) {
      const selected = creditCards.find((card) => card.id === Number(id));
      if (selected) {
        setSelectedCard(selected.id);
      }
    }
  }, [id, creditCards, isLoadingCreditCard]);

  return (
    <SideBarLayout>
      <Box w={"full"} flexDirection={"row"}>
        <Flex w={"full"} h={"50px"} alignItems={"center"} justify={"space-between"}>
          <HStack>
            <NextLink
              href={{
                pathname: `/cards`,
              }}
              passHref
            >
              <IconButton
                isRound={true}
                variant={"solid"}
                aria-label={"button account"}
                icon={<ChevronLeftIcon fontSize={"26px"} />}
                size={"sm"}
              />
            </NextLink>
            {isLoadingCreditCard ? (
              <Flex bg="indigo.400"
                    color="white"
                    _focus={{boxShadow: "outline"}}
                    borderRadius="full"
                    w={"200px"}
                    h={"32px"}
                    alignItems={"center"}
                    pl={"10px"}
              >
                <Spinner size={"sm"} />
              </Flex>
            ) : (
               cardIsLoadead && (
                  <Select
                    onChange={handleCardSelect}
                    borderRadius="full"
                    border="none"
                    bg="indigo.400"
                    color="white"
                    _focus={{boxShadow: "outline"}}
                    value={selectedCard}
                    width="fit-content"
                    size={"sm"}
                  >
                    {creditCards?.map((card) => (
                      <option key={card.id} value={card.id} style={{
                        backgroundColor: "blue.500",
                        color: "black",
                        borderRadius: "0px"
                      }}>
                        Transações: {card.description}
                      </option>
                    ))}
                  </Select>
                )
            )}
          </HStack>
          <NewCCTransactionModal
            ccId={selectedCard}
            trigger={onOpen => (
              <LightMode>
                <Button
                  size={"sm"}
                  onClick={onOpen}
                  fontSize={"sm"}
                  variant={"default"}
                  leftIcon={<Icon as={RiAddLine} fontSize={"20"} />}
                >
                  Adicionar Transação
                </Button>
              </LightMode>
            )}
          />
        </Flex>
        <Box
          borderRadius={5}
          border={"1px solid gray.100"}
          boxShadow="0px 0px 4px rgba(0, 0, 0, 0.1)"
        >
          <InternalTableHead
            key={id}
            onTableHeadButtonClick={handleTableHeadButtonClick}
            onSortCompleteChange={handleSortCompleteChange}
            menuOptions={menuOptions}
            buttonsOptions={buttonOptions}
            onSearchBar={handleKeyword}
            activeSearchBar={true}
          />
          {transactions?.content.length === 0 ? (
            <EmptyResultsBox
              path={"/dashboard/transactions/create"}
              buttonText={"Adicionar produto"}
              title={
                active === null
                  ? "Nenhum transação encontrada"
                  : active === 'REVENUE'
                    ? "Nenhuma receita encontrada"
                    : "Nenhuma despesa encontrada"
              }
            />
          ) : (
            <>
              <CCTransactionTable
                content={transactions?.content}
                onDeleteUser={handleDeleteProduct}
                isLoading={isLoadingCcTransaction}
                error={error}
                handleTableHeadButtonClick={handleTableHeadButtonClick}
              />
              <Pagination
                totalCountOfRegisters={transactions?.totalElements}
                currentPage={page}
                onPageChange={setPage}
                registerPerPage={size}
                handleSizeChange={handleSizeChange}
                changePageSize={true}
              />
            </>
          )}
        </Box>
      </Box>
    </SideBarLayout>
  );
}
