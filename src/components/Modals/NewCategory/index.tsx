import {
  Box,
  Button,
  Center,
  Divider,
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
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import React, { ReactNode, useCallback } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { InputFormik } from "../../Form/input";
import { SelectFormik } from "../../Form/SelectInput";
import RadioColorButton from "../../Radios";
import { useCreateCategory } from "../../../hooks/category/useCreateCategory";
import { useUpdateCategory } from "../../../hooks/category/useUpdateCategory";
import { useCategoryById } from "../../../hooks/category/useCategoryById";
import { Category } from "../../../hooks/category/type";

const categorySchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório.'),
  categoryType: yup.string().required('Tipo da categoria obrigatória.'),
});

const initialValues = {
  name: '',
  categoryType: '',
  color: ''
}

interface ModalTypes {
  categoryId?: number;
  onOk?: () => void;
  onCancel?: () => void;
  trigger: (onOpen?: () => void, onClose?: () => void) => ReactNode;
  text?: "edit" | "Adicionar" | null;
  userId?: number;
}

export function NewCategoryModal({onCancel, trigger, text, categoryId}: ModalTypes) {
  const mainColor = useColorModeValue('white', 'gray.800');
  const inverseMainColor = useColorModeValue('gray.800', 'white');

  const {isOpen, onOpen, onClose} = useDisclosure();

  const createCategory = useCreateCategory();
  const {data: accountFound} = useCategoryById(categoryId);
  const updateAccount = useUpdateCategory();

  const handleOk = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleUpdateCategory = async (values: Category) => {
    updateAccount.mutate({
      ...values
    })
    handleOk()
  };

  const handleCreateCategory = (values) => {
    createCategory.mutate(values);
    handleOk()
  }

  const handleCancel = useCallback(() => {
    onCancel?.();
    onClose();
  }, [onClose, onCancel])

  const colors = [
    '#8B0000', '#FFB6C1', '#FFA54F', '#008000', '#000080', '#800080', '#8B4513',
  ];

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
                  onSubmit={!!categoryId ? handleUpdateCategory : handleCreateCategory}
                  validationSchema={categorySchema}
                  validateOnChange={false}
          >
            {({handleSubmit, handleChange, values, isSubmitting, errors, setFieldValue}) =>
              <>
                <form onSubmit={handleSubmit}>
                  <ModalHeader fontSize="20px" fontWeight="medium">{text === 'edit' ? "Editar" : "Adicionar"} Categoria</ModalHeader>
                  <ModalCloseButton />
                  <Center>
                    <Divider maxW="550" borderColor="gray.150" />
                  </Center>
                  <ModalBody justifyContent={"end"} flexWrap={"wrap"}>
                    <Box flex={1} color={inverseMainColor} borderRadius={8} pt={5} pl={"5px"} pr={"5px"} pb={8}>
                      <VStack spacing={8}>
                        <SimpleGrid minChildWidth="auto" spacing={5} w="100%">
                          <InputFormik label={"Nome"}
                                       name={"name"}
                                       important={"*"}
                                       type={"text"}
                                       onChange={handleChange}
                                       value={values.name}
                                       error={errors.name}
                          />
                          <SelectFormik
                            label="Tipo da Categoria"
                            name="categoryType"
                            error={errors.categoryType}
                            value={values.categoryType}
                            onChange={handleChange}
                            important={"*"}
                            showDefaultOption={true}
                            options={[
                              { value: 'REVENUE', label: 'Despesa' },
                              { value: 'EXPENSE', label: 'Receita' }
                            ]}
                          />
                          <HStack>
                            {colors.map((color, index) => {
                              return (
                                <RadioColorButton
                                  key={color}
                                  color={color}
                                  value={color}
                                  isChecked={values.color === color}
                                  onChange={() => setFieldValue("color", color)}
                                />
                              );
                            })}
                          </HStack>
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

