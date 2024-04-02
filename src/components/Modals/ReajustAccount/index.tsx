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
  Radio,
  RadioGroup,
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
import MaskMoney from "../../Form/MaskMoney";
import { useAdjustAmountAccount } from "../../../hooks/accounts/useAdjustAmountAccount";

const createAddressValidationSchema = yup.object().shape({
  description: yup.string().required('Descrição Obrigatória.'),
  accountType: yup.string().required('Tipo da conta obrigatória.'),
  bankType: yup.string().required('Tipo do banco obrigatório.')
});

interface ModalTypes {
  accountId: number;
  onOk?: () => void;
  onCancel?: () => void;
  trigger: (onOpen?: () => void, onClose?: () => void) => ReactNode;
  text?: string;
}

export function ReadjustmentAccountModal({onCancel, trigger, text, accountId}: ModalTypes) {

  const mainColor = useColorModeValue('white', 'gray.800');
  const inverseMainColor = useColorModeValue('gray.800', 'white');
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {data: accountFound} = useAccountById(accountId);
  const updateAmount = useAdjustAmountAccount();

  const handleOk = useCallback(() => {
    onClose();
  }, [onClose]);


  const handleCreateAccount = (values) => {
    console.log(values)
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
        <ModalContent bg={mainColor} borderRadius={"25px"}>
          <Formik initialValues={{amount: accountFound?.amount, type: ''}}
                  onSubmit={handleCreateAccount}
            // validationSchema={createAddressValidationSchema}
                  validateOnChange={false}
          >
            {({handleSubmit, handleChange, values, isSubmitting, errors, setFieldValue}) =>
              <>
                <form onSubmit={handleSubmit}>
                  <ModalHeader fontSize="25px" fontWeight="bold">Reajuste de saldo</ModalHeader>
                  <ModalCloseButton mt={2} />
                  <ModalBody justifyContent="center">
                    <Box flex={1} color={inverseMainColor} borderRadius={8} pt={2}>
                      <VStack spacing={8}>
                        <SimpleGrid minChildWidth="auto" spacing={5} w="100%">
                          <MaskMoney
                            onChange={(value) => {
                              setFieldValue("amount", value);
                            }}
                            value={values.amount}
                           name={"amount"}/>
                          <RadioGroup defaultValue='1'>
                            <VStack border={"1px"} alignItems={"center"} borderRadius={"15px"} p={3}>
                              <VStack spacing={"2px"}>
                                <Text fontWeight={"bold"} fontSize={"15px"}>CRIAR TRANSAÇÃO DE AJUSTE</Text>
                                <Text fontWeight={"normal"} fontSize={"14px"} textAlign={"center"}>Para ajustar seu
                                  saldo uma despesa de
                                  ajuste será
                                  criada.
                                </Text>
                              </VStack>
                              <Radio value='ADJUST'
                                     id={"type"}
                                     name={"type"}
                                     onChange={(e) => setFieldValue(
                                       'type',
                                       // @ts-ignore
                                       e.target.checked)}
                                     isChecked={values.type}>
                              </Radio>
                            </VStack>
                            <VStack border={"1px"} alignItems={"center"} mt={2} borderRadius={"15px"} p={3}>
                              <VStack spacing={"2px"}>
                                <Text fontWeight={"bold"} fontSize={"15px"}>MODIFICAR SALDO INICIAL</Text>
                                <Text fontWeight={"normal"} textAlign={"center"} fontSize={"14px"}>Essa opção altera
                                  seu saldo inicial
                                  para reajustar seu saldo atual. Ao fazer isso, alguns dos seus saldos do final do
                                  mês
                                  serão impactados.
                                </Text>
                              </VStack>
                              <Radio value='NO-ADJUST'
                                     id={"type"}
                                     name={"type"}
                                     onChange={handleChange}
                                     isChecked={values.type}>
                              </Radio>
                            </VStack>
                          </RadioGroup>
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
