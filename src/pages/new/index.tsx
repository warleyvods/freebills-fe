import { Box, Circle, Flex } from "@chakra-ui/react";
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
    labels: undefined,
    series: undefined,
  };

  console.log("data", data)
  console.log("expenseDash", expenseDash)

  if (isLoadingExpenseDash) {
    return null;
  }

  // <PieChart series={data.series} labels={data.labels} />
  return (
    <Box border={"1px"} w={"auto"}>
      <PieChart series={data.series} labels={data.labels} />
      {/*<Circle size={"30px"} bg={"tomato"} />*/}
    </Box>

  )
}

export default New;
