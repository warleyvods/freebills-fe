import {
  Box,
  Button,
  Center,
  Divider,
  FormLabel,
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
  Switch,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import React, { ReactNode, useCallback } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { InputFormik } from "../../Form/input";
import { useCreateAccount } from "../../../hooks/accounts/useCreateAccount";
import { useMe } from "../../../hooks/users/useMe";
import { InfoIcon } from "@chakra-ui/icons";
import { useAccountById } from "../../../hooks/accounts/useAccountById";
import { useUpdateAccount } from "../../../hooks/accounts/useUpdateAccount";
import InputMoney from "../../Form/MoneyInput";
import { SelectFormik } from "../../Form/SelectInput";

const createAddressValidationSchema = yup.object().shape({
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
  accountId?: number;
  onOk?: () => void;
  onCancel?: () => void;
  trigger: (onOpen?: () => void, onClose?: () => void) => ReactNode;
  text?: string;
  userId?: number;
}

export function NewAccountModal({onCancel, trigger, text, accountId}: ModalTypes) {
  const mainColor = useColorModeValue('white', 'gray.800');
  const inverseMainColor = useColorModeValue('gray.800', 'white');
  const selectBgColor = useColorModeValue('gray.10', 'gray.900');
  const {isOpen, onOpen, onClose} = useDisclosure();
  const createAccount = useCreateAccount();
  const {data: accountFound} = useAccountById(accountId);
  const updateAccount = useUpdateAccount();
  const {data: user} = useMe();
  const userId = user?.id;

  const handleOk = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleUpdateAccount = async (values) => {
    await updateAccount.mutate({
      accountId, ...values
    })
    handleOk()
  };

  const handleCreateAccount = (values) => {
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
        size={{ base: "md", md: "md", lg: "lg" }}
      >
        <ModalOverlay backdropFilter='blur(3px)' />
        <ModalContent bg={mainColor}>
          <Formik initialValues={accountFound || initialValues}
                  onSubmit={!!accountId ? handleUpdateAccount : handleCreateAccount}
                  validationSchema={createAddressValidationSchema}
                  validateOnChange={false}
          >
            {({handleSubmit, handleChange, values, isSubmitting, errors, setFieldValue}) =>
              <>
                <form onSubmit={handleSubmit}>
                  <ModalHeader fontSize="25px" fontWeight="bold">{text} Conta</ModalHeader>
                  <Center>
                    <Divider maxW="550" borderColor="gray.700" />
                  </Center>
                  <ModalCloseButton />
                  <ModalBody justifyContent={"end"}>
                    <Box flex={1} color={inverseMainColor} borderRadius={8} pt={5} pl={"5px"} pr={"5px"} pb={8}>
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
                          <InputFormik label={"Descrição"}
                                       name={"description"}
                                       important={"*"}
                                       type={"text"}
                                       onChange={handleChange}
                                       value={values.description}
                                       error={errors.description}
                          />
                          <SelectFormik
                            label="Tipo da Conta"
                            name="accountType"
                            error={errors.accountType}
                            value={values.accountType}
                            onChange={handleChange}
                            important={"*"}
                            options={[
                              { value: 'CHECKING_ACCOUNT', label: 'Conta Corrente' },
                              { value: 'SAVINGS', label: 'Poupança' },
                              { value: 'MONEY', label: 'Dinheiro' },
                              { value: 'INVESTMENTS', label: 'Investimento' },
                              { value: 'OTHERS', label: 'Outros' },
                            ]}
                          />

                          <SelectFormik
                            label="Instituição Financeira"
                            name="bankType"
                            error={errors.bankType}
                            value={values.bankType}
                            onChange={handleChange}
                            important={"*"}
                            options={[
                              { value: 'INTER', label: 'Banco Inter' },
                              { value: 'NUBANK', label: 'Nubank' },
                              { value: 'CAIXA', label: 'Caixa' },
                              { value: 'SANTANDER', label: 'Santander' },
                              { value: 'BRADESCO', label: 'Bradesco' },
                              { value: 'BB', label: 'Banco do Brasil' },
                              { value: 'ITAU', label: 'Itau' },
                              { value: 'SICOOB', label: 'Sicoob' },
                              { value: 'OTHERS', label: 'Outros' },
                            ]}
                          />

                          <LightMode>
                            <HStack justify={"space-between"} mt={3} alignItems={"baseline"}>
                              <HStack justify={"space-between"} alignItems={"baseline"} spacing={"1px"}>
                                <FormLabel htmlFor='dashboard'>Adicionar no dashboard</FormLabel>
                                <Tooltip
                                  label='Ao marcar esta opção o valor dessa conta corrente irá somar e aparecer no dashboard.'
                                  placement='auto-start'>
                                  <InfoIcon w={4} h={4} />
                                </Tooltip>
                              </HStack>
                              <Switch id="dashboard"
                                      name="dashboard"
                                      isChecked={values.dashboard}
                                      onChange={handleChange}
                              />
                            </HStack>
                          </LightMode>
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
