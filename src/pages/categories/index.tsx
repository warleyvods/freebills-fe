import SideBarLayout from "../../components/SidebarLayout/SideBarLayout";
import {
  Button,
  Circle, Flex,
  HStack,
  Icon,
  IconButton,
  LightMode,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import HeadingTable from "../../components/Tables/HeadingTable";
import { RiAddLine, RiArchiveLine } from "react-icons/ri";
import NextLink from "next/link";
import React, { useState } from "react";
import { NewCategoryModal } from "../../components/Modals/NewCategory";
import { useCategories } from "../../hooks/category/useCategories";
import { useDeleteCategory } from "../../hooks/category/useDeleteCategory";
import {
  ButtonOptions,
  CustomButton,
  TableColumn,
  TableHeadProps
} from "../../components/CustomTable/types/ColumnTypes";
import CustomTable from "../../components/CustomTable/CustomTable";
import { AddIcon, EditIcon, HamburgerIcon, RepeatIcon } from "@chakra-ui/icons";
import { ConfirmationDialog } from "../../components/Dialog/ConfirmationDialog";

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
      fontWeight: "medium"
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

function ColorComponent(name) {

  console.log("data", name)

  return (
    <Flex justify={"center"}>
      <Circle bg={name} size={"25px"} />
    </Flex>
  )
}

type MenuProps = {
  data: any;
  del: (id: number) => void
}

function CategoryMenu({data, del}: MenuProps) {
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
      </MenuList>
    </Menu>
  );
}

export default function Category() {
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [sort, setSort] = useState<string>("name,asc");
  const [active, setActive] = useState<string>(null);
  const [keyword, setKeyword] = useState<string>("");
  const { data: categories, isLoading } = useCategories(page, size, sort, active, keyword);
  const deleteCategory = useDeleteCategory();

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
      <HStack justify={"space-between"}>
        <HeadingTable title={"Categorias"} />
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
            <NextLink href={"#"}>
              <Button as={"a"}
                      size={"sm"}
                      fontSize={"sm"}
                      colorScheme={"purple"}
                      leftIcon={<Icon as={RiArchiveLine} fontSize={"20"} />
                      }
              >Arquivados
              </Button>
            </NextLink>
          </LightMode>
        </HStack>
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
      />
    </SideBarLayout>
  )
}

// <TableContainer border={"1px"} mt={"20px"}>
//   <Table>
//     <Thead>
//       <Tr>
//         <Th textAlign={"start"}>Nome</Th>
//         <Th textAlign={"center"}>Ícone</Th>
//         <Th textAlign={"center"}>Cor</Th>
//         <Th textAlign={"center"}>Tipo</Th>
//         <Th textAlign={"end"}>Opções</Th>
//       </Tr>
//     </Thead>
//     <Tbody>
//       {categories.content.map((category, index) => (
//         <Tr key={index}>
//           <Td>{category.name}</Td>
//           <Td textAlign={"center"}>#Icone</Td>
//           <Td textAlign={"center"} >
//             <Flex justify={"center"}>
//               <Circle size={"25px"} bg={category.color} />
//             </Flex>
//           </Td>
//           <Td textAlign={"center"}>
//             <Flex justify="center">
//               <Tag variant={category.categoryType === 'REVENUE' ? "green" : "red"}
//                    label={category.categoryType === 'REVENUE' ? "RECEITA" : "DESPESA"}
//               />
//             </Flex>
//           </Td>
//           {/*OPÇÕES*/}
//           <Td pb={0} pt={0} textAlign={"end"}>
//             <Menu>
//               <MenuButton
//                 as={IconButton}
//                 aria-label='Options'
//                 icon={<HamburgerIcon />}
//                 variant='solid'
//               />
//               <MenuList>
//                 <NewCategoryModal
//                   categoryId={category.id}
//                   trigger={(open) => (
//                     <MenuItem icon={<EditIcon />} onClick={open}>
//                       Editar
//                     </MenuItem>
//                   )}
//                 />
//                 <ConfirmationDialog
//                   title={"Deletar Transação"}
//                   mainColor={"white"}
//                   buttonText={"Deletar"}
//                   description={"Deseja deletar essa transação?"}
//                   variant={"danger"}
//                   onOk={() => handleDeleteCategory(category.id)}
//                   trigger={(onOpen) => (
//                     <MenuItem onClick={onOpen} icon={<Icon as={BiTrash} fontSize={"13px"} />}>
//                       Deletar
//                     </MenuItem>
//                   )}
//                 />
//               </MenuList>
//             </Menu>
//           </Td>
//         </Tr>
//       ))
//       }
//     </Tbody>
//   </Table>
// </TableContainer>
