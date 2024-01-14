import React from "react";
import SideBarLayout from "../../../components/SidebarLayout/SideBarLayout";
import { Avatar, Button, Flex, HStack, Icon, LightMode, Text, VStack } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import { ModalPassword } from "../../../components/Modals/Password";


export default function UserList() {
  // const isMobile = useBreakpointValue({base: true, md: true, lg: false});

  return (
    <SideBarLayout>
      <Flex w={"full"}
            h={"500px"}
            mt={"10px"}
            borderRadius={"10px"}
            border={"1px"}
            borderColor={"gray.100"}
            p={5}
            justify={"start"}
            alignItems={"start"}
      >
        <HStack w={"full"} justify={"space-between"}>
          <VStack spacing={"10px"} alignItems={"start"}>
            <Avatar size={{base: "md", md: "lg"}} />
            <Text fontWeight={"medium"}>Maria Joaquina Teste da Silva</Text>
          </VStack>

          <ModalPassword
            id={1}
            trigger={(onOpen) =>
              <LightMode>
                <Button as={"a"}
                        variant={"danger"}
                        leftIcon={<Icon as={RepeatIcon} fontSize={"18"} />}
                        onClick={onOpen}
                >
                  Alterar senha
                </Button>
              </LightMode>}
          />
        </HStack>

      </Flex>
    </SideBarLayout>
  );
}
