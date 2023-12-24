import React from 'react';
import { Box, Text } from '@chakra-ui/react';

type TagProps = {
  variant: string;
  label: string;
}

export const Tag = ({ variant, label }: TagProps) => {
  let bgColor, borderColor, textColor;

  switch (variant) {
    case 'green':
      bgColor = 'lime.400';
      borderColor = 'lime.500';
      textColor = 'lime.600';
      break;
    case 'red':
      bgColor = 'littlePink.400';
      borderColor = 'littlePink.500';
      textColor = 'littlePink.600';
      break;
    case 'gray':
      bgColor = 'littleGray.400';
      borderColor = 'littleGray.500';
      textColor = 'littleGray.600';
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
