import { Box, Button, Center, Heading, Link, Stack, VStack, } from "@chakra-ui/react";
import { FormikProps } from "formik";
import { LoginFormData } from "../../../hooks/login/useLogin";
import { InputFormik } from "../input";
import { InputFormikPassword } from "../PasswordInput";

interface LoginFormProps {
  onSubmit: (values: any) => void;
  formik: FormikProps<LoginFormData>;
}

export const LoginForm = ({formik}: LoginFormProps) => {
  const {handleChange, values, errors} = formik;

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
                Freebills<span style={{ color: "red" }}>.</span>
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
          <Link href={"/forgot"} alignItems={"center"} fontSize={"14px"} fontWeight="medium" color={"gray"}>Esqueceu sua senha?</Link>
        </Stack>
        <Button variant={"default"} type="submit" marginTop={6} isLoading={formik.isSubmitting}>Entrar</Button>
      </Stack>
    </form>
  );
};
