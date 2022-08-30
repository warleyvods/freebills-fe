import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Heading,
  HStack,
  LightMode,
  SimpleGrid,
  Tooltip,
  useColorModeValue,
  VStack
} from "@chakra-ui/react";
import Link from "next/link";

import * as yup from "yup";
import { useRouter } from "next/router";
import { useCreateUser } from "../../hooks/users/useCreateUser";
import React from "react";
import { Formik } from 'formik';
import { InputFormik } from "../../components/Form/input";
import SidebarWithHeader from "../../components/SideBar";

const createUserValidationSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório.').min(3, 'No mínimo 3 caracteres.'),
  login: yup.string().required('Login unico obrigatório.').min(3, 'No mínimo 3 caracteres.'),
  email: yup.string().required('E-mail obrigatório.').email('E-mail inválido.'),
  password: yup.string().required('Senha obrigatória.').min(6, 'No mínimo 6 caracteres.'),
  password_confirmation: yup.string().oneOf([
    null, yup.ref('password')
  ], 'As senhas precisam ser iguais.')
});

const validationSchema = yup.object({
  name: yup.string().required(),
});

const initialValues = {
  name: '',
  login: '',
  email: '',
  password: '',
  password_confirmation: '',
  admin: false,
  active: false
}

export default function CreateUser() {
  const router = useRouter()
  const mainColor = useColorModeValue('white', 'gray.800');
  const createUser = useCreateUser(() => router.push('/users'))

  const handleCreateUser = async (values) => {
    await createUser.mutateAsync(values)
  }

  return (
    <SidebarWithHeader>
      <Box>
        <Flex w="100%" maxWidth={"auto"} mx={"auto"}>
          <Box flex={1} borderRadius={8} bg={mainColor} p={8}>

            <Formik initialValues={initialValues}
                    validateOnChange={false}
                    validationSchema={createUserValidationSchema}
                    onSubmit={handleCreateUser}
            >
              {({handleSubmit, handleChange, values, errors}) =>
                <>
                  <form onSubmit={handleSubmit}>

                    <Heading size={"lg"} fontWeight={"bold"}>Criar Usuário</Heading>
                    <Divider my={6} borderColor={"gray.700"} />
                    <VStack spacing={8}>
                      <SimpleGrid minChildWidth={"240px"} spacing={8} w={"100%"}>
                        <InputFormik label={"Nome Completo"}
                                     name={"name"}
                                     important={"*"}
                                     type={"text"}
                                     onChange={handleChange}
                                     value={values.name}
                                     error={errors.name}
                        />
                      </SimpleGrid>
                      <SimpleGrid minChildWidth={"240px"} spacing={8} w={"100%"}>
                        <Tooltip hasArrow label='Login de acesso parar logar na aplicação.' mt='3'>
                          <InputFormik label={"Login unico"}
                                       name={"login"}
                                       important={"*"}
                                       type={"text"}
                                       onChange={handleChange}
                                       value={values.login}
                                       error={errors.login}
                          />
                        </Tooltip>
                        <InputFormik label={"Email"}
                                     name={"email"}
                                     important={"*"}
                                     type={"text"}
                                     onChange={handleChange}
                                     value={values.email}
                                     error={errors.email}
                        />

                      </SimpleGrid>
                      <SimpleGrid minChildWidth={"240px"} spacing={8} w={"100%"}>
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
                      </SimpleGrid>
                    </VStack>

                    <Flex mt={8} justify={"flex-start"}>
                      <HStack spacing={4}>
                        <Checkbox id="admin"
                                  name="admin"
                                  onChange={handleChange}
                                  isChecked={values.admin}
                        >
                          Admin
                        </Checkbox>
                        <Checkbox id="active"
                                  name="active"
                                  onChange={handleChange}
                                  isChecked={values.active}
                        >
                          Ativo
                        </Checkbox>
                      </HStack>
                    </Flex>

                    <Flex mt={8} justify={"flex-end"}>
                      <HStack spacing={4}>
                        <LightMode>
                          <Link href={"/users"} passHref>
                            <Button as={"a"} colorScheme={"red"}>Cancelar</Button>
                          </Link>
                          <Button type={"submit"} colorScheme={"facebook"}>Salvar</Button>
                        </LightMode>
                      </HStack>
                    </Flex>
                  </form>
                </>
              }
            </Formik>
          </Box>
        </Flex>
      </Box>
    </SidebarWithHeader>
  );
}
