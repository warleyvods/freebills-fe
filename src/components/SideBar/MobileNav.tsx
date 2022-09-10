import {
  Avatar,
  Box,
  Flex,
  FlexProps,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
  VStack
} from "@chakra-ui/react";
import { FiBell, FiChevronDown, FiMenu } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { api } from "../../services/api";
import { useQuery } from "react-query";

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

function useProfilePicture(id: number){
  return useQuery(['profile-picture'], async () => {
    const response = await api.get('v1/user-image/' + id)
    return response.data.image;
  }, {
    enabled: id !== undefined,
  });
}

export const MobileNav = ({onOpen, ...rest}: MobileProps) => {
  const {colorMode, toggleColorMode} = useColorMode();

  const baseURL = api.defaults.baseURL;
  const [forceReloadImage, setForceReloadImage] = useState(false);

  useEffect(() => {
    if (forceReloadImage) {
      setForceReloadImage(false);
    }
  }, [forceReloadImage]);

  return (
    <Flex
      ml={{base: 0, md: 60}}
      px={{base: 4, md: 4}}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{base: 'space-between', md: 'flex-end'}}
      position="sticky"
      top="0"
      zIndex="1000"
      {...rest}>
      <IconButton
        display={{base: 'flex', md: 'none'}}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{base: 'flex', md: 'none'}}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        CRUD BASE
      </Text>

      <HStack spacing={{base: '0', md: '6'}}>
        <IconButton
          onClick={toggleColorMode}
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        />
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{boxShadow: 'none'}}>
              <HStack>
                <Avatar
                  size={'md'}
                  borderColor={"gray.400"}
                  showBorder={true}
                />
                <VStack
                  display={{base: 'none', md: 'flex'}}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">Admin</Text>
                  <Text fontSize="xs" color="gray.600">
                    admin@admin.com
                  </Text>
                </VStack>
                <Box display={{base: 'none', md: 'flex'}}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <NextLink href={"/logout"}>
                <MenuItem>
                  Desconectar
                </MenuItem>
              </NextLink>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
