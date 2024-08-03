import React, { useRef, useState } from 'react';
import {
  Avatar,
  Button,
  Flex,
  HStack,
  Icon,
  SimpleGrid,
  Skeleton,
  Spinner,
  Text,
  Tooltip,
  VStack
} from "@chakra-ui/react";
import { UploadIcon } from "../../icons";
import { useUploadImageFile } from "../../../hooks/users/useUploadImageFile";
import { uploadFileToS3 } from "../../../hooks/users/uploadFile";
import { useMe } from "../../../hooks/users/useMe";
import { queryClient } from "../../../services/queryClient";
import { InputFormik } from "../../Form/input";
import { Formik } from "formik";
import { updateUserValidationSchema } from "../../../pages/users/[id]";
import { useUpdateUser } from "../../../hooks/users/useUpdateUser";
import { ModalPassword } from "../Password";
import { RepeatIcon } from "@chakra-ui/icons";

export const MyAccountForm = ({onClose}) => {
  const {data: user, isLoading: userIsLoading, refetch} = useMe();
  const fileInputRef = useRef(null);
  const [referenceId, setReferenceId] = useState(null);
  const [imageIsLoading, setImageIsLoading] = useState(false);
  const updateUser = useUpdateUser();

  const useUploadImage = useUploadImageFile(
    async (data) => {
      try {
        setImageIsLoading(true)
        const result = await uploadFileToS3(data.uploadSignedUrl, selectedFile);
        setImageIsLoading(false)
      } catch (error) {
        console.error("Erro ao fazer o upload do arquivo:", error);
      }
    }
  );

  let selectedFile = null;

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      selectedFile = file;
      const fileInfo = {
        fileName: file.name,
        contentType: file.type,
        contentLength: file.size,
      };

      useUploadImage.mutate(fileInfo, {
        onSuccess: (data) => {
          setReferenceId(data.fileReferenceId);
          queryClient.invalidateQueries(['users']);
          queryClient.invalidateQueries(['me']);
          refetch();
        },
        onError: (error) => {
          console.error("Mutation Error:", error);
        }
      });
    }
  };

  const handleUpdateUser = async (values) => {
    await updateUser.mutateAsync(values);
  }

  if (userIsLoading) {
    return null;
  }

  return (
    <Flex w={"full"} h={"full"} flexDirection={"column"} justify={"space-between"}>
      <HStack spacing={"12px"} mb={"16px"}>
        {imageIsLoading ? (
          <Flex align="center" justify="center" w={"64px"} h={"64px"} position="relative">
            <Skeleton w={"64px"} h={"64px"} borderRadius={"50px"} />
            <Spinner
              size={"md"}
              position="absolute"
            />
          </Flex>
        ) : (
          <Avatar size={"lg"} src={user?.imgUrl} key={referenceId} />
        )}
        <VStack alignItems={"start"} justify={"space-between"} spacing={0} h={"full"}>
          <Button
            size={"xs"}
            isDisabled={false}
            p={"12px 16px"}
            leftIcon={<UploadIcon />}
            onClick={handleClick}
          >
            Trocar a foto
          </Button>
          <input
            type="file"
            accept=".jpg,.png"
            ref={fileInputRef}
            style={{display: 'none'}}
            onChange={handleFileChange}
          />
          <Text fontSize={"12px"}>.jpg ou .png no máximo 1MB</Text>
        </VStack>
      </HStack>
      <Formik
        initialValues={user}
        validateOnChange={false}
        validationSchema={updateUserValidationSchema}
        onSubmit={handleUpdateUser}
      >
        {({handleSubmit, isSubmitting, handleChange, values, errors}) =>
          <>

            <form onSubmit={handleSubmit}>
              <HStack w={"full"} justify={"end"}>
                <ModalPassword
                  id={user?.id}
                  trigger={(onOpen) =>
                    <Button size={"xs"}
                            variant={"danger"}
                            leftIcon={<Icon as={RepeatIcon} fontSize={"15px"} />}
                            onClick={onOpen}
                    >
                      Alterar senha
                    </Button>}
                />
              </HStack>
              <VStack spacing={4}>
                <SimpleGrid minChildWidth={"240px"} spacing={8} w={"100%"}>
                  <InputFormik
                    label={"Nome Completo"}
                    name={"name"}
                    important={"*"}
                    type={"text"}
                    onChange={handleChange}
                    value={values.name}
                    error={errors.name}
                  />
                  <Tooltip hasArrow label='Login de acesso parar logar na aplicação.' shouldWrapChildren mt='3'>
                    <InputFormik
                      label={"Login unico"}
                      name={"login"}
                      important={"*"}
                      type={"text"}
                      isDisabled={true}
                      onChange={handleChange}
                      value={values.login}
                      error={errors.login}
                    />
                  </Tooltip>
                  <InputFormik
                    label={"Email"}
                    name={"email"}
                    important={"*"}
                    type={"text"}
                    isDisabled={true}
                    onChange={handleChange}
                    value={values.email}
                    error={errors.email}
                  />
                </SimpleGrid>
              </VStack>

              <Flex justify={"flex-end"} mt={"80px"}>
                <HStack spacing={1}>
                  <Button variant={"cancel"} onClick={onClose}>Cancelar</Button>
                  <Button variant={"default"} onClick={onClose} type={"submit"} isLoading={isSubmitting}>Salvar</Button>
                </HStack>
              </Flex>
            </form>
          </>
        }
      </Formik>
    </Flex>
  );
};
