import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

type ForgotPasswordFormInputs = {
  email: string;
};

export default function ForgotPasswordForm(): JSX.Element {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading lineHeight={1.1} fontSize={{base: '2xl', md: '3xl'}}>
          Esqueceu sua senha?
        </Heading>
        <Text
          fontSize={{base: 'sm', sm: 'md'}}
          color={useColorModeValue('gray.800', 'gray.400')}>
          Você receberá um e-mail com um link de redefinição
        </Text>
        <FormControl id="email">
          <Input
            placeholder="seu-email@exemplo.com"
            _placeholder={{color: 'gray.500'}}
            type="email"
          />
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}>
            Enviar Código
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
