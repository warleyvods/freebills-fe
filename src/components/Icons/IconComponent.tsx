import React from "react";
import { Box } from "@chakra-ui/react";
import { icons } from "./icons";

interface IconProps {
  name: string;
  width?: string;
  height?: string;
}

const IconComponent: React.FC<IconProps> = ({ name, width , height }) => {
  const svgString = icons[name];

  if (!svgString) {
    console.error(`Ícone '${name}' não encontrado`);
    return null;
  }

  const svgWithDimensions = svgString(Number(width), Number(height));
  return (
    <Box dangerouslySetInnerHTML={{ __html: svgWithDimensions }} />
  );
};

export default IconComponent;
