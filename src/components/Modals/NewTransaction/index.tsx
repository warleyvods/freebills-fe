import {
  Box,
  Button,
  Center,
  Divider, FormControl, FormLabel,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, Select,
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
import { useCreateTransaction } from "../../../hooks/transactions/useCreateTransaction";
import { useAccounts } from "../../../hooks/accounts/useAccounts";

// const createAddressValidationSchema = yup.object().shape({
//   amount: yup.number().required('Valor Obrigatório.'),
//   date: yup.number().required('Valor Obrigatório.'),
//   description: yup.number().required('Valor Obrigatório.'),
//   transactionType: yup.number().required('Valor Obrigatório.'),
//   transactionCategory: yup.number().required('Valor Obrigatório.'),
// });

const initialValues = {
  amount: '',
  date: '',
  description: '',
  transactionType: '',
  transactionCategory: '',
  paid: false
}

interface ModalTypes {
  onOk?: () => void;
  onCancel?: () => void;
  trigger: (onOpen?: () => void, onClose?: () => void) => ReactNode;
  text?: string;
  userId?: number;
}

export function NewTransactionModal({onCancel, trigger}: ModalTypes) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const { data: user } = useMe();
  const userId = user?.id;
  const createTransaction = useCreateTransaction();
  const { data: accounts } = useAccounts(userId);


  const handleOk = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleUpdateAddress = async (values) => {
    handleOk()
  };

  const handleCreateAddress = (values) => {
    console.log(JSON.stringify(values))
    createTransaction.mutate({
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
                  // validationSchema={createAddressValidationSchema}
                  validateOnChange={false}
          >
            {({handleSubmit, handleChange, values, isSubmitting, errors}) =>
              <>
                <form onSubmit={handleSubmit}>
                  <ModalHeader fontSize="25px" fontWeight="bold">Adicionar Nova Transação</ModalHeader>
                  <Center>
                    <Divider maxW="550" borderColor="gray.700" />
                  </Center>
                  <ModalCloseButton />
                  <ModalBody justifyContent="center">
                    <Box flex={1} borderRadius={8} bg="white" pt={5} pl={5} pr={5} pb={8}>
                      <VStack spacing={8}>
                        <SimpleGrid minChildWidth="auto" spacing={5} w="100%">
                          <InputFormik placeholder="Valor"
                                       name="amount"
                                       type="text"
                                       onChange={handleChange}
                                       value={values.amount}
                                       error={errors.amount}
                          />
                          <InputFormik placeholder="Data"
                                       name="date"
                                       type="text"
                                       onChange={handleChange}
                                       value={values.date}
                                       error={errors.date}
                          />
                          <InputFormik placeholder={"Descrição"}
                                       name="description"
                                       type="text"
                                       onChange={handleChange}
                                       value={values.description}
                                       error={errors.description}
                          />

                          <Select placeholder={"Selecione uma Conta"}
                                  id={"accountId"}
                                  name={"accountId"}
                                  value={values.accountId}
                                  onChange={handleChange}
                          >
                            {accounts?.map((acc) => (
                              <option key={acc.id} value={acc.id}>{acc.description}</option>
                            ))}
                          </Select>

                          <Select placeholder={"Selecione uma Categoria"}
                                  id={"transactionCategory"}
                                  name={"transactionCategory"}
                                  value={values.transactionCategory}
                                  onChange={handleChange}>

                            <option value='HOUSE'>Casa</option>
                          </Select>

                          <Select placeholder={"Selecione um Tipo"}
                                  id={"transactionType"}
                                  name={"transactionType"}
                                  value={values.transactionType}
                                  onChange={handleChange}>

                            <option value='REVENUE'>Receita</option>
                            <option value='EXPENSE'>Despesa</option>
                          </Select>

                          <FormControl as={SimpleGrid} columns={{ base: 1, lg: 9 }}>
                          <FormLabel htmlFor='paid'>Pago</FormLabel>
                          <Switch
                            id="paid"
                                  name="paid"
                                  isChecked={values.paid}
                                  onChange={handleChange}
                          />
                          </FormControl>
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
