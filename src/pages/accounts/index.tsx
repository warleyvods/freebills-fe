import React from 'react';
import SidebarWithHeader from "../../components/SideBar";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  LightMode,
  SimpleGrid,
  Spinner,
  Text,
  useColorModeValue,
  VStack
} from "@chakra-ui/react";
import { RiAddLine, RiArchiveLine } from "react-icons/ri";
import CardsAccount from "../../components/Cards/CardsAccounts";
import { NewAccountModal } from "../../components/Modals/NewAccount";
import { useAccounts } from "../../hooks/accounts/useAccounts";
import { useMe } from "../../hooks/users/useMe";
import NextLink from "next/link";

export default function Accounts() {
  const {data: user} = useMe();
  const {data: accounts, isLoading, isFetching, error} = useAccounts(user?.id);
  const mainColor = useColorModeValue('white', 'gray.800');

  return (
    <SidebarWithHeader>
      <Flex flexDirection='column' pt={{base: "0px", md: "0"}}>
        <Flex flexDirection="row" justifyContent="space-between" mb="20px" mt="10px" ml={"10px"}>
          <Heading>Contas {!isLoading && isFetching && <Spinner size={"sm"} color={"gray.500"} ml={4} />}</Heading>
          <HStack spacing={3}>
            <NewAccountModal
              text={"Adicionar"}
              trigger={onOpen =>
                <LightMode>
                  <Button as={"a"}
                          size={"sm"}
                          onClick={onOpen}
                          fontSize={"sm"}
                          colorScheme={"facebook"}
                          leftIcon={<Icon as={RiAddLine} fontSize={"20"} />
                          }
                  >Adicionar novo
                  </Button>
                </LightMode>
              }
            />
            <LightMode>
              <NextLink href={"/accounts/archiveds"}>
                <Button as={"a"}
                        size={"sm"}
                        fontSize={"sm"}
                        colorScheme={"purple"}
                        leftIcon={<Icon as={RiArchiveLine} fontSize={"20"} />
                        }
                >Arquivados
                </Button>
              </NextLink>
            </LightMode>
          </HStack>
        </Flex>
        {isLoading ? (
          <Flex justify={"center"}>
            <Spinner />
          </Flex>
        ) : error ? (
          <Flex justify={"center"}>
            <Text>Falha ao obter dados das contas</Text>
          </Flex>
        ) : (
          <>
            <SimpleGrid columns={{sm: 1, md: 2, xl: 4}} spacing='24px'>
              {accounts.length === 0 ? (
                <Box bg={mainColor} minW={"350px"} minH={"200px"} borderRadius={25} p={"20px"} boxShadow={"lg"}>
                  <VStack justify={"center"} w={"100%"} h={"100%"}>
                    <Text fontWeight="bold" fontSize={"25px"}>Adicionar Conta</Text>
                    <NewAccountModal
                      trigger={open =>
                        <IconButton
                          onClick={open}
                          borderRadius={25}
                          aria-label={"add acc"}
                          icon={<RiAddLine />}
                          size={"lg"}
                        />}
                    />
                  </VStack>
                </Box>
              ) : (
                accounts?.map(acc => (
                  <CardsAccount key={acc.id} amount={acc.amount} description={acc.description} accId={acc.id} />
                ))
              )}
            </SimpleGrid>
          </>
        )}
      </Flex>
    </SidebarWithHeader>
  )
};
