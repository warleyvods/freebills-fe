import { Flex, HStack, SimpleGrid, Spinner, Text, useBreakpointValue } from "@chakra-ui/react";
import React, { useState } from "react";
import { useMe } from "../../hooks/users/useMe";
import SideBarLayout from "../../components/SidebarLayout/SideBarLayout";
import CardsSkeleton from "../../components/Cards/CardsSkeleton";
import CardsDashboard from "../../components/Cards/CardsDashboard";
import { moneyFormat } from "../../components/Utils/utils";
import { MdOutlineAttachMoney } from "react-icons/md";
import { RiArrowDownLine, RiArrowUpLine } from "react-icons/ri";
import { useDashboard } from "../../hooks/dashboard/useDashboard";


export default function Dashboard() {
  const isMobile = useBreakpointValue({base: true, md: true, lg: false});
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())
  const {data: totalData, isLoading: totalIsLoading} = useDashboard(month, year);
  const {data: user} = useMe();

  if (totalIsLoading) {
    return (
      <SideBarLayout>
        <DashboardHeading mobile={isMobile} totalIsLoading={true} />
        <SimpleGrid columns={{sm: 1, md: 2, xl: 4}} spacing="18px" pb={0} pt={3}>
          <CardsSkeleton />
          <CardsSkeleton />
          <CardsSkeleton />
          <CardsSkeleton />
        </SimpleGrid>
      </SideBarLayout>
    )
  }

  return (
    <SideBarLayout>
      <DashboardHeading mobile={isMobile} totalIsLoading={false} />
      <SimpleGrid columns={{sm: 1, md: 2, xl: 4}} spacing="18px" pb={0} pt={3}>
        <CardsDashboard
          description={"Saldo Atual"}
          value={moneyFormat(totalData.totalBalance)}
          color={"blue.600"}
          icon={MdOutlineAttachMoney}
          path={"/transactions"}
        />
        <CardsDashboard
          description={"Total de Receitas"}
          value={moneyFormat(totalData?.totalRevenue)}
          color={"green.600"}
          icon={RiArrowDownLine}
        />
        <CardsDashboard
          description={"Total de Despesas"}
          value={moneyFormat(totalData?.totalExpensive)}
          color={"red.600"}
          icon={RiArrowUpLine}
        />
        <CardsDashboard
          description={"Total de Despesas em Cartões"}
          value={moneyFormat(totalData?.totalExpensiveCards)}
          color={"red.600"}
          icon={RiArrowUpLine}
        />
      </SimpleGrid>
    </SideBarLayout>
  );
}

function DashboardHeading(props: { mobile: boolean, totalIsLoading: false | true }) {
  return (
    <Flex justifyContent={"space-between"} h={"70px"} alignItems={"center"} p={props.mobile ? "5px" : "0px"}>
      <HStack spacing={"10px"}>
        <>
          <Text fontSize={"22px"} fontWeight={"medium"}>Dashboard</Text>
          {props.totalIsLoading && (
            <Spinner size={"sm"} />
          )}
        </>
      </HStack>
    </Flex>
  );
}
