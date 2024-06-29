import React from 'react'
import { chakra, IconProps, Image } from '@chakra-ui/react'
import { ToolIcon } from "../../icons";

type Props = {
  icon?: string | null
  emojiFontSize?: string
  boxSize?: string
  defaultIcon?: (props: IconProps) => JSX.Element
}

export const EmojiOrImageIcon = ({
  icon,
  boxSize = '25px',
  emojiFontSize,
  defaultIcon = ToolIcon,
}: Props) => {
  return (
    <>
      {icon ? (
        icon.startsWith('http') || isSvgSrc(icon) ? (
          <Image
            src={icon}
            boxSize={boxSize}
            objectFit={isSvgSrc(icon) ? undefined : 'cover'}
            alt="icon"
            rounded="10%"
          />
        ) : (
          <chakra.span role="img" fontSize={emojiFontSize}>
            {icon}
          </chakra.span>
        )
      ) : (
        defaultIcon({ boxSize: "25px" })
      )}
    </>
  )
}

export const isSvgSrc = (src: string | undefined) =>
  src?.startsWith('data:image/svg') || src?.endsWith('.svg')
