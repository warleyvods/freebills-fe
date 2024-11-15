import SideBarLayout from "../../components/SidebarLayout/SideBarLayout";
import HeadingTable from "../../components/Tables/HeadingTable";
import { Box, Flex, Spinner, VStack, Button, Text, Switch, IconButton, useColorModeValue } from "@chakra-ui/react";
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
      const monthName = currentDate.toLocaleString("default", { month: "long" });
      return `${monthName.charAt(0).toUpperCase()}${monthName.slice(1)} ${currentDate.getFullYear()}`;
    }
    return `${currentDate.getFullYear()}`;
  };

  const selectedMonth = showMonth ? currentDate.getMonth() + 1 : null; // Meses são baseados em 0
  const selectedYear = currentDate.getFullYear();

  const { data: expenseDash, isLoading: isLoadingExpenseDash } = useDashboardExpenseGraph(null, selectedMonth, selectedYear);

  // Chamadas de useColorModeValue
  const tableBg = useColorModeValue("gray.50", "gray.700");
  const cellBgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");
  const borderColor = useColorModeValue("gray.150", "gray.700");
  const secondaryTextColor = useColorModeValue("gray.500", "gray.400");

  if (isLoadingExpenseDash) {
    return <Spinner />;
  }

  return (
    <SideBarLayout>
      <HeadingTable title={"Relatórios"} />

      {/* Seletor de mês e ano */}
      <Flex direction="column" align="center" gap="4" mt="4">
        <Flex align="center" gap="4">
          <IconButton
            _focus={{ boxShadow: "none" }}
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
            _focus={{ boxShadow: "none" }}
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

      {/* Gráfico de despesas e tabela */}
      <Flex
        w={"full"}
        h={"full"}
        border={"1px"}
        p={"20px"}
        borderRadius={"10px"}
        borderColor={borderColor}
        direction={["column", "row"]}
        align={["center", "center"]}
        justify={["center", "center"]}
      >
        <Flex
          w={"full"}
          maxW={"1000px"}
          direction={["column", "row"]}
          align={["center", "flex-start"]}
          justify={["center", "flex-start"]}
          gap={"5px"}
        >
          {/* Gráfico de Pizza */}
          <Box
            h={"300px"}
            w={"300px"}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <PieChart series={expenseDash?.series} labels={expenseDash?.labels} colors={expenseDash?.colors} />
          </Box>

          {/* Tabela */}
          <VStack
            w={"full"}
            maxW={"400px"}
            align={"flex-start"}
            spacing={4}
            mt={4}
            p={4}
            bg={tableBg} // Cor de fundo adaptada para o modo escuro
            borderRadius={"8px"}
            boxShadow={"md"}
          >
            {expenseDash?.labels.map((label, index) => {
              const value = expenseDash.series[index];
              const color = expenseDash.colors[index]; // Cor do backend
              const percentage = ((value / expenseDash.series.reduce((a, b) => a + b, 0)) * 100).toFixed(2);

              return (
                <Flex
                  key={index}
                  w={"full"}
                  justify={"space-between"}
                  align={"center"}
                  bg={cellBgColor} // Cor das células
                  p={3}
                  borderRadius={"8px"}
                  boxShadow={"sm"}
                >
                  <Flex justify={"flex-start"} align={"center"} gap={3}>
                    {/* Bolinha colorida */}
                    <Box w={"20px"} h={"20px"} bg={color} borderRadius={"full"}></Box>
                    <Text fontWeight={"medium"} color={textColor}>
                      {label}
                    </Text>
                  </Flex>
                  <VStack spacing={0} align={"flex-end"}>
                    <Text fontSize={"sm"} fontWeight={"bold"} color={textColor}>
                      R$ {value.toFixed(2)}
                    </Text>
                    <Text fontSize={"xs"} color={secondaryTextColor}>
                      {percentage}%
                    </Text>
                  </VStack>
                </Flex>
              );
            })}
          </VStack>
        </Flex>
      </Flex>
    </SideBarLayout>
  );
}

