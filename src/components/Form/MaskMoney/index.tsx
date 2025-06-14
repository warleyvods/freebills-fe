import React from "react";
import { NumericFormat } from "react-number-format";
import { Box, FormControl, FormErrorMessage, Input, useColorModeValue } from "@chakra-ui/react";

interface InputProps {
  label?: string;
  error?: any;
  onChange: (value: any) => void;
  value: number;
  name: string;
}

const MaskMoney: React.FC<InputProps> = ({ value, onChange, label, error, name, ...rest }: InputProps) => {
  const mainColor = useColorModeValue('gray.10', 'gray.900');
  const inverseMainColor = useColorModeValue('#B3B5C6', 'gray.600');

  return (
    <Box display="flex" borderRadius="lg" border="1px" borderColor={inverseMainColor} backgroundColor={mainColor}>
      <Box display="flex" alignItems="center" paddingLeft="16px" borderRight="1px" borderColor="#9699B0">
        <Box userSelect="none" paddingRight="8px">R$</Box>
      </Box>
      <FormControl isInvalid={!!error}>
        <NumericFormat
          allowNegative={true}
          style={{
            outline: 'none',
            padding: "8px",
            width: "100%",
            background: 'inherit',
            borderBottomRightRadius: '0.5rem',
            borderTopRightRadius: '0.5rem',
          }}
          placeholder={"0,00"}
          name={name}
          value={value}
          decimalScale={2}
          fixedDecimalScale
          thousandSeparator="."
          decimalSeparator=","
          onValueChange={(values) => {
            onChange(values.floatValue || 0);
          }}
        />
        <FormErrorMessage>
          {error}
        </FormErrorMessage>
      </FormControl>
    </Box>
  );
};

export default MaskMoney;
