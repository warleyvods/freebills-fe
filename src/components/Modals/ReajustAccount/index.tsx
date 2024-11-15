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
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import React, { ReactNode, useEffect, useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useAdjustAmountAccount } from "../../../hooks/accounts/useAdjustAmountAccount";
import InputMoney from "../../Form/MoneyInput";
import CustomRadioButton from "../../Radios/CustomRadioButton";
import { useThemeColors } from "../../../hooks/useThemeColors";
import { useAccountById } from "../../../hooks/accounts/useAccountById";

const readjustSchema = yup.object().shape({
  amount: yup.string().required('Valor Obrigatória.'),
  type: yup.string().required('Tipo da conta obrigatória.'),
});

interface ModalTypes {
  accountId: number;
  onOk?: () => void;
  onCancel?: () => void;
  trigger: (onOpen?: () => void, onClose?: () => void) => ReactNode;
  text?: string;
}

const useAccountData = (accountId: number, isOpen: boolean) => {
  const [localAccountId, setLocalAccountId] = useState<number | null>(null);
  const {data: accountFound, isFetching, isLoading} = useAccountById(localAccountId);

  useEffect(() => {
    if (accountId && isOpen) {
      setLocalAccountId(accountId);
    }
  }, [accountId, isOpen]);

  return {accountFound, isFetching, isLoading, setLocalAccountId};
};

export function ReadjustmentAccountModal({onCancel, trigger, text, accountId}: ModalTypes) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {bgColor, bgInverse} = useThemeColors();
  const updateAmount = useAdjustAmountAccount();
  const {accountFound, isFetching} = useAccountData(accountId, isOpen);

  const handleUpdateAmountAccount = (values: any) => {
    updateAmount.mutate({...values, accountId})
    handleOk();
  }

  const handleOk = () => onClose();

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  if (isFetching) {
    return null;
  }

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
        <ModalContent bg={bgColor} borderRadius={"5px"}>
          <Formik initialValues={{amount: accountFound?.amount}}
                  onSubmit={handleUpdateAmountAccount}
                  validationSchema={readjustSchema}
                  validateOnChange={false}
          >
            {({handleSubmit, values, isSubmitting, errors, setFieldValue, setFieldTouched, touched}) =>
              <>
                <form onSubmit={handleSubmit}>
                  <ModalHeader fontSize="20px" fontWeight="medium">Reajuste de saldo</ModalHeader>
                  <ModalCloseButton mt={2} />
                  <ModalBody justifyContent="center">
                    <Box flex={1} color={bgInverse} borderRadius={8} pt={2}>
                      <VStack spacing={8}>
                        <SimpleGrid minChildWidth="auto" spacing={5} w="100%">
                          <InputMoney
                            onChange={(value) => {
                              setFieldValue("amount", value);
                            }}
                            value={values.amount}
                            name={"amount"}
                            error={errors.amount && touched.color}
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
                            hasError={errors.type && touched.type}
                          >
                            <VStack spacing={"10px"}>
                              <Text fontWeight={"medium"} fontSize={"15px"}>Criar Transação de Ajuste</Text>
                              <Text>Para ajustar seu saldo uma transação de ajuste será criada.</Text>
                            </VStack>
                          </CustomRadioButton>

                          <CustomRadioButton
                            value={"type"}
                            onChange={() => {
                              setFieldValue("type", "MODIFY");
                              setFieldTouched("type", false);
                            }}
                            hasError={errors.type && touched.type}
                          >
                            <VStack spacing={"10px"}>
                              <Text fontWeight={"medium"} fontSize={"15px"}>Modificar Saldo Inicial</Text>
                              <Text fontWeight={"normal"} textAlign={"center"} fontSize={"13px"}>Essa opção altera
                                seu saldo inicial para reajustar seu saldo atual. Ao fazer isso, alguns dos seus saldos
                                do final do mês serão impactados.
                              </Text>
                            </VStack>
                          </CustomRadioButton>
                        </SimpleGrid>
                      </VStack>
                    </Box>
                  </ModalBody>
                  <ModalFooter>
                    <LightMode>
                      <Button size={"sm"} isLoading={isSubmitting} variant={"default"} type="submit">Salvar</Button>
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
