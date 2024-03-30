import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
  Text,
  HStack,
  useColorModeValue
} from "@chakra-ui/react";
import React, { forwardRef, ForwardRefRenderFunction } from "react";

interface SelectProps extends ChakraSelectProps {
  name?: string;
  label?: string;
  error?: any;
  options: { value: string; label: string }[];
  important?: string;
  showDefaultOption?: boolean;
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = ({
  important,
  name,
  label,
  error = null,
  options,
  value,
  onChange,
  placeholder,
  showDefaultOption,
  ...rest
}: SelectProps) => {
  const mainColor = useColorModeValue('gray.10', 'gray.900');

  // Limpar o erro ao selecionar uma opção válida
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event);
    // @ts-ignore
    event.target.setCustomValidity('');
  };

  return (
    <FormControl isInvalid={!!error}>
      {label && (
        <FormLabel htmlFor={name} mb={1}>
          <HStack spacing={"2px"}>
            <Text fontSize={{ base: "0.9rem", md: "1rem" }}>{label}</Text>
            <span style={{ color: "red" }}>{important}</span>
          </HStack>
        </FormLabel>
      )}

      <ChakraSelect
        id={name}
        name={name}
        value={value}
        onChange={handleSelectChange}
        placeholder={placeholder}
        focusBorderColor={"blue.500"}
        bgColor={mainColor}
        {...rest}
      >
        { showDefaultOption && (
          <option value='' disabled hidden>
            -
          </option>
        )}
        { options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </ChakraSelect>

      <FormErrorMessage mt={1}>
        <Text fontSize={"0.8rem"} fontWeight={"medium"}>
          {error}
        </Text>
      </FormErrorMessage>
    </FormControl>
  );
};

export const SelectFormik = forwardRef(SelectBase);
