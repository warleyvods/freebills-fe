import React, { ReactNode, useCallback } from "react";
import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  LightMode,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import InputMoney from "../../Form/MoneyInput";
import { Formik } from "formik";
import { useAccounts } from "../../../hooks/accounts/useAccounts";
import { SelectFormik } from "../../Form/SelectInput";
import { InputFormik } from "../../Form/input";
import { useCreateTransfer } from "../../../hooks/transfer/useCreateTransfer";
import { Transfer } from "../../../hooks/transfer/type";
import { useTransferById } from "../../../hooks/transfer/useTransferById";
import { useUpdateTransfer } from "../../../hooks/transfer/useUpdateTransfer";
import * as yup from "yup";

interface ModalTypes {
  transferId?: number;
  onOk?: () => void;
  onCancel?: () => void;
  trigger: (onOpen?: () => void, onClose?: () => void) => ReactNode;
}

const initialValues = {
  amount: 0,
  date: '',
  fromAccountId: '',
  toAccountId: '',
  observation: ''
}

const transferSchema = yup.object().shape({
  date: yup.string().required('Data obrigatório'),
  fromAccountId: yup.string().required('Conta de origem obrigatória'),
  toAccountId: yup.string().required('Conta de destino obrigatória'),
})

export function NewTransferModal({onCancel, trigger, transferId}: ModalTypes) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {data: accounts, isLoading: isAccountLoading} = useAccounts();
  const {data: foundTransfer, isLoading: isLoadingTransfer} = useTransferById(transferId);
  const createTransfer = useCreateTransfer();
  const updateTransfer = useUpdateTransfer();

  const handleCancel = useCallback(() => {
    onCancel?.();
    onClose();
  }, [onClose, onCancel])

  const handleOk = useCallback(() => {
    onClose();
  }, [onClose])

  const handleCreateTransfer = (values: Transfer) => {
    createTransfer.mutate(values);
    handleOk();
  }

  const handleUpdateTransfer = (values: Transfer) => {
    updateTransfer.mutate({...values});
    handleOk();
  }

  if (isAccountLoading) {
    return null;
  }

  const accountOptions = accounts?.map((acc) => ({
    value: acc.id.toString(),
    label: acc.description,
  }));

  const handleChangeAccount = (setFieldValue, values, field, value) => {
    setFieldValue(field, value);
    if (field === "fromAccountId") {
      setFieldValue("toAccountId", values.toAccountId === value ? "" : values.toAccountId);
    } else {
      setFieldValue("fromAccountId", values.fromAccountId === value ? "" : values.fromAccountId);
    }
  };

  const accountOptionsWithDisabled = (selectedAccountId) =>
    accountOptions?.map(option => ({
      ...option,
      isDisabled: option.value === selectedAccountId,
    }));

  return (
    <>
      {trigger(onOpen, onClose)}
      <Modal onClose={handleCancel}
             isOpen={isOpen}
             isCentered
             size={{base: "md", md: "md", lg: "lg"}}
      >
        <ModalOverlay backdropFilter='blur(3px)' />
        <ModalContent>
          <Formik initialValues={foundTransfer || initialValues}
                  onSubmit={!!transferId ? handleUpdateTransfer : handleCreateTransfer}
                  validationSchema={transferSchema}
                  validateOnChange={false}
          >
            {({handleSubmit, handleChange, values, isSubmitting, errors, setFieldValue}) =>
              <>
                <form onSubmit={handleSubmit}>
                  <ModalHeader fontSize="20px"
                               fontWeight="medium">{!!transferId ? 'Editar' : 'Criar'} transferência</ModalHeader>
                  <ModalCloseButton />
                  <Center>
                    <Divider maxW="550" borderColor="gray.150" />
                  </Center>
                  <ModalBody justifyContent={"end"}>
                    <Box flex={1} borderRadius={8} pt={5} pl={"5px"} pr={"5px"} pb={8}>
                      <VStack spacing={8}>
                        <SimpleGrid minChildWidth="auto" spacing={5} w="100%">
                          <InputMoney
                            onChange={(value) => {
                              setFieldValue("amount", value);
                            }}
                            value={values.amount}
                            name={"amount"}
                            error={errors.amount}
                            label={"Valor"}
                            fontSize={"1rem"}
                            fontWeight={"medium"}
                            important={true}
                          />
                          <InputFormik
                            label={"Data"}
                            important={"*"}
                            mask={"99/99/9999"}
                            name="date"
                            type="text"
                            onChange={handleChange}
                            value={values.date}
                            error={errors.date}
                          />
                          <SelectFormik
                            label="Conta de origem"
                            name="fromAccountId"
                            error={errors.fromAccountId}
                            value={values.fromAccountId}
                            //@ts-ignore
                            onChange={(e) => handleChangeAccount(setFieldValue, values, "fromAccountId", e.target.value)}
                            important={"*"}
                            options={accountOptionsWithDisabled(values.toAccountId)}
                            showDefaultOption={true}
                          />
                          <SelectFormik
                            label="Conta de destino"
                            name="toAccountId"
                            error={errors.toAccountId}
                            value={values.toAccountId}
                            //@ts-ignore
                            onChange={(e) => handleChangeAccount(setFieldValue, values, "toAccountId", e.target.value)}
                            important={"*"}
                            options={accountOptionsWithDisabled(values.fromAccountId)}
                            showDefaultOption={true}
                          />
                          <InputFormik
                            label={"Observações"}
                            name="observation"
                            type="text"
                            onChange={handleChange}
                            value={values.observation}
                            error={errors.observation}
                          />
                        </SimpleGrid>
                      </VStack>
                    </Box>
                  </ModalBody>
                  <ModalFooter>
                    <HStack spacing={2}>
                      <LightMode>
                        <Button variant={"cancel"} onClick={handleCancel}>Cancelar</Button>
                        <Button size={"sm"} isLoading={isSubmitting} variant={"default"} type="submit">Salvar</Button>
                      </LightMode>
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
