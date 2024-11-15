import SideBarLayout from "../../components/SidebarLayout/SideBarLayout";
import HeadingTable from "../../components/Tables/HeadingTable";
import { Box, Flex, Spinner, VStack } from "@chakra-ui/react";
import React from "react";
import { useDashboardExpenseGraph } from "../../hooks/dashboard/useDashboardExpenseGraph";
import { useDashboardRevenueGraph } from "../../hooks/dashboard/useDashboardRevenueGraph";
import PieChart from "../../components/PieChart";


export default function ReportPage() {
  const {data: expenseDash, isLoading: isLoadingExpenseDash} = useDashboardExpenseGraph(null,null, 2024);
  const {data: revenueDash, isLoading: isLoadingRevenueDash} = useDashboardRevenueGraph(null,null, 2024);

  if (isLoadingExpenseDash && isLoadingRevenueDash) {
    return <Spinner />;
  }

  return (
    <SideBarLayout>
      <HeadingTable title={"Relatórios"} />

      <Flex w={"full"} h={"full"} border={'1px'} p={"50px"} borderRadius={"10px"} borderColor={"gray.150"}>
        <Box h={"300px"} w={"300px"} bg={"tomato"}>
          <PieChart series={expenseDash?.series} labels={expenseDash?.labels} />
        </Box>
      </Flex>
    </SideBarLayout>
  )
}
