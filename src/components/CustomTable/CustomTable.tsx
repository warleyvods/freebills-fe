import React from "react";
import {
  Flex,
  HStack,
  Icon,
  IconButton,
  LightMode,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr, useColorModeValue
} from "@chakra-ui/react";
import { ButtonOptions, CustomButton, TableColumn, TableHeadProps } from "./types/ColumnTypes";
import TableHead from "./components/TableHead";
import { Pagination } from "../Pagination";
import NextLink from "next/link";
import { RiCloseLine, RiPencilLine } from "react-icons/ri";
import { CategoryResponse } from "../../hooks/category/useCategories";
import Tag from "../Tag/Tag";
import { ConfirmationDialog } from "../Dialog/ConfirmationDialog";
import { TransferResponse } from "../../hooks/transfer/useTransfer";
import { useThemeColors } from "../../hooks/useThemeColors";

type CustomTableProps = {
  columns: TableColumn[];
  tableHeadOptions: TableHeadProps;
  onPage?: (page: number) => void;
  onSort: (sort: string) => void;
  onActive: (active: string) => void;
  onKeyword?: (keyword: string) => void;
  onSizePerPage: (size: number) => void;
  actualPage: number;
  sizePerPage: number;
  buttonOptionalColumns: ButtonOptions;
  buttonsOptions: CustomButton
  activeSearch: boolean;
  onDelete?: (id: number) => void;
  tableHeight: number;
  isLoading?: boolean;
  data: CategoryResponse | TransferResponse
  customInfo?: any;
  accounts?: any;
};

export default function CustomTable({
  columns,
  data,
  tableHeadOptions,
  onSort,
  onActive,
  onKeyword,
  onPage,
  actualPage,
  onSizePerPage,
  sizePerPage,
  buttonOptionalColumns,
  buttonsOptions,
  activeSearch,
  onDelete,
  tableHeight,
  isLoading,
  customInfo,
  accounts
}: CustomTableProps) {

  const {bgColor, bgInverse, borderColor, hoverRow, tableHead, bgColor2, tableRow} = useThemeColors();

  if (data?.content.length === 0) {
    return (
      <>
        <TableHead
          onSort={onSort}
          onKeyword={onKeyword}
          onActiveButton={onActive}
          buttonOptions={tableHeadOptions.buttonOptions}
          menuOptions={tableHeadOptions.menuOptions}
          activeSearch={activeSearch}
        />
        <Table>
          <Thead borderLeft={"1px"}
                 borderRight={"1px"}
                 borderTop={"1px"}
                 borderColor={borderColor}
                 h={"35px"}
          >
            <Tr>
              {columns.map((column, index) => (
                <Th key={index} textAlign={column.align}>
                  {column.label || column.name.name}
                </Th>
              ))}
              {buttonOptionalColumns.active && (
                <Th textAlign={"end"}>
                  opções
                </Th>
              )}
            </Tr>
          </Thead>
        </Table>
        {isLoading ? (
          <>
            <Spinner />
          </>
        ) : (
          <Flex w={"full"}
                h={"200px"}
                border={"1px"}
                borderColor={borderColor}
                borderTop={0}
                borderBottomRadius={"10px"}
                justify={"center"}
                alignItems={"center"}
          >
            <Text fontWeight={"medium"} fontSize={"1.0rem"}>
              Não foram encontrados resultados correspondentes à sua pesquisa.
            </Text>
          </Flex>
        )}
      </>
    )
  }

  return (
    <>
      <TableHead
        onSort={onSort}
        onKeyword={onKeyword}
        onActiveButton={onActive}
        buttonOptions={tableHeadOptions.buttonOptions}
        menuOptions={tableHeadOptions.menuOptions}
        activeSearch={activeSearch}
      />
      <Table>
        <Thead borderLeft={"1px"}
               borderRight={"1px"}
               borderTop={"1px"}
               h={"35px"}
               bg={tableHead}
               borderColor={tableHead}
        >
          <Tr>
            {columns.map((column, index) => (
              <Th key={index} textAlign={column.align}>
                {column.label || column.name.name}
              </Th>
            ))}
            {buttonOptionalColumns.active && (
              <Th textAlign={"end"}>
                opções
              </Th>
            )}
          </Tr>
        </Thead>
        <Tbody borderLeft={"1px"} borderRight={"1px"} bg={tableRow} borderColor={borderColor} >
          {data?.content?.map((rowData: any, rowIndex: number) => (
            <Tr key={rowIndex}  _hover={{bg: hoverRow }}>
              {columns.map((column, columnIndex) => (
                <Td key={columnIndex} fontWeight={column.name.fontWeight ? column.name.fontWeight : 'initial'}
                    textAlign={column.align} pt={tableHeight} pb={tableHeight}>
                  {column.tag ? (
                    <Tag
                      variant={
                        rowData[column.name.name] === true ? "green" :
                          rowData[column.name.name] === false ? "red" :
                            rowData[column.name.name] === "REVENUE" ? "green" : 'red'
                      }
                      label={
                        rowData[column.name.name] === true ? column.tag?.trueLabel :
                          rowData[column.name.name] === false ? column.tag?.falseLabel :
                            rowData[column.name.name] === "REVENUE" ? column.tag?.trueLabel : column.tag?.falseLabel
                      }
                    />
                  ) : column.link ? (
                    <>
                      {column.link?.component(rowData.id, rowData[column.name.name])}
                    </>
                  ) : (
                    <Text fontWeight={column.name.fontWeight}>
                      {typeof column.name.function === 'function' ? (column.name.function({
                        singleData: rowData[column.name.name],
                        accounts: accounts
                      })) : (rowData[column.name.name])}
                    </Text>
                  )}
                </Td>
              ))}
              {buttonOptionalColumns.active && (
                //BOTOES
                <Td textAlign={"end"} pt={0} pb={0} pr={"8px"}>
                  <Flex justify={"flex-end"}>
                    <HStack>
                      <>
                        {buttonOptionalColumns.editIsModal.active ? (
                          buttonOptionalColumns.editIsModal.component({
                            data: rowData,
                          })
                        ) : buttonOptionalColumns.isMenu?.active ? (
                          buttonOptionalColumns.isMenu?.component({
                            data: rowData,
                            del: onDelete,
                            info: customInfo
                          })
                        ) : (
                          <LightMode>
                            <NextLink href={{
                              pathname: buttonsOptions.editPath,
                              query: {id: rowData.id},
                            }} passHref
                            >
                              <IconButton
                                variant={"ghost"}
                                colorScheme={"blue"}
                                aria-label={"Call Segun"}
                                size="sm"
                                icon={<Icon as={RiPencilLine} fontSize={"16"} />}
                              />
                            </NextLink>
                          </LightMode>
                        )}
                        {buttonOptionalColumns.deleteButton && (
                          <LightMode>
                            <ConfirmationDialog
                              title={buttonsOptions.titleDelete} mainColor={"white"}
                              buttonText={buttonsOptions.buttonTextDelete}
                              description={buttonsOptions.descriptionDelete}
                              onOk={() => onDelete(rowData.id)}
                              variant={buttonsOptions.deleteVariant}
                              trigger={
                                (onOpen) =>
                                  <IconButton
                                    as={"a"}
                                    colorScheme={"red"}
                                    aria-label={"Call Segun"}
                                    size="sm"
                                    icon={<Icon as={RiCloseLine} fontSize={"16"} />}
                                    onClick={onOpen}
                                  />
                              }
                            />
                          </LightMode>
                        )}
                      </>
                    </HStack>
                  </Flex>
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Pagination
        totalCountOfRegisters={data?.totalElements}
        currentPage={actualPage}
        onPageChange={onPage}
        registerPerPage={sizePerPage}
        handleSizeChange={onSizePerPage}
        changePageSize={true}
      />
    </>
  );
}
