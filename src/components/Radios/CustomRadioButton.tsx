import { Box, Flex, useRadio, UseRadioProps } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface CustomRadioButtonProps extends UseRadioProps {
  value: string;
}

interface CustomRadioButtonProps extends UseRadioProps {
  value: string;
  children?: ReactNode;
  hasError?: any;
}

const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({value, children, hasError, ...props}) => {
  const {getInputProps, getRadioProps} = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  const borderRadius = "10px";

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderRadius={borderRadius}
        boxShadow="md"
        width="full"
        height="auto"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        _focus={{
          boxShadow: 'outline',
        }}
        border={hasError ? '2px solid red' : '1px'}
        borderColor={"gray.100"}
      >
        <Flex w={"full"}
              h={"full"}
              justify={"center"}
              p={"10px"}
              borderRadius={borderRadius}
        >
          {children}
        </Flex>
      </Box>
    </Box>
  );
};

export default CustomRadioButton;
