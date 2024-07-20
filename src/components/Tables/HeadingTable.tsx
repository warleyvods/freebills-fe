import { Button, Flex, HStack, Spinner, Text, useBreakpointValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { RiAddLine } from "react-icons/ri";

type HeadingProps = {
  title: string;
  titleButton?: string;
  path?: string;
  isLoading?: boolean;
  isFetching?: boolean;
  contentLength?: number;
  activeButton?: boolean;
}

export default function HeadingTable({
  title,
  titleButton,
  contentLength,
  path,
  isFetching,
  isLoading,
  activeButton = false
}: HeadingProps) {
  const isMobile = useBreakpointValue({base: true, md: true, lg: false});

  return (
    <Flex justifyContent={"space-between"} h={"70px"} alignItems={"center"} p={isMobile ? '5px' : '0px'}>
      <HStack spacing={"10px"}>
        <>
          <Text fontSize={"22px"} fontWeight={"medium"}>{title}</Text>
          {isLoading && (
            <Spinner size={"sm"} />
          )}
        </>
      </HStack>
      <HStack>
        {
          contentLength === 0 ? (
            <Button
              fontSize={"sm"}
              fontWeight={"medium"}
              variant={"ghost"}
            >
              Importar
            </Button>
          ) : (
            <>
              {
                isMobile && !!titleButton ? (
                  <NextLink href={path} passHref>
                    <Button variant={"default"} leftIcon={<RiAddLine fontSize={"20"} />}>
                      {titleButton}
                    </Button>
                  </NextLink>
                ) : (
                  <>
                    {
                      activeButton && (
                        <>
                          <Button
                            fontSize={"sm"}
                            fontWeight={"medium"}
                            variant={"ghost"}
                            isDisabled={true}
                          >
                            Exportar
                          </Button>
                          <Button
                            fontSize={"sm"}
                            fontWeight={"medium"}
                            variant={"ghost"}
                            isDisabled={true}
                          >
                            Importar
                          </Button>
                        </>
                      )
                    }
                    {/* BOTAO DESKTOP */}
                    {
                      !!titleButton && (
                        <NextLink href={path} passHref>
                          <Button
                            as={"a"}
                            variant={"default"}
                            leftIcon={<RiAddLine fontSize={"20"} />}>
                            {titleButton}
                          </Button>
                        </NextLink>
                      )
                    }
                  </>
                )
              }
            </>
          )
        }
      </HStack>
    </Flex>
  )
};
