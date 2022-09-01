import SidebarWithHeader from "../../components/SideBar";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  LightMode,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue
} from "@chakra-ui/react";
import NextLink from "next/link";
import { RiAddLine } from "react-icons/ri";
import TagW from "../../components/Tag";


interface ColumnsProps {
  name: string;
}

const LinkItems: Array<ColumnsProps> = [
  {name: 'Situação'},
  {name: 'Data'},
  {name: 'Descrição'},
  {name: 'Categoria'},
  {name: 'Conta'},
  {name: 'Valor'},
  {name: 'Opções'},
];

export default function Transaction() {
  const mainColor = useColorModeValue('white', 'gray.800');


  return (
    <SidebarWithHeader>
      <Box>
        <Flex w="100%" maxWidth={"auto"} mx={"auto"}>
          <Box flex={1} borderRadius={8} p={8} bg={mainColor}>
            <Flex mb={8} justify={"space-between"} align={"center"}>
              <Heading size={"lg"} fontWeight={"bold"}>
                Transações
              </Heading>
              <LightMode>
                <NextLink href={"/users/create"} passHref>
                  <Button as={"a"}
                          size={"sm"}
                          fontSize={"sm"}
                          colorScheme={"red"}
                          leftIcon={<Icon as={RiAddLine} fontSize={"20"} />}
                  >Adicionar novo
                  </Button>
                </NextLink>
              </LightMode>
            </Flex>
            <>
              <Table bg={mainColor}>
                <Thead>
                  <Tr>
                    {LinkItems.map((columns, index) => (
                      <Th key={columns.name}>
                        <Flex
                          justify={"center"}>
                          {columns.name}
                        </Flex>
                      </Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td textAlign={"center"}>
                      <TagW colorScheme={"green"} label={"PAGO"} />
                    </Td>
                    <Td>
                      <Text textAlign={"center"} fontWeight={"bold"}
                            color={mainColor == 'white' ? 'gray.700' : 'purple.400'}>31/08/2022</Text>
                    </Td>
                    <Td>
                      <Text textAlign={"center"} fontWeight={"bold"}
                            color={mainColor == 'white' ? 'gray.700' : 'purple.400'}>Marmitex</Text>
                    </Td>
                    <Td>
                      <Text textAlign={"center"} fontWeight={"bold"}
                            color={mainColor == 'white' ? 'gray.700' : 'purple.400'}>Alimentação</Text>
                    </Td>
                    <Td>
                      <Text textAlign={"center"} fontWeight={"bold"}
                            color={mainColor == 'white' ? 'gray.700' : 'purple.400'}>INTER</Text>
                    </Td>
                    <Td>
                      <Text textAlign={"center"} fontWeight={"bold"}
                            color={mainColor == 'white' ? 'gray.700' : 'purple.400'}>R$ 15,00</Text>
                    </Td>
                    <Td>
                      <Text textAlign={"center"} fontWeight={"bold"}
                            color={mainColor == 'white' ? 'gray.700' : 'purple.400'}>Marmitex</Text>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </>
          </Box>
        </Flex>
      </Box>
    </SidebarWithHeader>
  )
};
