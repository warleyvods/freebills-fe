import { Button, Flex, Text, VStack } from "@chakra-ui/react";
import NextLink from "next/link";
import { RiAddLine } from "react-icons/ri";

type EmptyResultsBoxProps = {
  title: string;
  path: string;
  buttonText: string;
}

export function EmptyResultsBox({title, path, buttonText}: EmptyResultsBoxProps) {
  return (
    <Flex bg={"white"} borderBottomRadius={"5px"} h={"400px"} w={"full"} justifyContent={"center"}
          alignItems={"center"}>
      <VStack spacing={"15px"}>
        <Text fontWeight={"medium"} textAlign={"center"} fontSize={"18px"}>{title}</Text>
        <NextLink href={path} passHref>
          <Button
            leftIcon={<RiAddLine fontSize={"20"} />}>
            {buttonText}
          </Button>
        </NextLink>
      </VStack>
    </Flex>
  )
}
