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
import { forwardRef, ForwardRefRenderFunction } from "react";

interface SelectProps extends ChakraSelectProps {
  name?: string;
  label?: string;
  error?: any;
  options: { value: string; label: string }[];
  important?: string;
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
  ...rest
}: SelectProps, ref) => {
  const mainColor = useColorModeValue('gray.10', 'gray.900');

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event);
    // Limpar o erro ao selecionar uma opção válida
    event.target.setCustomValidity('');
  };

  return (
    <FormControl isInvalid={!!error}>
      {label && (
        <FormLabel htmlFor={name} mb={1}>
          <HStack spacing={"2px"}>
            <Text fontSize={"1rem"}>{label}</Text>
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
        <option value='' disabled hidden>
          -
        </option>
        {options.map((opt) => (
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
