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
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { InputFormik } from "../../Form/input";
import { SelectFormik } from "../../Form/SelectInput";
import { useCreateSubcategory } from "../../../hooks/subcategory/useCreateSubcategory";
import { useUpdateSubcategory } from "../../../hooks/subcategory/useUpdateSubcategory";
import { useSubcategoryById } from "../../../hooks/subcategory/useSubcategoryById";
import { Subcategory } from "../../../hooks/subcategory/type";
import { useCategories } from "../../../hooks/category/useCategories";
import { Category } from "../../../hooks/category/type";
import { useCategoryById } from "../../../hooks/category/useCategoryById";

// Schema para quando temos uma categoria específica (só precisa do nome)
const singleFieldSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório.')
});

// Schema para quando o usuário precisa escolher a categoria
const fullSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório.'),
  categoryId: yup.number().required('Categoria obrigatória.')
});

const initialValues = {
  name: '',
  categoryId: 0
}

interface ModalTypes {
  subcategoryId?: number;
  initialCategoryId?: number;
  onOk?: () => void;
  onCancel?: () => void;
  trigger: (onOpen?: () => void, onClose?: () => void) => ReactNode;
  text?: "edit" | "Adicionar" | null;
}

export function NewSubcategoryModal({onCancel, trigger, text, subcategoryId, initialCategoryId}: ModalTypes) {
  const mainColor = useColorModeValue('white', 'gray.800');
  const inverseMainColor = useColorModeValue('gray.800', 'white');
  const [categoryName, setCategoryName] = useState<string>("");
  
  const {isOpen, onOpen, onClose} = useDisclosure();

  const createSubcategory = useCreateSubcategory();
  const {data: subcategoryFound} = useSubcategoryById(subcategoryId || 0);
  const updateSubcategory = useUpdateSubcategory();
  const { data: categoriesData } = useCategories(0, 1000, "name,asc", "", "", false);
  
  // Se temos um ID de categoria específico, buscamos os detalhes dessa categoria
  const { data: categoryData } = useCategoryById(initialCategoryId || 0);
  
  // Atualiza o nome da categoria quando os dados são carregados
  useEffect(() => {
    if (categoryData && initialCategoryId) {
      setCategoryName(categoryData.name);
    }
  }, [categoryData, initialCategoryId]);

  const handleOk = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleUpdateSubcategory = async (values: any) => {
    updateSubcategory.mutate({
      ...values,
      id: subcategoryId
    })
    handleOk()
  };

  const handleCreateSubcategory = (values: any) => {
    // Se temos um initialCategoryId, garantimos que ele seja incluído na request
    if (initialCategoryId) {
      createSubcategory.mutate({
        name: values.name,
        categoryId: initialCategoryId,
        archived: false
      });
    } else {
      createSubcategory.mutate({
        ...values,
        archived: false
      });
    }
    handleOk();
  }

  const handleCancel = useCallback(() => {
    onCancel?.();
    onClose();
  }, [onClose, onCancel]);

  // Determina os valores iniciais com base na edição ou criação
  const getInitialValues = () => {
    if (subcategoryFound) {
      return subcategoryFound;  // Editando subcategoria existente
    } else if (initialCategoryId) {
      return {
        name: '',
        categoryId: initialCategoryId  // Nova subcategoria com categoria específica
      };
    } else {
      return initialValues;  // Nova subcategoria sem categoria específica
    }
  };

  // Extrai categorias do objeto da API
  const categories = categoriesData?.content || [];
  
  // Cria opções para o dropdown
  const categoriesOptions = categories.map(category => ({
    value: category.id?.toString() || '',
    label: category.name
  }));

  // Determina o título do modal
  const getModalTitle = () => {
    if (text === 'edit') {
      return "Editar Subcategoria";
    } else if (initialCategoryId && categoryName) {
      return `Adicionar Subcategoria em ${categoryName}`;
    } else {
      return "Adicionar Subcategoria";
    }
  };

  // Determina qual schema usar com base se temos uma categoria específica
  const validationSchema = initialCategoryId ? singleFieldSchema : fullSchema;

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
        <ModalContent bg={mainColor}>
          <Formik 
            initialValues={getInitialValues()}
            onSubmit={!!subcategoryId ? handleUpdateSubcategory : handleCreateSubcategory}
            validationSchema={validationSchema}
            validateOnChange={false}
            enableReinitialize={true}
          >
            {({handleSubmit, handleChange, values, isSubmitting, errors, setFieldValue, touched}) => (
              <form onSubmit={handleSubmit}>
                <ModalHeader fontSize="20px" fontWeight="medium">
                  {getModalTitle()}
                </ModalHeader>
                <ModalCloseButton />
                <Center>
                  <Divider maxW="550" borderColor="gray.150" />
                </Center>
                <ModalBody justifyContent={"end"} flexWrap={"wrap"}>
                  <Box flex={1} color={inverseMainColor} borderRadius={8} pt={5} pl={"5px"} pr={"5px"} pb={8}>
                    <VStack spacing={8}>
                      {/* Campo Nome (sempre visível) */}
                      <InputFormik 
                        label={"Nome"}
                        name={"name"}
                        important={"*"}
                        type={"text"}
                        onChange={handleChange}
                        value={values.name}
                        error={errors.name}
                        autoFocus
                        width="100%"
                      />
                      
                      {/* Campo Categoria (visível apenas se não temos initialCategoryId) */}
                      {!initialCategoryId && !subcategoryId && (
                        <SelectFormik
                          label="Categoria"
                          name="categoryId"
                          error={errors.categoryId}
                          value={values.categoryId?.toString()}
                          onChange={(e) => {
                            const value = e.target.value;
                            setFieldValue('categoryId', value ? parseInt(value, 10) : 0);
                          }}
                          important={"*"}
                          showDefaultOption={true}
                          options={categoriesOptions}
                          width="100%"
                        />
                      )}
                    </VStack>
                  </Box>
                </ModalBody>
                <ModalFooter>
                  <HStack justifyContent={"flex-end"} spacing={"16px"}>
                    <Button
                      onClick={handleCancel}
                      _hover={{bg: 'gray.100'}}
                      variant={"ghost"}
                      size={"md"}
                      isDisabled={isSubmitting}
                    >
                      Cancelar
                    </Button>
                    <LightMode>
                      <Button
                        type={"submit"}
                        size={"md"}
                        isLoading={isSubmitting}
                        variant={"default"}
                      >
                        {text === 'edit' ? 'Atualizar' : 'Adicionar'}
                      </Button>
                    </LightMode>
                  </HStack>
                </ModalFooter>
              </form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  )
} 