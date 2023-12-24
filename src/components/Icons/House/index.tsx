import { Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";

type CustomIconProps = {
  icon?: IconType;
  value?: string;
  color?: string;
}

export const CustomIcon = ({icon, value, ...rest}: CustomIconProps) => {
  if (icon && !value) {
    return (
      <Icon
        boxSize={6}
        // fill="none"
        // strokeLinecap="round"
        // strokeLinejoin="round"
        // strokeWidth="1.5"
        // viewBox="0 0 24 24"
        as={icon}
        {...rest}
      />
    );
  } else if (!icon && value) {
    return (
      <Icon
        boxSize={6}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
        stroke="currentColor"
        {...rest}
      >
        <path d={value} />
      </Icon>
    );
  } else {
    return null;
  }
};
