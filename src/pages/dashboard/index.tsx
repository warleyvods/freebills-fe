import { Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import SidebarWithHeader from "../../components/SideBar";
import CardsDashboard from "../../components/Cards/CardsDashboard";
import { useDashboard } from "../../hooks/dashboard/useDashboard";
import { useMe } from "../../hooks/users/useMe";
import { numberFormat } from "../../components/Utils/utils";
import { MdOutlineAttachMoney } from "react-icons/md";
import { RiArrowDownLine, RiArrowUpLine } from "react-icons/ri";
import { FaRegCreditCard } from "react-icons/fa";


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
            <CardsDashboard description={"Saldo Atual"}
                            value={numberFormat(dash?.totalBalance)}
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
                            value={numberFormat(dash?.totalExpensive)}
                            color={"red.600"}
                            icon={RiArrowDownLine}
                            path={"/transactions/expense"}
            />
            <CardsDashboard description={"Cartões"}
                            value={numberFormat(dash?.totalExpensiveCards)}
                            color={"purple.500"}
                            icon={FaRegCreditCard}
            />
          </SimpleGrid>
        </>
      </Flex>
    </SidebarWithHeader>
  )
}
