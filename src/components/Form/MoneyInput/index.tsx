import React, { useCallback, useRef } from "react";
import NumberFormat, { NumberFormatValues } from "react-number-format";
import { Box, Text, FormControl, useColorModeValue } from "@chakra-ui/react";

interface InputProps {
  label?: string;
  error?: any;
  important?: boolean;
  onChange: (value: any) => void;
  value: number;
  name: string;
  fontWeight?: string;
  fontSize?: string | { base: string; md: string; }
  placeholder?: string;
}

const InputMoney: React.FC<InputProps> = ({
  value,
  onChange,
  error = null,
  label,
  important = false,
  name,
  placeholder = "0,00",
  fontWeight = "medium",
  fontSize = "1rem",
  ...rest
}: InputProps) => {
  const inputRef = useRef<any>();

  const formatCurrencyByEnd = (value: string): string => {
    const amount = new Intl.NumberFormat("pt-BR", {
      style: "decimal",
      minimumFractionDigits: 2
    }).format(parseFloat(value) / 100);
    return `${amount}`;
  };

  const setCursorToEnd = useCallback(() => {
    setTimeout(() => {
      const inputElement = inputRef.current;
      if (inputElement) {
        const inputLength = inputElement.value.length;
        inputElement.setSelectionRange(inputLength, inputLength);
      }
    }, 0);
  }, []);

  const handleValueChange = (values: NumberFormatValues) => {
    const floatValue = values.floatValue || 0;
    const newValue = !!floatValue ? (parseFloat(String(floatValue)) / 100).toFixed(2) : 0;

    onChange(newValue);
    setCursorToEnd();
  };

  const handleFocus = () => {
    setCursorToEnd();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const blockedKeys = ["Backspace", "ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown", "Delete", "End", "Home"];
    if ((value === 0 && event.key === blockedKeys[0]) ||
      event.key === blockedKeys[1] ||
      event.key === blockedKeys[2] ||
      event.key === blockedKeys[3] ||
      event.key === blockedKeys[4] ||
      event.key === blockedKeys[5] ||
      event.key === blockedKeys[6] ||
      event.key === blockedKeys[7]
    ) {
      event.preventDefault();
      return;
    }
  };

  return (
    <Box w={"full"}>
      <>
        <Text fontWeight={fontWeight} fontSize={fontSize}>
          {label}
          { important && <span style={{color: "red", marginLeft: "2px" }}>*</span> }
        </Text>
        <Box display="flex" borderRadius="lg" border={!!error ? "2px" : "1px"} borderColor={!!error ? "red" : "#B3B5C6"}
             backgroundColor={"inherit"} w={"full"}>
          <Box display="flex" alignItems="center" px={"5px"} borderLeftRadius={"7px"} paddingLeft="16px" bg={"gray.50"}
               borderRight="1px" borderColor="#9699B0">
            <Box userSelect="none" paddingRight="8px">R$</Box>
          </Box>
          <FormControl isInvalid={!!error}>
            <NumberFormat
              allowNegative={true}
              prefix="-"
              style={{
                fontWeight: 'normal',
                fontSize: '17px',
                outline: 'none',
                padding: "8px",
                width: "100%",
                background: 'inherit',
                borderBottomRightRadius: '0.5rem',
                borderTopRightRadius: '0.5rem',
              }}
              placeholder={placeholder}
              format={formatCurrencyByEnd}
              inputMode="text"
              name={name}
              value={value * 100}
              getInputRef={inputRef}
              onValueChange={handleValueChange}
              onClick={handleFocus}
              onKeyDown={handleKeyDown}
            />
          </FormControl>
        </Box>
        {
          !!error && (
            <Text fontSize={"13px"} color={"red"} mt={"1px"}>{error}</Text>
          )
        }
      </>
    </Box>
  );
};

export default InputMoney;
