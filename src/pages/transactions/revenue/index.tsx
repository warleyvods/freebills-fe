import { Box, HStack, IconButton } from "@chakra-ui/react";
import { useDeleteTransaction } from "../../../hooks/transactions/useDeleteTransaction";
import React, { useState } from "react";
import { useTransaction } from "../../../hooks/transactions/useTransaction";
import HeadingTable from "../../../components/Tables/HeadingTable";
import SideBarLayout from "../../../components/SidebarLayout/SideBarLayout";
import { InternalTableHead } from "../../../components/Tables/components/InternalTableHead";
import { EmptyResultsBox } from "../../../components/Tables/components/EmptyResultsBox";
import TransactionTable from "../../../components/Tables/transaction/TransactionTable";
import { Pagination } from "../../../components/Pagination";
import { Options } from "../../../utils/utils";
import { InfoDashboardCard } from "../../../components/InfoCards";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useThemeColors } from "../../../hooks/useThemeColors";

const menuOptions: Options[] = [
  {value: 'description', label: 'Descrição'},
  {value: 'paid', label: 'Situação'},
  {value: 'account', label: 'Conta'},
  {value: 'date', label: 'Data'},
  {value: 'transactionCategory', label: 'Categoria'},
  {value: 'transactionType', label: 'Tipo'},
  {value: 'amount', label: 'Valor'},
];

export default function TransactionRevenue() {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [showCardInfo, setShowCardInfo] = useState(true);
  const [active, setActive] = useState(null);
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState(null);
  const [sortComplete, setSortComplete] = useState('description,desc');
  const [selectedValuePage, setSelectedValuePage] = useState(10);
  const {
    buttonGreen,
    borderButtonGreen,
    internalIconGreen,
    buttonRed,
    borderButtonRed,
    internalIconRed,
    borderColor
  } = useThemeColors();

  const {
    data: transactions,
    isLoading,
    error
  } = useTransaction(page, keyword, month, year, sortComplete, active, selectedValuePage);

  const {mutate: deleteTransaction} = useDeleteTransaction();

  const buttonOptions = [
    {
      value: null,
      label: 'Tudo',
      active: false,
      bgColor: 'indigo.300',
      borderColor: 'indigo.300',
      textColor: 'white'
    },
    {
      value: 'REVENUE',
      label: 'Entradas',
      active: false,
      bgColor: buttonGreen,
      borderColor: borderButtonGreen,
      textColor: internalIconGreen
    },
    {
      value: 'EXPENSE',
      label: 'Saídas',
      active: false,
      bgColor: buttonRed,
      borderColor: borderButtonRed,
      textColor: internalIconRed
    }
  ];

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
    deleteTransaction(productId);
  };

  const handleSortCompleteChange = (newSortComplete) => {
    setSortComplete(newSortComplete);
  };

  const handleSizeChange = (newValue) => {
    setSelectedValuePage(newValue);
    setPage(0);
  };

  const handleKeyword = (keyword: string) => {
    setKeyword(keyword)
  }

  const handleToggleCards = () => {
    setShowCardInfo((prevShowCards) => !prevShowCards);
  };

  return (
    <SideBarLayout>
      <Box w={"full"} flexDirection={"row"}>
        {!showCardInfo && (
          <HStack justifyContent={"space-between"}>
            <HeadingTable
              title={"Transações"}
              isLoading={isLoading}
            />
            <IconButton
              variant={"ghost"}
              aria-label="Toggle card info"
              icon={showCardInfo ? <FaEye /> : <FaEyeSlash />}
              onClick={handleToggleCards}
            />
          </HStack>
        )}
        <InfoDashboardCard
          onUpdateYear={handleChangeYear}
          onUpdateMonth={handleChangeMonth}
          dashboardType={active}
          showCardInfo={showCardInfo}
        />
        <Box borderRadius={5}>
          <InternalTableHead
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
              <TransactionTable
                content={transactions?.content}
                onDeleteUser={handleDeleteProduct}
                isLoading={isLoading}
                error={error}
                handleTableHeadButtonClick={handleTableHeadButtonClick}
              />
              <Pagination
                totalCountOfRegisters={transactions?.totalElements}
                currentPage={page}
                onPageChange={setPage}
                registerPerPage={selectedValuePage}
                handleSizeChange={handleSizeChange}
                changePageSize={true}
                totalSurveyValues={transactions?.totalSurveyValues}
              />
            </>
          )}
        </Box>
      </Box>
    </SideBarLayout>
  );
}
