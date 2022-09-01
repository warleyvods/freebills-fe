import { Box, HStack, IconButton, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import React from "react";
import { RiMore2Fill } from "react-icons/ri";

type DashBoardProps = {
  description?: string;
  value?: number;
  color?: string;
}

export default function CardsDashboard({description, value, color} : DashBoardProps) {
  const mainColor = useColorModeValue('white', 'gray.800');

  return (
    <Box bg={mainColor} w={"auto"} minH={"auto"} borderRadius={25} p={"20px"} boxShadow={"lg"}>
      <HStack justifyContent={"space-between"} align={"center"}>
        <VStack justify={"flex-start"} p={2} alignItems={"start"}>
          <Text fontWeight="normal" fontSize={"1.2rem"}>{description}</Text>
          <Text fontWeight="bold" fontSize={"1.2rem"}>R$ {value}</Text>
        </VStack>
        <IconButton
          color={"white"}
          colorScheme={color}
          isRound={true}
          aria-label={"button account"}
          icon={<RiMore2Fill />}
          size={"lg"}
        />
      </HStack>
    </Box>
  )
}
