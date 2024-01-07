import React, { ReactNode, useCallback, useState } from "react";
import {
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  LightMode,
  ScaleFade,
  SimpleGrid, Stack,
  Text,
  useBreakpointValue, useDisclosure,
  VStack
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { capitalizeFirstLetter, getMonthName, updateMonth, updateYear } from "../../utils/utils";
import CardsDashboard from "../Cards/CardsDashboard";
import { moneyFormat } from "../Utils/utils";
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
  const isMobile = useBreakpointValue({base: true, md: true, lg: false});
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [show, setShow] = useState(true);

  const revenueData = useDashboardRevenue(month, year);
  const expenseData = useDashboardExpense(month, year);
  const totalData = useDashboard(month, year);

  const toggleShow = () => {
    setShow((prevShow) => !prevShow);
  };

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
        cards = (
          <>
            <CardsDashboard
              description={"Saldo Atual"}
              value={moneyFormat(revenueDashboard?.totalBalance)}
              color={"blue.600"}
              icon={MdOutlineAttachMoney}
              path={"/transactions"}
            />
            <CardsDashboard
              description={"Receitas Pendentes"}
              value={moneyFormat(revenueDashboard?.totalRevenuePending)}
              color={"green.600"}
              icon={RiArrowUpLine}
            />
            <CardsDashboard
              description={"Receitas Pagas"}
              value={moneyFormat(revenueDashboard?.totalRevenueReceived)}
              color={"green.600"}
              icon={RiArrowDownLine}
            />
            <CardsDashboard
              description={"Total"}
              value={moneyFormat(revenueDashboard?.totalRevenue)}
              color={"green.600"}
              icon={MdAccountBalance}
            />
          </>
        );
        break;

      case "EXPENSE":
        const expenseDashboard = dashboardData as unknown as DashboardBalanceExpense;
        cards = (
          <>
            <CardsDashboard
              description={"Saldo Atual"}
              value={moneyFormat(expenseDashboard?.totalBalance)}
              color={"blue.600"}
              icon={MdOutlineAttachMoney}
              path={"/transactions"}
            />
            <CardsDashboard
              description={"Despesas Pendentes"}
              value={moneyFormat(expenseDashboard?.totalExpensePending)}
              color={"red.600"}
              icon={RiArrowUpLine}
            />
            <CardsDashboard
              description={"Despesas Pagas"}
              value={moneyFormat(expenseDashboard?.totalExpenseReceived)}
              color={"red.600"}
              icon={RiArrowDownLine}
            />
            <CardsDashboard
              description={"Total"}
              value={moneyFormat(expenseDashboard?.totalExpense)}
              color={"red.600"}
              icon={MdAccountBalance}
            />
          </>
        );
        break;

      case null:
        const totalDashboard = dashboardData as DashboardBalance;
        cards = (
          <>
            <CardsDashboard
              description={"Saldo Atual"}
              value={moneyFormat(totalDashboard?.totalBalance)}
              color={"blue.600"}
              icon={MdOutlineAttachMoney}
              path={"/transactions"}
            />
            <CardsDashboard
              description={"Total de Receitas"}
              value={moneyFormat(totalDashboard?.totalRevenue)}
              color={"green.600"}
              icon={RiArrowDownLine}
            />
            <CardsDashboard
              description={"Total de Despesas"}
              value={moneyFormat(totalDashboard?.totalExpensive)}
              color={"red.600"}
              icon={RiArrowUpLine}
            />
            <CardsDashboard
              description={"Total de Despesas em Cartões"}
              value={moneyFormat(totalDashboard?.totalExpensiveCards)}
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
          { show && (
            <ScaleFade initialScale={0.9} in={show}>
              <SimpleGrid
                columns={{sm: 1, md: 2, xl: 4}} spacing="18px" pb={0} pt={3}>
                {cards}
              </SimpleGrid>
            </ScaleFade>

          ) }

          <Stack direction={[isMobile ? "column" : "row"]} justify={"space-between"} p={2}>
            { isMobile ? (
              <HStack justify={"center"}>
                <Text textAlign={"center"} fontSize={"18px"} fontWeight={"medium"}>Transações</Text>
                <IconButton
                  ml="30px"
                  bg="inherit"
                  borderRadius="inherit"
                  _focus={{boxShadow: "none"}}
                  onClick={toggleShow}
                  size="sm"
                  variant="unstyled"
                  aria-label={"show info"}
                  icon={show ? <ViewOffIcon /> : <ViewIcon />}
                />
              </HStack>
            ) : (
              <Text fontSize={"18px"} fontWeight={"medium"}>Transações</Text>
            ) }

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
            {dashboardType !== null ? (
              <NewTransactionModal
                transactionType={dashboardType}
                trigger={(open) =>
                  <LightMode>
                    <Button as={"a"}
                            onClick={open}
                            size={"sm"}
                            fontSize={"sm"}
                            color={"white"}
                            bg={dashboardType === 'REVENUE' ? "green.500" : "red.500"}
                            leftIcon={<Icon as={RiAddLine} fontSize={"20"} />}
                    >Adicionar {dashboardType === 'REVENUE' ? "receita" : "despesa"}
                    </Button>
                  </LightMode>
                } />
            ) : (
              <div />
            )}
          </Stack>

        </>
      )}
    </>
  );
}
