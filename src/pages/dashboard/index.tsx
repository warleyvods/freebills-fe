import { Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import SidebarWithHeader from "../../components/SideBar";
import CardsDashboard from "../../components/Cards/CardsDashboard";
import { useDashboard } from "../../hooks/dashboard/useDashboard";
import { useMe } from "../../hooks/users/useMe";


export default function Dashboard() {
  const {data: user} = useMe();
  const {data: dash} = useDashboard(user?.id);

  return (
    <SidebarWithHeader>
      <Flex flexDirection='column' pt={{base: "0px", md: "0"}}>
        <Flex flexDirection="row" justifyContent="space-between" mb="20px" mt="10px" ml={"10px"}>
          <Heading>Dashboard</Heading>
        </Flex>
        <>
          <SimpleGrid columns={{sm: 1, md: 2, xl: 4}} spacing='24px'>
            <CardsDashboard description={"Saldo Atual"} value={dash?.totalBalance} color={"blue"} />
            <CardsDashboard description={"Receitas"} value={dash?.totalRevenue} color={"green"} />
            <CardsDashboard description={"Despesas"} value={dash?.totalExpensive} color={"red"} />
            <CardsDashboard description={"Cartões"} value={dash?.totalExpensiveCards} color={"purple"} />
          </SimpleGrid>
        </>
      </Flex>
    </SidebarWithHeader>
  )
}
