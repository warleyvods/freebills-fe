import { useColorModeValue } from "@chakra-ui/react";

enum ColorKeys {
  MAIN_COLOR_LIGHT = 'white',
  MAIN_COLOR_LIGHT2 = '#eeeeee',
  MAIN_COLOR_DARK = '#1E1F20',

  HOVER_COLOR_LIGHT = 'gray.50',
  HOVER_COLOR_DARK = '#252627',

  BORDER_COLOR_LIGHT = 'gray.100',
  BORDER_COLOR_DARK = '#1e1f20',
  BORDER_COLOR_DARK_2 = '#3c3f3f',

  COLOR_TEXT_LIGHT = 'rgba(54,87,189,0.63)',
  COLOR_TEXT_DARK = '#d5d5d5',

}

export function useThemeColors() {
  const bgColor = useColorModeValue(ColorKeys.MAIN_COLOR_LIGHT, ColorKeys.MAIN_COLOR_DARK);
  const bgColor2 = useColorModeValue(ColorKeys.MAIN_COLOR_LIGHT2, ColorKeys.MAIN_COLOR_DARK);
  const bgInverse = useColorModeValue(ColorKeys.MAIN_COLOR_DARK, ColorKeys.MAIN_COLOR_LIGHT)
  const hover = useColorModeValue(ColorKeys.HOVER_COLOR_LIGHT, ColorKeys.HOVER_COLOR_DARK);
  const borderColor = useColorModeValue(ColorKeys.BORDER_COLOR_LIGHT, ColorKeys.BORDER_COLOR_DARK);
  const secondBorderColor = useColorModeValue(ColorKeys.BORDER_COLOR_LIGHT, ColorKeys.BORDER_COLOR_DARK_2);
  const textColor = useColorModeValue(ColorKeys.COLOR_TEXT_LIGHT, ColorKeys.COLOR_TEXT_DARK);

  const buttonGreen = useColorModeValue('#eefbf2', '#416140');
  const borderButtonGreen = useColorModeValue('#c2e9d0', '#416140');
  const internalIconGreen = useColorModeValue('#308f53', '#84e983');

  const buttonRed = useColorModeValue('#fcf0f0', '#614040');
  const borderButtonRed = useColorModeValue('#f9dede', '#614040');
  const internalIconRed = useColorModeValue('#b81c1c', '#fd8d8d');

  const tableRow = useColorModeValue('#fdfdfd','#1e1f20');
  const hoverRow = useColorModeValue('#f7f8f9','#333537');
  const tableHead = useColorModeValue('#e5e5e7','#131314');

  const positiveAmountColor = useColorModeValue('green', 'green.400');
  const negativeAmountColor = useColorModeValue('red', 'red.400');

  return {
    tableRow,
    tableHead,
    hoverRow,
    buttonRed,
    borderButtonRed,
    internalIconRed,
    internalIconGreen,
    borderButtonGreen,
    bgColor,
    bgInverse,
    hover,
    borderColor,
    positiveAmountColor,
    negativeAmountColor,
    secondBorderColor,
    textColor,
    bgColor2,
    buttonGreen
  };
}
