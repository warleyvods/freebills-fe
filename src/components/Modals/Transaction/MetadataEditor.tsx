import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Switch,
  Input,
  VStack,
  HStack,
  Text,
  useDisclosure,
  useToast,
  useColorModeValue
} from '@chakra-ui/react';
import { TransactionMetadata } from '../../../hooks/transactions/useTransactionById';
import { api } from '../../../services/api';
import { queryClient } from '../../../services/queryClient';

interface MetadataEditorProps {
  transactionId: number;
  transactionDescription: string;
  initialMetadata?: TransactionMetadata;
  trigger: (onOpen: () => void, onClose?: () => void) => React.ReactNode;
}

export function MetadataEditor({ transactionId, transactionDescription, initialMetadata, trigger }: MetadataEditorProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const mainColor = useColorModeValue('white', 'gray.800');
  const headerColor = useColorModeValue('blue.400', 'blue.500');
  
  const [metadata, setMetadata] = useState<TransactionMetadata>({
    id: initialMetadata?.id || 0,
    hasReceipt: initialMetadata?.hasReceipt || false,
    hasPaidConfirmation: initialMetadata?.hasPaidConfirmation || false,
    hasObservation: initialMetadata?.hasObservation || false,
    isRecurring: initialMetadata?.isRecurring || false,
    isFixed: initialMetadata?.isFixed || false,
    isCreditCardPayment: initialMetadata?.isCreditCardPayment || false,
    isBankSlip: initialMetadata?.isBankSlip || false,
    tags: initialMetadata?.tags || '',
    isFavorite: initialMetadata?.isFavorite || false
  });

  const handleChange = (field: keyof TransactionMetadata, value: any) => {
    setMetadata({
      ...metadata,
      [field]: value
    });
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await api.patch(`v1/transactions/${transactionId}/metadata`, metadata);
      queryClient.invalidateQueries(['transaction', transactionId]);
      queryClient.invalidateQueries(['transactions']);
      
      toast({
        title: 'Metadados atualizados',
        description: 'Os metadados da transação foram atualizados com sucesso.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar metadados:', error);
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao atualizar os metadados da transação.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {trigger(onOpen)}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay backdropFilter="blur(3px)" />
        <ModalContent bg={mainColor}>
          <ModalHeader bg={headerColor} color="white">
            Editar Metadados - {transactionDescription}
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody py={4}>
            <VStack spacing={4} align="stretch">
              <HStack justify="space-between">
                <Text>Transação Paga</Text>
                <Switch 
                  isChecked={metadata.hasPaidConfirmation}
                  onChange={(e) => handleChange('hasPaidConfirmation', e.target.checked)}
                />
              </HStack>
              
              <HStack justify="space-between">
                <Text>Boleto</Text>
                <Switch 
                  isChecked={metadata.isBankSlip}
                  onChange={(e) => handleChange('isBankSlip', e.target.checked)}
                />
              </HStack>
              
              <HStack justify="space-between">
                <Text>Transação Recorrente</Text>
                <Switch 
                  isChecked={metadata.isRecurring}
                  onChange={(e) => handleChange('isRecurring', e.target.checked)}
                />
              </HStack>
              
              <HStack justify="space-between">
                <Text>Transação Fixa</Text>
                <Switch 
                  isChecked={metadata.isFixed}
                  onChange={(e) => handleChange('isFixed', e.target.checked)}
                />
              </HStack>
              
              <HStack justify="space-between">
                <Text>Pagamento de Cartão</Text>
                <Switch 
                  isChecked={metadata.isCreditCardPayment}
                  onChange={(e) => handleChange('isCreditCardPayment', e.target.checked)}
                />
              </HStack>
              
              <HStack justify="space-between">
                <Text>Favorito</Text>
                <Switch 
                  isChecked={metadata.isFavorite}
                  onChange={(e) => handleChange('isFavorite', e.target.checked)}
                />
              </HStack>
              
              <FormControl>
                <FormLabel>Tags (separadas por vírgula)</FormLabel>
                <Input 
                  value={metadata.tags || ''}
                  onChange={(e) => handleChange('tags', e.target.value)}
                  placeholder="Ex: casa, alimentação, lazer"
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              colorScheme="blue" 
              onClick={handleSubmit}
              isLoading={isSubmitting}
            >
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
} 