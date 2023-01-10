import React from "react";
import NumberFormat from "react-number-format";
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

  const formatCurrencyByEnd = (value: string): string => {
    const amount = new Intl.NumberFormat("pt-BR", {
      style: "decimal",
      minimumFractionDigits: 2
    }).format(parseFloat(value) / 100);
    return `${amount}`;
  };

  return (
    <Box display="flex" borderRadius="lg" border="1px" borderColor={inverseMainColor} backgroundColor={mainColor}>
      <Box display="flex" alignItems="center" paddingLeft="16px" borderRight="1px" borderColor="#9699B0">
        <Box userSelect="none" paddingRight="8px">R$</Box>
      </Box>
      <FormControl isInvalid={!!error}>
        <NumberFormat
          allowNegative={true}
          prefix="-"
          style={{
            outline: 'none',
            padding: "8px",
            width: "100%",
            background: 'inherit',
            borderBottomRightRadius: '0.5rem',
            borderTopRightRadius: '0.5rem',

          }}
          placeholder={"0,00"}
          format={formatCurrencyByEnd}
          inputMode="text"
          name={name}
          value={value * 100}
          onValueChange={(values) => {
            onChange(!!values.floatValue ? (parseFloat(String(values.floatValue)) / 100).toFixed(2) : 0);
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
