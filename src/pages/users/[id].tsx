import {
  Box,
  Button,
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
import NextLink from "next/link";

import * as yup from "yup";
import { useQuery } from "react-query";
import { api } from "../../services/api";
import { useRouter } from "next/router";
import React from "react";

import { Formik } from 'formik';
import { InputFormik } from "../../components/Form/input";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import SidebarWithHeader from "../../components/SideBar";


const updateUserValidationSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
})

type RouteParams = {
  id: string;
}

export default function EditUser() {
  const mainColor = useColorModeValue('white', 'gray.800');
  const router = useRouter()
  const { id } = router.query as RouteParams;

  const { data, isLoading } = useQuery(['user', id], async () => {
    const res = await api.get('api/people/' + id);
    return res.data;
  })

  const updateUser = useUpdateUser(() => router.push('/users'))

  const handleUpdateUser = async (values) => {
    await updateUser.mutateAsync(values)
  }

  if (isLoading) {
    return null;
  }

  return (
    <SidebarWithHeader>
    <Box>
      <Flex w="100%" maxWidth={"auto"} mx={"auto"}>
        <Box flex={1} borderRadius={8} bg={mainColor} p={8}>
          <Formik initialValues={data}
                  validateOnChange={false}
                  validationSchema={updateUserValidationSchema}
                  onSubmit={handleUpdateUser}
          >
            {({handleSubmit, isSubmitting, handleChange, values, errors}) =>
              <>
                <form onSubmit={handleSubmit}>
                  <Flex mb={8} justify={"space-between"} align={"center"}>
                    <Heading size={"lg"} fontWeight={"bold"}>Editar Usuário</Heading>

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

                      <Tooltip hasArrow label='CPF do Usuário.' shouldWrapChildren mt='3'>
                        <InputFormik label={"CPF"}
                                     name={"cpf"}
                                     important={"*"}
                                     type={"text"}
                                     onChange={handleChange}
                                     value={values.cpf}
                                     error={errors.cpf}
                        />
                      </Tooltip>
                      <InputFormik label={"Idade"}
                                   name={"age"}
                                   important={"*"}
                                   type={"text"}
                                   onChange={handleChange}
                                   value={values.age}
                                   error={errors.age}
                      />
                    </SimpleGrid>
                  </VStack>

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
