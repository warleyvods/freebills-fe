import { useColorModeValue } from "@chakra-ui/react";

enum ColorKeys {
  MAIN_COLOR_LIGHT = 'white',
  MAIN_COLOR_DARK = '#1E1F20',

  HOVER_COLOR_LIGHT = 'gray.50',
  HOVER_COLOR_DARK = '#252627',

  BORDER_COLOR_LIGHT = 'gray.150',
  BORDER_COLOR_DARK = '#1e1f20',
  BORDER_COLOR_DARK_2 = '#3c3f3f'
}

export function useThemeColors() {
  const bgColor = useColorModeValue(ColorKeys.MAIN_COLOR_LIGHT, ColorKeys.MAIN_COLOR_DARK);
  const bgInverse = useColorModeValue(ColorKeys.MAIN_COLOR_DARK, ColorKeys.MAIN_COLOR_LIGHT)
  const hover = useColorModeValue(ColorKeys.HOVER_COLOR_LIGHT, ColorKeys.HOVER_COLOR_DARK);
  const borderColor = useColorModeValue(ColorKeys.BORDER_COLOR_LIGHT, ColorKeys.BORDER_COLOR_DARK);
  const secondBorderColor = useColorModeValue(ColorKeys.BORDER_COLOR_LIGHT, ColorKeys.BORDER_COLOR_DARK_2);

  const positiveAmountColor = useColorModeValue('green', 'green.400');
  const negativeAmountColor = useColorModeValue('red', 'red.400');

  return {bgColor, bgInverse, hover, borderColor, positiveAmountColor, negativeAmountColor, secondBorderColor};
}
