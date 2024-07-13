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
  VStack,
} from '@chakra-ui/react'
import React, { ReactNode, useCallback } from "react";
import { Formik } from "formik";
import { InputFormik } from "../../Form/input";
import { useCreateCreditCard } from "../../../hooks/cards/useCreateCreditCard";
import { useCreditCardById } from "../../../hooks/cards/useCreditCardById";
import { useUpdateCreditCard } from "../../../hooks/cards/useUpdateCreditCard";
import { useAccounts } from "../../../hooks/accounts/useAccounts";
import { SelectFormik } from "../../Form/SelectInput";
import InputMoney from "../../Form/MoneyInput";
import { CreditCard } from "../../../hooks/cards/type";

const initialValues = {
  accountId: '',
  cardLimit: 0,
  description: '',
  cardFlag: '',
  expirationDay: '',
  closingDay: ''
}

interface ModalTypes {
  accountId?: number;
  onOk?: () => void;
  onCancel?: () => void;
  trigger: (onOpen?: () => void, onClose?: () => void) => ReactNode;
  text?: string;
  ccId?: number;
}

export function NewCreditCard({onCancel, trigger, text, ccId}: ModalTypes) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {data: accounts, isLoading: isLoadingAccount} = useAccounts();
  const {data: ccFound, isLoading: ccIsLoading} = useCreditCardById(ccId);
  const createCreditCard = useCreateCreditCard();
  const updateCreditCard = useUpdateCreditCard();

  const handleOk = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleUpdateCreditCard = async (values) => {
    // await updateCreditCard.mutate({
    //   ccId, ...values
    // })
    // handleOk()
  };

  const handleCreateCreditCard = (values: CreditCard) => {
    createCreditCard.mutate({...values})
    handleOk();
  };

  const handleCancel = useCallback(() => {
    onCancel?.();
    onClose();
  }, [onClose, onCancel])

  if (isLoadingAccount && ccIsLoading) {
    return null;
  }

  const accountOptions = accounts?.map((acc) => ({
    value: acc.id.toString(),
    label: acc.description,
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
          <Formik initialValues={initialValues}
                  onSubmit={handleCreateCreditCard}
            // validationSchema={categorySchema}
                  validateOnChange={false}
          >
            {({handleSubmit, handleChange, values, isSubmitting, errors, setFieldValue, setFieldTouched, touched}) =>
              <>
                <form onSubmit={handleSubmit}>
                  <ModalHeader fontSize="20px"
                               fontWeight="medium">{text === 'edit' ? "Editar" : "Adicionar"} Cartão de Crédito
                  </ModalHeader>
                  <ModalCloseButton />
                  <Center>
                    <Divider maxW="550" borderColor="gray.150" />
                  </Center>
                  <ModalBody justifyContent={"end"} flexWrap={"wrap"}>
                    <Box flex={1} borderRadius={8} pt={5} pl={"5px"} pr={"5px"} pb={8}>
                      <VStack spacing={8}>
                        <SimpleGrid minChildWidth="auto" spacing={5} w="100%">
                          <InputMoney
                            onChange={(value) => {
                              setFieldValue("cardLimit", value);
                            }}
                            value={values.cardLimit}
                            name={"amount"}
                            error={errors.cardLimit}
                            label={"Limite"}
                            fontSize={{base: "0.9rem", md: "1rem"}}
                            fontWeight={"medium"}
                            important={true}
                          />
                          <InputFormik
                            label={"Descrição"}
                            important={"*"}
                            name="description"
                            type="text"
                            onChange={handleChange}
                            value={values.description}
                            error={errors.description}
                          />
                          <SelectFormik
                            label="Bandeira"
                            name="cardFlag"
                            error={errors.cardFlag}
                            value={values.cardFlag}
                            onChange={handleChange}
                            important={"*"}
                            showDefaultOption={true}
                            options={[
                              {value: 'VISA', label: 'Visa'},
                              {value: 'MASTERCARD', label: 'Mastercard'}
                            ]}
                          />
                          <SelectFormik
                            label="Tipo da Conta"
                            name="accountId"
                            error={errors.accountId}
                            value={values.accountId}
                            onChange={handleChange}
                            important={"*"}
                            options={accountOptions}
                            showDefaultOption={true}
                          />
                          <SelectFormik
                            label="Dia do fechamento"
                            name="closingDay"
                            error={errors.closingDay}
                            value={values.closingDay}
                            onChange={handleChange}
                            important={"*"}
                            showDefaultOption={true}
                            options={Array.from({length: 31}, (_, i) => ({value: `${i + 1}`, label: `${i + 1}`}))}
                          />
                          <SelectFormik
                            label="Dia do vencimento"
                            name="expirationDay"
                            error={errors.expirationDay}
                            value={values.expirationDay}
                            onChange={handleChange}
                            important={"*"}
                            showDefaultOption={true}
                            options={Array.from({length: 31}, (_, i) => ({value: `${i + 1}`, label: `${i + 1}`}))}
                          />
                        </SimpleGrid>
                      </VStack>
                    </Box>
                  </ModalBody>
                  <ModalFooter>
                    <HStack spacing={2}>
                      <LightMode>
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
