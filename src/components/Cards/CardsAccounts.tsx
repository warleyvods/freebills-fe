import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  LightMode,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text
} from "@chakra-ui/react";
import React from "react";
import { RiMore2Fill } from "react-icons/ri";
import { moneyFormat } from "../Utils/utils";
import { EditIcon, ExternalLinkIcon, RepeatIcon } from "@chakra-ui/icons";
import { NewAccountModal } from "../Modals/NewAccount";
import { ConfirmationDialog } from "../Dialog/ConfirmationDialog";
import { useUpdateArchiveAccount } from "../../hooks/accounts/useUpdateArchiveAcc";
import { ReadjustmentAccountModal } from "../Modals/ReajustAccount";
import { useThemeColors } from "../../hooks/useThemeColors";

type AccountProps = {
  amount: number;
  description: string;
  bankType: string;
  accId?: number;
}

const descriptionArchive = "Arquivar conta é uma opção muito útil quando temos aquela conta que não movimentamos mais e desejamos apenas tirá-la da relação de contas," +
  " mantendo os lançamentos vinculados a ela. Você tem certeza que deseja arquivar a conta?";

export default function CardsAccount({amount, description, accId, bankType}: AccountProps) {
  const {bgInverse, bgColor, hover, borderColor, positiveAmountColor, negativeAmountColor} = useThemeColors();
  const updateArchiveAcc = useUpdateArchiveAccount();

  const handleArchiveChange = async (id: number) => {
    const archived = true;
    updateArchiveAcc.mutate({id, archived})
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
    <Box w={"auto"} borderRadius={"5px"} border={"1px"} borderColor={borderColor} p={"15px"} boxShadow={"lg"} bg={bgColor}
         _hover={{bg: hover}}>
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
            borderRadius={"5px"}
            aria-label={"button account"}
            icon={<RiMore2Fill />}
            color={bgInverse}
            variant='outline'
            borderColor={borderColor}
          />
          <MenuList>
            <NewAccountModal
              accountId={accId}
              edit={true}
              trigger={(open) =>
                <MenuItem icon={<EditIcon />} onClick={open}>
                  Editar
                </MenuItem>
              }
            />
            <ReadjustmentAccountModal accountId={accId} trigger={(onOpen) =>
              <MenuItem icon={<RepeatIcon />} onClick={onOpen}>
                Reajuste de Saldo
              </MenuItem>
            } />
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
          </MenuList>
        </Menu>
      </HStack>

      <HStack justify={"space-between"} spacing={0} mt={"35px"}>
        <Text fontWeight={"medium"} fontSize={"0.97rem"}>Saldo atual</Text>
        <Text fontWeight={"medium"} fontSize={"0.97rem"}
              color={amount >= 0 ? positiveAmountColor : negativeAmountColor}>{!!amount ? moneyFormat(amount) : 'R$ 0,00'}
        </Text>
      </HStack>

      <HStack justify={"space-between"} spacing={0} mt={"5px"}>
        <Text fontWeight="medium" fontSize={"0.97rem"}>Saldo previsto</Text>
        <Text fontWeight="medium"
              fontSize={"0.97rem"}
              color={amount >= 0 ? positiveAmountColor : negativeAmountColor}>R$ 0,00
        </Text>
      </HStack>
      <Flex justifyContent={"flex-end"} mt={"20px"}>
        <LightMode>
          <Button variant='solid' size={"xs"} isDisabled={true} colorScheme={"facebook"}>Adicionar despesa</Button>
        </LightMode>
      </Flex>
    </Box>
  )
};
