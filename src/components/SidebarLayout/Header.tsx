import {
  Avatar,
  Box, Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useBreakpointValue, useColorMode,
  useColorModeValue,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import { FiChevronDown } from "react-icons/fi";
import NextLink from "next/link";
import { useMe } from "../../hooks/users/useMe";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export function Header({toggleSidebar}) {
  const mainColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("white", "gray.700");
  const me  = useMe()
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isBase = useBreakpointValue({ base: true, md: false });
  const handleClick = isBase ? (isOpen ? onClose : onOpen) : null;
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex
      pos="sticky"
      top={0}
      zIndex={40}
      h={16}
      shrink={0}
      as="header"
      alignItems="center"
      borderBottom="1px"
      borderColor={borderColor}
      bg={mainColor}
      py={2}
      boxShadow="sm"
      px={{base: 4, sm: 6, lg: 8}}
      justify={"space-between"}
    >
      <HStack spacing={0}>
        {/* Button Sidebar */}
        <IconButton
          margin={"-10px"}
          h={"44px"}
          w={"44px"}
          aria-label="sidebar"
          display={{
            base: "inline-flex",
            md: "inline-flex",
          }}
          onClick={toggleSidebar}
          icon={<Hamburger boxSize={6} />}
          size="md"
          variant={"unstyled"}
          marginRight={"6px"}
        />
        {/* DIVIDER */}
        <div
          style={{
            height: "24px",
            width: "1px",
            backgroundColor: "#E7E7E9",
          }}
          aria-hidden="true"
        />
      </HStack>
      {/* ADICIONAR SEARCH BAR AQUI */}

      {/* ICONE ALERTA AQUI */}
      <Flex alignItems="center">
        <IconButton
          onClick={toggleColorMode}
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          mr={"10px"}
        />
        {/* Botão do Avatar */}
        <IconButton
          aria-label="Abrir menu"
          icon={<Avatar src="" h="8" w="8" rounded="full" bg="gray.200" />}
          onClick={handleClick}
          h="8"
          w="8"
          variant="unstyled"
        />
        {/* Menu */}
        <Menu isOpen={isOpen} onClose={onClose}>
          <MenuButton
            py={2}
            transition="all 0.3s"
            _focus={{ boxShadow: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          >
            <HStack>
              <VStack
                display={{ base: 'none', md: 'flex' }}
                alignItems="flex-start"
                spacing="1px"
                ml="2"
              >
                <Text fontSize="sm">{formatName(me.data?.name)}</Text>
              </VStack>
              <Box display={{ base: 'none', md: 'flex' }}>
                <FiChevronDown />
              </Box>
            </HStack>
          </MenuButton>
          <MenuList
            bg={useColorModeValue('white', 'gray.900')}
            borderColor={useColorModeValue('gray.200', 'gray.700')}
          >
            <NextLink href={"/users/my-account"}>
              <MenuItem isDisabled={true}>Minha conta</MenuItem>
            </NextLink>
            <NextLink href={"/logout"}>
              <MenuItem>
                <Text color={"red"}>Desconectar</Text>
              </MenuItem>
            </NextLink>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}

const Hamburger = (props) => {
  return (
    <Icon
      boxSize={6}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </Icon>
  );
};

function formatName(completedName: string) {
  const words = completedName?.split(' ');

  if (words?.length >= 2) {
    const firstName = words[0];
    const secondName = words[words.length - 1];

    if (firstName.length + secondName.length + 1 === 15) {
      return firstName + ' ' + secondName;
    }
  }
  return words?.[0];
}

export default Header;
