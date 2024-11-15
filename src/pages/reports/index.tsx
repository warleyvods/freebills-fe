import SideBarLayout from "../../components/SidebarLayout/SideBarLayout";
import HeadingTable from "../../components/Tables/HeadingTable";
import { Box, Flex, Spinner, VStack, Button, Text, Switch, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDashboardExpenseGraph } from "../../hooks/dashboard/useDashboardExpenseGraph";
import PieChart from "../../components/PieChart";
import { ChevronLeftIcon, ChevronRightIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

export default function ReportPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showMonth, setShowMonth] = useState(true);

  const handlePrevious = () => {
    if (showMonth) {
      setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
    } else {
      setCurrentDate(new Date(currentDate.setFullYear(currentDate.getFullYear() - 1)));
    }
  };

  const handleNext = () => {
    if (showMonth) {
      setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
    } else {
      setCurrentDate(new Date(currentDate.setFullYear(currentDate.getFullYear() + 1)));
    }
  };

  const toggleShowMonth = () => setShowMonth(!showMonth);

  const formatDate = () => {
    if (showMonth) {
      return `${currentDate.toLocaleString("default", { month: "long" })} ${currentDate.getFullYear()}`;
    }
    return `${currentDate.getFullYear()}`;
  };

  const selectedMonth = showMonth ? currentDate.getMonth() + 1 : null; // Meses são baseados em 0
  const selectedYear = currentDate.getFullYear();

  const { data: expenseDash, isLoading: isLoadingExpenseDash } = useDashboardExpenseGraph(null, selectedMonth, selectedYear);

  if (isLoadingExpenseDash) {
    return <Spinner />;
  }

  return (
    <SideBarLayout>
      <HeadingTable title={"Relatórios"} />

      {/* Componente para seleção de mês e ano */}
      <Flex direction="column" align="center" gap="4" mt="4">
        <Flex align="center" gap="4">
          <IconButton
            _focus={{boxShadow: "none"}}
            onClick={handlePrevious}
            size="sm"
            variant="ghost"
            aria-label={"show info"}
            icon={<ChevronLeftIcon w={8} h={8} />}
          />
          <Text fontSize="lg" fontWeight="medium">
            {formatDate()}
          </Text>
          <IconButton
            _focus={{boxShadow: "none"}}
            onClick={handleNext}
            size="sm"
            variant="ghost"
            aria-label={"show info"}
            icon={<ChevronRightIcon w={8} h={8} />}
          />

        </Flex>
        <Flex align="center" gap="2">
          <Text>Exibir mês:</Text>
          <Switch isChecked={showMonth} onChange={toggleShowMonth} />
        </Flex>
      </Flex>

      {/* Gráfico de despesas */}
      <Flex
        w={"full"}
        h={"full"}
        border={"1px"}
        p={"20px"}
        borderRadius={"10px"}
        borderColor={"gray.150"}
        direction={["column", "row"]}
        align={["center", "center"]}
        justify={["center", "center"]}
      >
        <Flex w={"full"}
              maxW={"1000px"}
              direction={["column", "row"]}
              align={["center", "flex-start"]}
              justify={["center", "flex-start"]}
              gap={"5px"}
        >
          <Box
            h={"300px"}
            w={"300px"}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <PieChart series={expenseDash?.series} labels={expenseDash?.labels} />
          </Box>
          <Flex w={"80%"} bg={"tomato"} h={"100px"}>

          </Flex>
        </Flex>
      </Flex>
    </SideBarLayout>
  );
}
