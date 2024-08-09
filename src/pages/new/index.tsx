import { Flex } from "@chakra-ui/react";
import React from "react";
import { RiArrowDownLine } from "react-icons/ri";
import CardsDashboard from "../../components/Cards/CardsDashboard";

export const New = () => {

  return (
    <Flex w={"full"} justify={"center"} h={"500px"} >
      <CardsDashboard
        description={"Total de Receitas"}
        amountCounter={0}
        color={"green.600"}
        icon={RiArrowDownLine}
      />
    </Flex>
  )
}

export default New;
