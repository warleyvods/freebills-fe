import React from 'react';
import { Tag as TagCustom, TagLabel } from "@chakra-ui/react";

type TagProps = {
  colorScheme: string;
  label: string;
}

const TagW = ({colorScheme, label}: TagProps) => {
  return (
    <TagCustom
      size={"sm"}
      borderRadius='full'
      variant='solid'
      colorScheme={colorScheme}
    >
      <TagLabel>{label}</TagLabel>
    </TagCustom>
  )
}

export default TagW;
