import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  LightMode,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import React from "react";
import { RiMore2Fill } from "react-icons/ri";
import { numberFormat } from "../Utils/utils";
import { EditIcon, ExternalLinkIcon, RepeatIcon } from "@chakra-ui/icons";
import { NewAccountModal } from "../Modals/NewAccount";
import { ConfirmationDialog } from "../Dialog/ConfirmationDialog";
import { useUpdateArchiveAccount } from "../../hooks/accounts/useUpdateArchiveAcc";

type AccountProps = {
  amount: number;
  description: string;
  accId?: number;
}

export default function CardsAccount({amount, description, accId}: AccountProps) {
  const mainColor = useColorModeValue('white', 'gray.800');
  const updateArchiveAcc = useUpdateArchiveAccount();
  const descriptionArchive = "Arquivar conta é uma opção muito útil quando temos aquela conta que não movimentamos mais e desejamos apenas tirá-la da relação de contas," +
    " mantendo os lançamentos vinculados a ela. Você tem certeza que deseja arquivar a conta?";

  const handleArchiveChange = async (id: number) => {
    const archived = true;
    await updateArchiveAcc.mutate({id, archived})
  }

  return (
    <Box bg={mainColor} w={"auto"} minH={"auto"} borderRadius={25} p={"20px"} boxShadow={"lg"}>
      <HStack justifyContent={"space-between"} align={"center"}>
        <Text fontWeight="bold" fontSize={"1.3rem"}>{description}</Text>

        <Menu>
          <MenuButton
            as={IconButton}
            borderRadius={25}
            aria-label={"button account"}
            icon={<RiMore2Fill />}
            variant='outline'
          />
          <MenuList>
            <NewAccountModal
              accountId={accId}
              text={"Editar"}
              trigger={(open) =>
                <MenuItem icon={<EditIcon />} onClick={open}>
                  Editar
                </MenuItem>
              }
            />
            <ConfirmationDialog
              mainColor={mainColor}
              title={"Arquivar Conta"}
              description={descriptionArchive}
              buttonText={"Arquivar"}
              onOk={() => handleArchiveChange(accId)}
              trigger={(onOpen) =>
                <MenuItem icon={<ExternalLinkIcon />} onClick={onOpen}>
                  Arquivar Conta
                </MenuItem>
              } />

            <MenuItem icon={<RepeatIcon />}>
              Reajuste de Saldo
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>

      <HStack justify={"space-between"} spacing={20} mt={"35px"}>
        <Text fontWeight={"semibold"} fontSize={"1.2rem"}>Saldo atual</Text>
        <Text fontFamily={"Poppins"} fontWeight={"medium"} fontSize={"1.2rem"}
              color={amount >= 0 ? 'green' : 'red'}>{!!amount ? numberFormat(amount) : 'R$ 0,00'}</Text>
      </HStack>

      <HStack justify={"space-between"} spacing={20} mt={"05px"}>
        <Text fontWeight="normal" fontSize={"1.2rem"}>Saldo previsto</Text>
        <Text fontWeight="normal" fontSize={"1.2rem"} color="green">R$ 0,00</Text>
      </HStack>
      <Flex justifyContent={"flex-end"} mt={"20px"}>
        <LightMode>
          <Button variant='ghost' colorScheme={"facebook"}>ADICIONAR DESPESA</Button>
        </LightMode>
      </Flex>
    </Box>
  )
};
