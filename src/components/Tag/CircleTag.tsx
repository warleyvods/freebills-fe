import { Circle, Tooltip, useColorMode } from "@chakra-ui/react";
import { CheckIcon, SmallCloseIcon } from "@chakra-ui/icons";
import React from "react";

type CircleProps = {
  isPaid?: boolean;
}

export function CircleTag({ isPaid = false }: CircleProps) {
  const {colorMode} = useColorMode();

  const getColor = (lightColor: string, darkColor: string) => {
    return colorMode === 'light' ? lightColor : darkColor;
  };

  return (
    <Tooltip label={isPaid ? 'Pago' : 'Pendente'} placement='auto-start'>
      <Circle size="20px"
              bg={isPaid ? getColor("lime.400", "#426241") : getColor("littlePink.400", "#624141")}
              color={isPaid ? getColor("lime.600", "#8FFF8E") : getColor("littlePink.600", "#FF8E8E")}
              border={"1px"}
              borderColor={isPaid ? getColor("lime.500", "#426241") : getColor("littlePink.500", "#624141")}
      >
        {
          isPaid ? (
            <CheckIcon h={"10px"} />
          ) : (
            <SmallCloseIcon h={"14px"} />
          )
        }
      </Circle>
    </Tooltip>
  )
}
