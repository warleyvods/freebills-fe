import React from 'react';
import SidebarWithHeader from "../../components/SideBar";
import {
  Box,
  Button,
  Flex,
  Heading, HStack,
  Icon, IconButton,
  LightMode,
  Spinner,
  Table,
  Tbody, Td,
  Text,
  Th,
  Thead,
  Tr, VStack
} from "@chakra-ui/react";
import NextLink from "next/link";
import { RiAddLine, RiCloseLine, RiPencilLine } from "react-icons/ri";
import { ConfirmationDialog } from "../../components/Dialog/ConfirmationDialog";
import CardsAccount from "../../components/Cards/CardsAccounts";

export default function Accounts() {



  return (
    <SidebarWithHeader>
      <Box>
        <Flex w="100%" maxWidth={"auto"} mx={"auto"}>
          <Box flex={1} borderRadius={8} p={8} bg={"inherit"}>
            <Flex mb={8} justify={"space-between"} align={"center"}>
              <Heading size={"lg"} fontWeight={"bold"}>Contas</Heading>
              <LightMode>
                <NextLink href={"/users/create"} passHref>
                  <Button as={"a"}
                          size={"sm"}
                          fontSize={"sm"}
                          colorScheme={"facebook"}
                          leftIcon={<Icon as={RiAddLine} fontSize={"20"} />}
                  >Adicionar novo
                  </Button>
                </NextLink>
              </LightMode>
            </Flex>

            <HStack spacing={"20px"}>

              <CardsAccount />
              <CardsAccount />
              <CardsAccount />
              <CardsAccount />


            </HStack>
          </Box>
        </Flex>
      </Box>
    </SidebarWithHeader>
  )
};
