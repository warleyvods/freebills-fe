import { Box, Button, Center, Heading, Icon, Link, Stack, useColorModeValue, VStack, } from "@chakra-ui/react";
import { FormikProps } from "formik";
import { LoginFormData } from "../../../hooks/login/useLogin";
import { InputFormik } from "../input";
import { InputFormikPassword } from "../PasswordInput";

import { api } from "../../../services/api";
import React, { useState } from "react";
import { IconProps } from "@chakra-ui/icons";

interface LoginFormProps {
  onSubmit: (values: any) => void;
  formik: FormikProps<LoginFormData>;
}

export const LoginForm = ({formik}: LoginFormProps) => {
  const baseURL = api.defaults.baseURL;
  const {handleChange, values, errors} = formik;
  const [isGitHubLoading, setIsGitHubLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleSignIn = async (provider: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      setLoading(true);
      // @ts-ignore
      window.location.href = `${baseURL}/oauth2/authorization/${provider}`;
    } catch (error) {
      setLoading(false);
    }
  };

  const handleGitHubClick = () => handleSignIn('github', setIsGitHubLoading)
  const handleGoogleClick = () => handleSignIn('google', setIsGoogleLoading)

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={4}>
        <Center pb={10}>
          <Box maxH={"400px"} maxW={"230px"}>
            <VStack>
              <Heading
                fontFamily="Poppins"
                fontWeight="bold"
                fontSize="1.8rem"
              >
                Freebills<span style={{color: "red"}}>.</span>
              </Heading>
            </VStack>
          </Box>
        </Center>

        <InputFormik
          placeholder={"Login"}
          name="login"
          type="text"
          onChange={handleChange}
          value={values.login}
          error={errors.login}
        />
        <InputFormikPassword
          placeholder={"Senha"}
          name="password"
          type="password"
          onChange={handleChange}
          value={values.password}
          error={errors.password}
        />
      </Stack>
      <Stack spacing={5} mt={4}>
        <Stack direction={{base: "column", sm: "column"}} align={"flex-end"}>
          <Link href={"/forgot"} alignItems={"center"} fontSize={"14px"} fontWeight="medium" color={"gray"}>Esqueceu sua
            senha?</Link>
        </Stack>
        <Button variant={"default"} type="submit" marginTop={6} isLoading={formik.isSubmitting}>Entrar</Button>
        <Button
          leftIcon={<GithubIcon />}
          onClick={handleGitHubClick}
          data-testid="github"
          isLoading={isGitHubLoading}
          variant="outline"
        >
          Continuar com Github
        </Button>
        <Button
          leftIcon={<GoogleLogo />}
          onClick={handleGoogleClick}
          data-testid="github"
          isLoading={isGoogleLoading}
          variant="outline"
        >
          Continuar com Google
        </Button>
      </Stack>
    </form>
  );
};

export const GithubIcon = (props: IconProps) => (
  <Icon viewBox="0 0 98 96" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
      fill={useColorModeValue('#24292f', 'white')}
    />
  </Icon>
)

export const GoogleLogo = (props: IconProps) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
      <path
        fill="#4285F4"
        d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
      />
      <path
        fill="#34A853"
        d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
      />
      <path
        fill="#FBBC05"
        d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
      />
      <path
        fill="#EA4335"
        d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
      />
    </g>
  </Icon>
)
