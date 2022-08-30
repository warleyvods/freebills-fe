import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid, Switch,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import React, { ReactNode, useCallback } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { InputFormik } from "../../Form/input";
import { useCreateAccount } from "../../../hooks/accounts/useCreateAccount";
import { useMe } from "../../../hooks/users/useMe";

const createAddressValidationSchema = yup.object().shape({
  amount: yup.number().required('Valor Obrigatório.'),
  description: yup.string().required('Descrição Obrigatória.'),
  accountType: yup.string().required('Tipo da conta obrigatória.'),
  bankType: yup.string().required('Tipo do banco obrigatório.')
});

const initialValues = {
  amount: '',
  description: '',
  accountType: '',
  bankType: '',
  dashboard: false
}

interface ModalTypes {
  onOk?: () => void;
  onCancel?: () => void;
  trigger: (onOpen?: () => void, onClose?: () => void) => ReactNode;
  text?: string;
  userId?: number;
}

export function NewAccountModal({onCancel, trigger}: ModalTypes) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const createAccount = useCreateAccount();
  const { data: user } = useMe();
  const userId = user?.id;


  const handleOk = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleUpdateAddress = async (values) => {
    handleOk()
    console.log("id nulo porra")
  };

  const handleCreateAddress = (values) => {
    createAccount.mutate({
      ...values, userId
    });
    handleOk()
  }

  const handleCancel = useCallback(() => {
    onCancel?.();
    onClose();
  }, [onClose, onCancel])

  return (
    <>
      {trigger(onOpen, onClose)}
      <Modal
        onClose={handleCancel}
        isOpen={isOpen}
        isCentered
        size="xl"
      >
        <ModalOverlay backdropFilter='blur(1px)' />
        <ModalContent bg="white">
          <Formik initialValues={initialValues}
                  onSubmit={handleCreateAddress}
                  validationSchema={createAddressValidationSchema}
                  validateOnChange={false}
          >
            {({handleSubmit, handleChange, values, isSubmitting, errors}) =>
              <>
                <form onSubmit={handleSubmit}>
                  <ModalHeader fontSize="25px" fontWeight="bold">Adicionar Nova Conta</ModalHeader>
                  <Center>
                    <Divider maxW="550" borderColor="gray.700" />
                  </Center>
                  <ModalCloseButton />
                  <ModalBody justifyContent="center">
                    <Box flex={1} borderRadius={8} bg="white" pt={5} pl={5} pr={5} pb={8}>
                      <VStack spacing={8}>
                        <SimpleGrid minChildWidth="auto" spacing={5} w="100%">
                          <InputFormik label="Valor"
                                       name="amount"
                                       type="text"
                                       onChange={handleChange}
                                       value={values.amount}
                                       error={errors.amount}
                          />
                          <InputFormik label="Descrição"
                                       name="description"
                                       type="text"
                                       onChange={handleChange}
                                       value={values.description}
                                       error={errors.description}
                          />
                          <InputFormik label="Tipo da Conta"
                                       name="accountType"
                                       type="text"
                                       onChange={handleChange}
                                       value={values.accountType}
                                       error={errors.accountType}
                          />
                          <InputFormik label="Banco"
                                       name="bankType"
                                       type="text"
                                       onChange={handleChange}
                                       value={values.bankType}
                                       error={errors.bankType}
                          />
                          <Switch id="dashboard"
                                  name="dashboard"
                                  isChecked={values.dashboard}
                                  onChange={handleChange}
                          />
                        </SimpleGrid>
                      </VStack>
                    </Box>
                  </ModalBody>
                  <ModalFooter>
                    <HStack spacing={2}>
                      <Button isLoading={isSubmitting} colorScheme="blue" type="submit">Salvar</Button>
                    </HStack>
                  </ModalFooter>
                </form>
              </>
            }
          </Formik>
        </ModalContent>
      </Modal>
    </>
  )
}
