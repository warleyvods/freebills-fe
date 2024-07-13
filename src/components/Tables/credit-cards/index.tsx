import React from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  LightMode,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Progress,
  SimpleGrid,
  Skeleton,
  Text,
  useBreakpointValue, useColorModeValue,
  VStack
} from "@chakra-ui/react";
import { RiAddLine, RiArchiveLine, RiMastercardFill, RiMore2Fill } from "react-icons/ri";
import { ChevronLeftIcon, EditIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useCreditCards } from "../../../hooks/cards/useCreditCards";
import SideBarLayout from "../../SidebarLayout/SideBarLayout";
import HeadingTable from "../HeadingTable";
import { NewCreditCard } from "../../Modals/NewCreditCard";
import { moneyFormat } from "../../Utils/utils";
import { CreditCard } from "../../../hooks/cards/type";
import { ConfirmationDialog } from "../../Dialog/ConfirmationDialog";
import { useUpdateArchiveCC } from "../../../hooks/cards/useUpdateArchiveCC";
import { useDeleteCard } from "../../../hooks/cards/useDeleteCard";
import IconComponent from "../../Icons/IconComponent";


export default function CreditCards({archived}: { archived: boolean }) {
  const isMobile = useBreakpointValue({base: true, md: true, lg: false});
  const {data: cards, isLoading: isLoadingCreditCard} = useCreditCards(archived);

  if (isLoadingCreditCard) {
    return null;
  }

  return (
    <SideBarLayout>
      {/*<SkeletonCreditCard />*/}
      <HStack justify={!archived ? "space-between" : "initial"}>
        {archived && (
          <NextLink href={"/cards"}>
            <IconButton
              isRound={true}
              variant={"solid"}
              aria-label={"button account"}
              icon={<ChevronLeftIcon fontSize={"26px"} />}
              size={"sm"}
            />
          </NextLink>
        )}
        <HeadingTable title={!archived ? "Cartões de Crédito" : "Cartões de crédito arquivadas"} />
        {!archived && (
          <HStack spacing={"8px"}>
            <NewCreditCard
              text={"Adicionar"}
              trigger={onOpen =>
                <LightMode>
                  <Button size={"sm"}
                          onClick={onOpen}
                          fontSize={"sm"}
                          variant={"default"}
                          leftIcon={<Icon as={RiAddLine} fontSize={"20"} />}
                  >Adicionar cartão
                  </Button>
                </LightMode>
              }
            />
            <LightMode>
              <NextLink href={"/cards/archived"}>
                <Button as={"a"}
                        size={"sm"}
                        fontSize={"sm"}
                        colorScheme={"purple"}
                        leftIcon={<Icon as={RiArchiveLine} fontSize={"20"} />}
                >Arquivados
                </Button>
              </NextLink>
            </LightMode>
          </HStack>
        )}
      </HStack>
      {
        isLoadingCreditCard ? (
          <SkeletonCreditCard />
        ) : (
          cards?.length === 0 ? (
            <Flex justify={"center"} align={"center"} flexDir={"column"} w={"full%"} h={"60vh"}>
              <Text fontSize={"lg"} fontWeight={"medium"} mb={"30px"}>Nenhuma conta cadastrada</Text>
              <IconComponent name={"void"} width={"200"} height={"200"} />
            </Flex>
          ) : (
            <SimpleGrid columns={{sm: 1, md: 2, xl: 4}} spacing='20px' justifyItems='start'>
              {cards.map((card) => (<CreditCard key={card.id} card={card} archived={archived} />))}
            </SimpleGrid>
          )
        )
      }
    </SideBarLayout>
  )
}

function SkeletonCreditCard() {
  return (
    <Box w={"auto"}
         maxW={"400px"}
         borderRadius={"10px"}
         p={"20px"}
         boxShadow={"md"}
         border={"1px"}
         borderColor={"gray.100"}
         mt={"15px"}
    >
      {/*HEADING WITH MENU*/}
      <HStack justifyContent={"space-between"} align={"center"} mb={"5px"}>
        <HStack>
          <Skeleton height='30px' w={"30px"} />
          <Skeleton height='30px' w={"150px"} />
        </HStack>
        <Menu>
          <MenuButton
            as={IconButton}
            borderRadius={"10px"}
            borderColor={"gray.100"}
            aria-label={"button account"}
            icon={<RiMore2Fill />}
            variant='outline'
          />
          <MenuList>
            <MenuItem icon={<EditIcon />}>
              Editar
            </MenuItem>
            <ConfirmationDialog
              mainColor={"white"}
              title={"Arquivar Cartão de Crédito"}
              description={"Você deseja arquivar este cartão?"}
              buttonText={"Arquivar"}
              variant={"danger"}
              onOk={() => null}
              trigger={(onOpen) =>
                <MenuItem icon={<ExternalLinkIcon />} onClick={onOpen}>
                  Arquivar Cartão
                </MenuItem>
              }
            />
          </MenuList>
        </Menu>
      </HStack>

      <HStack>
        <Text fontWeight={"bold"} fontSize={"1rem"}>Fatura aberta</Text>
      </HStack>

      <HStack justify={"space-between"} mt={"15px"}>
        <Text fontWeight="medium" fontSize={"0.9rem"}>Valor Parcial</Text>
        <Skeleton height='20px' w='80px' />
      </HStack>

      <HStack justify={"space-between"} mt={"5px"}>
        <Text fontWeight="medium" fontSize={"0.9rem"}>Fecha em</Text>
        <Skeleton height='20px' w='100px' />
      </HStack>

      <VStack alignItems={"start"} spacing={"5px"}>
        <Skeleton height='20px' w='100px' />
        <Skeleton height='10px' w='full' />
        <Skeleton height='10px' w='170px' />
      </VStack>
    </Box>
  )
}

type CardProps = {
  card: CreditCard;
  archived: boolean;
}

function CreditCard({card, archived}: CardProps) {
  const isActive = useColorModeValue("gray.50", "#333537");
  const hover = useColorModeValue("gray.50", "#333537");
  const archive = useUpdateArchiveCC();
  const deleteCard = useDeleteCard();

  function handleArchiveCreditCard(cardId: number) {
    archive.mutate(cardId)
  }

  function handleDelete(cardId: number) {
    deleteCard.mutate(cardId);
  }

  return (
    <NextLink href={{
      pathname: "/cards/transactions/[id]",
      query: {id: card.id}
    }}
    passHref
    >
      <Flex
        w={"full"}
        borderRadius={"10px"}
        p={"20px"}
        boxShadow={"md"}
        border={"1px"}
        borderColor={"gray.100"}
        mt={"15px"}
        flexDirection={"column"}
        cursor="pointer"
        transition="transform 0.2s, boxShadow 0.2s"
        _hover={{
          transform: "translateY(0px) translateX(0px)",
          boxShadow: "-1px 1px 5px rgba(0, 0, 0, 0.1)",
          bg: hover
        }}
        _active={{
          boxShadow: "none",
          bg: isActive
        }}
      >
        {/*HEADING WITH MENU*/}
        <HStack justifyContent={"space-between"} align={"center"} mb={"5px"}>
          <HStack>
            <RiMastercardFill size={"40px"} />
            <Text fontWeight="bold" fontSize={"1.2rem"}>{card.description}</Text>
          </HStack>
          <Menu>
            <MenuButton
              as={IconButton}
              borderRadius={"10px"}
              borderColor={"gray.100"}
              aria-label={"button account"}
              icon={<RiMore2Fill />}
              variant='outline'
              onClick={(e) => e.stopPropagation()}
            />
            <MenuList>
              {!archived && (
                <MenuItem icon={<EditIcon />} onClick={(e) => {
                  e.stopPropagation();
                }}>
                  Editar
                </MenuItem>
              )}
              <ConfirmationDialog
                mainColor={"white"}
                title={!archived ? "Arquivar Cartão de Crédito" : "Desarquivar Cartão de Crédito"}
                description={!archived ? "Você deseja arquivar este cartão?" : "Você deseja desarquivar este cartão?"}
                buttonText={"Arquivar"}
                variant={"alert"}
                onOk={() => handleArchiveCreditCard(card.id)}
                trigger={(onOpen) =>
                  <MenuItem icon={<ExternalLinkIcon />} onClick={(e) => {
                    e.stopPropagation();
                    onOpen();
                  }}>
                    {!archived ? "Arquivar Cartão" : "Desarquivar Cartão"}
                  </MenuItem>
                }
              />
              {archived && (
                <ConfirmationDialog
                  mainColor={"white"}
                  title={"Deletar Cartão"}
                  description={"Você deseja deletar este cartão? Essa ação não pode ser desfeita."}
                  buttonText={"Deletar"}
                  variant={"danger"}
                  onOk={() => handleDelete(card.id)}
                  trigger={(onOpen) =>
                    <MenuItem icon={<ExternalLinkIcon />} onClick={(e) => {
                      e.stopPropagation();
                      onOpen();
                    }}>
                      Deletar Cartão
                    </MenuItem>
                  }
                />
              )}
            </MenuList>
          </Menu>
        </HStack>
        <HStack>
          <Text fontWeight={"bold"} fontSize={"1rem"}>Fatura aberta</Text>
        </HStack>

        <HStack justify={"space-between"} mt={"15px"}>
          <Text fontWeight="medium" fontSize={"0.9rem"}>Valor Parcial</Text>
          <Text fontFamily={"Poppins"} fontWeight="medium" fontSize={"0.9rem"} color="green">R$ 100,00</Text>
        </HStack>

        <HStack justify={"space-between"} mt={"5px"}>
          <Text fontWeight="medium" fontSize={"0.9rem"}>Fecha em</Text>
          <Text fontWeight="bold" fontSize={"0.9rem"}>10 de agosto de 2024</Text>
        </HStack>

        <Text fontWeight="bold" fontSize={"0.9rem"} mt={"5px"}>R$ 100,00 de {moneyFormat(1000)}</Text>
        <Progress size={"sm"} value={20} borderRadius={"5px"} mb={"5px"} mt={"5px"} />
        <Text fontWeight="normal" fontSize={"0.75rem"}>Limite Disponível {moneyFormat(card.cardLimit)}</Text>
      </Flex>
    </NextLink>
  )
}
