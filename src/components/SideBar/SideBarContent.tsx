import { Box, BoxProps, CloseButton, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { FiHome } from "react-icons/fi";
import { RiFolderOpenLine, RiGroupLine, RiUser3Line } from "react-icons/ri";
import { IconType } from "react-icons";
import { NavItem } from "./NavItem";

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

interface LinkItemProps {
  ref: string;
  name: string;
  icon: IconType;
}

const LinkItemsAdmin: Array<LinkItemProps> = [
  {name: 'Usuários', icon: RiUser3Line, ref: '/users'},
  // {name: 'Funcionários', icon: RiGroupLine, ref: '/employees'},
  // {name: 'Funções', icon: RiFolderOpenLine, ref: '/careers'},
];

const LinkItemsUser: Array<LinkItemProps> = [
  {name: 'Dashboard', icon: FiHome, ref: '/dashboard'},
  {name: 'Funcionários', icon: RiGroupLine, ref: '/employees'},
  {name: 'Funções', icon: RiFolderOpenLine, ref: '/careers'},
];

export const SidebarContent = ({onClose, ...rest}: SidebarProps) => {
  const bg = useColorModeValue('white', 'gray.900');
  const br = useColorModeValue('gray.200', 'gray.700');

  // if (isLoading) {
  //   return null;
  // }

  const itemsList = LinkItemsAdmin;

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
          CRUD BASE
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
