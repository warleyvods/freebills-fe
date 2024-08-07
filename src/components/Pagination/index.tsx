import { Box, Button, Flex, HStack, Icon, Select, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";
import React, { useState } from "react";
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { moneyFormat } from "../Utils/utils";
import { useThemeColors } from "../../hooks/useThemeColors";

interface PaginationProps {
  totalCountOfRegisters: number;
  registerPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
  changePageSize?: boolean;
  handleSizeChange?: (value: number) => void;
  totalSurveyValues?: number;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number): number[] {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter(page => page >= 0)
}

export function Pagination({
  totalCountOfRegisters,
  registerPerPage = 10,
  currentPage = 1,
  onPageChange,
  changePageSize = false,
  handleSizeChange,
  totalSurveyValues
}: PaginationProps) {
  const [selectedValue, setSelectedValue] = useState<number>(registerPerPage);
  const {bgInverse, bgColor, bgColor2, borderColor} = useThemeColors();

  const lastPage: number = totalCountOfRegisters % registerPerPage == 0 ? (totalCountOfRegisters / registerPerPage) - 1 : Math.floor(totalCountOfRegisters / registerPerPage)
  const previousPages: number[] = currentPage > 0 ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1) : []
  const nextPages: number[] = currentPage < lastPage ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage)) : []

  function nextPage() {
    if (currentPage < lastPage) {
      onPageChange(currentPage + 1);
    }
  }

  function previousPage() {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  }

  return (
    <Stack
      direction={"row"}
      mt={0}
      justify={"space-between"}
      align={"center"}
      spacing={"5px"}
      pt={3}
      pb={3}
      pl={4}
      pr={2}
      bg={bgColor}
      borderLeft={'1px'}
      borderRight={'1px'}
      borderBottom={'1px'}
      borderColor={borderColor}
      borderBottomRadius={"5px"}
    >
      {changePageSize && (
        <HStack flexDirection="row" alignItems="center">
          <HStack>
            <Text>Exibir:</Text>
            <Select
              size="sm"
              variant="outline"
              value={selectedValue}
              onChange={(event) => {
                // @ts-ignore
                const value = parseInt(event.target.value);
                setSelectedValue(value);
                onPageChange(0);
                handleSizeChange(value);
              }}
            >
              <option value={5}>5 por página</option>
              <option value={10}>10 por página</option>
              <option value={15}>15 por página</option>
              <option value={20}>20 por página</option>
              <option value={50}>50 por página</option>
              <option value={100}>100 por página</option>
            </Select>
          </HStack>
          <Box display={{base: 'none', md: 'inline'}}>
            Exibindo <strong>1</strong> até <strong>{registerPerPage}</strong> de <strong>{totalCountOfRegisters}</strong> resultados
          </Box>
        </HStack>
      )}
      <HStack spacing={0}>
        <Text fontWeight={"medium"}
              mr={"15px"}>{!!totalSurveyValues ? `Soma: ${moneyFormat(totalSurveyValues)}` : ""}</Text>
        <Button
          onClick={previousPage}
          paddingLeft={0}
          paddingRight={0}
          borderLeftColor={borderColor}
          borderRightColor={borderColor}
          borderLeftRadius={"5px"}
          borderRightRadius={"0px"}
        >
          <Icon as={ChevronLeftIcon} fontSize={"18"} color={bgInverse} />
        </Button>
        <Stack direction={"row"} spacing={"0px"}>
          {currentPage > 1 && (
            <>
              <PaginationItem onPageChange={onPageChange} number={1} />
              {currentPage > (2 + siblingsCount) &&
                  <Flex w={"full"}
                        h={"auto"}
                        border={"1px"}
                        borderLeft={0}
                        borderColor={bgColor2}
                        textAlign={"center"}
                  >
                      <Text color={"black"} width={8}>...</Text>
                  </Flex>
              }
            </>
          )}
          { previousPages.length > 0 && previousPages.map(page => {
              return <PaginationItem onPageChange={onPageChange} key={page} number={page + 1} />
            })}
          <PaginationItem onPageChange={onPageChange} number={currentPage + 1} isCurrent />
          { nextPages.length > 0 && nextPages.map(page => {
            return <PaginationItem onPageChange={onPageChange} key={page} number={page + 1} />
          })}
          {(currentPage + siblingsCount) < lastPage && (
            <>
              {(currentPage + 1 + siblingsCount) < lastPage &&
                  <Flex w={"full"}
                        h={"auto"}
                        border={"1px"}
                        borderLeft={0}
                        borderColor={"gray.150"}
                        textAlign={"center"}
                  >
                      <Text color={"black"} width={8}>...</Text>
                  </Flex>
              }
              <PaginationItem onPageChange={onPageChange} number={lastPage + 1} />
            </>
          )}
        </Stack>
        <Button
          onClick={nextPage}
          paddingLeft={0}
          paddingRight={0}
          borderLeftColor={"gray.150"}
          borderRightColor={"gray.150"}
          borderLeftRadius={"0px"}
          borderRightRadius={"5px"}
        >
          <Icon as={ChevronRightIcon} fontSize={"18"} color={bgInverse} />
        </Button>
      </HStack>
    </Stack>
  )
}
