import { Box, HStack, Skeleton, SkeletonCircle, useColorModeValue, VStack } from "@chakra-ui/react";
import React from "react";


export default function CardsSkeleton() {
  const mainColor = useColorModeValue('white', 'gray.800');

  return (
    <Box bg={mainColor} w={"auto"} minH={"105px"} maxH={"105px"} h={"105px"} borderRadius={"10px"} p={"15px"} boxShadow={"sm"} border={"1px"} borderColor={"gray.100"}>
      <HStack justifyContent={"space-between"} align={"center"}>
        <VStack justify={"flex-start"} p={2} alignItems={"start"}>
          <Skeleton w={"130px"} h={"23px"} />
          <Skeleton w={"130px"} h={"23px"} />
        </VStack>
        <SkeletonCircle size={"45px"} />
      </HStack>
    </Box>
  )
}
