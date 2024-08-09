import { Box, Circle, HStack, Icon, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";
import Counter from "../Form/Counter";
import { moneyFormat } from "../Utils/utils";

type DashBoardProps = {
  description?: string;
  value?: string;
  color?: string;
  icon?: IconType;
  path?: string;
  amountCounter?: number;
}

export default function CardsDashboard({icon, description, value, color, amountCounter}: DashBoardProps) {
  const borderColor = useColorModeValue("gray.100", "gray.700");
  const bg = useColorModeValue("white", "gray.700");

  return (
    <Box w={"auto"} minH={"105px"} maxH={"105px"} h={"105px"} borderRadius={"10px"} p={"15px"} boxShadow={"sm"} as={"a"}
         border={"1px"} borderColor={borderColor} bg={bg}>
      <HStack justifyContent={"space-between"} align={"center"} h={"full"}>
        <VStack justify={"flex-start"} p={2} alignItems={"start"} h={"full"}>
          <Text
            fontWeight="medium"
            fontSize={{base: "0.8rem", sm: "1rem", md: "0.95rem"}}
            css={{
              "@media screen and (min-width: 1366px) and (min-height: 768px)": {
                fontSize: "0.97rem",
              },
            }}
          >{description}
          </Text>
          {amountCounter!! && amountCounter > 0 ? (
            <Counter
              targetValue={amountCounter}
              direction={"up"}
              fontSize={"1.1rem"}
              fontWeight={"bold"}
            />
          ) : (
            <Text fontWeight="bold" fontSize={"1.1rem"}>{moneyFormat(0)}</Text>
          )}
        </VStack>
        {icon && (
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
