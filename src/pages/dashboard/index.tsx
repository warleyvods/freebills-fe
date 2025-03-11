import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Spinner,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  useBreakpointValue,
  useColorModeValue,
  VStack,
  Button,
  Heading,
  Select,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useMe } from "../../hooks/users/useMe";
import SideBarLayout from "../../components/SidebarLayout/SideBarLayout";
import CardsSkeleton from "../../components/Cards/CardsSkeleton";
import CardsDashboard from "../../components/Cards/CardsDashboard";
import { moneyFormat } from "../../components/Utils/utils";
import { MdOutlineAttachMoney, MdDashboard, MdCalendarViewMonth } from "react-icons/md";
import { RiArrowDownLine, RiArrowUpLine, RiWalletLine, RiBankCardLine } from "react-icons/ri";
import { useDashboard } from "../../hooks/dashboard/useDashboard";
import { FaChartBar, FaChevronDown } from "react-icons/fa";

export default function Dashboard() {
  const isMobile = useBreakpointValue({ base: true, md: true, lg: false });
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const { data: totalData, isLoading: totalIsLoading } = useDashboard(month, year);
  const { data: user } = useMe();

  // Cores para temas claro e escuro
  const bgGradient = useColorModeValue(
    "linear(to-br, blue.50, purple.50, pink.50)",
    "linear(to-br, blue.900, purple.900, gray.800)"
  );
  const cardBg = useColorModeValue("rgba(255, 255, 255, 0.9)", "rgba(45, 55, 72, 0.7)");
  const glassBg = useColorModeValue("rgba(255, 255, 255, 0.7)", "rgba(26, 32, 44, 0.7)");
  const borderColor = useColorModeValue("rgba(226, 232, 240, 0.8)", "rgba(74, 85, 104, 0.4)");
  const headingColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.400");
  const glowColor = useColorModeValue("0 0 15px rgba(66, 153, 225, 0.3)", "0 0 15px rgba(154, 230, 180, 0.3)");
  const accentColor = useColorModeValue("blue.500", "blue.300");
  
  // Array de meses para seleção
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  
  // Gera array de anos (5 anos anteriores até o ano atual)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - 5 + i);

  // Manipuladores de alteração de data
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(parseInt(e.target.value));
  };

  // Simulação de dados para porcentagens (em um app real, isso viria da API)
  const revenueChange = "+12.5%";
  const expenseChange = "+8.7%";
  const cardExpenseChange = "+5.2%";

  if (totalIsLoading) {
    return (
      <SideBarLayout>
        <Box
          w="full"
          p={4}
          borderRadius="lg"
          bgGradient={bgGradient}
          boxShadow="sm"
          my={4}
        >
          <Flex 
            justifyContent="space-between" 
            h="70px" 
            alignItems="center" 
            p={isMobile ? "5px" : "0px"}
          >
            <HStack spacing="10px">
              <Text 
                fontSize="22px" 
                fontWeight="medium" 
                color={headingColor}
              >
                Dashboard
              </Text>
              <Spinner size="sm" color="blue.500" />
            </HStack>
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} spacing="24px" pb={6} pt={6}>
            <CardsSkeleton />
            <CardsSkeleton />
            <CardsSkeleton />
            <CardsSkeleton />
          </SimpleGrid>
        </Box>
      </SideBarLayout>
    );
  }

  return (
    <SideBarLayout>
      <Box
        w="full"
        p={6}
        borderRadius="xl"
        bgGradient={bgGradient}
        boxShadow="lg"
        my={4}
        transition="all 0.3s"
        backgroundSize="cover"
        backgroundPosition="center"
        position="relative"
        overflow="hidden"
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 0,
          background: useColorModeValue(
            "radial-gradient(circle at top right, rgba(144, 205, 244, 0.1), transparent 40%)",
            "radial-gradient(circle at top right, rgba(72, 126, 176, 0.1), transparent 40%)"
          ),
        }}
      >
        {/* Círculo decorativo para o fundo */}
        <Box
          position="absolute"
          top="-120px"
          right="-120px"
          borderRadius="full"
          width="300px"
          height="300px"
          bg={useColorModeValue("blue.50", "blue.900")}
          opacity="0.4"
          zIndex="0"
        />
        
        <Box position="relative" zIndex="1">
          {/* Welcome message */}
          <Box mb={8}>
            <Flex 
              alignItems={{ base: "flex-start", md: "center" }}
              flexDirection={{ base: "column", md: "row" }}
              justifyContent="space-between"
            >
              <VStack alignItems="flex-start" spacing={1}>
                <Text color={subTextColor} fontWeight="medium">
                  Olá, {user?.name || "Usuário"}
                </Text>
                <HStack spacing="10px" alignItems="center">
                  <Icon as={MdDashboard} fontSize="2xl" color={accentColor} />
                  <Heading size="lg" color={headingColor} fontWeight="bold">
                    Dashboard Financeiro
                  </Heading>
                  {totalIsLoading && <Spinner size="sm" color={accentColor} />}
                </HStack>
                <Text color={subTextColor} fontSize="sm">
                  Acompanhe seu fluxo financeiro em tempo real
                </Text>
              </VStack>

              <HStack 
                spacing={3} 
                bg={glassBg}
                p={3}
                borderRadius="lg"
                boxShadow="sm"
                backdropFilter="blur(8px)"
                mt={{ base: 4, md: 0 }}
              >
                <Select
                  size="md"
                  value={month}
                  onChange={handleMonthChange}
                  bg={cardBg}
                  borderColor={borderColor}
                  w={{ base: "full", md: "180px" }}
                  icon={<FaChevronDown />}
                  _hover={{ borderColor: accentColor }}
                  boxShadow="sm"
                >
                  {months.map((monthName, idx) => (
                    <option key={idx} value={idx + 1}>
                      {monthName}
                    </option>
                  ))}
                </Select>

                <Select
                  size="md"
                  value={year}
                  onChange={handleYearChange}
                  bg={cardBg}
                  borderColor={borderColor}
                  w={{ base: "full", md: "120px" }}
                  icon={<FaChevronDown />}
                  _hover={{ borderColor: accentColor }}
                  boxShadow="sm"
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </Select>
              </HStack>
            </Flex>
          </Box>

          <SimpleGrid columns={{ base: 1, sm: 2, xl: 4 }} spacing={{ base: 4, lg: 6 }} mb={8}>
            <Box
              bg={cardBg}
              p={5}
              borderRadius="xl"
              boxShadow="lg"
              borderWidth="1px"
              borderColor={borderColor}
              transition="all 0.3s"
              backdropFilter="blur(8px)"
              _hover={{ transform: "translateY(-5px)", boxShadow: glowColor }}
            >
              <Flex justifyContent="space-between" alignItems="center" mb={2}>
                <Text fontSize="lg" fontWeight="medium" color={headingColor}>
                  Saldo Atual
                </Text>
                <Icon 
                  as={MdOutlineAttachMoney} 
                  boxSize={10} 
                  p={2} 
                  bg={useColorModeValue("blue.50", "blue.900")}
                  color={accentColor}
                  borderRadius="full"
                  boxShadow="0 0 10px rgba(66, 153, 225, 0.3)"
                />
              </Flex>
              <Text fontSize="2xl" fontWeight="bold" color={accentColor}>
                {moneyFormat(totalData?.totalBalance || 0)}
              </Text>
              <Text fontSize="sm" color={subTextColor} mt={1}>
                Atualizado em {months[month - 1]}/{year}
              </Text>
            </Box>

            <Box
              bg={cardBg}
              p={5}
              borderRadius="xl"
              boxShadow="lg"
              borderWidth="1px"
              borderColor={borderColor}
              transition="all 0.3s"
              backdropFilter="blur(8px)"
              _hover={{ transform: "translateY(-5px)", boxShadow: glowColor }}
            >
              <Flex justifyContent="space-between" alignItems="center" mb={2}>
                <Text fontSize="lg" fontWeight="medium" color={headingColor}>
                  Receitas
                </Text>
                <Icon 
                  as={RiArrowDownLine} 
                  boxSize={10} 
                  p={2} 
                  bg={useColorModeValue("green.50", "green.900")}
                  color="green.500"
                  borderRadius="full"
                  boxShadow="0 0 10px rgba(72, 187, 120, 0.3)"
                />
              </Flex>
              <Text fontSize="2xl" fontWeight="bold" color="green.500">
                {moneyFormat(totalData?.totalRevenue || 0)}
              </Text>
              <Flex alignItems="center" justifyContent="space-between" mt={1}>
                <Flex alignItems="center">
                  <Stat size="sm" display="inline-flex">
                    <StatArrow type="increase" color="green.500" />
                  </Stat>
                  <Text fontSize="sm" color={subTextColor}>
                    Entrada no mês
                  </Text>
                </Flex>
                <Text fontSize="sm" fontWeight="medium" color="green.500">
                  {revenueChange}
                </Text>
              </Flex>
            </Box>

            <Box
              bg={cardBg}
              p={5}
              borderRadius="xl"
              boxShadow="lg"
              borderWidth="1px"
              borderColor={borderColor}
              transition="all 0.3s"
              backdropFilter="blur(8px)"
              _hover={{ transform: "translateY(-5px)", boxShadow: glowColor }}
            >
              <Flex justifyContent="space-between" alignItems="center" mb={2}>
                <Text fontSize="lg" fontWeight="medium" color={headingColor}>
                  Despesas
                </Text>
                <Icon 
                  as={RiArrowUpLine} 
                  boxSize={10} 
                  p={2} 
                  bg={useColorModeValue("red.50", "red.900")}
                  color="red.500"
                  borderRadius="full"
                  boxShadow="0 0 10px rgba(229, 62, 62, 0.3)"
                />
              </Flex>
              <Text fontSize="2xl" fontWeight="bold" color="red.500">
                {moneyFormat(totalData?.totalExpensive || 0)}
              </Text>
              <Flex alignItems="center" justifyContent="space-between" mt={1}>
                <Flex alignItems="center">
                  <Stat size="sm" display="inline-flex">
                    <StatArrow type="decrease" color="red.500" />
                  </Stat>
                  <Text fontSize="sm" color={subTextColor}>
                    Saída no mês
                  </Text>
                </Flex>
                <Text fontSize="sm" fontWeight="medium" color="red.500">
                  {expenseChange}
                </Text>
              </Flex>
            </Box>

            <Box
              bg={cardBg}
              p={5}
              borderRadius="xl"
              boxShadow="lg"
              borderWidth="1px"
              borderColor={borderColor}
              transition="all 0.3s"
              backdropFilter="blur(8px)"
              _hover={{ transform: "translateY(-5px)", boxShadow: glowColor }}
            >
              <Flex justifyContent="space-between" alignItems="center" mb={2}>
                <Text fontSize="lg" fontWeight="medium" color={headingColor}>
                  Cartões de Crédito
                </Text>
                <Icon 
                  as={RiBankCardLine} 
                  boxSize={10} 
                  p={2} 
                  bg={useColorModeValue("purple.50", "purple.900")}
                  color="purple.500"
                  borderRadius="full"
                  boxShadow="0 0 10px rgba(159, 122, 234, 0.3)"
                />
              </Flex>
              <Text fontSize="2xl" fontWeight="bold" color="purple.500">
                {moneyFormat(totalData?.totalExpensiveCards || 0)}
              </Text>
              <Flex alignItems="center" justifyContent="space-between" mt={1}>
                <Flex alignItems="center">
                  <Stat size="sm" display="inline-flex">
                    <StatArrow type="decrease" color="purple.500" />
                  </Stat>
                  <Text fontSize="sm" color={subTextColor}>
                    Gastos em cartões
                  </Text>
                </Flex>
                <Text fontSize="sm" fontWeight="medium" color="purple.500">
                  {cardExpenseChange}
                </Text>
              </Flex>
            </Box>
          </SimpleGrid>

          <Grid 
            templateColumns={{ base: "1fr", lg: "1fr 350px" }} 
            gap={6} 
            display={{ base: "none", md: "grid" }}
          >
            <GridItem>
              <Box
                bg={cardBg}
                p={5}
                borderRadius="xl"
                boxShadow="lg"
                borderWidth="1px"
                borderColor={borderColor}
                h="300px"
                display="flex"
                backdropFilter="blur(8px)"
                flexDirection="column"
              >
                <Flex justifyContent="space-between" alignItems="center" mb={4}>
                  <Text fontSize="lg" fontWeight="semibold" color={headingColor}>
                    Análise Financeira
                  </Text>
                  <Icon as={FaChartBar} color={accentColor} />
                </Flex>
                <Divider mb={4} />
                <Flex justifyContent="center" alignItems="center" flex={1}>
                  <VStack spacing={2}>
                    <Icon as={FaChartBar} boxSize={14} color={accentColor} opacity={0.7} />
                    <Text color={subTextColor} fontWeight="medium" textAlign="center">
                      Visualize seus dados financeiros<br/>em gráficos detalhados
                    </Text>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      variant="outline"
                      leftIcon={<Icon as={FaChartBar} />}
                      mt={2}
                    >
                      Ver detalhes
                    </Button>
                  </VStack>
                </Flex>
              </Box>
            </GridItem>
            <GridItem>
              <Box
                bg={cardBg}
                p={5}
                borderRadius="xl"
                boxShadow="lg"
                borderWidth="1px"
                borderColor={borderColor}
                h="300px"
                display="flex"
                backdropFilter="blur(8px)"
                flexDirection="column"
              >
                <Flex justifyContent="space-between" alignItems="center" mb={4}>
                  <Text fontSize="lg" fontWeight="semibold" color={headingColor}>
                    Resumo de Contas
                  </Text>
                  <Icon as={RiWalletLine} color={accentColor} />
                </Flex>
                <Divider mb={4} />
                <Flex justifyContent="center" alignItems="center" flex={1}>
                  <VStack spacing={2}>
                    <Icon as={RiWalletLine} boxSize={14} color={accentColor} opacity={0.7} />
                    <Text color={subTextColor} fontWeight="medium" textAlign="center">
                      Visualize o saldo de<br/>todas as suas contas
                    </Text>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      variant="outline"
                      leftIcon={<Icon as={RiWalletLine} />}
                      mt={2}
                    >
                      Gerenciar Contas
                    </Button>
                  </VStack>
                </Flex>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </SideBarLayout>
  );
}
