import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Image,
  Link,
  Flex,
  Text,
  Spinner,
  useDisclosure,
  useColorModeValue
} from '@chakra-ui/react';
import { useGetReceiptDownloadUrl } from '../../../hooks/transactions/useGetReceiptDownloadUrl';
import { ExternalLinkIcon } from '@chakra-ui/icons';

interface ReceiptViewerModalProps {
  transactionId: number;
  transactionDescription: string;
  trigger: (onOpen: () => void, onClose?: () => void) => React.ReactNode;
}

export function ReceiptViewerModal({ transactionId, transactionDescription, trigger }: ReceiptViewerModalProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: receiptInfo, isLoading, error } = useGetReceiptDownloadUrl(transactionId);
  const mainColor = useColorModeValue('white', 'gray.800');
  const headerColor = useColorModeValue('blue.400', 'blue.500');

  const isImage = receiptInfo && (
    receiptInfo.fileType?.toLowerCase().startsWith('image/') ||
    receiptInfo.publicUrl?.toLowerCase().endsWith('.jpg') ||
    receiptInfo.publicUrl?.toLowerCase().endsWith('.jpeg') ||
    receiptInfo.publicUrl?.toLowerCase().endsWith('.png') ||
    receiptInfo.publicUrl?.toLowerCase().endsWith('.gif')
  );

  return (
    <>
      {trigger(onOpen)}
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay backdropFilter="blur(3px)" />
        <ModalContent bg={mainColor} borderRadius="10px">
          <ModalHeader bg={headerColor} color="white" fontSize="25px" fontWeight="medium">
            Comprovante - {transactionDescription}
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody p={5}>
            {isLoading ? (
              <Flex justify="center" align="center" direction="column" p={10}>
                <Spinner size="xl" />
                <Text mt={4}>Carregando comprovante...</Text>
              </Flex>
            ) : error ? (
              <Flex justify="center" align="center" direction="column" p={10}>
                <Text>Não foi possível carregar o comprovante. Tente novamente mais tarde.</Text>
              </Flex>
            ) : (
              <Box>
                {isImage ? (
                  <Image 
                    src={receiptInfo?.publicUrl || receiptInfo?.downloadSignedUrl} 
                    alt="Comprovante de pagamento" 
                    maxH="70vh"
                    mx="auto"
                    borderRadius="md"
                    fallback={
                      <Flex justify="center" align="center" direction="column" p={10}>
                        <Text mb={4}>Não foi possível carregar a imagem diretamente.</Text>
                        <Link href={receiptInfo?.downloadSignedUrl} isExternal color="blue.500">
                          Baixar comprovante <ExternalLinkIcon mx="2px" />
                        </Link>
                      </Flex>
                    }
                  />
                ) : (
                  <Flex justify="center" align="center" direction="column" p={10}>
                    <Text mb={4}>O arquivo não é uma imagem que pode ser visualizada diretamente.</Text>
                    <Link href={receiptInfo?.downloadSignedUrl} isExternal color="blue.500">
                      Baixar comprovante <ExternalLinkIcon mx="2px" />
                    </Link>
                  </Flex>
                )}
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            {receiptInfo && (
              <Link href={receiptInfo.downloadSignedUrl} isExternal mr={4}>
                <Button colorScheme="blue" leftIcon={<ExternalLinkIcon />}>
                  Baixar
                </Button>
              </Link>
            )}
            <Button onClick={onClose}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
} 