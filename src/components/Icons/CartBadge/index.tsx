import { chakra, Icon, IconButton } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

type CardPickProps = {
  value?: number;
}

export default function CartPick({value = 0}: CardPickProps) {
  return (
    <chakra.span pos="relative" display="inline-block">
      <>
        <NextLink href="/user/my-orders" passHref>
          <IconButton
            as="a"
            bg="inherit"
            borderRadius="xl"
            _hover={{
              bg: "none"
            }}
            aria-label="cart"
            size="sm"
            icon={
              <Icon
                boxSize={6}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </Icon>
            }
          />
        </NextLink>
        {
          value > 0 ?
            (
              <chakra.span
                pos="absolute"
                top="6px"
                right="1px"
                px={2}
                py={1}
                fontSize="9px"
                fontWeight="bold"
                lineHeight="none"
                color="red.100"
                transform="translate(50%,-50%)"
                bg="red.600"
                rounded="full"
              >
                {value}
              </chakra.span>
            ) : () => null
        }
      </>
    </chakra.span>
  )
}
