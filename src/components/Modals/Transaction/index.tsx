import {
  Box,
  Button,
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
  useColorModeValue,
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import React, { ReactNode, useCallback } from "react";
import { Formik } from "formik";
import { InputFormik } from "../../Form/input";
import { useMe } from "../../../hooks/users/useMe";
import { useCreateTransaction } from "../../../hooks/transactions/useCreateTransaction";
import { useAccounts } from "../../../hooks/accounts/useAccounts";
import { useTransactionById } from "../../../hooks/transactions/useTransactionById";
import { useUpdateTransaction } from "../../../hooks/transactions/useUpdateTransaction";
import NumberFormat from "react-number-format";
import * as yup from "yup";
import MaskMoney from "../../Form/MaskMoney";

const createTransactionSchema = yup.object().shape({
  // amount: yup.number().required('Valor Obrigatório.'),
  date: yup.string().required('Data Obrigatória.'),
  description: yup.string().required('Descrição Obrigatória.')
});

interface LinkItemProps {
  category: string;
  categoryName: string;
}

const allCategory: Array<LinkItemProps> = [
  {category: 'HOUSE', categoryName: 'Casa'},
  {category: 'EDUCATION', categoryName: 'Educação'},
  {category: 'ELECTRONIC', categoryName: 'Eletrônica'},
  {category: 'LEISURE', categoryName: 'Lazer'},
  {category: 'RESTAURANT', categoryName: 'Restaurante'},
  {category: 'HEALTH', categoryName: 'Saúde'},
  {category: 'SERVICE', categoryName: 'Serviço'},
  {category: 'SUPERMARKET', categoryName: 'Supermercado'},
  {category: 'TRANSPORT', categoryName: 'Transporte'},
  {category: 'CLOTHES', categoryName: 'Roupa'},
  {category: 'TRIPS', categoryName: 'Viagem'},
  {category: 'OTHERS', categoryName: 'Outros'},
  {category: 'AWARD', categoryName: 'Prêmio'},
  {category: 'GIFT', categoryName: 'Presente'},
  {category: 'SALARY', categoryName: 'Salário'},
];

const revenueCategory: Array<LinkItemProps> = [
  {category: 'AWARD', categoryName: 'Prêmio'},
  {category: 'GIFT', categoryName: 'Presente'},
  {category: 'SALARY', categoryName: 'Salário'},
  {category: 'OTHERS', categoryName: 'Outros'},
];

const expenseCategory: Array<LinkItemProps> = [
  {category: 'HOUSE', categoryName: 'Casa'},
  {category: 'EDUCATION', categoryName: 'Educação'},
  {category: 'ELECTRONIC', categoryName: 'Eletrônica'},
  {category: 'LEISURE', categoryName: 'Lazer'},
  {category: 'RESTAURANT', categoryName: 'Restaurante'},
  {category: 'HEALTH', categoryName: 'Saúde'},
  {category: 'SERVICE', categoryName: 'Serviço'},
  {category: 'SUPERMARKET', categoryName: 'Supermercado'},
  {category: 'TRANSPORT', categoryName: 'Transporte'},
  {category: 'CLOTHES', categoryName: 'Roupa'},
  {category: 'TRIPS', categoryName: 'Viagem'},
  {category: 'OTHERS', categoryName: 'Outros'},
];

export const category = {
  "HOUSE": "Casa",
  "EDUCATION": "Educação",
  "ELECTRONIC": "Eletrônica",
  "LEISURE": "Lazer",
  "RESTAURANT": "Restaurante",
  "HEALTH": "Saúde",
  "SERVICE": "Serviço",
  "SUPERMARKET": "Supermercado",
  "TRANSPORT": "Transporte",
  "CLOTHES": "Roupas",
  "TRIPS": "Viagens",
  "OTHERS": "Outros",
  "AWARD": "Prêmio",
  "GIFT": "Presente",
  "SALARY": "Salário"
}

const initialValues = {
  amount: 0,
  date: '',
  description: '',
  transactionType: '',
  transactionCategory: '',
  paid: false
}

const initialValuesRevenue = {
  amount: '',
  date: '',
  description: '',
  transactionType: '',
  transactionCategory: '',
  paid: false
}

const initialValuesExpense = {
  amount: '',
  date: '',
  description: '',
  transactionType: '',
  transactionCategory: '',
  paid: false
}


const colorType = (transactionType: string): string => {
  if (transactionType === 'TRANSACTION') {
    return 'blue.500';
  } else if (transactionType === 'REVENUE') {
    return 'green.500';
  } else {
    return 'red.500'
  }
}

const categoryMap = (transactionType: string) => {
  if (transactionType === 'TRANSACTION') {
    return allCategory
  } else if (transactionType === 'REVENUE') {
    return revenueCategory;
  } else {
    return expenseCategory;
  }
}

interface ModalTypes {
  transactionId?: number;
  onOk?: () => void;
  onCancel?: () => void;
  trigger: (onOpen?: () => void, onClose?: () => void) => ReactNode;
  text?: string;
  userId?: number;
  transactionType?: string;
}

export function NewTransactionModal({onCancel, trigger, transactionType, transactionId}: ModalTypes) {
  const mainColor = useColorModeValue('white', 'gray.800');
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {data: user} = useMe();
  const userId = user?.id;
  const createTransaction = useCreateTransaction();
  const updateTransaction = useUpdateTransaction();
  const {data: accounts} = useAccounts(userId);
  const color = colorType(transactionType);
  const category = categoryMap(transactionType);
  const {data: transactionFound} = useTransactionById(transactionId);

  const handleOk = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleUpdateTransaction = async (values) => {
    console.log("update")
    updateTransaction.mutate({
      ...values, id: transactionId
    });
    handleOk()
  };

  const handleCreateAddress = (values) => {
    console.log("create")
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
        <ModalContent bg={mainColor}>
          <Formik initialValues={transactionFound || initialValues}
                  onSubmit={!!transactionId ? handleUpdateTransaction : handleCreateAddress}
                  validationSchema={createTransactionSchema}
                  validateOnChange={false}
          >
            {({handleSubmit, handleChange, values, isSubmitting, errors, setFieldValue}) =>
              <>
                <form onSubmit={handleSubmit}>
                  <ModalHeader bg={color} fontSize="25px" fontWeight="bold">Adicionar Nova Transação</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody justifyContent="center">
                    <Box flex={1} borderRadius={8} bg={mainColor} pt={5} pl={5} pr={5} pb={8}>
                      <VStack spacing={8}>
                        <SimpleGrid minChildWidth="auto" spacing={5} w="100%">
                          <MaskMoney
                            onChange={(value) => {
                              setFieldValue("amount", value);
                            }}
                            value={values.amount}
                          />

                          <InputFormik placeholder="Data"
                                       mask={"99/99/9999"}
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

                            {category.map((cat) => (
                              <option key={cat.category} value={cat.category}>{cat.categoryName}</option>
                            ))}
                          </Select>

                          <Select placeholder={"Selecione um Tipo"}
                                  id={"transactionType"}
                                  name={"transactionType"}
                                  value={values.transactionType}
                                  onChange={handleChange}>

                            <option value='REVENUE'>Receita</option>
                            <option value='EXPENSE'>Despesa</option>
                          </Select>

                          <FormControl as={SimpleGrid} columns={{base: 1, lg: 9}}>
                            <FormLabel htmlFor='paid'>Pago</FormLabel>
                            <LightMode>
                              <Switch
                                id="paid"
                                name="paid"
                                isChecked={values.paid}
                                onChange={handleChange}
                              />
                            </LightMode>
                          </FormControl>
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
