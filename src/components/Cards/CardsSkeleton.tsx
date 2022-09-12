import { Box, HStack, Skeleton, SkeletonCircle, useColorModeValue, VStack } from "@chakra-ui/react";
import React from "react";


export default function CardsSkeleton() {
  const mainColor = useColorModeValue('white', 'gray.800');

  return (
    <Box bg={mainColor} w={"auto"} minH={"auto"} borderRadius={25} p={"20px"} boxShadow={"lg"} as={"a"}>
      <HStack justifyContent={"space-between"} align={"center"}>
        <VStack justify={"flex-start"} p={2} alignItems={"start"} spacing={5}>
          <Skeleton height='20px' minW={"150px"} />
          <Skeleton height='20px' minW={"150px"} />
        </VStack>
        <SkeletonCircle size='60px' />
      </HStack>
    </Box>
  )
}
