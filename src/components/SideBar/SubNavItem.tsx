import { Flex, FlexProps, Icon, Link } from "@chakra-ui/react";
import React, { ReactText } from "react";
import { IconType } from "react-icons";
import NextLink from "next/link";

interface NavItemProps extends FlexProps {
  href: string
  icon?: IconType;
  children: ReactText;
  onToggle?: () => void;
  color: string;
}

export const SubNavItem = ({ icon, children, href, onToggle, color, ...rest}: NavItemProps) => {
  return (
    <Link as={NextLink} href={href} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: color,
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            w={"20px"}
            h={"20px"}
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};
