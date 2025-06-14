import {
  Button,
  Circle,
  Flex,
  HStack,
  Icon,
  IconButton,
  LightMode,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react'
import HeadingTable from "../../Tables/HeadingTable";
import { RiAddLine, RiArchiveLine, RiListCheck } from "react-icons/ri";
import NextLink from "next/link";
import React, { useState } from "react";
import { NewSubcategoryModal } from "../../Modals/NewSubcategory";
import { ButtonOptions, CustomButton, TableColumn, TableHeadProps } from "../../CustomTable/types/ColumnTypes";
import CustomTable from "../../CustomTable/CustomTable";
import { ChevronLeftIcon, EditIcon, HamburgerIcon, RepeatIcon } from "@chakra-ui/icons";
import { ConfirmationDialog } from "../../Dialog/ConfirmationDialog";
import SideBarLayout from "../../SidebarLayout/SideBarLayout";
import { useSubcategories, SubcategoryResponse } from "../../../hooks/subcategory/useSubcategories";
import { useDeleteSubcategory } from "../../../hooks/subcategory/useDeleteSubcategory";
import { useUpdateArchiveSubcategory } from "../../../hooks/subcategory/useUpdateArchiveSubcategory";
import { EmojiOrImageIcon } from "../../Modals/NewCategory/EmojiOrImageIcon";
import { Subcategory } from "../../../hooks/subcategory/type";
import { useSubcategoriesByCategory } from "../../../hooks/subcategory/useSubcategoriesByCategory";

const columns: TableColumn[] = [
  {
    name: {
      name: "name",
      fontWeight: "medium"
    },
    align: "start",
    label: "Nome",
  },
  {
    name: {
      name: "categoryName",
      fontWeight: "medium"
    },
    align: "center",
    label: "Categoria",
  },
  {
    name: {
      name: "icon",
      fontWeight: "medium",
      function: IconComponent
    },
    align: "center",
    label: "Ícone",
  },
  {
    name: {
      name: "color",
      fontWeight: "medium",
      function: ColorComponent
    },
    align: "center",
    label: "Cor",
  },
  {
    name: {
      name: "categoryType",
      fontWeight: "medium"
    },
    align: "center",
    label: "Tipo",
    tag: {
      trueLabel: "Receita",
      falseLabel: "Despesa"
    }
  }
];

const tableHead: TableHeadProps = {
  menuOptions: [
    {value: 'name', label: 'Nome'},
    {value: 'categoryName', label: 'Categoria'},
  ],
  buttonOptions: [
    {value: '', label: 'Todos', active: true},
    {value: 'REVENUE', label: 'Receitas', active: true},
    {value: 'EXPENSE', label: 'Despesas', active: true},
  ],
  activeSearch: true
}

const buttonOptions: CustomButton = {
  editPath: "#",
  titleDelete: "Deletar Subcategoria",
  descriptionDelete: "Deseja deletar esta subcategoria? Esta ação não poderá ser desfeita.",
  buttonTextDelete: "Deletar",
  deleteVariant: "danger"
}

const buttonsOptions: ButtonOptions = {
  active: true,
  editIsModal: {
    active: false
  },
  isMenu: {
    active: true,
    component: SubcategoryMenu
  },
  deleteButton: false
}

function ColorComponent({singleData: colorName}) {
  return (
    <Flex justify={"center"}>
      <Circle bg={colorName} size={"25px"} />
    </Flex>
  )
}

function IconComponent({singleData: icon}) {
  return (
    <Flex alignItems={"center"} justify={"center"}>
      <EmojiOrImageIcon
        icon={icon}
        emojiFontSize="2xl"
        boxSize={"20px"}
      />
    </Flex>
  )
}

type MenuProps = {
  data: any;
  del: (id: number) => void
  info: {
    toggleSubcategory: any;
    archived: boolean;
  };
}

function SubcategoryMenu({data, del, info}: MenuProps) {

  function toggleArchiveSubcategory(id: number) {
    info.toggleSubcategory.mutate(id)
  }

  return (
    <Menu>
      <MenuButton
        mr={"20px"}
        as={IconButton}
        aria-label='#'
        icon={<HamburgerIcon />}
        variant='outline'
      />
      <MenuList>
        <NewSubcategoryModal
          subcategoryId={data?.id}
          trigger={(open) => (
            <MenuItem icon={<EditIcon />} onClick={open}>
              Editar
            </MenuItem>
          )}
        />
        <ConfirmationDialog
          title={info.archived ? "Desarquivar subcategoria" : "Arquivar subcategoria"}
          mainColor={"white"}
          buttonText={info.archived ? "Desarquivar" : "Arquivar"}
          description={
            <>
              Você tem certeza que deseja {info.archived ? "desarquivar" : "arquivar"} a subcategoria <Text as="span" fontWeight="bold">{data.name}</Text>?
            </>
          }
          onOk={() => toggleArchiveSubcategory(data.id)}
          variant={"alert"}
          trigger={(onOpen) =>
            <MenuItem onClick={onOpen} icon={<RepeatIcon />}>
              {info.archived ? "Desarquivar" : "Arquivar"}
            </MenuItem>
          }
        />
        { info.archived && (
          <ConfirmationDialog
            title={"Deletar"}
            mainColor={"white"}
            buttonText={"Deletar"}
            description={"Deseja deletar esta subcategoria? Essa ação não poderá ser desfeita."}
            onOk={() => del(data.id)}
            variant={"danger"}
            trigger={(onOpen) =>
              <MenuItem onClick={onOpen} icon={<RepeatIcon />}>
                Deletar subcategoria
              </MenuItem>
            }
          />
        ) }
      </MenuList>
    </Menu>
  );
}

export default function SubcategoryTable({ archived, categoryId }: { archived: boolean, categoryId?: number | null }) {
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [sort, setSort] = useState<string>("name,asc");
  const [active, setActive] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");
  
  const { data: subcategoriesDataByCategory, isLoading: isLoadingByCategory } = useSubcategoriesByCategory(
    categoryId || 0,
    page,
    size,
    sort,
    active,
    keyword,
    archived
  );
  
  const { data: subcategoriesData, isLoading: isLoadingAll } = useSubcategories(
    page,
    size,
    sort,
    active,
    keyword,
    archived
  );
  
  const subcategoriesResult = categoryId ? subcategoriesDataByCategory : subcategoriesData;
  const isLoading = categoryId ? isLoadingByCategory : isLoadingAll;
  
  const deleteSubcategory = useDeleteSubcategory();
  const toggleSubcategory = useUpdateArchiveSubcategory();
  
  const subcategories = subcategoriesResult || { content: [], totalElements: 0, totalPages: 0, size: 0, number: 0 };

  const handleDelete = (id: number) => {
    deleteSubcategory.mutate(id)
  }

  const handleSort = (sort: string) => {
    setSort(sort)
  }

  const handleActiveButtonClick = (activeButton: string) => {
    setActive(activeButton);
  };

  const handleSizePerPage = (size: number) => {
    setSize(size)
  }

  const handlePage = (page: number) => {
    setPage(page)
  }

  const handleKeyword = (keyword: string) => {
    setKeyword(keyword)
  }

  return (
    <SideBarLayout>
      <HStack justify={!archived ? "space-between" : "initial"}>
        { archived && (
          <NextLink href={"/subcategories"}>
            <IconButton
              isRound={true}
              variant={"solid"}
              aria-label={"button account"}
              icon={<ChevronLeftIcon fontSize={"26px"} />}
              size={"sm"}
            />
          </NextLink>
        )}
        <HeadingTable title={!archived ? (categoryId ? "Subcategorias" : "Todas as Subcategorias") : "Subcategorias arquivadas"} />
        { !archived && (
          <HStack spacing={"8px"}>
            <NewSubcategoryModal
              initialCategoryId={categoryId || undefined}
              text={"Adicionar"}
              trigger={onOpen =>
                <LightMode>
                  <Button size={"sm"}
                          onClick={onOpen}
                          fontSize={"sm"}
                          variant={"default"}
                          leftIcon={<Icon as={RiAddLine} fontSize={"20"} />}
                  >Adicionar subcategoria
                  </Button>
                </LightMode>
              }
            />
            <LightMode>
              <NextLink href={"/subcategories/archived"}>
                <Button size={"sm"}
                        fontSize={"sm"}
                        colorScheme={"purple"}
                        leftIcon={<Icon as={RiArchiveLine} fontSize={"20"} />}
                >Arquivados
                </Button>
              </NextLink>
            </LightMode>
          </HStack>
        ) }
      </HStack>
      <CustomTable
        columns={columns}
        data={subcategories}
        tableHeadOptions={tableHead}
        actualPage={page}
        sizePerPage={size}
        onSort={handleSort}
        onKeyword={handleKeyword}
        onActive={handleActiveButtonClick}
        onPage={handlePage}
        onSizePerPage={handleSizePerPage}
        buttonOptionalColumns={buttonsOptions}
        buttonsOptions={buttonOptions}
        activeSearch={true}
        onDelete={handleDelete}
        tableHeight={3}
        isLoading={isLoading}
        customInfo={{ toggleSubcategory, archived }}
      />
    </SideBarLayout>
  )
} 