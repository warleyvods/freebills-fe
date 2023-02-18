import {
  Box,
  Button,
  Center,
  Divider,
  FormControl,
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
  Select,
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
import MaskMoney from "../../Form/MaskMoney";

const createAddressValidationSchema = yup.object().shape({
  description: yup.string().required('Descrição Obrigatória.'),
  accountType: yup.string().required('Tipo da conta obrigatória.'),
  bankType: yup.string().required('Tipo do banco obrigatório.')
});

const initialValues = {
  amount: '',
  description: '',
  accountType: 'CHECKING_ACCOUNT',
  bankType: 'INTER',
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
        size="xl"
      >
        <ModalOverlay backdropFilter='blur(1px)' />
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
                  <ModalBody justifyContent="center">
                    <Box flex={1} color={inverseMainColor} borderRadius={8} pt={5} pl={5} pr={5} pb={8}>
                      <VStack spacing={8}>
                        <SimpleGrid minChildWidth="auto" spacing={5} w="100%">

                          <MaskMoney
                            onChange={(value) => {
                              setFieldValue("amount", value);
                            }}
                            value={values.amount}
                            name={"amount"} />

                          <InputFormik placeholder={"Descrição"}
                                       important={"*"}
                                       name="description"
                                       type="text"
                                       onChange={handleChange}
                                       value={values.description}
                                       error={errors.description}
                          />
                          <FormControl>
                            <FormLabel htmlFor='accountType'>Tipo da Conta <span
                              style={{color: "red"}}>*</span></FormLabel>
                            <Select id={"accountType"}
                                    name={"accountType"}
                                    value={values.accountType}
                                    onChange={handleChange}
                                    bg={selectBgColor}
                            >
                              <option value='CHECKING_ACCOUNT'>Conta Corrente</option>
                              <option value='SAVINGS'>Poupança</option>
                              <option value='MONEY'>Dinheiro</option>
                              <option value='INVESTMENTS'>Investimento</option>
                              <option value='OTHERS'>Outros</option>
                            </Select>
                          </FormControl>

                          <FormControl>
                            <FormLabel htmlFor='accountType'>Instituição Financeira <span
                              style={{color: "red"}}>*</span></FormLabel>
                            <Select id={"bankType"}
                                    name={"bankType"}
                                    value={values.bankType}
                                    onChange={handleChange}
                                    bg={selectBgColor}
                            >
                              <option value='INTER'>Banco Inter</option>
                              <option value='NUBANK'>Nubank</option>
                              <option value='CAIXA'>Caixa</option>
                              <option value='SANTANDER'>Santander</option>
                              <option value='BRADESCO'>Bradesco</option>
                              <option value='BB'>Banco do Brasil</option>
                              <option value='ITAU'>Itaú</option>
                              <option value='SICOOB'>Sicoob</option>
                              <option value='OTHERS'>Outros</option>
                            </Select>
                          </FormControl>

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
                        <Button isLoading={isSubmitting} colorScheme="blue" type="submit">Salvar</Button>
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
