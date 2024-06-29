import SideBarLayout from "../../components/SidebarLayout/SideBarLayout";
import HeadingTable from "../../components/Tables/HeadingTable";
import { Box, Flex, SimpleGrid, Text, useBreakpointValue, useColorModeValue, VStack } from "@chakra-ui/react";
import { getChartDataOptions } from "../../utils/chartData";
import React, { useState } from "react";
import { useMe } from "../../hooks/users/useMe";
import { useDashboardExpenseGraph } from "../../hooks/dashboard/useDashboardExpenseGraph";
import { useDashboardRevenueGraph } from "../../hooks/dashboard/useDashboardRevenueGraph";
import dynamic from "next/dynamic";
import { PieChartVehicleStatus } from "../../components/DonutPieChart";

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false
});


export default function ReportPage() {
  const mainColor = useColorModeValue('white', 'gray.800');
  const isMobile = useBreakpointValue({base: true, md: false, lg: false});
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())
  const [showCardInfo, setShowCardInfo] = useState(true);
  const {data: user} = useMe();
  const {data: expenseDash, isLoading} = useDashboardExpenseGraph(user?.id, month, year);
  const {data: revenueDash} = useDashboardRevenueGraph(user?.id, month, year);

  const handleChangeYear = (year: number) => {
    setYear(year)
  };

  const handleChangeMonth = (month: number) => {
    setMonth(month)
  };

  if (isLoading) {
    return null;
  }

  return (
    <SideBarLayout>
      <HeadingTable title={"Relatórios"} />
      <Flex flexDirection='column' pt={{base: "0px", md: "0"}}>
        {
          isMobile ? (
            <VStack>
              <Text fontWeight={"medium"} fontSize={"18px"}>Despesas por categoria</Text>
              <Box h={"auto"} w={"100%"} border={"1px"} borderRadius={"5px"} borderColor={"gray.150"}>
                <div style={{ margin: "10px" }}>
                  <ReactApexChart
                    //@ts-ignore
                    options={getChartDataOptions(expenseDash?.labels?.length ? expenseDash.labels : [], 'EXPENSE').options}
                    series={expenseDash?.series?.length ? expenseDash.series : [0]}
                    type="donut"
                  />
                </div>
              </Box>
            </VStack>
          ) : (
            <>
              <Box h={"100%"}
                   w={"35%"}
                   alignItems={"start"}
                   border={"1px"}
                   borderRadius={"5px"}
                   borderColor={"gray.150"}
              >
                <ReactApexChart
                  //@ts-ignore
                  options={getChartDataOptions(expenseDash?.labels?.length ? expenseDash.labels : [], 'EXPENSE').options}
                  series={expenseDash?.series?.length ? expenseDash.series : [0]}
                  type="donut"
                />
              </Box>
              {/*<Flex w={"full"} h={"400px"} position={"relative"} >*/}
              {/*  <PieChartVehicleStatus*/}
              {/*    labels={expenseDash?.labels}*/}
              {/*    series={expenseDash?.series}*/}
              {/*  />*/}
              {/*  <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: "translate(-50%, -50%)" }} >*/}
              {/*    1*/}
              {/*  </Box>*/}
              {/*</Flex>*/}
            </>
          )
        }
      </Flex>
    </SideBarLayout>
  )
}
