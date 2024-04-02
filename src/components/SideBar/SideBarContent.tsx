import {
  Box,
  BoxProps,
  CloseButton,
  Collapse,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react";
import React from "react";
import {
  RiBankCard2Line,
  RiExchangeBoxLine,
  RiExchangeDollarLine,
  RiFundsLine,
  RiGroupLine,
  RiUser3Line
} from "react-icons/ri";
import { IconType } from "react-icons";
import { NavItem } from "./NavItem";
import { useMe } from "../../hooks/users/useMe";
import { HiCode } from "react-icons/hi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { SubNavItem } from "./SubNavItem";

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface LinkItemProps {
  ref: string;
  name: string;
  icon: IconType;
}

export const SidebarContent = ({onClose, ...rest}: SidebarProps) => {
  const {data: user, isLoading} = useMe();
  const bg = useColorModeValue('white', 'gray.900');
  const br = useColorModeValue('gray.200', 'gray.700');
  const integrations = useDisclosure();

  if (isLoading) {
    return null;
  }

  return (
    <Box
      transition="3s ease"
      bg={"black"}
      borderRight="1px"
      borderRightColor={"black"}
      w={{base: 'full', md: 60}}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text
          fontSize="2xl"
          ml="2"
          color="brand.500"
          _dark={{
            color: "white",
          }}
          fontWeight="bold"
        >
          Freebills
        </Text>
        <CloseButton display={{base: 'flex', md: 'none'}} onClick={onClose} />
      </Flex>
      <NavItem icon={RiFundsLine} href={"/dashboard"}>
        Dashboard
      </NavItem>
      <NavItem icon={RiExchangeDollarLine} href={"/accounts"}>
        Contas
      </NavItem>
      <NavItem icon={RiExchangeBoxLine} onClick={integrations.onToggle} href={""}>
        Transações
        <Icon
          as={MdKeyboardArrowRight}
          ml="auto"
          transform={integrations.isOpen && "rotate(90deg)"}
        />
      </NavItem>
      <Collapse in={integrations.isOpen}>
        <SubNavItem pl="12" py="2" color={"green.500"} href={"/transactions/revenue"}>
          Receitas
        </SubNavItem>
        <SubNavItem pl="12" py="2" color={"red.500"} href={"/transactions/expense"}>
          Despesas
        </SubNavItem>
      </Collapse>
      <NavItem icon={RiBankCard2Line} href={"/cards"}>
        Cartões
      </NavItem>

      {user?.admin ? (
        <NavItem icon={RiGroupLine} href={"/users"}>
          Usuário
        </NavItem>
      ) : (
        <>
        </>
      )}
    </Box>
  );
};
