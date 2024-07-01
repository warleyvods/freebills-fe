import { Button, Flex, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Formik } from "formik";
import { InputFormik } from "@/components/Form/input";
import { useWorkspaceById } from "@/hook/workspace/useWorkspaceById";
import { useUpdateWorkspace } from "@/hook/workspace/useUpdateWorkspace";
import { useDeleteWorkspaceById } from "@/hook/workspace/useDeleteWorkspaceById";
import { useWorkspace } from "@/hook/workspace/useWorkspace";
import { useRouter } from "next/router";
import { ConfirmationDialog } from "@/components/Dialog/ConfirmationDialog";

export const WorkspaceConfig = ({ workspaceId, onClose }) => {
  const router = useRouter();
  const { data: workspaces } = useWorkspace();
  const { data: workspaceFound, isLoading } = useWorkspaceById(workspaceId);
  const updateWorkspace = useUpdateWorkspace();
  const deleteWorkspace = useDeleteWorkspaceById();

  const [name, setName] = useState("");

  useEffect(() => {
    if (workspaceFound) {
      setName(workspaceFound.name);
    }
  }, [workspaceFound]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (name !== workspaceFound.name) {
        const newValues = { ...workspaceFound, name };
        handleUpdateWorkspace(newValues);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [workspaceFound, name]);

  const handleUpdateWorkspace = (values) => {
    updateWorkspace.mutate(values);
  };

  const handleDeleteWorkspace = (workspaceId: string) => {
    deleteWorkspace.mutate(workspaceId);
    router.push(`/workspace`);
    onClose();
  };

  if (isLoading) {
    return null;
  }

  return (
    <Flex w={"full"} h={"full"} flexDirection={"column"}>
      {/*HEADING*/}
      <Text fontWeight={"bold"} fontSize={"20px"} mb={"16px"}>
        Configurações do Workspace
      </Text>

      {/*FORMULARIOS*/}
      <Formik initialValues={workspaceFound} onSubmit={handleUpdateWorkspace}>
        {({ handleSubmit, handleChange, values, errors, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} h={"full"}>
              <InputFormik
                label={"Nome"}
                placeholder={"Nome Workspace"}
                name="name"
                type="text"
                onChange={(e) => {
                  handleChange(e);
                  setName(e.target.value);
                }}
                value={name}
                error={errors.name}
              />
              <InputFormik
                isDisabled={true}
                label={"ID"}
                placeholder={"id"}
                name="id"
                type="text"
                onChange={handleChange}
                value={values.id}
                error={errors.id}
              />
            </Stack>
          </form>
        )}
      </Formik>
      {workspaces.length > 1 && (
        <ConfirmationDialog
          onOk={() => handleDeleteWorkspace(workspaceId)}
          mainColor={"white"}
          title={"Deletar Workspace"}
          description={"Você tem certeza de que deseja excluir este workspace? Todas as suas pastas, winbots e resultados serão excluídos para sempre."}
          buttonText={"Deletar"}
          variant={"danger"}
          trigger={(onOpen) =>
          <Button
            mt={"40px"}
            w={"full"}
            variant={"outline"}
            colorScheme={"red"}
            type="submit"
            onClick={onOpen}
          >
            <Text>Deletar Workspace</Text>
          </Button>
        } />
      )}
    </Flex>
  );
};
