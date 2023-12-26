import { Skeleton, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";

export function SkeletonTable(props: { mobile: boolean }) {
  return <Table variant={props.mobile ? "unstyled" : "simple"} bg={"white"}>
    <Thead borderTop={"1px"} borderColor={"gray.100"} h={"35px"} bg={"gray.50"}>
      <Tr>
        <Th pl={5} pt={0} pr={0} pb={0} textAlign="start" maxW={"20px"} minW={"60px"} w={"60px"}>
        </Th>
        <Th w={"60px"} />
        <Th pl={0} pt={0} pr={0} pb={0} textAlign="start"><Skeleton pl={0} pt={0} pr={0} pb={0} textAlign="start"
                                                                    w={"85px"} h={"15px"} /></Th>
        <Th pl={0} pt={0} pr={0} pb={0} textAlign="center"><Skeleton pl={0} pt={0} pr={0} pb={0} textAlign="start"
                                                                     w={"85px"} h={"15px"} /></Th>
        <Th pl={0} pt={0} pr={0} pb={0} textAlign="center"><Skeleton pl={0} pt={0} pr={0} pb={0} textAlign="start"
                                                                     w={"85px"} h={"15px"} /></Th>
        <Th pl={0} pt={0} pr={0} pb={0} textAlign="center"><Skeleton pl={0} pt={0} pr={0} pb={0} textAlign="start"
                                                                     w={"85px"} h={"15px"} /></Th>
        <Th pl={5} pt={0} pr={0} pb={0} textAlign="start"><Skeleton pl={0} pt={0} pr={0} pb={0} textAlign="start"
                                                                    w={"85px"} h={"15px"} /></Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>
          <Skeleton w={"100px"} h={"20px"} />
        </Td>
        <Td>
        </Td>
        <Td>
          <Skeleton w={"100px"} h={"20px"} />
        </Td>
        <Td>
          <Skeleton w={"100px"} h={"20px"} />
        </Td>
        <Td>
          <Skeleton w={"100px"} h={"20px"} />
        </Td>
        <Td>
          <Skeleton w={"100px"} h={"20px"} />
        </Td>
        <Td>
          <Skeleton w={"100px"} h={"20px"} />
        </Td>
      </Tr>
    </Tbody>
  </Table>;
}
