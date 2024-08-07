import { Flex, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { AppearanceRadioGroup } from "./AppearanceRadioGroup";

export const UserPreference = () => {

  const changeAppearance = async (value: string) => {
  }

  return (
    <Flex w={"full"} h={"full"} flexDirection={"column"}>
      {/*HEADING*/}
      <Text fontWeight={"bold"} fontSize={"20px"} mb={"16px"}>
        Aparência
      </Text>

      <Stack spacing={6}>
        <AppearanceRadioGroup
          defaultValue={'light'}
          onChange={changeAppearance}
        />
      </Stack>
    </Flex>
  )
}
