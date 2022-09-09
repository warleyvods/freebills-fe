import { Box, Button, Circle, HStack, Icon, IconButton, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import React from "react";
import { RiMore2Fill } from "react-icons/ri";
import { IconType } from "react-icons";
import NextLink from "next/link";

type DashBoardProps = {
  description?: string;
  value?: string;
  color?: string;
  icon?: IconType;
  path?: string;
}

export default function CardsDashboard({icon, description, value, color, path}: DashBoardProps) {
  const mainColor = useColorModeValue('white', 'gray.800');

  return (
    <Box bg={mainColor} w={"auto"} minH={"auto"} borderRadius={25} p={"20px"} boxShadow={"lg"} as={"a"}>
      <HStack justifyContent={"space-between"} align={"center"}>
        <VStack justify={"flex-start"} p={2} alignItems={"start"}>
          <Text fontWeight="normal" fontSize={"1.2rem"}>{description}</Text>
          <Text fontWeight="bold" fontSize={"1.2rem"}>{value}</Text>
        </VStack>
        {icon && (
          <Circle size={"60px"}
                  bg={color}
                  textAlign={"center"}
                  as={Button}
                  _hover={{
                    color: "white"
                  }}
                  _focus={{boxShadow: 'none'}}
          >
            <NextLink
              href={{
                pathname: `${!!path ? path : ''}`,
              }}
              passHref
            >
            <Icon
              w={"25px"}
              h={"25px"}
              fontSize="16"
              color={"white"}
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
            </NextLink>
          </Circle>
          //   <IconButton
          //   color={"white"}
          //   colorScheme={color}
          //   isRound={true}
          //   aria-label={"button account"}
          //   icon={<RiMore2Fill />}
          //   size={"lg"}
          // />
        )}

      </HStack>
    </Box>
  )
}
