import {
  Avatar,
  Image,
  Box,
  Button, Circle,
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
import { moneyFormat } from "../Utils/utils";
import { EditIcon, ExternalLinkIcon, RepeatIcon } from "@chakra-ui/icons";
import { NewAccountModal } from "../Modals/NewAccount";
import { ConfirmationDialog } from "../Dialog/ConfirmationDialog";
import { useUpdateArchiveAccount } from "../../hooks/accounts/useUpdateArchiveAcc";
import { ReadjustmentAccountModal } from "../Modals/ReajustAccount";

type AccountProps = {
  amount: number;
  description: string;
  bankType: string;
  accId?: number;
}

export default function CardsAccount({amount, description, accId, bankType}: AccountProps) {
  const updateArchiveAcc = useUpdateArchiveAccount();
  const descriptionArchive = "Arquivar conta é uma opção muito útil quando temos aquela conta que não movimentamos mais e desejamos apenas tirá-la da relação de contas," +
    " mantendo os lançamentos vinculados a ela. Você tem certeza que deseja arquivar a conta?";

  const handleArchiveChange = async (id: number) => {
    const archived = true;
    await updateArchiveAcc.mutate({id, archived})
  }

  function bank(type: string) {
    if (bankType === 'INTER') {
      return 'https://portalvhdshl0fsz1rywfcp.blob.core.windows.net/instituicoes-bancarias-logo/intermedium.png'
    } else if (bankType === 'NUBANK') {
      return 'https://portalvhdshl0fsz1rywfcp.blob.core.windows.net/instituicoes-bancarias-logo/nubank.png'
    } else if (bankType === 'CAIXA') {
      return 'https://portalvhdshl0fsz1rywfcp.blob.core.windows.net/instituicoes-bancarias-logo/caixa.png'
    } else if (bankType === 'BRADESCO') {
      return 'https://portalvhdshl0fsz1rywfcp.blob.core.windows.net/instituicoes-bancarias-logo/bradesco.png'
    } else if (bankType === 'BB') {
      return 'https://portalvhdshl0fsz1rywfcp.blob.core.windows.net/instituicoes-bancarias-logo/bb.png'
    } else if (bankType === 'SANTANDER') {
      return 'https://portalvhdshl0fsz1rywfcp.blob.core.windows.net/instituicoes-bancarias-logo/santander.png'
    } else if (bankType === 'OTHERS') {
      return 'https://portalvhdshl0fsz1rywfcp.blob.core.windows.net/instituicoes-bancarias-logo/default.jpg'
    } else if (bankType === 'ITAU') {
      return 'https://portalvhdshl0fsz1rywfcp.blob.core.windows.net/instituicoes-bancarias-logo/itau.png'
    }
  }

  return (
    <Box w={"auto"} borderRadius={"10px"} border={"1px"} borderColor={"gray.100"} p={"15px"} boxShadow={"lg"}>
      <HStack justifyContent={"space-between"} spacing={0} align={"center"}>
        <HStack spacing={3}>
          <Image
            borderRadius='full'
            boxSize='40px'
            src={bank(bankType)}
            alt='inter'
          />
          <Text fontWeight="medium" fontSize={"1.1rem"}>{description}</Text>
        </HStack>
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
              text={"edit"}
              trigger={(open) =>
                <MenuItem icon={<EditIcon />} onClick={open}>
                  Editar
                </MenuItem>
              }
            />
            <ConfirmationDialog
              mainColor={"white"}
              title={"Arquivar Conta"}
              description={descriptionArchive}
              buttonText={"Arquivar"}
              variant={"danger"}
              onOk={() => handleArchiveChange(accId)}
              trigger={(onOpen) =>
                <MenuItem icon={<ExternalLinkIcon />} onClick={onOpen}>
                  Arquivar Conta
                </MenuItem>
              }
            />

            <ReadjustmentAccountModal accountId={accId} trigger={(onOpen) =>
              <MenuItem icon={<RepeatIcon />} onClick={onOpen}>
                Reajuste de Saldo
              </MenuItem>
            } />

          </MenuList>
        </Menu>
      </HStack>

      <HStack justify={"space-between"} spacing={0} mt={"35px"}>
        <Text fontWeight={"medium"} fontSize={"0.97rem"}>Saldo atual</Text>
        <Text fontWeight={"medium"} fontSize={"0.97rem"}
              color={amount >= 0 ? 'green' : 'red'}>{!!amount ? moneyFormat(amount) : 'R$ 0,00'}</Text>
      </HStack>

      <HStack justify={"space-between"} spacing={0} mt={"5px"}>
        <Text fontWeight="medium" fontSize={"0.97rem"}>Saldo previsto</Text>
        <Text fontWeight="medium" fontSize={"0.97rem"} color="green">R$ 0,00</Text>
      </HStack>
      <Flex justifyContent={"flex-end"} mt={"20px"}>
        <LightMode>
          <Button variant='solid' size={"xs"} isDisabled={true} colorScheme={"facebook"}>Adicionar despesa</Button>
        </LightMode>
      </Flex>
    </Box>
  )
};
