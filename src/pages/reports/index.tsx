import SideBarLayout from "../../components/SidebarLayout/SideBarLayout";
import HeadingTable from "../../components/Tables/HeadingTable";
import {
  Box,
  Flex,
  IconButton,
  LightMode,
  Select,
  Spinner,
  Switch,
  Text,
  useColorModeValue,
  VStack
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDashboardExpenseGraph } from "../../hooks/dashboard/useDashboardExpenseGraph";
import { useDashboardRevenueGraph } from "../../hooks/dashboard/useDashboardRevenueGraph";
import DonutChart from "../../components/Chart/DonutChart";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import IconComponent from "../../components/Icons/IconComponent";
import { CategoryInfo } from "../../components/Modals/CategoryInfo";

export default function ReportPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showMonth, setShowMonth] = useState(true);
  const [selectedGraph, setSelectedGraph] = useState("expense");

  const handleDateChange = (increment: number) => {
    const newDate = new Date(currentDate);
    if (showMonth) {
      newDate.setMonth(currentDate.getMonth() + increment);
    } else {
      newDate.setFullYear(currentDate.getFullYear() + increment);
    }
    setCurrentDate(newDate);
  };

  const toggleShowMonth = () => setShowMonth(!showMonth);

  const formatDate = () => {
    if (showMonth) {
      const monthName = currentDate.toLocaleString("default", { month: "long" });
      return `${monthName.charAt(0).toUpperCase()}${monthName.slice(1)} ${currentDate.getFullYear()}`;
    }
    return `${currentDate.getFullYear()}`;
  };

  const selectedMonth = showMonth ? currentDate.getMonth() + 1 : null;
  const selectedYear = currentDate.getFullYear();

  const {
    data: expenseDash,
    isLoading: isLoadingExpenseDash
  } = useDashboardExpenseGraph(null, selectedMonth, selectedYear);

  const {
    data: revenueDash,
    isLoading: isLoadingRevenueDash
  } = useDashboardRevenueGraph(null, selectedMonth, selectedYear);

  const tableBg = useColorModeValue("gray.50", "gray.700");
  const cellBgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");
  const borderColor = useColorModeValue("gray.150", "gray.700");
  const hoverCellColor = useColorModeValue("rgba(228,228,228,0.77)", "rgba(19,19,20,0.5)");
  const secondaryTextColor = useColorModeValue("gray.500", "gray.400");

  const DateSelector = () => (
    <Flex direction="column" align="center" gap="4" mt="4">
      <Flex align="center" gap="4">
        <IconButton
          _focus={{ boxShadow: "none" }}
          onClick={() => handleDateChange(-1)}
          size="sm"
          variant="ghost"
          aria-label="previous date"
          icon={<ChevronLeftIcon w={8} h={8} />}
        />
        <Text fontSize="md" fontWeight="medium">{formatDate()}</Text>
        <IconButton
          _focus={{ boxShadow: "none" }}
          onClick={() => handleDateChange(1)}
          size="sm"
          variant="ghost"
          aria-label="next date"
          icon={<ChevronRightIcon w={8} h={8} />}
        />
      </Flex>

      <Flex align="center" gap="2">
        <Text>Exibir mês:</Text>
        <LightMode>
          <Switch size="sm" isChecked={showMonth} onChange={toggleShowMonth} />
        </LightMode>
      </Flex>

      {/* Flex para centralizar o Select no celular */}
      <Flex
        direction="column"
        align="center"
        mt="4"
        display={["flex", "flex", "none"]}
      >
        <Select
          value={selectedGraph}
          onChange={(e) => setSelectedGraph(e.target.value)}
          width="200px"
          size="sm"
          variant={"outline"}
          borderRadius={"10px"}
          mb="4"
        >
          <option value="expense">Despesas</option>
          <option value="revenue">Receita</option>
        </Select>
      </Flex>
    </Flex>
  );

  const GraphDisplay = () => {
    let data = null;
    let isLoading: boolean;
    let labels: any[];
    let colors = [];

    if (selectedGraph === "expense") {
      data = expenseDash;
      isLoading = isLoadingExpenseDash;
      labels = expenseDash?.labels || [];
      colors = expenseDash?.colors || [];
    } else {
      data = revenueDash;
      isLoading = isLoadingRevenueDash;
      labels = revenueDash?.labels || [];
      colors = revenueDash?.colors || [];
    }

    if (isLoading) {
      return (
        <Flex direction="column"
              align="center"
              justify="center"
              mt="15px"
              border={"1px"}
              h={"300px"}
              borderRadius={"10px"}
              gap={"20px"}
              borderColor={borderColor}>
          <Text fontSize="18px">Carregando...</Text>
          <Spinner size="md" />
        </Flex>
      );
    }

    if (!data?.series?.length) {
      return (
        <Flex direction="column"
              align="center"
              justify="center"
              mt="15px"
              border={"1px"}
              borderRadius={"10px"}
              borderColor={borderColor}
              h={"300px"}
              p={"20px"}>
          <Text fontSize="1rem">Não há dados para exibir</Text>
          <IconComponent name="noData2" width="150" height="150" />
        </Flex>
      );
    }

    const currencyFormatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    return (
      <Flex
        mt="15px"
        w="full"
        h="full"
        border="1px"
        p="20px"
        borderRadius="10px"
        borderColor={borderColor}
        direction={["column", "row"]}
        align="center"
        justify="center"
      >
        <Flex
          w="full"
          maxW="1000px"
          direction={["column", "row"]}
          align="center"
          justify="center"
          gap="5px"
        >
          <Box h="300px" w="300px" display="flex" alignItems="center" justifyContent="center">
            <DonutChart series={data.series} labels={labels} colors={colors} />
          </Box>

          <VStack
            ml={["0", "60px"]}
            w="full"
            maxW="400px"
            align={["center", "flex-start"]}
            spacing={2}
            mt={[4, 0]}
            p={3}
            bg={tableBg}
            borderRadius="8px"
            boxShadow="md"
          >
            {labels
              .map((label, index) => ({
                label: label,
                value: data.series[index],
                color: colors[index],
                percentage: ((data.series[index] / data.series.reduce((a: any, b: any) => a + b, 0)) * 100).toFixed(2),
              }))
              .sort((a, b) => b.value - a.value)
              .map((item, index) => {
                return (
                  <CategoryInfo key={item.label} trigger={(onOpen) => (
                    <Flex
                      key={index}
                      w="full"
                      justify="space-between"
                      align="center"
                      bg={cellBgColor}
                      p={2}
                      onClick={onOpen}
                      _hover={{
                        bg: hoverCellColor,
                        cursor: 'pointer'
                      }}
                      borderRadius="8px"
                      boxShadow="sm"
                    >
                      <Flex justify="flex-start" align="center" gap={3}>
                        <Box w="25px" h="25px" bg={item.color} borderRadius="full" />
                        <Text fontWeight="medium" color={textColor}>{item.label}</Text>
                      </Flex>
                      <VStack spacing={0} align="flex-end">
                        <Text fontSize="sm" fontWeight="bold" color={textColor}>{currencyFormatter.format((item.value))}</Text>
                        <Text fontSize="xs" color={secondaryTextColor}>{item.percentage}%</Text>
                      </VStack>
                    </Flex>
                  )} />
                );
              })}
          </VStack>
        </Flex>
      </Flex>
    );
  };



  return (
    <SideBarLayout>
      <HeadingTable title="Relatórios" />
      <DateSelector />
      <Select
        value={selectedGraph}
        onChange={(e) => setSelectedGraph(e.target.value)}
        width="200px"
        size="sm"
        variant={"outline"}
        borderRadius={"10px"}
        display={["none", "none", "block"]}
      >
        <option value="expense">Despesas</option>
        <option value="revenue">Receita</option>
      </Select>
      <GraphDisplay />
    </SideBarLayout>
  );
}
