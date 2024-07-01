import { Box, Button, Circle, HStack, Icon, Text, useBreakpoint, useColorModeValue, VStack } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";
import NextLink from "next/link";

type DashBoardProps = {
  description?: string;
  value?: string;
  color?: string;
  icon?: IconType;
  path?: string;
}

export default function CardsDashboard({icon, description, value, color}: DashBoardProps) {
  const borderColor = useColorModeValue("gray.100", "gray.700");
  const bg = useColorModeValue("white", "gray.700");

  return (
    <Box w={"auto"} minH={"105px"} maxH={"105px"} h={"105px"} borderRadius={"10px"} p={"15px"} boxShadow={"sm"} as={"a"} border={"1px"} borderColor={borderColor} bg={bg}>
      <HStack justifyContent={"space-between"} align={"center"}>
        <VStack justify={"flex-start"} p={2} alignItems={"start"}>
          <Text
            fontWeight="medium"
            fontSize={{base: "0.8rem", sm: "1rem", md: "0.95rem"}}
            css={{
              "@media screen and (min-width: 1366px) and (min-height: 768px)": {
                fontSize: "0.97rem",
              },
            }}
          >{description}</Text>
          <Text fontWeight="bold" fontSize={"1.1rem"}>{value}</Text>
        </VStack>
        { icon && (
          <Circle
            size={"45px"}
            bg={color}
            textAlign={"center"}
            _hover={{
              color: "white"
            }}
            _focus={{boxShadow: 'none'}}
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
          </Circle>
        )}
      </HStack>
    </Box>
  )
}
