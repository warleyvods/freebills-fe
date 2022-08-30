import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  LightMode,
  SimpleGrid,
  Tooltip,
  useColorModeValue,
  VStack
} from "@chakra-ui/react";
import NextLink from "next/link";

import * as yup from "yup";
import { useQuery } from "react-query";
import { api } from "../../services/api";
import { useRouter } from "next/router";
import React from "react";
import { useUpdateUser } from "../../hooks/users/useUpdateUser";
import { ModalPassword } from "../../components/Modals/Password";
import { RepeatIcon } from "@chakra-ui/icons";
import { useMe } from "../../hooks/users/useMe";
import { Formik } from 'formik';
import { InputFormik } from "../../components/Form/input";
import SidebarWithHeader from "../../components/SideBar";


const updateUserValidationSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  login: yup.string().required('Login unico obrigatório'),
  email: yup.string().required('Email obrigatório').email('Email invalido')
})

type RouteParams = {
  id: string;
}

export default function EditUser() {
  const mainColor = useColorModeValue('white', 'gray.800');
  const router = useRouter()
  const {id} = router.query as RouteParams;
  const {data: me} = useMe();

  const {data: user, isLoading} = useQuery(['user', id], async () => {
    const res = await api.get('v1/user/' + id);
    return res.data;
  });

  const updateUser = useUpdateUser(() => router.push('/users'));

  const handleUpdateUser = async (values) => {
    await updateUser.mutateAsync(values);
  }

  if (isLoading) {
    return null;
  }

  return (
    <SidebarWithHeader>
      <Box>
        <Flex w="100%" maxWidth={"auto"} mx={"auto"}>
          <Box flex={1} borderRadius={8} bg={mainColor} p={8}>
            <Formik initialValues={user}
                    validateOnChange={false}
                    validationSchema={updateUserValidationSchema}
                    onSubmit={handleUpdateUser}
            >
              {({handleSubmit, isSubmitting, handleChange, values, errors}) =>
                <>
                  <form onSubmit={handleSubmit}>
                    <Flex mb={8} justify={"space-between"} align={"center"}>
                      <Heading size={"lg"} fontWeight={"bold"}>Editar Usuário</Heading>
                      <ModalPassword trigger={(onOpen) => <LightMode>
                        <Button as={"a"}
                                size={"sm"}
                                fontSize={"sm"}
                                colorScheme={"red"}
                                leftIcon={<Icon as={RepeatIcon} fontSize={"18"} />}
                                onClick={onOpen}
                        >Alterar Senha
                        </Button>
                      </LightMode>} id={Number(id)} mainColor={mainColor} />
                    </Flex>

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

                        <Tooltip hasArrow label='Login de acesso parar logar na aplicação.' shouldWrapChildren mt='3'>
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
                    </VStack>

                    <Flex mt={8} justify={"flex-start"}>
                      <HStack spacing={4}>
                        <Checkbox id="admin"
                                  name="admin"
                                  isDisabled={me.id === user.id}
                                  onChange={handleChange}
                                  isChecked={values.admin}
                        >
                          Admin
                        </Checkbox>
                        <Checkbox id="active"
                                  name="active"
                                  isDisabled={me.id === user.id}
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
                          <NextLink href={"/users"} passHref>
                            <Button colorScheme={"red"}>Cancelar</Button>
                          </NextLink>
                        </LightMode>

                        <LightMode>
                          <Button type={"submit"} isLoading={isSubmitting} colorScheme={"facebook"}>Salvar</Button>
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
