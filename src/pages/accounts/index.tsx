import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  LightMode,
  SimpleGrid, Skeleton,
  Spinner,
  Text,
  useBreakpointValue, useMediaQuery, VStack
} from "@chakra-ui/react";
import { RiAddLine, RiArchiveLine } from "react-icons/ri";
import CardsAccount from "../../components/Cards/CardsAccounts";
import { NewAccountModal } from "../../components/Modals/NewAccount";
import { useAccounts } from "../../hooks/accounts/useAccounts";
import NextLink from "next/link";
import SideBarLayout from "../../components/SidebarLayout/SideBarLayout";
import HeadingTable from "../../components/Tables/HeadingTable";
import IconComponent from "../../components/Icons/IconComponent";
import { useThemeColors } from "../../hooks/useThemeColors";

export default function Accounts() {
  const isMobile = useBreakpointValue({base: true, md: true, lg: false});
  const {data: accounts, isLoading, isFetching, error} = useAccounts();
  const {borderColor, bgColor} = useThemeColors();

  if (isLoading) {
    return (
      <SideBarLayout>
        {/*HEADER + BOTOES ADD CONTA + ARQUIVADOS*/}
        <HStack justify={"space-between"}>
          <HeadingTable title={"Contas"} isLoading={true} />
          <HStack spacing={"8px"}>
            <Skeleton h={"25px"} w={"110px"} borderRadius={"5px"} />
            <Skeleton h={"25px"} w={"110px"} borderRadius={"5px"} />
          </HStack>
        </HStack>
        <Flex flexDirection='column' pt={{base: "0px", md: "0"}}>
          <Flex h={"200px"}
                w={"400px"}
                bg={bgColor}
                border={"1px"}
                borderColor={borderColor}
                borderRadius={"5px"}
                flexDirection={"column"}
                p={"15px"}>
            <HStack justify={"space-between"}>
              <HStack>
                <Skeleton h={"40px"} w={"40px"} borderRadius={"full"} />
                <Skeleton h={"25px"} w={"110px"} borderRadius={"5px"} />
              </HStack>
              <Skeleton h={"30px"} w={"30px"} borderRadius={"5px"} />
            </HStack>
            <VStack spacing={"15px"} w={"full"} mt={"40px"}>
              <HStack justify={"space-between"} w={"full"}>
                <Skeleton h={"25px"} w={"110px"} borderRadius={"5px"} />
                <Skeleton h={"25px"} w={"110px"} borderRadius={"5px"} />
              </HStack>
              <HStack justify={"space-between"} w={"full"}>
                <Skeleton h={"25px"} w={"110px"} borderRadius={"5px"} />
                <Skeleton h={"25px"} w={"110px"} borderRadius={"5px"} />
              </HStack>
            </VStack>
          </Flex>
        </Flex>
      </SideBarLayout>
    )
  }

  return (
    <SideBarLayout>
      {/*HEADER + BOTOES ADD CONTA + ARQUIVADOS*/}
      <HStack justify={"space-between"}>
        <HeadingTable title={"Contas"} isLoading={isLoading} />
        <HStack spacing={"8px"}>
          <NewAccountModal
            edit={false}
            trigger={(onOpen) => (
              <LightMode>
                <Button
                  size={"sm"}
                  onClick={onOpen}
                  fontSize={"sm"}
                  variant={"default"}
                  leftIcon={<Icon as={RiAddLine} fontSize={"20"} />}
                >
                  Adicionar conta
                </Button>
              </LightMode>
            )}
          />
          <LightMode>
            <NextLink href={"/accounts/archiveds"}>
              {isMobile ? (
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
        {error ? (
          <Flex justify={"center"} p={"20px"}>
            <Text fontWeight={"medium"} fontSize={"18px"}>Falha ao obter dados das contas</Text>
          </Flex>
        ) : (
          <>
            {
              /* BOX DE CONTA VAZIA */
              accounts?.length === 0 && (
                <Flex justify={"center"} align={"center"} flexDir={"column"} w={"full%"} h={"60vh"}>
                  <Text fontSize={"lg"} fontWeight={"medium"} mb={"30px"}>Nenhuma conta cadastrada</Text>
                  <IconComponent name={"void"} width={"200"} height={"200"} />
                </Flex>
              )
            }
            <SimpleGrid columns={{sm: 1, md: 1, xl: 4}} spacing='18px'>
              {accounts?.map(acc => (
                <CardsAccount
                  key={acc.id}
                  amount={acc.amount}
                  description={acc.description}
                  accId={acc.id}
                  bankType={acc.bankType}
                />
              ))}
            </SimpleGrid>
          </>
        )}
      </Flex>
    </SideBarLayout>
  )
};
