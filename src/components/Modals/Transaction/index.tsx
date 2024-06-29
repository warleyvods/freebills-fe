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
  Text,
  SimpleGrid,
  Switch, useBreakpointValue,
  useColorModeValue,
  useDisclosure,
  VStack, Icon, Spinner
} from '@chakra-ui/react'
import React, { ReactNode, useCallback } from "react";
import { Formik } from "formik";
import { InputFormik } from "../../Form/input";
import { useMe } from "../../../hooks/users/useMe";
import { useCreateTransaction } from "../../../hooks/transactions/useCreateTransaction";
import { useAccounts } from "../../../hooks/accounts/useAccounts";
import { useTransactionById } from "../../../hooks/transactions/useTransactionById";
import { useUpdateTransaction } from "../../../hooks/transactions/useUpdateTransaction";
import * as yup from "yup";
import InputMoney from "../../Form/MoneyInput";
import { SelectFormik } from "../../Form/SelectInput";
import { useCategories } from "../../../hooks/category/useCategories";
import { NewAccountModal } from "../NewAccount";
import { RiAddLine } from "react-icons/ri";

const createTransactionSchema = yup.object().shape({
  amount: yup.number().required('Valor obrigatório.'),
  date: yup.string().required('Data obrigatória.'),
  description: yup.string().required('Descrição obrigatória.'),
  accountId: yup.string().required('Conta obrigatória.'),
  categoryId: yup.string().required('Categoria obrigatória.')
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

const revenueInitialValues = {
  amount: 0,
  date: new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }),
  description: '',
  transactionType: 'REVENUE',
  categoryId: '',
  paid: false,
  barCode: '',
  bankSlip: false,
  accountId: ''
}

const expenseInitialValues = {
  amount: 0,
  date: new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }),
  description: '',
  transactionType: 'EXPENSE',
  categoryId: '',
  paid: false,
  barCode: '',
  bankSlip: false,
  accountId: ''
}

const colorType = (transactionType: string): string => {
  if (transactionType === 'TRANSACTION') {
    return 'blue.400';
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
  edit?: boolean;
}

export function NewTransactionModal({onCancel, trigger, transactionType, transactionId, edit}: ModalTypes) {
  // const isMobile = useBreakpointValue({base: true, md: true, lg: false});
  const mainColor = useColorModeValue('white', 'gray.800');
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {data: user} = useMe();
  const userId = user?.id;
  const createTransaction = useCreateTransaction();
  const updateTransaction = useUpdateTransaction();
  const {data: accounts, isLoading: isAccountLoading} = useAccounts();
  const {data: categories, isLoading: isCategoryLoading} = useCategories();
  const color = colorType(transactionType);
  const category = categoryMap(transactionType);
  const {data: transactionFound} = useTransactionById(transactionId);

  const handleOk = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleUpdateTransaction = async (values) => {
    updateTransaction.mutate({
      ...values, id: transactionId
    });
    handleOk()
  };

  const handleCreateAddress = (values) => {
    createTransaction.mutate({...values, userId});
    handleOk()
  }

  const handleCancel = useCallback(() => {
    onCancel?.();
    onClose();
  }, [onClose, onCancel])

  const categoriesOptions = categories?.content
    ?.filter(category => category.categoryType === transactionType)
    ?.map(category => ({
      value: category.id.toString(),
      label: category.name,
    }));

  const accountOptions = accounts?.map((acc) => ({
    value: acc.id.toString(),
    label: acc.description,
  }));

  return (
    <>
      {trigger(onOpen, onClose)}
      <Modal
        onClose={handleCancel}
        isOpen={isOpen}
        isCentered
        size="lg"
      >
        <ModalOverlay backdropFilter='blur(3px)' />
        <ModalContent bg={mainColor} borderRadius={"10px"}>
          <Formik
            initialValues={transactionFound ? transactionFound : (transactionType === 'REVENUE' ? revenueInitialValues : expenseInitialValues)}
            onSubmit={!!transactionId ? handleUpdateTransaction : handleCreateAddress}
            validationSchema={createTransactionSchema}
            validateOnChange={false}
          >
            {({handleSubmit, handleChange, values, isSubmitting, errors, setFieldValue}) =>
              <>
                <form onSubmit={handleSubmit}>
                  <ModalHeader bg={color}
                               fontSize="25px"
                               fontWeight="medium">{!!transactionType && `${edit ? "Editar" : "Adicionar"} ${transactionType === 'REVENUE' ? 'receita' : 'despesa'}`}
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody justifyContent="center" p={{base: "15px", md: "24px"}}>
                    <Box flex={1} borderRadius={"5px"} bg={mainColor}>
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
                            fontSize={{base: "0.9rem", md: "1rem"}}
                            fontWeight={"medium"}
                            important={true}
                          />
                          <InputFormik label={"Data"}
                                       important={"*"}
                                       placeholder="Data"
                                       mask={"99/99/9999"}
                                       name="date"
                                       type="text"
                                       onChange={handleChange}
                                       value={values.date}
                                       error={errors.date}
                          />
                          <InputFormik label={"Descrição"}
                                       important={"*"}
                                       placeholder={"Descrição"}
                                       name="description"
                                       type="text"
                                       onChange={handleChange}
                                       value={values.description}
                                       error={errors.description}
                          />

                          {isAccountLoading ? (
                            <Spinner />
                          ) : (
                            <SelectFormik
                              label="Tipo da Conta"
                              name="accountId"
                              error={errors.accountId}
                              value={values.accountId}
                              onChange={handleChange}
                              important={"*"}
                              options={accountOptions}
                              showDefaultOption={true}
                              modal={
                                <NewAccountModal
                                  text={"Adicionar"}
                                  trigger={onOpen =>
                                    <LightMode>
                                      <Button size={"sm"}
                                              onClick={onOpen}
                                              fontSize={"sm"}
                                              variant={"default"}
                                              leftIcon={<Icon as={RiAddLine} fontSize={"20"} />}
                                      >Adicionar conta
                                      </Button>
                                    </LightMode>
                                  }
                                />
                              }
                            />
                          )}
                          <SelectFormik
                            label="Selecione uma Categoria"
                            name="categoryId"
                            error={errors.categoryId}
                            value={values.categoryId}
                            onChange={handleChange}
                            important={"*"}
                            options={categoriesOptions}
                            showDefaultOption={true}
                          />
                          {
                            edit ? (
                              <Select placeholder={"Selecione um Tipo"}
                                      id={"transactionType"}
                                      name={"transactionType"}
                                      value={values.transactionType}
                                      onChange={handleChange}>

                                <option value='REVENUE'>Receita</option>
                                <option value='EXPENSE'>Despesa</option>
                              </Select>
                            ) : null
                          }

                          {values.bankSlip ?
                            <HStack justify={"space-between"}>
                              <InputFormik id="barCode"
                                           placeholder="Código de Barras"
                                           type="barCode"
                                           name="barCode"
                                           value={values.barCode}
                                           onChange={handleChange}
                              />
                            </HStack>
                            : null
                          }

                          <HStack>
                            <Text fontSize={{base: "0.9rem", md: "1rem"}} fontWeight={"medium"}>Boleto</Text>
                            <Switch
                              id="bankSlip"
                              name="bankSlip"
                              isChecked={values.bankSlip}
                              onChange={handleChange}
                            />
                          </HStack>

                          <HStack>
                            <Text fontSize={{base: "0.9rem", md: "1rem"}} fontWeight={"medium"}>Pago</Text>
                            <Switch
                              id="paid"
                              name="paid"
                              isChecked={values.paid}
                              onChange={handleChange}
                            />
                          </HStack>


                        </SimpleGrid>
                      </VStack>
                    </Box>
                  </ModalBody>
                  <ModalFooter>
                    <HStack spacing={2}>
                      <LightMode>
                        <Button isLoading={isSubmitting} variant={"default"} type="submit">Salvar</Button>
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
