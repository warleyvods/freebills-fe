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
  Skeleton,
  Switch,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import React, { ReactNode, useEffect, useState } from "react";
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
import { useThemeColors } from "../../../hooks/useThemeColors";

const createAddressValidationSchema = yup.object().shape({
  description: yup.string().required('Descrição Obrigatória.'),
  accountType: yup.string().required('Tipo da conta obrigatória.'),
  bankType: yup.string().required('Tipo do banco obrigatório.')
});

const initialValues = {
  amount: 0,
  description: '',
  accountType: '',
  bankType: '',
  dashboard: false
};

const SkeletonLoader = ({borderColor}) => {
  return (
    <>
      <ModalHeader fontSize="20px" fontWeight="medium">
        <Box display="flex" alignItems="center" justifyContent="space-between" w="full">
          <Skeleton h={"35px"} w={"40%"} borderRadius={"5px"} />
          <Box display="flex" alignItems="center">
            <ModalCloseButton position="relative" right={0} top={0} />
          </Box>
        </Box>
      </ModalHeader>

      <Divider maxW="550" borderColor={borderColor} />
      <ModalBody justifyContent={"end"}>
        <Box flex={1} color={"white"} borderRadius={8} pt={5} pl={"5px"} pr={"5px"} pb={8}>
          <VStack spacing={8}>
            <SimpleGrid minChildWidth="auto" spacing={5} w="100%">
              <Skeleton h={"35px"} w={"full"} borderRadius={"5px"} />
              <Skeleton h={"35px"} w={"full"} borderRadius={"5px"} />
              <Skeleton h={"35px"} w={"full"} borderRadius={"5px"} />
              <Skeleton h={"35px"} w={"full"} borderRadius={"5px"} />
              <Skeleton h={"25px"} w={"50%"} mt={"25px"} />
            </SimpleGrid>
          </VStack>
        </Box>
      </ModalBody>
      <ModalFooter>
        <Skeleton h={"30px"} w={"18%"} borderRadius={"5px"} />
      </ModalFooter>
    </>
  )
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

const AccountForm = ({initialValues, onSubmit, edit}) => {
  const { secondBorderColor } = useThemeColors()

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={createAddressValidationSchema}
      validateOnChange={false}
    >
      {({handleSubmit, handleChange, values, isSubmitting, errors, setFieldValue}) => (
        <form onSubmit={handleSubmit}>
          <ModalHeader fontSize="20px" fontWeight="medium">{edit ? "Editar" : "Adicionar"} Conta</ModalHeader>
          <ModalCloseButton />
          <Center>
            <Divider maxW="550" borderColor={secondBorderColor} color={"red"} />
          </Center>
          <ModalBody justifyContent={"end"}>
            <Box flex={1} borderRadius={8} pt={5} pl={"5px"} pr={"5px"} pb={8}>
              <VStack spacing={8}>
                <SimpleGrid minChildWidth="auto" spacing={5} w="100%">
                  {!edit && (
                    <InputMoney
                      onChange={(value) => setFieldValue("amount", value)}
                      value={values.amount}
                      name={"amount"}
                      error={errors.amount}
                      label={"Valor"}
                      fontSize={"1rem"}
                      fontWeight={"medium"}
                      important={true}
                    />
                  )}
                  <InputFormik
                    label={"Descrição"}
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
                    showDefaultOption={true}
                    options={[
                      {value: 'CHECKING_ACCOUNT', label: 'Conta Corrente'},
                      {value: 'SAVINGS', label: 'Poupança'},
                      {value: 'MONEY', label: 'Dinheiro'},
                      {value: 'INVESTMENTS', label: 'Investimento'},
                      {value: 'OTHERS', label: 'Outros'},
                    ]}
                  />
                  <SelectFormik
                    label="Instituição Financeira"
                    name="bankType"
                    error={errors.bankType}
                    value={values.bankType}
                    onChange={handleChange}
                    important={"*"}
                    showDefaultOption={true}
                    options={[
                      {value: 'INTER', label: 'Banco Inter'},
                      {value: 'NUBANK', label: 'Nubank'},
                      {value: 'CAIXA', label: 'Caixa'},
                      {value: 'SANTANDER', label: 'Santander'},
                      {value: 'BRADESCO', label: 'Bradesco'},
                      {value: 'BB', label: 'Banco do Brasil'},
                      {value: 'ITAU', label: 'Itau'},
                      {value: 'SICOOB', label: 'Sicoob'},
                      {value: 'OTHERS', label: 'Outros'},
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
                      <Switch
                        id="dashboard"
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
      )}
    </Formik>
  );
};

interface ModalTypes {
  accountId?: number;
  onCancel?: () => void;
  trigger: (onOpen?: () => void, onClose?: () => void) => ReactNode;
  edit: boolean;
  userId?: number;
}

export function NewAccountModal({onCancel, trigger, edit, accountId}: ModalTypes) {
  const { bgColor, bgInverse, hover, borderColor } = useThemeColors()
  const {isOpen, onOpen, onClose} = useDisclosure();
  const createAccount = useCreateAccount();
  const updateAccount = useUpdateAccount();
  const {data: user} = useMe();
  const userId = user?.id;

  const {accountFound, isFetching} = useAccountData(accountId, isOpen);

  const handleUpdateAccount = async (values) => {
    updateAccount.mutate({accountId, ...values});
    handleOk();
  };

  const handleCreateAccount = (values) => {
    createAccount.mutate({...values, userId});
    handleOk();
  };

  const handleOk = () => onClose();

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  return (
    <>
      {trigger(onOpen, onClose)}
      <Modal
        onClose={handleCancel}
        isOpen={isOpen}
        isCentered
        size={{base: "md", md: "md", lg: "lg"}}
      >
        <ModalOverlay backdropFilter='blur(3px)' />
        <ModalContent bg={bgColor}>
          {isFetching ? (
            <SkeletonLoader borderColor={borderColor} />
          ) : (
            <AccountForm
              initialValues={accountFound || initialValues}
              onSubmit={edit ? handleUpdateAccount : handleCreateAccount}
              edit={edit}
            />
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
