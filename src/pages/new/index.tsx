import { Box, Circle, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { RiArrowDownLine } from "react-icons/ri";
import CardsDashboard from "../../components/Cards/CardsDashboard";
import { useDashboardExpenseGraph } from "../../hooks/dashboard/useDashboardExpenseGraph";
import { useDashboardRevenueGraph } from "../../hooks/dashboard/useDashboardRevenueGraph";
import PieChart from "../../components/PieChart";

export const New = () => {
  const {data: expenseDash, isLoading: isLoadingExpenseDash} = useDashboardExpenseGraph(null, null, 2024);
  const {data: revenueDash, isLoading: isLoadingRevenueDash} = useDashboardRevenueGraph(null, null, 2024);

  const data = {
    labels: ['Viagens', 'Transporte', 'Passeio'],
    series: [350, 250, 200],
  };

  if (isLoadingExpenseDash) {
    return null;
  }

  // <PieChart series={data.series} labels={data.labels} />
  return (
    <Box maxW={"300px"}>
      <Flex justify={"flex-start"} alignItems={"center"} bg={"tomato"}>
        <Box w={"20px"} h={"20px"} bg={"blue"}></Box>
        <VStack justify={"flex-start"} mt={"10px"}>
          <HStack justify={"space-between"} w={"full"}>
            <Text>Casa</Text>
            <Text>R$ 123,45</Text>
          </HStack>
          <HStack justify={"space-between"} w={"full"}>
            <Text>Porcentagem</Text>
            <Text>39.29%</Text>
          </HStack>
        </VStack>
      </Flex>
    </Box>

  )
}

export default New;
