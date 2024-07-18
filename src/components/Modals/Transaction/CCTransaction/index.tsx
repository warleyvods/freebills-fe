import {
  Button,
  HStack,
  LightMode,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
  VStack
} from '@chakra-ui/react'
import React, { ReactNode, useCallback } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import InputMoney from "../../../Form/MoneyInput";
import { InputFormik } from "../../../Form/input";
import { useCategories } from "../../../../hooks/category/useCategories";
import { SelectFormik } from "../../../Form/SelectInput";
import { useCreditCards } from "../../../../hooks/cards/useCreditCards";
import { ptBR } from "date-fns/locale/pt-BR";
import { format, isPast } from "date-fns";
import { CCTransaction } from "../../../../hooks/cc-transactions/type";
import { useCreateCCTransaction } from "../../../../hooks/cc-transactions/useCreateCCTransaction";
import { useUpdateCCTransaction } from "../../../../hooks/cc-transactions/useUpdateCCTransaction";
import { useCCTransactionById } from "../../../../hooks/cc-transactions/useCCTransactionById";


const ccTransactionSchema = yup.object().shape({
  amount: yup.number().required('Valor obrigatório.'),
  date: yup.string().required('Data obrigatória.'),
  description: yup.string().required('Descrição obrigatória.'),
  categoryId: yup.string().required('Categoria obrigatória.'),
  creditCardId: yup.string().required('Cartão obrigatório.'),
  expirationDate: yup.string().required('Dt. fechamento obrigatório.'),
});

const initialValues = {
  amount: 0,
  date: new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }),
  description: '',
  creditCardId: '',
  categoryId: '',
  expirationDate: ''
}

interface ModalTypes {
  ccTransactionId?: number;
  ccId?: number;
  onOk?: () => void;
  onCancel?: () => void;
  trigger: (onOpen?: () => void, onClose?: () => void) => ReactNode;
  edit?: boolean;
}

export function NewCCTransactionModal({onCancel, trigger, ccTransactionId, ccId, edit}: ModalTypes) {
  const mainColor = useColorModeValue('white', 'gray.800');
  const {isOpen, onOpen, onClose} = useDisclosure();
  const createCcTransaction = useCreateCCTransaction();
  const updateCcTransaction = useUpdateCCTransaction();
  const {data: findCcTransaction, isLoading: isLoadingCcTransaction } = useCCTransactionById(ccTransactionId);
  const {data: categories, isLoading: isCategoryLoading} = useCategories();
  const {data: creditCards, isLoading: isLoadingCreditCards} = useCreditCards(false);

  function handleCreateCCTransaction(values: CCTransaction) {
    createCcTransaction.mutate(values);
    handleOk();
  }

  function handleUpdateCCTransaction(values: CCTransaction) {
    updateCcTransaction.mutate(values);
    handleOk();
  }

  const handleOk = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleCancel = useCallback(() => {
    onCancel?.();
    onClose();
  }, [onClose, onCancel])

  const categoriesOptions = categories?.content
    ?.map(category => ({
      value: category.id.toString(),
      label: category.name,
    }));

  const creditCardOptions = creditCards?.map(cc => ({
    value: cc.id.toString(),
    label: cc.description,
  }));

  const expirationDates = creditCards
    ?.filter(cc => cc.id === ccId)
    ?.flatMap(cc => {
      const today = new Date();
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();
      const expirationDay = cc.expirationDay;

      return Array.from({ length: 4 }, (_, i) => {
        const expirationDate = new Date(currentYear, currentMonth + i, Number(expirationDay));
        if (isPast(expirationDate)) {
          return null;
        }
        const value = format(expirationDate, 'dd-MM-yyyy');
        const label = format(expirationDate, 'dd MMMM yyyy', { locale: ptBR });
        return { value, label };
      }).filter(Boolean);
    });

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
            initialValues={edit ? findCcTransaction : initialValues }
            onSubmit={edit ? handleUpdateCCTransaction : handleCreateCCTransaction}
            validationSchema={ccTransactionSchema}
            validateOnChange={false}
          >
            {({handleSubmit, handleChange, values, isSubmitting, errors, setFieldValue}) =>
              <>
                <form onSubmit={handleSubmit}>
                  <ModalHeader bg={"white"}
                               fontSize="20px"
                               fontWeight="medium">
                    Adicionar Transação
                  </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody justifyContent="center" p={{base: "15px", md: "24px"}}>
                    <VStack>
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
                      <InputFormik
                        label={"Data"}
                        important={"*"}
                        placeholder="Data"
                        mask={"99/99/9999"}
                        name="date"
                        type="text"
                        onChange={handleChange}
                        value={values.date}
                        error={errors.date}
                      />
                      <InputFormik
                        label={"Descrição"}
                        important={"*"}
                        placeholder={"Descrição"}
                        name="description"
                        type="text"
                        onChange={handleChange}
                        value={values.description}
                        error={errors.description}
                      />
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
                      <SelectFormik
                        label="Selecione um Cartão"
                        name="creditCardId"
                        error={errors.creditCardId}
                        value={values.creditCardId}
                        onChange={handleChange}
                        important={"*"}
                        options={creditCardOptions}
                        showDefaultOption={true}
                      />
                      <SelectFormik
                        label="Dt. Fechamento"
                        name="expirationDate"
                        error={errors.expirationDate}
                        value={values.expirationDate}
                        onChange={handleChange}
                        important={"*"}
                        options={expirationDates}
                        showDefaultOption={true}
                      />
                    </VStack>
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
