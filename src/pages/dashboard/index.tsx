import { Box, Flex, Heading, SimpleGrid, useColorModeValue, theme, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import SidebarWithHeader from "../../components/SideBar";
import CardsDashboard from "../../components/Cards/CardsDashboard";
import { useDashboard } from "../../hooks/dashboard/useDashboard";
import { useMe } from "../../hooks/users/useMe";
import { numberFormat } from "../../components/Utils/utils";
import { MdOutlineAttachMoney } from "react-icons/md";
import { RiArrowDownLine, RiArrowUpLine } from "react-icons/ri";
import { FaRegCreditCard } from "react-icons/fa";
import CardsSkeleton from "../../components/Cards/CardsSkeleton";
import dynamic from 'next/dynamic'
import { useDashboardExpenseGraph } from "../../hooks/dashboard/useDashboardExpenseGraph";
import { getChartDataOptions } from "../../utils/chartData";
import { useDashboardRevenueGraph } from "../../hooks/dashboard/useDashboardRevenueGraph";

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false
});



export default function Dashboard() {
  const {data: user} = useMe();
  const {data: dash} = useDashboard(user?.id);
  const {data: expenseDash} = useDashboardExpenseGraph(user?.id);
  const {data: revenueDash} = useDashboardRevenueGraph(user?.id);
  const mainColor = useColorModeValue('white', 'gray.800');

  return (
    <SidebarWithHeader>
      <Flex flexDirection='column' pt={{base: "0px", md: "0"}}>
        <Flex flexDirection="row" justifyContent="space-between" mb="20px" mt="10px" ml={"10px"}>
          <Heading>Dashboard</Heading>
        </Flex>
        <>
          <SimpleGrid columns={{sm: 1, md: 2, xl: 4}} spacing='24px'>
            {!!dash ? (
              <>
                <CardsDashboard description={"Saldo Atual"}
                                value={numberFormat(dash.totalBalance)}
                                color={"blue.600"}
                                icon={MdOutlineAttachMoney}
                                path={"/transactions"}
                />
                <CardsDashboard description={"Receitas"}
                                value={numberFormat(dash?.totalRevenue)}
                                color={"green.10"}
                                icon={RiArrowUpLine}
                                path={"/transactions/revenue"}
                />
                <CardsDashboard description={"Despesas"}
                                value={numberFormat(dash.totalExpensive)}
                                color={"red.600"}
                                icon={RiArrowDownLine}
                                path={"/transactions/expense"}
                />
                <CardsDashboard description={"Cartões"}
                                value={numberFormat(dash.totalExpensiveCards)}
                                color={"purple.500"}
                                icon={FaRegCreditCard}
                />
              </>
            ) : (
              <>
                <CardsSkeleton />
                <CardsSkeleton />
                <CardsSkeleton />
                <CardsSkeleton />
              </>
            )}
          </SimpleGrid>

          <SimpleGrid columns={{sm: 1, md: 2, xl: 2}} spacing='24px' h={"100hv"} mt={5}>
            <Flex bg={mainColor} h={"auto"} justify={"center"} p={5} borderRadius={"25px"} flexDirection={"column"} alignItems={"center"}>
              <Text fontSize={"16px"} fontWeight={"bold"} mb={"5px"}>Despesas por categoria</Text>
              <Box h={"100%"} w={"70%"}>
                <ReactApexChart
                  options={getChartDataOptions(expenseDash?.labels?.length ? expenseDash.labels : [], 'EXPENSE').options}
                  series={expenseDash?.series?.length ? expenseDash.series : [0]}
                  type="donut"
                />
              </Box>
            </Flex>
            <Flex bg={mainColor} h={"auto"} justify={"center"} p={5} borderRadius={"25px"} flexDirection={"column"} alignItems={"center"}>
              <Text fontSize={"16px"} fontWeight={"bold"} mb={"5px"}>Receitas por categoria</Text>
              <Box h={"100%"} w={"70%"}>
                <ReactApexChart
                  options={getChartDataOptions(revenueDash?.labels?.length ? revenueDash.labels : [], 'REVENUE').options}
                  series={revenueDash?.series?.length ? revenueDash.series : [0]}
                  type="donut"
                />
              </Box>
            </Flex>
          </SimpleGrid>
        </>
      </Flex>
    </SidebarWithHeader>
  )
}
