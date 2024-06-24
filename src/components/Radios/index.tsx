import { Box, Icon, useRadio, UseRadioProps } from '@chakra-ui/react';
import React from 'react';
import { FaCheck } from "react-icons/fa";

interface RadioColorButtonProps extends UseRadioProps {
  color: string;
  value: string;
}

const RadioColorButton: React.FC<RadioColorButtonProps> = ({ color, value, ...props }) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderRadius="full"
        boxShadow="md"
        bg={color}
        width="40px"
        height="40px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        _focus={{
          boxShadow: 'outline',
        }}
      >
        {props.isChecked && (
          <Icon as={FaCheck} color="white" boxSize={"18px"} />
        )}
      </Box>
    </Box>
  );
};

export default RadioColorButton;
