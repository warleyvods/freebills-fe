import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex, Icon,
  Image,
  Stack,
  Text, useColorModeValue,
  useDisclosure
} from '@chakra-ui/react';
import { NavItem } from "./NavItem";
import Header from "./Header";
import { CustomIcon } from "../Icons/House";
import { HouseIcon, PeopleIcon } from "../../utils/chartData";
import { BiBox } from "react-icons/bi";
import { useMe } from "../../hooks/users/useMe";
import { BsCreditCard } from "react-icons/bs";
import { BiTransfer  } from "react-icons/bi";
import { RiPencilLine } from "react-icons/ri";
import React from "react";
import {
  FaChartBar,
  FaExchangeAlt,
  FaFileContract,
  FaGripHorizontal,
  FaHome, FaList,
  FaMoneyCheck,
  FaUsers,
  FaWallet
} from "react-icons/fa";




function SidebarContent({ isAdmin }) {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');

  return (
    <Flex
      flex="1"
      flexDir="column"
      overflowY="auto"
      borderRight="1px solid"
      borderColor={borderColor}
      bg={bg}
      px={6}
      pb={4}
      gap={5}
    >
      {/*LOGO*/}
      <Flex flex="none" h="16" alignItems="center" gap={3}>
        {/*<Image*/}
        {/*  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"*/}
        {/*  alt="Freebills Logo"*/}
        {/*  h="8"*/}
        {/*  w="auto"*/}
        {/*/>*/}
        <Text fontWeight={"bold"} fontSize={"25px"}>Freebills<span style={{ color: "red" }}>.</span></Text>
      </Flex>
      {/*NAVIGATION*/}
      <Stack direction={"column"} spacing={1} alignItems={"center"}>
        <NavItem icon={<Icon as={FaHome} fontSize={"20px"} />} href={"/dashboard"}>Dashboard</NavItem>
        <NavItem icon={<Icon as={FaWallet} fontSize={"19px"} />} href={"/accounts"}>Contas</NavItem>
        <NavItem icon={<Icon as={FaExchangeAlt} fontSize={"20px"} />} href={"/transactions/revenue"}>Transações</NavItem>bank
        <NavItem icon={<Icon as={FaExchangeAlt} fontSize={"20px"} />} href={"/transfer"}>Transferências</NavItem>
        <NavItem icon={<Icon as={FaList} fontSize={"19px"} />} href={"/categories"}>Categorias</NavItem>
        {/*<NavItem icon={<Icon as={FaMoneyCheck} fontSize={"20px"} />} href={"/cards"}>Cartões</NavItem>*/}
        <NavItem icon={<Icon as={FaChartBar} fontSize={"20px"} />} href={"/reports"}>Relatórios</NavItem>
        { isAdmin && (<NavItem icon={<Icon as={FaUsers} fontSize={"20px"} />} href={"/users"}>Usuários</NavItem>) }
      </Stack>
    </Flex>
  )
}

type SidebarProps = {
  children?: React.ReactNode;
}

function SideBarLayout({children}: SidebarProps) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const toggleSidebar = isOpen ? onClose : onOpen;
  const {data: me} = useMe();

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      <Box display={{base: "none", lg: "flex"}}
           position="fixed"
           insetY={0}
           zIndex={50}
           w={72}
           flexDir="column"
      >
        <SidebarContent isAdmin={me?.admin} />
        <Drawer isOpen={isOpen} onClose={onClose} placement="left">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <SidebarContent isAdmin={me?.admin} />
          </DrawerContent>
        </Drawer>
      </Box>
      <Box pl={{base: 0, lg: 72}}>
        <Box py={0}>
            <Box px={{ base: 2, md: 2, lg: 4 }}>
              {children}
            </Box>
        </Box>
      </Box>
    </>
  );
}

export default SideBarLayout;



