import { Flex, Image, Link, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import * as yup from 'yup';
import { useMutation } from "react-query";
import { api } from "../services/api";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Formik } from 'formik';
import { LoginForm } from "../components/Form/LoginForm";

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
  const mainColor = useColorModeValue('gray.700', 'gray.50');
  const boxColor = useColorModeValue('white', 'gray.800');
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
          title: 'Erro na autenticação',
          description: "login ou senha incorretos.",
          status: 'error',
          duration: 3000,
          position: 'top',
          isClosable: true,
        })
      }

      if (err.data === undefined) {
        setLoading(false)
        return toast({
          title: 'Erro 500',
          description: "Um erro aconteceu ao tentar concluir sua solicação, tenta novamente mais tarde.",
          status: 'error',
          duration: 3000,
          position: 'top',
          isClosable: true,
        })
      }

    }
  });

  const handleSignIn = async (data) => {
    await signIn(data)
  }

  return (
    <Flex
      minH="100vh"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      px={6}
    >
      <Flex
        mx="auto"
        w="full"
        maxW="sm"
        flexDir="column"
        alignItems="center"
      >
        <Image
          width={"auto"}
          height={"40px"}
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <Text
          mt={10}
          textAlign="center"
          fontSize="2xl"
          fontWeight="bold"
          lineHeight="tight"
          color={mainColor}
        >
          Faça login na sua conta
        </Text>
      </Flex>

      <Flex
        mt={10}
        mx="auto"
        w="full"
        maxW="sm"
        flexDir="column"
      >
        <Formik initialValues={initialValues}
                validateOnChange={false}
                validationSchema={signInFormSchema}
                onSubmit={handleSignIn}
        >
          {
            formik => <LoginForm formik={formik} onSubmit={formik.handleSubmit} />
          }
        </Formik>
      </Flex>

      <Text
        mt={10}
        textAlign="center"
        fontSize="sm"
        color="gray.200"
      >
        Não é membro?{' '}
        <Link
          href={"/sign-in"}
          fontWeight="semibold"
          color="indigo.400"
          _hover={{ color: "indigo.500" }}
        >
          Cadastre-se
        </Link>
      </Text>
    </Flex>
  )
}
