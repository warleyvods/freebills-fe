import { Box, Button, Flex, HStack, IconButton, LightMode, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { RiMore2Fill } from "react-icons/ri";

type AccountProps = {
  amount: number;
  description: string;
}

export default function CardsAccount({ amount, description} : AccountProps) {
  const mainColor = useColorModeValue('white', 'gray.800');

  return(
    <Box bg={mainColor} w={"auto"} minH={"auto"} borderRadius={25} p={"20px"} boxShadow={"lg"}>
      <HStack justifyContent={"space-between"} align={"center"}>
        <Text fontWeight="bold" fontSize={"1.3rem"}>{description}</Text>
        <IconButton
          borderRadius={25}
          aria-label={"button account"}
          icon={<RiMore2Fill  />}
        />
      </HStack>

      <HStack justify={"space-between"} spacing={20} mt={"35px"}>
        <Text fontWeight={"semibold"} fontSize={"1.2rem"}>Saldo atual</Text>
        <Text fontWeight="semibold" fontSize={"1.2rem"} color="green">R$ {amount}</Text>
      </HStack>

      <HStack justify={"space-between"} spacing={20} mt={"05px"}>
        <Text fontWeight="normal" fontSize={"1.2rem"}>Saldo previsto</Text>
        <Text fontWeight="normal" fontSize={"1.2rem"} color="green">R$ 0,00</Text>
      </HStack>
      <Flex justifyContent={"flex-end"} mt={"20px"}>
        <LightMode>
          <Button variant='ghost' colorScheme={"facebook"}>ADICIONAR DESPESA</Button>
        </LightMode>
      </Flex>
    </Box>
  )
};
