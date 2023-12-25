import React from 'react';
import {
  Button,
  Flex,
  HStack,
  Icon, IconButton,
  LightMode,
  SimpleGrid,
  Spinner,
  Text,
  useBreakpointValue,
  useColorModeValue
} from "@chakra-ui/react";
import { RiAddLine, RiArchiveLine } from "react-icons/ri";
import CardsAccount from "../../components/Cards/CardsAccounts";
import { NewAccountModal } from "../../components/Modals/NewAccount";
import { useAccounts } from "../../hooks/accounts/useAccounts";
import { useMe } from "../../hooks/users/useMe";
import NextLink from "next/link";
import SideBarLayout from "../../components/SidebarLayout/SideBarLayout";
import HeadingTable from "../../components/Tables/HeadingTable";
import IconComponent from "../../components/Icons/IconComponent";
import { ChevronLeftIcon } from "@chakra-ui/icons";

export default function Accounts() {
  const isMobile = useBreakpointValue({base: true, md: true, lg: false});
  const {data: user} = useMe();
  const {data: accounts, isLoading, isFetching, error} = useAccounts(user?.id);
  const mainColor = useColorModeValue('white', 'gray.800');

  return (
    <SideBarLayout>
      {/*HEADER + BOTOES ADD CONTA + ARQUIVADOS*/}
      <HStack justify={"space-between"}>
        <HeadingTable title={"Contas"} isLoading={isLoading} />
        <HStack spacing={"8px"}>
          <NewAccountModal
            text={"Adicionar"}
            trigger={onOpen =>
              <LightMode>
                <Button size={"sm"}
                        onClick={onOpen}
                        fontSize={"sm"}
                        variant={"default"}
                        leftIcon={<Icon as={RiAddLine} fontSize={"20"} />}
                >Adicionar conta
                </Button>
              </LightMode>
            }
          />

          <LightMode>
            <NextLink href={"/accounts/archiveds"}>
              { isMobile ? (
                <IconButton
                variant={"solid"}
                colorScheme={"purple"}
                aria-label={"archived"}
                icon={<Icon as={RiArchiveLine} fontSize={"20"} />}
                size={"sm"}
                />
              ) : (
                <Button as={"a"}
                        size={"sm"}
                        fontSize={"sm"}
                        colorScheme={"purple"}
                        leftIcon={<Icon as={RiArchiveLine} fontSize={"20"} />
                        }
                >Arquivados
                </Button>
              )}
            </NextLink>
          </LightMode>

        </HStack>
      </HStack>
      <Flex flexDirection='column' pt={{base: "0px", md: "0"}}>
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
            {
              accounts.length === 0 && (
                <Flex justify={"center"} align={"center"} flexDir={"column"} w={"full%"} h={"60vh"}>
                  <Text fontSize={"lg"} fontWeight={"medium"} mb={"30px"}>Nenhuma conta cadastrada</Text>
                  <IconComponent name={"void"} width={"200"} height={"200"}/>
                </Flex>
              )
            }
            <SimpleGrid columns={{sm: 1, md: 2, xl: 4}} spacing='24px'>
              {
                accounts?.map(acc => (
                  <CardsAccount
                    key={acc.id}
                    amount={acc.amount}
                    description={acc.description}
                    accId={acc.id}
                    bankType={acc.bankType}
                  />
                ))
              }
            </SimpleGrid>
          </>
        )}
      </Flex>
    </SideBarLayout>
  )
};
