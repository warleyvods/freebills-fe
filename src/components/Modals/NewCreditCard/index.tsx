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
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import React, { ReactNode, useCallback } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { InputFormik } from "../../Form/input";
import { useMe } from "../../../hooks/users/useMe";
import MaskMoney from "../../Form/MaskMoney";
import { useCreateCreditCard } from "../../../hooks/cards/useCreateCreditCard";
import { useCreditCardById } from "../../../hooks/cards/useCreditCardById";
import { useUpdateCreditCard } from "../../../hooks/cards/useUpdateCreditCard";
import { useAccounts } from "../../../hooks/accounts/useAccounts";

const createAddressValidationSchema = yup.object().shape({
  description: yup.string().required('Descrição Obrigatória.'),
  accountType: yup.string().required('Tipo da conta obrigatória.'),
  bankType: yup.string().required('Tipo do banco obrigatório.')
});

const initialValues = {
  accountId: '',
  cardLimit: '',
  description: '',
  cardFlag: 'VISA',
  expirationDay: '1',
  closingDay: '1'
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
  const mainColor = useColorModeValue('white', 'gray.800');
  const inverseMainColor = useColorModeValue('gray.800', 'white');
  const selectBgColor = useColorModeValue('gray.10', 'gray.900');
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {data: accounts} = useAccounts();
  const createCC = useCreateCreditCard();
  const {data: ccFound} = useCreditCardById(ccId);
  const updateCreditCard = useUpdateCreditCard();
  const {data: user} = useMe();

  const handleOk = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleUpdateCreditCard = async (values) => {
    await updateCreditCard.mutate({
      ccId, ...values
    })
    handleOk()
  };

  const handleCreateCreditCard = (values) => {
    createCC.mutate({
      ...values
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
          <Formik initialValues={ccFound || initialValues}
                  onSubmit={!!ccId ? handleUpdateCreditCard : handleCreateCreditCard}
                  // validationSchema={createAddressValidationSchema}
                  validateOnChange={false}
          >
            {({handleSubmit, handleChange, values, isSubmitting, errors, setFieldValue}) =>
              <>
                <form onSubmit={handleSubmit}>
                  <ModalHeader fontSize="25px" fontWeight="bold">{text} Cartão</ModalHeader>
                  <Center>
                    <Divider maxW="550" borderColor="gray.700" />
                  </Center>
                  <ModalCloseButton />
                  <ModalBody justifyContent="center">
                    <Box flex={1} color={inverseMainColor} borderRadius={8} pt={5} pl={5} pr={5} pb={8}>
                      <VStack spacing={8}>
                        <SimpleGrid minChildWidth="auto" spacing={5} w="100%">

                          <FormControl>
                            <FormLabel htmlFor='accountType'>Limite <span
                              style={{color: "red"}}>*</span></FormLabel>
                            <MaskMoney
                              onChange={(value) => {
                                setFieldValue("cardLimit", value);
                              }}
                              value={values.cardLimit}
                              name={"cardLimit"} />
                          </FormControl>

                          <InputFormik placeholder={"Descrição"}
                                       important={"*"}
                                       name="description"
                                       type="text"
                                       onChange={handleChange}
                                       value={values.description}
                                       error={errors.description}
                          />
                          <FormControl>
                            <FormLabel htmlFor='accountType'>Bandeira <span
                              style={{color: "red"}}>*</span></FormLabel>
                            <Select id={"cardFlag"}
                                    name={"cardFlag"}
                                    value={values.cardFlag}
                                    onChange={handleChange}
                                    bg={selectBgColor}
                            >
                              <option value='VISA'>Visa</option>
                              <option value='MASTERCARD'>MasterCard</option>
                            </Select>
                          </FormControl>

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

                          <FormControl>
                            <FormLabel htmlFor='accountType'>Dia de fechamento <span
                              style={{color: "red"}}>*</span></FormLabel>
                            <Select id={"closingDay"}
                                    name={"closingDay"}
                                    value={values.closingDay}
                                    onChange={handleChange}
                                    bg={selectBgColor}
                            >
                              <option value='1'>1</option>
                              <option value='2'>2</option>
                              <option value='3'>3</option>
                              <option value='4'>4</option>
                              <option value='5'>5</option>
                              <option value='6'>6</option>
                              <option value='7'>7</option>
                              <option value='8'>8</option>
                              <option value='9'>9</option>
                              <option value='10'>10</option>
                              <option value='11'>11</option>
                              <option value='12'>12</option>
                              <option value='13'>13</option>
                              <option value='14'>14</option>
                              <option value='15'>15</option>
                              <option value='16'>16</option>
                              <option value='17'>17</option>
                              <option value='18'>18</option>
                              <option value='19'>19</option>
                              <option value='20'>20</option>
                              <option value='21'>21</option>
                              <option value='22'>22</option>
                              <option value='23'>23</option>
                              <option value='24'>24</option>
                              <option value='25'>25</option>
                              <option value='26'>26</option>
                              <option value='27'>27</option>
                              <option value='28'>28</option>
                              <option value='29'>29</option>
                              <option value='30'>30</option>
                            </Select>
                          </FormControl>

                          <FormControl>
                            <FormLabel htmlFor='accountType'>Dia do vencimento <span
                              style={{color: "red"}}>*</span></FormLabel>
                            <Select id={"expirationDay"}
                                    name={"expirationDay"}
                                    value={values.expirationDay}
                                    onChange={handleChange}
                                    bg={selectBgColor}
                            >
                              <option value='1'>1</option>
                              <option value='2'>2</option>
                              <option value='3'>3</option>
                              <option value='4'>4</option>
                              <option value='5'>5</option>
                              <option value='6'>6</option>
                              <option value='7'>7</option>
                              <option value='8'>8</option>
                              <option value='9'>9</option>
                              <option value='10'>10</option>
                              <option value='11'>11</option>
                              <option value='12'>12</option>
                              <option value='13'>13</option>
                              <option value='14'>14</option>
                              <option value='15'>15</option>
                              <option value='16'>16</option>
                              <option value='17'>17</option>
                              <option value='18'>18</option>
                              <option value='19'>19</option>
                              <option value='20'>20</option>
                              <option value='21'>21</option>
                              <option value='22'>22</option>
                              <option value='23'>23</option>
                              <option value='24'>24</option>
                              <option value='25'>25</option>
                              <option value='26'>26</option>
                              <option value='27'>27</option>
                              <option value='28'>28</option>
                              <option value='29'>29</option>
                              <option value='30'>30</option>
                            </Select>
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
