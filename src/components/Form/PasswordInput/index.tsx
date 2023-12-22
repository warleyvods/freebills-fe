import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input as ChakraInput,
  InputGroup,
  InputProps as ChakraInputProps,
  InputRightElement,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

interface InputProps extends ChakraInputProps {
  name?: string;
  label?: string;
  error?: any;
  important?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({
  important,
  name,
  label,
  error = null,
  ...rest
}: InputProps, ref) => {
  const mainColor = useColorModeValue('white', 'gray.900');
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);

  return (
    <FormControl isInvalid={!!error}>
      {!!label && (
        <FormLabel htmlFor={name}>
          {label} <span style={{color: "red"}}>{important}</span>
        </FormLabel>
      )}
      <InputGroup size="md">
        <ChakraInput
          isDisabled={rest.isDisabled}
          name={name}
          placeholder={rest.placeholder}
          type={showPassword ? "text" : "password"}
          value={rest.value}
          onChange={rest.onChange}
          focusBorderColor={"blue.500"}
          bgColor={mainColor}
        />
        <InputRightElement width="4.5rem">
          <IconButton
            ml="30px"
            bg="inherit"
            borderRadius="inherit"
            _focus={{boxShadow: "none"}}
            onClick={handleClick}
            size="sm"
            variant="unstyled"
            aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
            icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
          />
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage mt={1}>
        <Text fontSize={"13px"}>{error}</Text>
      </FormErrorMessage>
    </FormControl>
  );
};

export const InputFormikPassword = forwardRef(InputBase);
