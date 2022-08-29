import React, { ReactNode } from 'react';
import { Box, Drawer, DrawerContent, useColorModeValue, useDisclosure, } from '@chakra-ui/react';
import { SidebarContent } from "./SideBarContent";
import { MobileNav } from "./MobileNav";
import { useRouter } from "next/router";

export default function SidebarWithHeader({children}: { children?: ReactNode; }) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const mainColor = useColorModeValue('gray.100', 'gray.900')
  const router = useRouter();

  if (router.pathname === "/") {
    return <> {children} </>
  }

  return (
    <Box h="100vh" bg={mainColor}>
      <SidebarContent
        onClose={() => onClose}
        display={{base: 'none', md: 'block'}}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} />
      <Box ml={{base: 0, md: 60}} p="4" overflow="auto" maxH="calc(100vh - 80px)" position="relative">
        {children}
      </Box>
    </Box>
  );
};

