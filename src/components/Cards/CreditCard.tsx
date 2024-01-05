import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  IconButton,
  LightMode,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Progress,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import React from "react";
import { RiMastercardFill, RiMore2Fill } from "react-icons/ri";
import { EditIcon, ExternalLinkIcon, RepeatIcon } from "@chakra-ui/icons";
import { moneyFormat } from "../Utils/utils";

type CardProps = {
  description: string;
  closingDay: string;
  cardLimit: number;
  ccId?: number;
}

export default function CreditCard({description, closingDay, cardLimit } : CardProps) {
  const mainColor = useColorModeValue('white', 'gray.800');

  const handleArchiveChange = async () => {
  }

  function getNextMonth() {
    const currentMonth = new Date().getMonth() + 2;
    const month = new Date(`"${currentMonth}"`).toLocaleDateString('pt-BR', {
      month: 'long'
    }).toString().replace(/\b\w/g, x => x.toUpperCase())

    const year =  new Date().toLocaleDateString('pt-BR', {
      year: 'numeric'
    }).replace(/\b\w/g, x => x.toUpperCase())

    return `${month} ${year}`
  }

  return (
    <Box bg={mainColor} w={"auto"} minH={"auto"} maxW={"500px"} borderRadius={25} p={"20px"} boxShadow={"lg"}>
      <HStack justifyContent={"space-between"} align={"center"}>
        <HStack spacing={3}>
          <RiMastercardFill size={"40px"} />
          <Text fontWeight="bold" fontSize={"1.3rem"}>{description}</Text>
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
            <MenuItem icon={<EditIcon />}>
              Editar
            </MenuItem>
            <MenuItem icon={<ExternalLinkIcon />}>
              Arquivar Cartão
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>

      <HStack justify={"space-between"} spacing={20} mt={"25px"}>
        <Text fontWeight={"semibold"} fontSize={"1.1rem"}>Fatura aberta</Text>
      </HStack>

      <HStack justify={"space-between"} spacing={20} mt={"05px"}>
        <Text fontWeight="bold" fontSize={"1.0rem"}>Valor Parcial</Text>
        <Text fontWeight="bold" fontSize={"1.0rem"} color="green">R$ 100,00</Text>
      </HStack>
      <HStack justify={"space-between"} spacing={20} mt={"05px"} mb={"15px"}>
        <Text fontWeight="bold" fontSize={"1.0rem"}>Fecha em</Text>
        <Text fontWeight="bold" fontSize={"1.0rem"} color="green">{closingDay} de {
          getNextMonth()
        }</Text>
      </HStack>

      <Text fontWeight="bold" fontSize={"0.9rem"}>R$ 100,00 de {moneyFormat(cardLimit)}</Text>
      <Progress value={20} borderRadius={"10px"} />
      <Text fontWeight="normal" fontSize={"0.8rem"} mb={"15px"}>Limite Disponível R$ 7.900,00</Text>

      <Divider />
      <Flex justifyContent={"flex-end"} mt={"10px"}>
        <LightMode>
          <Button variant='ghost' size={"sm"} colorScheme={"facebook"}>ADICIONAR DESPESA</Button>
        </LightMode>
      </Flex>
    </Box>
  )
};
