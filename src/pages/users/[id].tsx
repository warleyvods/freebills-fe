import {
  Box,
  Button,
  Checkbox,
  Flex,
  HStack,
  Icon,
  LightMode,
  SimpleGrid,
  Spinner,
  Text,
  Tooltip,
  useColorModeValue,
  VStack
} from "@chakra-ui/react";
import NextLink from "next/link";

import * as yup from "yup";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import React from "react";

import { Formik } from 'formik';
import { RepeatIcon } from "@chakra-ui/icons";
import { ModalPassword } from "../../components/Modals/Password";
import SideBarLayout from "../../components/SidebarLayout/SideBarLayout";
import { InputFormik } from "../../components/Form/input";
import { useMe } from "../../hooks/users/useMe";
import { api } from "../../services/api";
import { useUpdateUser } from "../../hooks/users/useUpdateUser";


const updateUserValidationSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
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
    <SideBarLayout>
      <Flex justifyContent={"space-between"} h={"70px"} alignItems={"center"}>
        <HStack spacing={"10px"}>
          <>
            <Text fontSize={"22px"} fontWeight={"medium"}>Editar Usuários</Text>
            {isLoading ? (
              <Spinner size={"sm"} />
            ) : null}
          </>
        </HStack>
        <HStack>
          <>
            <ModalPassword
              id={Number(id)}
              trigger={(onOpen) =>
                <LightMode>
                  <Button as={"a"}
                          variant={"danger"}
                          leftIcon={<Icon as={RepeatIcon} fontSize={"18"} />}
                          onClick={onOpen}
                  >
                    Alterar senha
                  </Button>
                </LightMode>}
            />
          </>
        </HStack>
      </Flex>


      <Box>
        <Flex w="100%" maxWidth={"auto"} mx={"auto"}>
          <Box flex={1}
               p={3}
               bg={"white"}
               borderRadius={5}
               borderLeft={"1px"}
               borderBottom={"1px"}
               borderRight={"1px"}
               borderColor={"gray.100"}
               boxShadow="0px 0px 4px rgba(0, 0, 0, 0.1)"
          >
            <Formik initialValues={user}
                    validateOnChange={false}
                    validationSchema={updateUserValidationSchema}
                    onSubmit={handleUpdateUser}
            >
              {({handleSubmit, isSubmitting, handleChange, values, errors}) =>
                <>
                  <form onSubmit={handleSubmit}>
                    <VStack spacing={4}>
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
                                  isDisabled={me?.id === user.id}
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

                    <Flex justify={"flex-end"}>
                      <HStack spacing={1}>
                        <NextLink href={"/users"} passHref>
                          <Button variant={"cancel"}>Cancelar</Button>
                        </NextLink>
                        <Button variant={"default"} type={"submit"} isLoading={isSubmitting}>Salvar</Button>
                      </HStack>
                    </Flex>
                  </form>
                </>
              }
            </Formik>
          </Box>
        </Flex>
      </Box>
    </SideBarLayout>
  );
}
