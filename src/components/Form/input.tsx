import {
  FormControl,
  FormErrorMessage,
  FormLabel, HStack,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import InputMask from "react-input-mask";


interface InputProps extends ChakraInputProps {
  name?: string;
  label?: string;
  error?: any;
  mask?: string;
  important?: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({
  important,
  name,
  mask,
  label,
  error = null,
  value,
  onChange,
  type,
  placeholder,
  ...rest
}: InputProps, ref) => {
  const mainColor = useColorModeValue('gray.10', '#1E1F20');

  return (
    <FormControl isInvalid={!!error}>
      {
        !!label && (
          <FormLabel htmlFor={name} mb={1}>
            <HStack spacing={"2px"}>
              <Text fontSize={{ base: "0.9rem", md: "1rem" }}>{label}</Text>
              <span style={{color: "red"}}>{important}</span>
            </HStack>
          </FormLabel>
        )
      }
      <InputMask
        mask={mask}
        name={name}
        value={value} // needed because of bug in react-input-mask
        onChange={onChange} // needed because of bug in react-input-mask
      >
        {(inputProps) => <ChakraInput
          isDisabled={rest.isDisabled}
          placeholder={placeholder}
          type={type}
          {...inputProps}
          value={value} // needed because of bug in react-input-mask
          onChange={onChange} // needed because of bug in react-input-mask
          focusBorderColor={"blue.500"}
          bgColor={mainColor}
        />
        }
      </InputMask>

      <FormErrorMessage mt={1}>
        <Text fontSize={"0.8rem"} fontWeight={"medium"}>{error}</Text>
      </FormErrorMessage>
    </FormControl>
  );
}

export const InputFormik = forwardRef(InputBase)
