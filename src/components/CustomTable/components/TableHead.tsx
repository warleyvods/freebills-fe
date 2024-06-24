import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup
} from "@chakra-ui/react";
import { TbArrowsSort } from "react-icons/tb";
import { ArrowDownIcon, ArrowUpIcon, CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { TableHeadProps } from "../types/ColumnTypes";
import { ChangeEvent, useEffect, useState } from "react";


export default function TableHead({buttonOptions, menuOptions, onActiveButton, onKeyword, onSort, activeSearch}: TableHeadProps) {
  const [attribute, setAttribute] = useState(menuOptions[0].value);
  const [activeButton, setActiveButton] = useState(buttonOptions[0].value);
  const [sortValue, setSortValue] = useState('asc');
  const [searchTerm, setSearchTerm] = useState("");
  const [sortComplete, setSortComplete] = useState('');


  useEffect(() => {
    const timer = setTimeout(() => {
      onKeyword(searchTerm);
    }, 500);


    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm, onKeyword]);

  useEffect(() => {
    setSortComplete(`${attribute},${sortValue}`);
    onSort(sortComplete)
  }, [attribute, sortValue, onSort, sortComplete]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setSearchTerm(e.target.value);
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    onActiveButton(buttonName)
  };

  const handleMenuClickAttribute = (value) => {
    setAttribute(value);
    setSortComplete(`${value},${sortValue}`);
  };

  const handleMenuClickSort = (value) => {
    setSortValue(value);
    setSortComplete(`${attribute},${value}`);
  };

  const handleClearInput = () => {
    setSearchTerm("");
  };

  return (
    <Flex p={"8px"}
          h={"50px"}
          w={"full"}
          bg={"white"}
          borderTopRadius={"5px"}
          color={"gray.100"}
          borderLeft={"1px"}
          borderRight={"1px"}
          borderTop={"1px"}
          justifyContent={"space-between"}
    >
      <HStack w={"full"}>
        {buttonOptions.map((option) => (
          <Button
            key={option.value}
            variant="ghost"
            size="sm"
            fontWeight="medium"
            color={"black"}
            bg={activeButton === option.value ? "lime.500" : "initial"}
            _hover={{bg: "lime.500"}}
            onClick={() => handleButtonClick(option.value)}
            isDisabled={!option.active}
          >
            {option.label}
          </Button>
        ))}
      </HStack>

      <HStack spacing={"2px"}>
        {activeSearch && (
          <InputGroup>
            {/* eslint-disable-next-line react/no-children-prop */}
            <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.500" />} />
            <Input
              color={"black"}
              focusBorderColor={"gray.700"}
              type="text"
              placeholder={"Pesquisar por nome"}
              value={searchTerm}
              onChange={handleInputChange}
            />
            {searchTerm && (
              <InputRightElement width="4.5rem">
                <IconButton
                  bg={"gray.50"}
                  rounded={'full'}
                  aria-label="limpar pesquisa"
                  icon={<CloseIcon fontSize={"8px"} fontWeight={"bold"} color={"black"} />}
                  style={{width: "18px", height: "18px", minWidth: "12px", minHeight: "12px"}}
                  onClick={handleClearInput}
                />
              </InputRightElement>
            )}
          </InputGroup>
        )}

        <Box padding="0">
          <Menu closeOnSelect={false}>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              _hover={{bg: 'gray.50'}}
              icon={<Icon as={TbArrowsSort} color={'black'} fontSize={'20px'} />}
              variant='outline'
            />
            <MenuList minWidth='240px'>
              <MenuOptionGroup
                color={"black"}
                p={0}
                defaultValue='name'
                title='Ordenar por'
                type='radio'
                onChange={handleMenuClickAttribute}
                value={attribute}
              >
                {menuOptions.map((option) => (
                  <MenuItemOption key={option.value} value={option.value} color={"black"}>
                    {option.label}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
              <MenuDivider />
              <MenuOptionGroup defaultValue='asc' type='radio' onChange={handleMenuClickSort} value={sortValue} >
                <MenuItemOption value='asc' color={"black"}>
                  {<ArrowUpIcon />}
                  A a Z
                </MenuItemOption>
                <MenuItemOption value='desc' color={"black"}>
                  {<ArrowDownIcon />}
                  Z a A
                </MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </Box>
      </HStack>
    </Flex>
  )
}
