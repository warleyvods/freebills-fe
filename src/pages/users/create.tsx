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
import Link from "next/link";

import * as yup from "yup";
import { useRouter } from "next/router";
import { useCreateUser } from "../../hooks/useCreateUser";
import React from "react";
import { Formik } from 'formik';
import { InputFormik } from "../../components/Form/input";
import SidebarWithHeader from "../../components/SideBar";


const createUserValidationSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório.').min(3, 'No mínimo 3 caracteres.'),
  cpf: yup.string().required('CPF unico obrigatório.').min(11, 'No mínimo == 11 caracteres.').max(11),
  // age: yup.number().required('Idade deve ser um numero')
});

const validationSchema = yup.object({
  name: yup.string().required(),
});

const initialValues = {
  name: '',
  cpf: '',
  age: ''
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
