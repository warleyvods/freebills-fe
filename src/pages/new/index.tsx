import { Avatar, Box, Button, Flex, HStack, Input, PinInputField, PinInput } from "@chakra-ui/react";

export const New = () => {
  return (
    <Flex minW={"100px"} minH={"100px"} flexDirection={"column"} justify={"center"} mt={"50px"}>
      <Box maxH={"100px"} maxW={"100px"}>
        <Avatar
          src="https://img.elo7.com.br/product/zoom/3254FDB/bob-esponja-e-patrick-em-camadas-arquivo-de-corte-personalizados-bob-esponja-e-patrick.jpg"
          size="lg"
        />
        <HStack>
          <PinInput type='alphanumeric'>
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>
        <Button>ENTRAR</Button>
      </Box>
    </Flex>
  );
}

export default New;
