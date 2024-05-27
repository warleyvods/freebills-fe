import { Box, Button, Flex, Heading, HStack, Link, Stack, Text, useColorModeValue, } from '@chakra-ui/react';
import React, { useState } from 'react';
import { InputFormik } from "../../components/Form/input";
import NextLink from "next/link";
import { Formik } from "formik";
import { createUserValidationSchema } from "../users/create";
import { useRouter } from "next/router";
import { useSignIn } from "../../hooks/users/useSignIn";

const initialValues = {
  name: '',
  login: '',
  email: '',
  password: '',
  password_confirmation: ''
}

export default function SignupCard() {
  const router = useRouter();
  const mainColor = useColorModeValue('white', 'gray.700')
  const createUser = useSignIn(() => router.push('/users'))
  const [showPassword, setShowPassword] = useState(false);

  const handleCreateUser = async (values) => {
    await createUser.mutateAsync(values)
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Crie sua conta
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            para usar o freebills ✌️
          </Text>
        </Stack>
        <Formik initialValues={initialValues}
                validateOnChange={false}
                validationSchema={createUserValidationSchema}
                onSubmit={handleCreateUser}>
          {({handleSubmit, handleChange, values, errors}) =>
            <>
              <form onSubmit={handleSubmit}>
                <Box rounded={'lg'}
                  bg={mainColor}
                  boxShadow={'lg'}
                  p={8}>
                  <Stack spacing={4}>
                    <HStack>
                      <Box>
                        <InputFormik label={"Nome"}
                                     name={"name"}
                                     important={"*"}
                                     type={"text"}
                                     onChange={handleChange}
                                     value={values.name}
                                     error={errors.name}
                        />
                      </Box>
                      <Box>
                        <InputFormik label={"Login unico"}
                                     name={"login"}
                                     important={"*"}
                                     type={"text"}
                                     onChange={handleChange}
                                     value={values.login}
                                     error={errors.login}
                        />
                      </Box>
                    </HStack>
                    <InputFormik label={"Email"}
                                 name={"email"}
                                 important={"*"}
                                 type={"text"}
                                 onChange={handleChange}
                                 value={values.email}
                                 error={errors.email}
                    />
                    <InputFormik label={"Senha"}
                                 name={"password"}
                                 important={"*"}
                                 type={"password"}
                                 onChange={handleChange}
                                 value={values.password}
                                 error={errors.password}

                    />
                    <InputFormik label={"Confirmação da Senha"}
                                 name={"password_confirmation"}
                                 important={"*"}
                                 type={"password"}
                                 onChange={handleChange}
                                 value={values.password_confirmation}
                                 error={errors.password_confirmation}

                    />
                    <Stack spacing={10} pt={2}>
                      <Button type={"submit"}
                        size="lg"
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                          bg: 'blue.500',
                        }}>
                        Registrar
                      </Button>
                    </Stack>
                    <Stack pt={6}>
                      <NextLink href={"/"}>
                        <Text align={'center'}>
                          Já tem uma conta? <Link color={'blue.400'}>Login</Link>
                        </Text>
                      </NextLink>
                    </Stack>
                  </Stack>
                </Box>
              </form>
            </>
          }
        </Formik>
      </Stack>
    </Flex>
  );
}
