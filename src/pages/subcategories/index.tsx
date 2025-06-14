import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SubcategoryTable from '../../components/Tables/subcategory/SubcategoryTable';
import { useCategoryById } from '../../hooks/category/useCategoryById';
import { Box, Button, Flex, Heading, HStack, Icon, Text } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

export default function Subcategories() {
  const router = useRouter();
  const { categoryId } = router.query;
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const { data: categoryData } = useCategoryById(selectedCategoryId || 0);

  useEffect(() => {
    if (categoryId) {
      setSelectedCategoryId(Number(categoryId));
    }
  }, [categoryId]);

  return (
    <>
      {categoryData && (
        <Box mb={4}>
          <Flex alignItems="center" mb={2}>
            <NextLink href="/categories" passHref>
              <Button 
                leftIcon={<ChevronLeftIcon />} 
                variant="ghost" 
                size="sm" 
                mr={2}
              >
                Voltar para Categorias
              </Button>
            </NextLink>
          </Flex>
          <HStack>
            <Text color="gray.500" fontSize="sm">Subcategorias de:</Text>
            <Heading as="h3" size="md">{categoryData.name}</Heading>
          </HStack>
        </Box>
      )}
      <SubcategoryTable archived={false} categoryId={selectedCategoryId} />
    </>
  );
} 