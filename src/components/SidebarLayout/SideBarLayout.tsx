import {
  Box,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
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
        <Image
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Freebills Logo"
          h="8"
          w="auto"
        />
        <Text fontWeight={"bold"} fontSize={"25px"}>Freebills<span style={{ color: "red" }}>.</span></Text>
      </Flex>
      {/*NAVIGATION*/}
      <Stack direction={"column"} spacing={1} alignItems={"center"}>
        <NavItem icon={<CustomIcon value={HouseIcon}/>} href={"/dashboard"}>Dashboard</NavItem>
        <NavItem icon={<CustomIcon value={HouseIcon}/>} href={"/accounts"}>Contas</NavItem>
        <NavItem icon={<CustomIcon icon={BiBox}/>} href={"/transactions/revenue"}>Transações</NavItem>
        { isAdmin && (<NavItem icon={<CustomIcon value={PeopleIcon}/>} href={"/users"}>Usuários</NavItem>)}
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



