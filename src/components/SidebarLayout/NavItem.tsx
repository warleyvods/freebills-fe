import { IconType } from "react-icons";
import React, { ReactNode } from "react";
import { Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

type NavItemProps = {
  icon?: IconType | ReactNode;
  children: ReactNode;
  href?: string;
  onClick?: () => void;
}

export const NavItem = ({icon, children, href, ...rest}: NavItemProps) => {
  const bg = useColorModeValue('white', 'gray.700');
  const router = useRouter();
  const isSelected = router.asPath === href;

  return (
    <NextLink href={href} passHref>
      <Flex
        as="a"
        borderRadius={"md"}
        align="center"
        cursor="pointer"
        bg={isSelected ? bg : "inherit"}
        color={isSelected ? "indigo.400" : "inherit"}
        w={{ base: "288px", lg: "255px" }}
        gap={3}
        p={"8px"}
        role="group"
        fontWeight="bold"
        transition=".15s ease"
        fontSize={"14px"}
        _hover={{
          bg: "littleGray.300",
          color: "#6366F1",
        }}
        {...rest}
      >
        <>
          {icon}
          {children}
        </>
      </Flex>
    </NextLink>
  );
};
