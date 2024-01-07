import { Button, Flex, ScaleFade } from "@chakra-ui/react";
import React from "react";
import { ConfirmationDialog } from "../../Dialog/ConfirmationDialog";

export function FloatingComponent({showFloatMenu, selects: selectIds, handleDeleteBatchSelected: handleDeleteBatchUsers}) {
  if (!showFloatMenu) {
    return null;
  }

  return (
    <ScaleFade initialScale={0.9} unmountOnExit={true} in={showFloatMenu}>
      <Flex w={"500px"}
            h={"60px"}
            borderRadius={"10px"}
            zIndex={"0"}
            justify={"space-around"}
            alignItems={"center"}
            bg={"white"}
            border={"1px"}
            borderColor={"gray.50"}
            boxShadow={"0px 0px 10px 0px rgba(0,0,0,0.4)"}
      >
        <Button variant={"cancel"} disabled={true}>
          Definir como ativo
        </Button>
        <Button variant={"cancel"} disabled={true}>
          Definir como inativo
        </Button>

        <ConfirmationDialog
          title="Deletar Usuário"
          buttonText="Deletar"
          description="Você tem certeza de que deseja desativar sua conta? Todos os seus dados serão permanentemente removidos. Essa ação não pode ser desfeita."
          onOk={() => handleDeleteBatchUsers(selectIds)}
          mainColor={'white'}
          variant={'danger'}
          trigger={(onOpen) => {
            return (
              <Button
                variant={"danger"}
                onClick={onOpen}
              >
                {selectIds.length > 1 ? `Excluir usuários` : `Excluir usuário`}
              </Button>
            )
          }}
        />
      </Flex>
    </ScaleFade>
  );
}
