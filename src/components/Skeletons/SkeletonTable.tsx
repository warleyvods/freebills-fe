import { Skeleton, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import React from "react";

type SkeletonProps = {
  isMobile: boolean;
}

export function SkeletonTable({ isMobile }: SkeletonProps) {

  return (
    isMobile ? (
      <Table>
        <Thead>
          <Tr>

          </Tr>
        </Thead>
      </Table>
    ) : (
      <Table variant={isMobile ? "unstyled" : "simple"} >
        <Tbody>
          <Tr>
            <Td>
              <Skeleton w={"150px"} h={"20px"} />
            </Td>
            <Td>
              <Skeleton w={"150px"} h={"20px"} />
            </Td>
            <Td>
              <Skeleton w={"150px"} h={"20px"} />
            </Td>
            <Td>
              <Skeleton w={"150px"} h={"20px"} />
            </Td>
            <Td>
              <Skeleton w={"150px"} h={"20px"} />
            </Td>
            <Td>
              <Skeleton w={"150px"} h={"20px"} />
            </Td>
          </Tr>
          <Tr>
            <Td>
              <Skeleton w={"150px"} h={"20px"} />
            </Td>
            <Td>
              <Skeleton w={"150px"} h={"20px"} />
            </Td>
            <Td>
              <Skeleton w={"150px"} h={"20px"} />
            </Td>
            <Td>
              <Skeleton w={"150px"} h={"20px"} />
            </Td>
            <Td>
              <Skeleton w={"150px"} h={"20px"} />
            </Td>
            <Td>
              <Skeleton w={"150px"} h={"20px"} />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    )
  )
};
