import { Box, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  totalCountOfRegisters: number;
  registerPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter(page => page >= 0)
}

export function Pagination({totalCountOfRegisters, registerPerPage = 7, currentPage = 1, onPageChange}: PaginationProps) {

  const lastPage = totalCountOfRegisters % registerPerPage == 0 ? (totalCountOfRegisters / registerPerPage) - 1 : Math.floor(totalCountOfRegisters / registerPerPage)
  const previousPages = currentPage > 0 ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1) : []
  const nextPages = currentPage < lastPage ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage)) : []

  return (
    <Stack
      direction={ "row" }
      mt={ 8 }
      justify={ "space-between" }
      align={ "center" }
      spacing={ 6 }
    >
      <Box>
         Total: <strong>{totalCountOfRegisters}</strong>
      </Box>

      <Stack direction={ "row" } spacing={ 2 }>

        {/*Printa a primeira pagina*/ }

        { currentPage > 1 && (
          <>
            <PaginationItem onPageChange={ onPageChange } number={ 0 } />
            { currentPage > (2 + siblingsCount) &&
                <Text color={ "gray.300" } width={ 8 }>...</Text>
            }
          </>
        ) }

        {
          previousPages.length > 0 && previousPages.map(page => {
            return <PaginationItem onPageChange={ onPageChange } key={ page } number={ page } />
          }) }

        <PaginationItem onPageChange={ onPageChange } number={ currentPage } isCurrent />

        { nextPages.length > 0 && nextPages.map(page => {
          return <PaginationItem onPageChange={ onPageChange } key={ page } number={ page } />
        }) }

        {/*Printa a ultima pagina*/ }
        { (currentPage + siblingsCount) < lastPage && (
          <>
            { (currentPage + 1 + siblingsCount) < lastPage && <Text>...</Text> }
            <PaginationItem onPageChange={ onPageChange } number={ lastPage } />
          </>
        ) }

      </Stack>
    </Stack>
  )
}
