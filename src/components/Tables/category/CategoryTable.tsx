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
import { RiAddLine, RiArchiveLine } from "react-icons/ri";
import NextLink from "next/link";
import React, { useState } from "react";
import { NewCategoryModal } from "../../Modals/NewCategory";
import { ButtonOptions, CustomButton, TableColumn, TableHeadProps } from "../../CustomTable/types/ColumnTypes";
import CustomTable from "../../CustomTable/CustomTable";
import { ChevronLeftIcon, EditIcon, HamburgerIcon, RepeatIcon } from "@chakra-ui/icons";
import { ConfirmationDialog } from "../../Dialog/ConfirmationDialog";
import SideBarLayout from "../../SidebarLayout/SideBarLayout";
import { useCategories } from "../../../hooks/category/useCategories";
import { useDeleteCategory } from "../../../hooks/category/useDeleteCategory";
import { useUpdateArchiveCategory } from "../../../hooks/category/useUpdateArchiveCategory";
import { EmojiOrImageIcon } from "../../Modals/NewCategory/EmojiOrImageIcon";

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
  ],
  buttonOptions: [
    {value: null, label: 'Todos', active: true},
    {value: 'REVENUE', label: 'Receitas', active: true},
    {value: 'EXPENSE', label: 'Despesas', active: true},
  ],
  activeSearch: true
}

const buttonOptions: CustomButton = {
  editPath: "#",
  titleDelete: "Deletar Categoria",
  descriptionDelete: "Deseja deletar esta categoria? Esta ação não poderá ser desfeita.",
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
    component: CategoryMenu
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
    toggleCategory: any;
    archived: boolean;
  };
}

function CategoryMenu({data, del, info}: MenuProps) {

  function toggleArchiveCategory(id: number) {
    info.toggleCategory.mutate(id)
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
        <NewCategoryModal
          categoryId={data?.id}
          trigger={(open) => (
            <MenuItem icon={<EditIcon />} onClick={open}>
              Editar
            </MenuItem>
          )}
        />
        <ConfirmationDialog
          title={info.archived ? "Desarquivar categoria" : "Arquivar categoria"}
          mainColor={"white"}
          buttonText={info ? "Desarquivar" : "Arquivar"}
          description={
            <>
              Você tem certeza que deseja arquivar a categoria <Text as="span" fontWeight="bold">{data.name}</Text>?
            </>
          }
          onOk={() => toggleArchiveCategory(data.id)}
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
            description={"Deseja deletar esta categoria? Essa ação não poderá ser desfeita."}
            onOk={() => del(data.id)}
            variant={"danger"}
            trigger={(onOpen) =>
              <MenuItem onClick={onOpen} icon={<RepeatIcon />}>
                Deletar categoria
              </MenuItem>
            }
          />
        ) }
      </MenuList>
    </Menu>
  );
}

export default function CategoryTable({ archived }: { archived: boolean }) {
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [sort, setSort] = useState<string>("name,asc");
  const [active, setActive] = useState<string>(null);
  const [keyword, setKeyword] = useState<string>("");
  const { data: categories, isLoading } = useCategories(page, size, sort, active, keyword, archived);
  const deleteCategory = useDeleteCategory();
  const toggleCategory = useUpdateArchiveCategory();

  const handleDelete = (id: number) => {
    deleteCategory.mutate(id)
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
          <NextLink href={"/categories"}>
            <IconButton
              isRound={true}
              variant={"solid"}
              aria-label={"button account"}
              icon={<ChevronLeftIcon fontSize={"26px"} />}
              size={"sm"}
            />
          </NextLink>
        )}
        <HeadingTable title={!archived ? "Categorias" : "Categorias arquivadas"} />
        { !archived && (
          <HStack spacing={"8px"}>
            <NewCategoryModal
              text={"Adicionar"}
              trigger={onOpen =>
                <LightMode>
                  <Button size={"sm"}
                          onClick={onOpen}
                          fontSize={"sm"}
                          variant={"default"}
                          leftIcon={<Icon as={RiAddLine} fontSize={"20"} />}
                  >Adicionar categoria
                  </Button>
                </LightMode>
              }
            />
            <LightMode>
              <NextLink href={"/categories/archived"}>
                <Button as={"a"}
                        size={"sm"}
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
        data={categories}
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
        customInfo={{ toggleCategory, archived }}
      />
    </SideBarLayout>
  )
}
