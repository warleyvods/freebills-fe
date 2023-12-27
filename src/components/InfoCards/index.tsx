import React, { ReactNode, useCallback, useState } from "react";
import { Button, Flex, HStack, Icon, IconButton, LightMode, SimpleGrid, Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { capitalizeFirstLetter, getMonthName, updateMonth, updateYear } from "../../utils/utils";
import CardsDashboard from "../Cards/CardsDashboard";
import { numberFormat } from "../Utils/utils";
import { MdAccountBalance, MdOutlineAttachMoney } from "react-icons/md";
import { RiAddLine, RiArrowDownLine, RiArrowUpLine } from "react-icons/ri";
import CardsSkeleton from "../Cards/CardsSkeleton";
import { DashboardRevenueBalance, useDashboardRevenue } from "../../hooks/dashboard/useDashboardRevenue";
import { DashboardBalanceExpense, useDashboardExpense } from "../../hooks/dashboard/useDashboardExpense";
import { DashboardBalance, useDashboard } from "../../hooks/dashboard/useDashboard";
import { NewTransactionModal } from "../Modals/Transaction";

type InfoCardsProps = {
  dashboardType: "REVENUE" | "EXPENSE" | null;
  onUpdateYear: (year: number) => void;
  onUpdateMonth: (month: number) => void;
  showCardInfo?: boolean;
};

export function InfoDashboardCard({dashboardType, onUpdateMonth, onUpdateYear, showCardInfo = true}: InfoCardsProps) {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  const revenueData = useDashboardRevenue(month, year);
  const expenseData = useDashboardExpense(month, year);
  const totalData = useDashboard(month, year);

  const useDashboardData = (dashboardType: string, revenueData, expenseData, totalData) => {
    switch (dashboardType) {
      case "REVENUE":
        return revenueData;
      case "EXPENSE":
        return expenseData;
      case null:
        return totalData;
      default:
        throw new Error("Tipo de dashboard inválido");
    }
  };

  const {data: dashboardData, isLoading} = useDashboardData(dashboardType, revenueData, expenseData, totalData);

  const incrementMonthWithYear = useCallback(() => {
    let newMonth;
    setMonth((currentMonth) => {
      newMonth = updateMonth(currentMonth, "increment");
      onUpdateMonth(newMonth);
      return newMonth;
    });

    let newYear;
    setYear((currentYear) => {
      newYear = updateYear(currentYear, newMonth, "increment");
      onUpdateYear(newYear);
      return newYear;
    });
  }, [onUpdateMonth, onUpdateYear]);

  const decreaseMonthWithYear = useCallback(() => {
    let newMonth;
    setMonth((currentMonth) => {
      newMonth = updateMonth(currentMonth, "decrement");
      onUpdateMonth(newMonth);
      return newMonth;
    });

    let newYear;
    setYear((currentYear) => {
      newYear = updateYear(currentYear, newMonth, "decrement");
      onUpdateYear(newYear);
      return newYear;
    });
  }, [onUpdateMonth, onUpdateYear]);

  let cards: ReactNode;

  if (isLoading) {
    cards = (
      <>
        <CardsSkeleton />
        <CardsSkeleton />
        <CardsSkeleton />
        <CardsSkeleton />
      </>
    );
  } else {
    switch (dashboardType) {
      case "REVENUE":
        const revenueDashboard = dashboardData as unknown as DashboardRevenueBalance;
        console.log("to em revenue", month, year)
        console.log("revebue", revenueDashboard)
        cards = (
          <>
            <CardsDashboard
              description={"Saldo Atual"}
              value={numberFormat(revenueDashboard?.totalBalance)}
              color={"blue.600"}
              icon={MdOutlineAttachMoney}
              path={"/transactions"}
            />
            <CardsDashboard
              description={"Receitas Pendentes"}
              value={numberFormat(revenueDashboard?.totalRevenuePending)}
              color={"green.600"}
              icon={RiArrowUpLine}
            />
            <CardsDashboard
              description={"Receitas Pagas"}
              value={numberFormat(revenueDashboard?.totalRevenueReceived)}
              color={"green.600"}
              icon={RiArrowDownLine}
            />
            <CardsDashboard
              description={"Total"}
              value={numberFormat(revenueDashboard?.totalRevenue)}
              color={"green.600"}
              icon={MdAccountBalance}
            />
          </>
        );
        break;

      case "EXPENSE":
        const expenseDashboard = dashboardData as unknown as DashboardBalanceExpense;
        console.log("to em expense", month, year)
        cards = (
          <>
            <CardsDashboard
              description={"Saldo Atual"}
              value={numberFormat(expenseDashboard?.totalBalance)}
              color={"blue.600"}
              icon={MdOutlineAttachMoney}
              path={"/transactions"}
            />
            <CardsDashboard
              description={"Despesas Pendentes"}
              value={numberFormat(expenseDashboard?.totalExpensePending)}
              color={"red.600"}
              icon={RiArrowUpLine}
            />
            <CardsDashboard
              description={"Despesas Pagas"}
              value={numberFormat(expenseDashboard?.totalExpenseReceived)}
              color={"red.600"}
              icon={RiArrowDownLine}
            />
            <CardsDashboard
              description={"Total"}
              value={numberFormat(expenseDashboard?.totalExpense)}
              color={"red.600"}
              icon={MdAccountBalance}
            />
          </>
        );
        break;

      case null:
        const totalDashboard = dashboardData as DashboardBalance;
        console.log("to em total")
        cards = (
          <>
            <CardsDashboard
              description={"Saldo Atual"}
              value={numberFormat(totalDashboard?.totalBalance)}
              color={"blue.600"}
              icon={MdOutlineAttachMoney}
              path={"/transactions"}
            />
            <CardsDashboard
              description={"Total de Receitas"}
              value={numberFormat(totalDashboard?.totalRevenue)}
              color={"green.600"}
              icon={RiArrowDownLine}
            />
            <CardsDashboard
              description={"Total de Despesas"}
              value={numberFormat(totalDashboard?.totalExpensive)}
              color={"red.600"}
              icon={RiArrowUpLine}
            />
            <CardsDashboard
              description={"Total de Despesas em Cartões"}
              value={numberFormat(totalDashboard?.totalExpensiveCards)}
              color={"red.600"}
              icon={RiArrowUpLine}
            />
          </>
        );
        break;

      default:
        cards = null;
        break;
    }
  }

  return (
    <>
      {showCardInfo && (
        <>
          <SimpleGrid columns={{sm: 1, md: 2, xl: 4}} spacing="18px" pb={0} pt={3}>
            {cards}
          </SimpleGrid>
          <HStack justify={"space-between"} p={2}>
            <Text fontSize={"18px"} fontWeight={"medium"}>Transações</Text>
            <Flex flexDirection="row" justifyContent={"center"} pb={0} pt={0}>
              <HStack justify={"center"}>
                <IconButton
                  onClick={decreaseMonthWithYear}
                  isRound={true}
                  variant={"ghost"}
                  aria-label={"button account"}
                  icon={<ChevronLeftIcon w={8} h={8} />}
                  size={"md"}
                />
                <HStack p={0}>
                  <Text fontWeight={"bold"}>{capitalizeFirstLetter(getMonthName(month))}</Text>
                  <Text fontWeight={"bold"}>{year}</Text>
                </HStack>
                <IconButton
                  onClick={incrementMonthWithYear}
                  colorScheme={"gray"}
                  variant={"ghost"}
                  isRound={true}
                  aria-label={"button account"}
                  icon={<ChevronRightIcon w={8} h={8} />}
                  size={"md"}
                />
              </HStack>
            </Flex>
            { dashboardType !== null ? (
              <NewTransactionModal
                transactionType={dashboardType}
                trigger={(open) =>
                  <LightMode>
                    <Button as={"a"}
                            onClick={open}
                            size={"sm"}
                            fontSize={"sm"}
                            color={"white"}
                            bg={ dashboardType === 'REVENUE' ? "green.500" : "red.500"}
                            leftIcon={<Icon as={RiAddLine} fontSize={"20"} />}
                    >Adicionar {dashboardType === 'REVENUE' ? "receita" : "despesa"}
                    </Button>
                  </LightMode>
                } />
            ) : (
              <div/>
            ) }
          </HStack>

        </>
      )}
    </>
  );
}
