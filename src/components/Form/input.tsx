import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
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
  const mainColor = useColorModeValue('gray.10', 'gray.900');

  return (
    <FormControl isInvalid={!!error}>
      {
        !!label && <FormLabel htmlFor={name}>{label} <span style={{color: "red"}}>{important}</span></FormLabel>
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

      <FormErrorMessage>
        {error}
      </FormErrorMessage>


    </FormControl>
  );
}

export const InputFormik = forwardRef(InputBase)
