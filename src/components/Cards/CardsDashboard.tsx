import {
  Box,
  Circle,
  Flex,
  HStack,
  Icon,
  Text,
  useColorModeValue,
  VStack,
  Tooltip,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
} from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";
import Counter from "../Form/Counter";
import { moneyFormat } from "../Utils/utils";

type DashBoardProps = {
  description?: string;
  value?: string;
  color?: string;
  icon?: IconType;
  path?: string;
  amountCounter?: number;
  trend?: "increase" | "decrease";
  subtitle?: string;
}

export default function CardsDashboard({
  icon,
  description,
  value,
  color,
  amountCounter,
  path,
  trend,
  subtitle
}: DashBoardProps) {
  const borderColor = useColorModeValue("rgba(226, 232, 240, 0.8)", "rgba(74, 85, 104, 0.4)");
  const bg = useColorModeValue("rgba(255, 255, 255, 0.8)", "rgba(45, 55, 72, 0.7)");
  const textColor = useColorModeValue("gray.700", "gray.200");
  const subtitleColor = useColorModeValue("gray.500", "gray.400");
  const iconBgColor = useColorModeValue(`${color}15`, `${color}20`);
  const hoverBorderColor = useColorModeValue(color, `${color}80`);
  const hoverShadow = useColorModeValue(
    `0 8px 20px -8px ${color}50`,
    `0 8px 20px -8px ${color}30`
  );

  return (
    <Box
      w="auto"
      minH="120px"
      maxH="120px"
      h="120px"
      borderRadius="xl"
      p="20px"
      boxShadow="lg"
      as={path ? "a" : "div"}
      {...(path && { href: path })}
      border="1px"
      borderColor={borderColor}
      bg={bg}
      transition="all 0.3s ease"
      position="relative"
      backdropFilter="blur(10px)"
      _hover={{
        transform: "translateY(-7px)",
        boxShadow: hoverShadow,
        borderColor: hoverBorderColor,
      }}
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
          `radial-gradient(circle at bottom right, ${color}10, transparent 70%)`,
          `radial-gradient(circle at bottom right, ${color}10, transparent 70%)`
        ),
      }}
    >
      <Flex justifyContent="space-between" align="center" h="full" position="relative" zIndex={1}>
        <VStack justify="flex-start" align="start" spacing={2}>
          <Flex alignItems="center">
            <Text
              fontWeight="medium"
              fontSize={{ base: "1rem", sm: "1.1rem", md: "1rem" }}
              color={textColor}
              mr={2}
            >
              {description}
            </Text>
            {trend && (
              <Badge
                ml={1}
                colorScheme={trend === "increase" ? "green" : "red"}
                fontSize="xs"
                borderRadius="full"
                px={2}
                variant="subtle"
              >
                {trend === "increase" ? "▲" : "▼"}
              </Badge>
            )}
          </Flex>
          
          {amountCounter && amountCounter > 0 ? (
            <Counter
              targetValue={amountCounter}
              direction="up"
              fontSize="1.5rem"
              fontWeight="bold"
            />
          ) : (
            <Text 
              fontWeight="bold" 
              fontSize="1.5rem"
              color={color}
              letterSpacing="tight"
            >
              {value || moneyFormat(0)}
            </Text>
          )}
          
          {subtitle && (
            <Flex alignItems="center" mt={0}>
              {trend && (
                <Stat size="sm" display="inline-flex">
                  <StatArrow type={trend} color={trend === "increase" ? "green.500" : "red.500"} />
                </Stat>
              )}
              <Text fontSize="0.85rem" color={subtitleColor}>
                {subtitle}
              </Text>
            </Flex>
          )}
        </VStack>
        
        {icon && (
          <Tooltip label={description} placement="top" hasArrow>
            <Circle
              size="54px"
              bg={iconBgColor}
              textAlign="center"
              transition="all 0.2s ease"
              boxShadow={`0 4px 12px ${color}25`}
              _hover={{
                bg: color,
                transform: "scale(1.1) rotate(5deg)",
              }}
              _focus={{ boxShadow: 'none' }}
            >
              <Icon
                w="26px"
                h="26px"
                fontSize="22"
                color={color}
                _groupHover={{
                  color: 'white',
                }}
                as={icon}
              />
            </Circle>
          </Tooltip>
        )}
      </Flex>
    </Box>
  );
}
