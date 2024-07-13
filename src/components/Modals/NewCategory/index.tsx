import {
  Box,
  Button,
  Center,
  chakra,
  Circle,
  Divider,
  HStack,
  IconButton,
  LightMode,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  SimpleGrid,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import React, { ReactNode, useCallback, useRef, useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { InputFormik } from "../../Form/input";
import { SelectFormik } from "../../Form/SelectInput";
import RadioColorButton from "../../Radios";
import { useCreateCategory } from "../../../hooks/category/useCreateCategory";
import { useUpdateCategory } from "../../../hooks/category/useUpdateCategory";
import { useCategoryById } from "../../../hooks/category/useCategoryById";
import { Category } from "../../../hooks/category/type";
import { IconPicker } from "./IconPicker";
import { EmojiOrImageIcon } from "./EmojiOrImageIcon";
import { AddIcon } from "@chakra-ui/icons";

const categorySchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório.'),
  categoryType: yup.string().required('Tipo da categoria obrigatória.'),
  color: yup.string().required('Cor obrigatória.'),
  icon: yup.string().required('Icone obrigatória.')
});

const initialValues = {
  name: '',
  categoryType: '',
  color: '',
  icon: ''
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
  const scrollContainer = useRef<HTMLDivElement>(null);
  const initialFocusRef = React.useRef()

  const {isOpen, onOpen, onClose} = useDisclosure();

  const createCategory = useCreateCategory();
  const {data: accountFound} = useCategoryById(categoryId);
  const updateAccount = useUpdateCategory();
  const [icon, setIcon] = useState("");

  const handleOk = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleUpdateCategory = async (values: Category) => {
    updateAccount.mutate({
      ...values, icon
    })
    handleOk()
  };

  const handleCreateCategory = (values: Category) => {
    createCategory.mutate({
      ...values, icon
    });
    handleOk()
  }

  const onIconSelected = (url: string, setFieldValue, setFieldTouched) => {
    setIcon(url);
    setFieldValue("icon", url);
    setFieldTouched("icon", true);
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
        size={{base: "md", md: "md", lg: "lg"}}
      >
        <ModalOverlay backdropFilter='blur(3px)' />
        <ModalContent bg={mainColor}>
          <Formik initialValues={accountFound || initialValues}
                  onSubmit={!!categoryId ? handleUpdateCategory : handleCreateCategory}
                  validationSchema={categorySchema}
                  validateOnChange={false}
          >
            {({handleSubmit, handleChange, values, isSubmitting, errors, setFieldValue, setFieldTouched, touched}) =>
              <>
                <form onSubmit={handleSubmit}>
                  <ModalHeader fontSize="20px"
                               fontWeight="medium">{text === 'edit' ? "Editar" : "Adicionar"} Categoria</ModalHeader>
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
                              {value: 'EXPENSE', label: 'Despesa'},
                              {value: 'REVENUE', label: 'Receita'}
                            ]}
                          />

                          <Popover isLazy initialFocusRef={initialFocusRef} placement='bottom'>
                            <PopoverTrigger>
                              <chakra.span>
                                <HStack spacing={"10px"} alignItems={"start"}>
                                  <VStack alignItems={"start"}>
                                    <Circle bg={"gray.100"} size={"40px"} border={errors.icon && touched.icon ? '2px solid red' : 'none'}>
                                      <EmojiOrImageIcon
                                        icon={icon}
                                        emojiFontSize="2xl"
                                        boxSize={"25px"}
                                      />
                                    </Circle>
                                  </VStack>
                                  <IconButton
                                    borderRadius={"25px"}
                                    colorScheme='gray'
                                    aria-label='Call Segun'
                                    size='md'
                                    icon={<AddIcon />}
                                  />
                                </HStack>
                                { errors.icon && touched.icon && (
                                  <Text fontSize={"0.8rem"} fontWeight={"medium"} color={"red.500"} mt={"5px"}>Ícone obrigatório</Text>
                                ) }
                              </chakra.span>
                            </PopoverTrigger>
                            <PopoverContent>
                              <PopoverHeader pt={4} fontWeight='bold' border='0'>
                                Ícones
                              </PopoverHeader>
                              <PopoverCloseButton />
                              <IconPicker onIconSelected={(url) => onIconSelected(url, setFieldValue, setFieldTouched)} />
                            </PopoverContent>
                          </Popover>

                          <VStack w={"full"} justify={"start"} alignItems={"start"}>
                            <HStack>
                              {colors.map((color, index) => {
                                return (
                                  <RadioColorButton
                                    key={color}
                                    color={color}
                                    value={color}
                                    isChecked={values.color === color}
                                    onChange={() => {
                                      setFieldValue("color", color);
                                      setFieldTouched("color", false);
                                    }}
                                    hasError={errors.color && touched.color}
                                  />
                                );
                              })}
                            </HStack>
                            {errors.color && touched.color && (
                              <Text fontSize={"0.8rem"} fontWeight={"medium"} color={"red.500"}>
                                Cor obrigatória
                              </Text>
                            )}
                          </VStack>
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

