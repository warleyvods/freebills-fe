import SideBarLayout from "../../components/SidebarLayout/SideBarLayout";
import HeadingTable from "../../components/Tables/HeadingTable";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  SimpleGrid,
  Text,
  useBreakpointValue,
  useColorModeValue,
  VStack
} from "@chakra-ui/react";
import { getChartDataOptions } from "../../utils/chartData";
import React, { useCallback, useState } from "react";
import { useMe } from "../../hooks/users/useMe";
import { useDashboardExpenseGraph } from "../../hooks/dashboard/useDashboardExpenseGraph";
import { useDashboardRevenueGraph } from "../../hooks/dashboard/useDashboardRevenueGraph";
import dynamic from "next/dynamic";
import { Chart, HighchartsChart, Legend, PieSeries, Title, Tooltip, XAxis, YAxis } from "react-jsx-highcharts";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { capitalizeFirstLetter, getMonthName, updateMonth, updateYear } from "../../utils/utils";

const ReactApexChart = dynamic(() => import('react-apexcharts'), {
  ssr: false
});

const dateFormat = {
  hour: "%l %p",
  day: "%b %e '%y",
  week: "%b %e '%y",
  month: "%b '%y",
  year: "%y"
};

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};
let credits = {
  enabled: false
};
let title = {
  text: "tttitle"
};
let exporting = {
  enabled: false
};
let yAxis = [];
yAxis.push({
  title: {
    text: "ttitle"
  },
  opposite: false,
  min: 0,
  labels: {
    format: "{value}Wh"
  }
});
let xAxis = {
  type: "datetime",
  tickInterval: 4 * 3600 * 1000,
  dateTimeLabelFormats: {
    hour: "%l %p",
    day: "%b %e '%y",
    week: "%b %e '%y",
    month: "%b '%y",
    year: "%y"
  }
};
let legend = {
  enabled: false,
  layout: "vertical",
  align: "left",
  verticalAlign: "top",
  floating: true
};

let tooltip = {
  valueDecimals: 2,
  shared: true
};

let cchart = {
  type: "Spline",
  zoomType: "x",
  spacingBottom: 25,
  spacingTop: 10,
  spacingLeft: 20,
  spacingRight: 10,
  width: null,
  height: 480
};

const plotOptions = {
  pie: {
    // size: 120,
    allowPointSelect: true,
    cursor: "pointer",
    dataLabels: {
      enabled: true,
      format: "{point.name}: {point.percentage:.1f} %"
    },
    showInLegend: true
  },
  series: {
    dataLabels: {
      enabled: true
    },
    pointPadding: 0.1,
    groupPadding: 0,
    tooltip: {
      valuePrefix: "",
      valueSuffix: " millions"
    }
  }
};

const pieData = [
  {
    name: "Jane",
    y: 17
  },
  {
    name: "John",
    y: 13
  },
  {
    name: "Joe",
    y: 20
  },
  {
    name: "Ivan",
    y: 50
  }
];


export default function ReportPage() {
  const mainColor = useColorModeValue('white', 'gray.800');
  const isMobile = useBreakpointValue({base: true, md: false, lg: false});
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())
  const [showCardInfo, setShowCardInfo] = useState(true);
  const {data: user} = useMe();
  const {data: expenseDash, isLoading} = useDashboardExpenseGraph(user?.id, month, year);
  const {data: revenueDash} = useDashboardRevenueGraph(user?.id, month, year);

  const incrementMonthWithYear = useCallback(() => {
    let newMonth;
    setMonth((currentMonth) => {
      newMonth = updateMonth(currentMonth, "increment");
      return newMonth;
    });

    let newYear;
    setYear((currentYear) => {
      newYear = updateYear(currentYear, newMonth, "increment");
      return newYear;
    });
  }, []);

  const decreaseMonthWithYear = useCallback(() => {
    let newMonth;
    setMonth((currentMonth) => {
      newMonth = updateMonth(currentMonth, "decrement");
      return newMonth;
    });

    let newYear;
    setYear((currentYear) => {
      newYear = updateYear(currentYear, newMonth, "decrement");
      return newYear;
    });
  }, []);

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
      <Flex flexDirection="row" justifyContent={"center"} pb={0} pt={0} alignItems={"center"}>
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
              <HStack>
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

                <Box h={"100%"}
                     w={"35%"}
                     alignItems={"start"}
                     border={"1px"}
                     borderRadius={"5px"}
                     borderColor={"gray.150"}
                >
                  <ReactApexChart
                    //@ts-ignore
                    options={getChartDataOptions(revenueDash?.labels?.length ? revenueDash.labels : [], 'EXPENSE').options}
                    series={revenueDash?.series?.length ? revenueDash.series : [0]}
                    type="donut"
                  />
                </Box>
              </HStack>
            </>
          )
        }
      </Flex>
    </SideBarLayout>
  )
}
