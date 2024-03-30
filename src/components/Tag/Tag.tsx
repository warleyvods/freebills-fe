import React from 'react';
import { Box, Text, useColorMode, useColorModeValue } from '@chakra-ui/react';

type TagProps = {
  variant: string;
  label: string;
}

export const Tag = ({ variant, label }: TagProps) => {
  const { colorMode } = useColorMode();

  const getColor = (lightColor: string, darkColor: string) => {
    return colorMode === 'light' ? lightColor : darkColor;
  };

  let bgColor, borderColor, textColor;

  switch (variant) {
    case 'green':
      bgColor = getColor('lime.400', '#426241');
      borderColor = getColor('lime.500', '#426241');
      textColor = getColor('lime.600', '#8FFF8E');
      break;
    case 'red':
      bgColor = getColor('littlePink.400', '#624141');
      borderColor = getColor('littlePink.500', '#624141');
      textColor = getColor('littlePink.600', '#FF8E8E');
      break;
    default:
      bgColor = 'lime.400';
      borderColor = 'lime.500';
      textColor = 'lime.600';
      break;
  }

  return (
    <Box
      borderRadius="0.375rem"
      border="1px"
      background={bgColor}
      borderColor={borderColor}
      pl="8px"
      pr="8px"
      fontSize="12px"
      fontWeight="medium"
      display="inline-block"
    >
      <Text color={textColor}>{label}</Text>
    </Box>
  );
};

export default Tag;
