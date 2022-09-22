import { Box, BoxProps, CloseButton, Flex, Text, useColorModeValue } from "@chakra-ui/react";
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

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface LinkItemProps {
  ref: string;
  name: string;
  icon: IconType;
}

const LinkItemsAdmin: Array<LinkItemProps> = [
  {name: 'Contas', icon: RiExchangeDollarLine, ref: '/accounts'},
  {name: 'Dashboard', icon: RiFundsLine, ref: '/dashboard'},
  {name: 'Transações', icon: RiExchangeBoxLine, ref: '/transactions'},
  {name: 'Usuários', icon: RiGroupLine, ref: '/users'},
  {name: 'Cartões', icon: RiBankCard2Line, ref: '/cards'},
];

const LinkItemsUser: Array<LinkItemProps> = [
  {name: 'Contas', icon: RiGroupLine, ref: '/accounts'},
  {name: 'Dashboard', icon: RiGroupLine, ref: '/dashboard'},
  {name: 'Transações', icon: RiUser3Line, ref: '/transactions'},
  {name: 'Cartões', icon: RiUser3Line, ref: '/transactions'},
];

export const SidebarContent = ({onClose, ...rest}: SidebarProps) => {
  const {data: user, isLoading} = useMe();
  const bg = useColorModeValue('white', 'gray.900');
  const br = useColorModeValue('gray.200', 'gray.700');

  if (isLoading) {
    return null;
  }

  const itemsList = user.admin ? LinkItemsAdmin : LinkItemsUser;

  return (
    <Box
      transition="3s ease"
      bg={bg}
      borderRight="1px"
      borderRightColor={br}
      w={{base: 'full', md: 60}}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          $$ FREEBILLS
        </Text>
        <CloseButton display={{base: 'flex', md: 'none'}} onClick={onClose} />
      </Flex>
      {
        itemsList.map((link) => (
          <NavItem key={link.name} icon={link.icon} href={link.ref}>
            {link.name}
          </NavItem>
        ))
      }
    </Box>
  );
};
