import {
  Box,
  Button,
  LightMode,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import React, { ReactNode, useCallback } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useAccountById } from "../../../hooks/accounts/useAccountById";
import { useAdjustAmountAccount } from "../../../hooks/accounts/useAdjustAmountAccount";
import InputMoney from "../../Form/MoneyInput";
import CustomRadioButton from "../../Radios/CustomRadioButton";

const readjustSchema = yup.object().shape({
  amount: yup.string().required('Descrição Obrigatória.'),
  type: yup.string().required('Tipo da conta obrigatória.'),
});

interface ModalTypes {
  accountId: number;
  onOk?: () => void;
  onCancel?: () => void;
  trigger: (onOpen?: () => void, onClose?: () => void) => ReactNode;
  text?: string;
}

export function ReadjustmentAccountModal({onCancel, trigger, text, accountId}: ModalTypes) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const mainColor = useColorModeValue('white', 'gray.800');
  const inverseMainColor = useColorModeValue('gray.800', 'white');

  // const {data: accountFound} = useAccountById(accountId);
  const updateAmount = useAdjustAmountAccount();

  const handleOk = useCallback(() => {
    onClose();
  }, [onClose]);


  const handleUpdateAmountAccount = (values) => {
    updateAmount.mutate({...values, accountId})
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
        <ModalContent bg={mainColor} borderRadius={"5px"}>
          <Formik initialValues={{}}
                  onSubmit={handleUpdateAmountAccount}
                  validationSchema={readjustSchema}
                  validateOnChange={false}
          >
            {({handleSubmit, handleChange, values, isSubmitting, errors, setFieldValue, setFieldTouched, touched}) =>
              <>
                <form onSubmit={handleSubmit}>
                  <ModalHeader fontSize="20px" fontWeight="medium">Reajuste de saldo</ModalHeader>
                  <ModalCloseButton mt={2} />
                  <ModalBody justifyContent="center">
                    <Box flex={1} color={inverseMainColor} borderRadius={8} pt={2}>
                      <VStack spacing={8}>
                        <SimpleGrid minChildWidth="auto" spacing={5} w="100%">
                          <InputMoney
                            onChange={(value) => {
                              setFieldValue("amount", value);
                            }}
                            value={values.amount}
                            name={"amount"}
                            error={errors.amount}
                            fontSize={{base: "0.9rem", md: "1rem"}}
                            fontWeight={"medium"}
                            important={false}
                          />

                          <CustomRadioButton
                            value={"type"}
                            onChange={() => {
                              setFieldValue("type", "ADJUST");
                              setFieldTouched("type", false);
                            }}
                            hasError={errors.color && touched.color}
                          >
                            <VStack spacing={"20px"}>
                              <Text fontWeight={"medium"} fontSize={"15px"}>Criar Transação de Ajuste</Text>
                              <Text>Para ajustar seu saldo uma despesa de ajuste será criada.</Text>
                            </VStack>
                          </CustomRadioButton>

                          <CustomRadioButton
                            value={"type"}
                            onChange={() => {
                              setFieldValue("type", "MODIFY");
                              setFieldTouched("type", false);
                            }}
                            hasError={errors.color && touched.color}
                          >
                            <VStack spacing={"20px"}>
                              <Text fontWeight={"medium"} fontSize={"15px"}>Modificar Saldo Inicial</Text>
                              <Text fontWeight={"normal"} textAlign={"center"} fontSize={"13px"}>Essa opção altera
                                seu saldo inicial para reajustar seu saldo atual. Ao fazer isso, alguns dos seus saldos do final do mês serão impactados.
                              </Text>
                            </VStack>
                          </CustomRadioButton>

                        </SimpleGrid>
                      </VStack>
                    </Box>
                  </ModalBody>
                  <ModalFooter justifyContent={"space-between"} pl={"44px"} pr={"44px"}>
                    <LightMode>
                      <Button variant={"ghost"}
                              borderRadius={20} w={"150px"} isLoading={isSubmitting} colorScheme="blue"
                              onClick={handleCancel}>Cancelar</Button>
                    </LightMode>
                    <LightMode>
                      <Button borderRadius={20} w={"150px"} isLoading={isSubmitting} colorScheme="blue"
                              type="submit">Salvar</Button>
                    </LightMode>
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
