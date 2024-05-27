import { ComponentStyleConfig } from "@chakra-ui/react";

export const Button: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: 'medium',
    borderRadius: 'md',
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: '0.875rem',
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: 'md',
      px: 6, // <-- these values are tokens from the design system
      py: 4, // <-- these values are tokens from the design system
    },
  },
  // // Two variants: outline and solid
  variants: {
    outline: {
      color: 'black',
    },
    default: {
      bg: 'indigo.400',
      color: 'white',
      _hover: {
        bg: 'indigo.300',
      },
      _active: {
        bg: 'indigo.600',
      }
    },
    cancel: {
      bg: 'white',
      color: 'black',
      border: '1px solid',
      borderColor: 'gray.150',
      _hover: {
        bg: 'gray.50',
      },
      _active: {
        bg: 'gray.100',
      }
    },
    danger: {
      bg: 'customRed.500',
      color: 'white',
      _hover: {
        bg: 'customRed.400',
      },
      _active: {
        bg: 'red.700',
      }
    },
  },
  // The default size and variant values
  defaultProps: {
    size: 'sm',
    variant: 'solid',
  },
};
