import { IconType } from "react-icons";
import React, { ReactNode } from "react";
import { Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useThemeColors } from "../../hooks/useThemeColors";

type NavItemProps = {
  icon?: IconType | ReactNode;
  children: ReactNode;
  href?: string;
  onClick?: () => void;
}

export const NavItem = ({icon, children, href, ...rest}: NavItemProps) => {
  const { secondBorderColor, bgColor, bgInverse, textColor, bgColor2 } = useThemeColors()
  const router = useRouter();
  const isSelected = router.asPath === href;

  return (
    <NextLink href={href} passHref>
      <Flex
        as="a"
        borderRadius={"md"}
        align="center"
        cursor="pointer"
        bg={isSelected ? bgColor2 : "inherit"}
        color={isSelected ? bgInverse : "inherit"}
        w={{ base: "288px", lg: "255px" }}
        gap={3}
        p={"8px"}
        role="group"
        fontWeight="bold"
        transition=".15s ease"
        fontSize={"14px"}
        _hover={{
          bg: secondBorderColor,
          color: bgInverse,
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
