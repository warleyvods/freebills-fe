import { Box, Button, Flex, HStack, IconButton, Text, useColorModeValue, LightMode } from "@chakra-ui/react";
import React from "react";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { RiMore2Fill } from "react-icons/ri";

export default function CardsAccount() {
  const mainColor = useColorModeValue('white', 'gray.800');



  return(
    <Box bg={mainColor} minW={"350px"} minH={"auto"} borderRadius={25} p={"20px"} boxShadow={"lg"}>
      <HStack justifyContent={"space-between"} align={"center"}>
        <Text fontWeight="bold" fontSize={"25px"}>Conta Inter</Text>
        <IconButton
          borderRadius={25}
          aria-label={"button account"}
          icon={<RiMore2Fill  />}
        />
      </HStack>

      <HStack justify={"space-between"} spacing={20} mt={"35px"}>
        <Text fontWeight="bold" fontSize={"18px"}>Saldo Atual</Text>
        <Text fontWeight="bold" fontSize={"20px"} color="green">R$ 0,00</Text>
      </HStack>

      <HStack justify={"space-between"} spacing={20} mt={"05px"}>
        <Text fontWeight="bold" fontSize={"18px"}>Saldo Atual</Text>
        <Text fontWeight="bold" fontSize={"20px"} color="green">R$ 0,00</Text>
      </HStack>
      <Flex justifyContent={"flex-end"} mt={"20px"}>
        <LightMode>
          <Button colorScheme={"facebook"}>Adicionar Despesa</Button>
        </LightMode>
      </Flex>
    </Box>
  )
}
