import React from "react";

import NumberFormat from "react-number-format";
import { Box, Input } from "@chakra-ui/react";

interface InputProps {
  label?: string;
  error?: any;
  onChange: (value: number) => void;
  value: number;
}

const MaskMoney: React.FC<InputProps> = ({ value, onChange, label, error }: InputProps) => {
  const formatCurrencyByEnd = (value: string): string => {
    if (!Number(value)) return "";

    const amount = new Intl.NumberFormat("pt-BR", {
      style: "decimal",
      minimumFractionDigits: 2
    }).format(parseFloat(value) / 100);
    return `${amount}`;
  };

  return (
    <Box display="flex" borderRadius="lg" border="1px" borderColor="#969 9B0" backgroundColor="#D1D2DC">
      <Box display="flex" alignItems="center" paddingLeft="16px" borderRight="1px" borderColor="#9699B0"><Box userSelect="none" paddingRight="8px">R$</Box></Box>
      <NumberFormat
        style={{
          outline: 'none',
          padding: "8px",
          width: "100%",
          background: 'transparent',
          borderBottomRightRadius: '0.5rem',
          borderTopRightRadius: '0.5rem',
          backgroundColor: "#f6f6f8"
        }}
        placeholder={"0,00"}
        format={formatCurrencyByEnd}
        allowNegative={true}
        fixedDecimalScale
        decimalScale={2}
        inputMode="numeric"
        name="amount"
        value={value}
        thousandSeparator={true}
        onValueChange={(values) => {
          onChange(values.floatValue);
        }}
      />
    </Box>

  );
};

export default MaskMoney;
