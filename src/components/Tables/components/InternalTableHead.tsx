import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement, InputRightElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup, useBreakpointValue
} from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon, CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { TbArrowsSort } from "react-icons/tb";

export function InternalTableHead({
  onTableHeadButtonClick,
  onSortCompleteChange,
  menuOptions,
  buttonsOptions,
  onSearchBar,
  activeSearchBar = false,
}) {
  const isMobile = useBreakpointValue({base: true, md: true, lg: false});
  const [activeButton, setActiveButton] = useState("all");
  const [attribute, setAttribute] = useState('');
  const [sortValue, setSortValue] = useState('asc');
  const [, setSortComplete] = useState('');
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchBar(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm, onSearchBar]);

  useEffect(() => {
    setSortComplete(`${attribute},${sortValue}`);
    onSortCompleteChange(`${attribute},${sortValue}`);
  }, [attribute, sortValue]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleMenuClickSort = (value) => {
    setSortValue(value);
    setSortComplete(`${attribute},${value}`);
  };

  const handleMenuClickAttribute = (value) => {
    setAttribute(value);
    setSortComplete(`${value},${sortValue}`);
  };

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    onTableHeadButtonClick(buttonName);
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
          borderTop={"1px"}
          borderBottom={"1px"}
          borderColor={"gray.100"}
          justifyContent={"space-between"}
    >
      <HStack>
        {buttonsOptions.map((option) => (
          <Button
            key={option.value}
            variant="ghost"
            size="sm"
            fontWeight="medium"
            bg={activeButton === option.value ? "lime.500" : "initial"}
            _hover={{bg: "lime.500"}}
            onClick={() => handleButtonClick(option.value)}
            isDisabled={option.active}
          >
            {option.label}
          </Button>
        ))}
      </HStack>

      <HStack spacing={"2px"}>
        {!isMobile && activeSearchBar && (
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<SearchIcon color="gray.300" />} />
            <Input
              focusBorderColor={"gray.700"}
              type="text"
              placeholder={"Pesquisar"}
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

        <Box padding="4px" display="inline-block">
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
                defaultValue='name'
                title='Ordenar por'
                type='radio'
                onChange={handleMenuClickAttribute}
                value={attribute}
              >
                {menuOptions.map((option) => (
                  <MenuItemOption key={option.value} value={option.value}>
                    {option.label}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
              <MenuDivider />
              <MenuOptionGroup defaultValue='asc' type='radio' onChange={handleMenuClickSort} value={sortValue}>
                <MenuItemOption value='asc'>
                  {<ArrowUpIcon />}
                  A a Z
                </MenuItemOption>
                <MenuItemOption value='desc'>
                  {<ArrowDownIcon />}
                  Z a A
                </MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
        </Box>
      </HStack>

    </Flex>
  );
}
