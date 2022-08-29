import { Flex, Link, SimpleGrid, Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import SidebarWithHeader from "../../components/SideBar";


export default function Dashboard() {
  return (
    <SidebarWithHeader>
      <Flex flexDirection='column' pt={{ base: "120px", md: "0" }}>
        <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing='24px'>
          <Box>Ola mundo!</Box>
        </SimpleGrid>
      </Flex>
    </SidebarWithHeader>
  )
}
