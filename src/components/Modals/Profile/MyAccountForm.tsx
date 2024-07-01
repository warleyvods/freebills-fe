import { Avatar, Button, Flex, HStack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { ToolIcon, UploadIcon } from "../../icons";

const initialValues = {
  name: '',
  username: '',
  email: '',
}

export const MyAccountForm = ({onClose}) => {

  return (
    <Flex w={"full"} h={"full"} flexDirection={"column"}>
      {/*HEADING*/}
      <Text fontWeight={"bold"} fontSize={"20px"} mb={"16px"}>
        Minha conta
      </Text>

      {/*FOTO DO PERFIL*/}
      <HStack spacing={"12px"} mb={"16px"}>
        <Avatar size={"md"} />
        <VStack alignItems={"start"} justify={"space-between"} spacing={0} h={"full"}>
          <Button
            size={"xs"}
            isDisabled={false}
            p={"12px 16px"}
            leftIcon={<UploadIcon />}
          >
            Trocar a foto
          </Button>
          <Text fontSize={"12px"}>.jpg ou .png no maximo 1MB</Text>
        </VStack>
      </HStack>


      {/*FORMULARIOS*/}

    </Flex>
  )
}
