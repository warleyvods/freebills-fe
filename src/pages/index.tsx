import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Heading,
  IconButton,
  InputGroup,
  InputRightElement,
  LightMode,
  Stack,
  useColorModeValue,
  useToast,
  VStack
} from "@chakra-ui/react";
import * as yup from 'yup';
import { useMutation } from "react-query";
import { api } from "../services/api";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Formik } from 'formik';
import { InputFormik } from "../components/Form/input";
import LogoBills from "../components/Logo/LogoBills";

export type SignInFormData = {
  login: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  login: yup.string().required('Login obrigatório'),
  password: yup.string().required('Senha obrigatória')
})

const initialValues = {
  login: '',
  password: ''
}

export default function SignIn() {
  const [show, setShow] = useState(false)
  const mainColor = useColorModeValue('white', 'gray.900');
  const boxColor = useColorModeValue('gray.50', 'gray.800');
  const [loading, setLoading] = useState(false);
  const toast = useToast()
  const router = useRouter();

  const handleClick = () => setShow(!show)

  const {mutate: signIn} = useMutation(async ({login, password}: SignInFormData) => {
    try {
      setLoading(true)
      await api.post(`/v1/auth/login`, {
        login, password
      })

      await router.push('/dashboard')

    } catch (err) {

      if (err.response.status === 401) {
        setLoading(false)
        return toast({
          title: 'Login Error',
          description: "Login ou senha incorretos",
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }

      if (err.data === undefined) {
        setLoading(false)
        return toast({
          title: 'Server Error 500',
          description: "Servidor não encontrado!",
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }

    }
  });

  const handleSignIn = async (data) => {
    await signIn(data)
  }

  return (
    <Flex w="100vw"
          h="100vh"
          align="center"
          justify="center"
          bg={mainColor}
    >
      <Stack spacing={8} mx={'auto'} w={'450px'} py={12} px={6}>
        <Flex width="100%"
              maxWidth={"auto"}
              bg={boxColor}
              p={"8"}
              borderRadius={8}
              flexDir={"column"}
        >
          <Formik initialValues={initialValues}
                  validateOnChange={false}
                  validationSchema={signInFormSchema}
                  onSubmit={handleSignIn}
          >
            {({handleSubmit, handleChange, values, errors}) =>
              <>
                <form onSubmit={handleSubmit}>
                  <Stack spacing={4}>
                    <Center pb={10}>
                      <Box maxH={"400px"} maxW={"230px"}>
                        {
                          mainColor == 'white' ? (
                            <>
                              <VStack>
                                <LogoBills />
                                <Heading fontFamily={'Poppins'} fontWeight={"bold"} fontSize={'25px'}>Free Bills</Heading>
                              </VStack>
                            </>
                          ) : (
                            <>
                              <VStack>
                                <LogoBills />
                                <Heading fontFamily={'Poppins'} fontWeight={"bold"} fontSize={'25px'}>Free Bills</Heading>
                              </VStack>
                            </>
                          )
                        }
                      </Box>
                    </Center>
                    <InputFormik name={"login"}
                                 type={"text"}
                                 onChange={handleChange}
                                 value={values.login}
                                 error={errors.login}
                                 placeholder={"Login"}
                    />
                    <InputGroup size='md'>
                      <InputFormik name={"password"}
                                   type={show ? 'text' : 'password'}
                                   onChange={handleChange}
                                   value={values.password}
                                   error={errors.password}
                                   placeholder={"Senha"}
                      />
                      <InputRightElement width='4.5rem'>
                        <IconButton ml={"30px"}
                                    bg="inherit"
                                    borderRadius="inherit"
                                    _focus={{
                                      boxShadow: "none",
                                    }}
                                    onClick={handleClick}
                                    size="sm"
                                    variant="unstyled"
                                    aria-label="show pass"
                                    icon={show ? <ViewIcon /> : <ViewOffIcon />}
                        />
                      </InputRightElement>
                    </InputGroup>
                  </Stack>
                  <Stack spacing={10} mt={5}>
                    <Stack
                      direction={{base: 'column', sm: 'row'}}
                      align={'start'}
                      justify={'space-between'}>
                      <Checkbox>Lembrar</Checkbox>
                    </Stack>
                    <LightMode>
                      <Button type={"submit"} marginTop={6} colorScheme={"facebook"} isLoading={loading}>Entrar</Button>
                    </LightMode>
                  </Stack>
                </form>
              </>
            }
          </Formik>
        </Flex>
      </Stack>
    </Flex>
  )
}
