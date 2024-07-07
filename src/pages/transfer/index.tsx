import SideBarLayout from "../../components/SidebarLayout/SideBarLayout";
import {
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  LightMode,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text
} from "@chakra-ui/react";
import { RiAddLine } from "react-icons/ri";
import React, { useState } from "react";
import { NewTransferModal } from "../../components/Modals/NewTransfer";
import { useTransfer } from "../../hooks/transfer/useTransfer";
import CustomTable from "../../components/CustomTable/CustomTable";
import {
  ButtonOptions,
  CustomButton,
  TableColumn,
  TableHeadProps
} from "../../components/CustomTable/types/ColumnTypes";
import { InfoDashboardCard } from "../../components/InfoCards";
import { useDeleteTransfer } from "../../hooks/transfer/useDeleteTransfer";
import { EditIcon, HamburgerIcon, RepeatIcon } from "@chakra-ui/icons";
import { NewCategoryModal } from "../../components/Modals/NewCategory";
import { ConfirmationDialog } from "../../components/Dialog/ConfirmationDialog";
import { useAccounts } from "../../hooks/accounts/useAccounts";

const columns: TableColumn[] = [
  {
    name: {
      name: "observation",
      fontWeight: "medium"
    },
    align: "start",
    label: "Observação",
  },
  {
    name: {
      name: "date",
      fontWeight: "medium"
    },
    align: "center",
    label: "Data",
  },
  {
    name: {
      name: "fromAccountId",
      fontWeight: "medium",
      function: findAccountName
    },
    align: "center",
    label: "De",
  },
  {
    name: {
      name: "toAccountId",
      fontWeight: "medium",
      function: findAccountName
    },
    align: "center",
    label: "Para",
  },
  {
    name: {
      name: "amount",
      fontWeight: "medium"
    },
    align: "center",
    label: "Valor",
  }

];

const tableHead: TableHeadProps = {
  menuOptions: [
    {value: 'date', label: 'Data'},
  ],
  buttonOptions: [
    {value: null, label: 'Todos', active: false},
  ],
  activeSearch: false
}

const buttonsOptions: ButtonOptions = {
  active: true,
  editIsModal: {
    active: false
  },
  isMenu: {
    active: true,
    component: TransferMenu
  },
  deleteButton: false
}

const buttonOptions: CustomButton = {
  editPath: "#",
  titleDelete: "Deletar Categoria",
  descriptionDelete: "Deseja deletar esta categoria? Esta ação não poderá ser desfeita.",
  buttonTextDelete: "Deletar",
  deleteVariant: "danger"
}

type MenuProps = {
  data: any;
  del: (id: number) => void
  info: {
    toggleCategory: any;
    archived: boolean;
  };
}

type FindAccountProps = {
  singleData: any;
  accounts: any;
}

function findAccountName({singleData: accountId, accounts}: FindAccountProps) {
  const account = accounts?.find(acc => acc.id === accountId);
  return account ? account.description : "";
}

function TransferMenu({data, del, info}: MenuProps) {
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
        <NewTransferModal
          transferId={data?.id}
          trigger={(open) => (
            <MenuItem icon={<EditIcon />} onClick={open}>
              Editar
            </MenuItem>
          )}
        />
        <ConfirmationDialog
          title={"Deletar Transferência"}
          mainColor={"white"}
          buttonText={"Deletar"}
          description={"Deseja deletar esta transferência? Essa ação não poderá ser desfeita."}
          onOk={() => del(data.id)}
          variant={"danger"}
          trigger={(onOpen) =>
            <MenuItem onClick={onOpen} icon={<RepeatIcon />}>
              Deletar Transferência
            </MenuItem>
          }
        />
      </MenuList>
    </Menu>
  );
}

export default function TransferPage() {
  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(0);
  const [sort, setSort] = useState<string>("name,asc");
  const [active, setActive] = useState<string>(null);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const deleteTransfer = useDeleteTransfer();
  const {data: accounts, isLoading: isAccountLoading} = useAccounts();
  const {data: transfer, isLoading: isLoadingTransfer} = useTransfer(page, size, sort);

  const accountOptions = accounts?.map((acc) => ({
    value: acc.id.toString(),
    label: acc.description,
  }));

  const handleChangeYear = (year: number) => {
    setYear(year)
  };

  const handleChangeMonth = (month: number) => {
    setMonth(month)
  };

  const handleDelete = (id: number) => {
    deleteTransfer.mutate(id);
  }

  const handleSort = (sort: string) => {
    setSort(sort)
  }

  const handleSizePerPage = (size: number) => {
    setSize(size)
  }

  const handlePage = (page: number) => {
    setPage(page)
  }

  const handleKeyword = () => {}
  const handleActiveButtonClick = () => {};

  return (
    <SideBarLayout>
      <InfoDashboardCard
        onUpdateYear={handleChangeYear}
        onUpdateMonth={handleChangeMonth}
        dashboardType={null}
        showCardInfo={true}
        showMenu={true}
      />
      <HStack justify={"space-between"}>

        <Flex mt={"15px"} mb={"15px"}>
          <Text fontSize={"18px"} fontWeight={"medium"}>Transferência</Text>
        </Flex>

        <HStack spacing={"8px"}>
          <NewTransferModal
            trigger={(onOpen) =>
              <LightMode>
                <Button size={"sm"}
                        onClick={onOpen}
                        fontSize={"sm"}
                        variant={"default"}
                        leftIcon={<Icon as={RiAddLine} fontSize={"20"} />}
                >Criar Transferência
                </Button>
              </LightMode>
            }
          />
        </HStack>
      </HStack>
      <CustomTable
        columns={columns}
        data={transfer}
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
        activeSearch={false}
        onDelete={handleDelete}
        tableHeight={3}
        isLoading={isLoadingTransfer && isAccountLoading}
        accounts={accounts}
      />
    </SideBarLayout>
  )
}
