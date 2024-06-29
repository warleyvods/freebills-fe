import SideBarLayout from "../../components/SidebarLayout/SideBarLayout";
import HeadingTable from "../../components/Tables/HeadingTable";
import { InfoDashboardCard } from "../../components/InfoCards";
import { Box, Flex, SimpleGrid, Text, useBreakpointValue, useColorModeValue } from "@chakra-ui/react";
import { getChartDataOptions } from "../../utils/chartData";
import React, { useState } from "react";
import { useMe } from "../../hooks/users/useMe";
import { useDashboardExpenseGraph } from "../../hooks/dashboard/useDashboardExpenseGraph";
import { useDashboardRevenueGraph } from "../../hooks/dashboard/useDashboardRevenueGraph";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false
});


export default function ReportPage() {
  const mainColor = useColorModeValue('white', 'gray.800');
  const isMobile = useBreakpointValue({base: true, md: true, lg: false});
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())
  const [showCardInfo, setShowCardInfo] = useState(true);
  const {data: user} = useMe();
  const {data: expenseDash} = useDashboardExpenseGraph(user?.id, month, year);
  const {data: revenueDash} = useDashboardRevenueGraph(user?.id, month, year);

  const handleChangeYear = (year: number) => {
    setYear(year)
  };

  const handleChangeMonth = (month: number) => {
    setMonth(month)
  };

  return (
    <SideBarLayout >
      <HeadingTable title={"Dashboard"} />
      <Flex flexDirection='column' pt={{base: "0px", md: "0"}}>
        {
          isMobile ? (
            <Flex flexDirection={"column"}
                  alignItems={"center"}
                  justify={"center"}
                  h={"100%"}
                  w={"100%"}
                  mt={"10px"}
            >
              <Text mt={5}>Despesas por categoria</Text>
              <ReactApexChart
                options={getChartDataOptions(expenseDash?.labels?.length ? expenseDash.labels : [], 'EXPENSE').options}
                series={expenseDash?.series?.length ? expenseDash.series : [0]}
                type="donut"
              />
            </Flex>
          ) : (
            <SimpleGrid columns={{sm: 1, md: 2, xl: 2}} spacing='24px' h={"100hv"} mt={5}>
              <Flex bg={mainColor} h={"auto"} justify={"center"} p={5} borderRadius={"25px"} flexDirection={"column"}
                    alignItems={"center"}>
                <Text fontSize={"16px"} fontWeight={"bold"} mb={"5px"}>Despesas por categoria</Text>
                <Box h={"100%"} w={"70%"}>
                  <ReactApexChart
                    options={getChartDataOptions(expenseDash?.labels?.length ? expenseDash.labels : [], 'EXPENSE').options}
                    series={expenseDash?.series?.length ? expenseDash.series : [0]}
                    type="donut"
                  />
                </Box>
              </Flex>
            </SimpleGrid>
          )
        }
      </Flex>

    </SideBarLayout>
  )
}
