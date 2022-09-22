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
  Text,
  useColorModeValue,
  VStack
} from "@chakra-ui/react";
import { NewAccountModal } from "../../components/Modals/NewAccount";
import { RiAddLine, RiArchiveLine } from "react-icons/ri";
import NextLink from "next/link";
import CardsAccount from "../../components/Cards/CardsAccounts";
import React from "react";
import CreditCard from "../../components/Cards/CreditCard";

interface Item {
  name: string;
}

const list: Array<Item> = [
  {
    name: 'Contas'
  },
];

export const Card = () => {

  const mainColor = useColorModeValue('white', 'gray.800');


  return (
    <SidebarWithHeader>
      <Flex flexDirection='column' pt={{base: "0px", md: "0"}}>
        <Flex flexDirection="row" justifyContent="space-between" mb="20px" mt="10px" ml={"10px"}>
          <Heading>Cartões de Crédito (em desenvolvimento)</Heading>
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
        <>
          <SimpleGrid columns={{sm: 1, md: 2, xl: 4}} spacing='24px'>

            {list.length === 0 ? (
              <>
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
              </>
            ) : (
              <>
                <CreditCard />
                <CreditCard />
                <CreditCard />
                <CreditCard />
              </>
            )}
          </SimpleGrid>
        </>
      </Flex>
    </SidebarWithHeader>
  )
}

export default Card;
