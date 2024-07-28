import { Button, Flex, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { RiAddLine } from "react-icons/ri";
import IconComponent from "../../Icons/IconComponent";
import React from "react";

type EmptyResultsBoxProps = {
  title: string;
  path?: string;
  buttonText?: string;
}

export function EmptyResultsBox({title, path, buttonText}: EmptyResultsBoxProps) {
  return (
    <Flex borderBottomRadius={"5px"} h={"400px"} w={"full"} justifyContent={"center"} alignItems={"center"}>
      <VStack spacing={"15px"}>
        <Flex justify={"center"} align={"center"} flexDir={"column"} w={"full%"} h={"60vh"}>
          <Text fontSize={"lg"} fontWeight={"medium"} mb={"30px"}>{title}</Text>
          <IconComponent name={"void"} width={"200"} height={"200"}/>
        </Flex>

        {/*TODO resolver problema (nao mostrar o botao quando nao houver texto ou path)*/}
        { path!! || buttonText!! && (
          <NextLink href={path} passHref>
            <Button
              leftIcon={<RiAddLine fontSize={"20"} />}>
              {buttonText}
            </Button>
          </NextLink>
        ) }
      </VStack>
    </Flex>
  )
}
