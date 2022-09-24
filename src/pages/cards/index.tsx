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
  SimpleGrid, Spinner,
  Text,
  useColorModeValue,
  VStack
} from "@chakra-ui/react";
import { NewAccountModal } from "../../components/Modals/NewAccount";
import { RiAddLine, RiArchiveLine } from "react-icons/ri";
import NextLink from "next/link";
import React from "react";
import CreditCard from "../../components/Cards/CreditCard";
import { useCreditCards } from "../../hooks/cards/useCreditCards";
import { NewCreditCard } from "../../components/Modals/NewCreditCard";

export const Card = () => {
  const {data: cards, isLoading, isFetching, error} = useCreditCards();
  const mainColor = useColorModeValue('white', 'gray.800');


  return (
    <SidebarWithHeader>
      <Flex flexDirection='column' pt={{base: "0px", md: "0"}}>
        <Flex flexDirection="row" justifyContent="space-between" mb="20px" mt="10px" ml={"10px"}>
          <Heading>Cartões de crédito {!isLoading && isFetching && <Spinner size={"sm"} color={"gray.500"} ml={4} />}</Heading>
          <HStack spacing={3}>
            <NewCreditCard
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
            <Text>Falha ao obter dados dos cartões</Text>
          </Flex>
        ) : (
          <>
            <SimpleGrid columns={{sm: 1, md: 2, xl: 4}} spacing='24px'>
              {cards.length === 0 ? (
                <Box bg={mainColor} minW={"350px"} minH={"200px"} borderRadius={25} p={"20px"} boxShadow={"lg"}>
                  <VStack justify={"center"} w={"100%"} h={"100%"}>
                    <Text fontWeight="bold" fontSize={"25px"}>Novo cartão de crédito</Text>
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
                cards?.map(cc => (
                  <CreditCard key={cc.id} description={cc.description} closingDay={cc.closingDay} cardLimit={cc.cardLimit}/>
                ))
              )}
            </SimpleGrid>
          </>
        )}
      </Flex>
    </SidebarWithHeader>
  )
}

export default Card;
