import React, { ReactNode } from "react";
import { Text, TextProps } from "@chakra-ui/react";

interface CustomTextProps extends TextProps {
  children: ReactNode;
}

export const CustomText: React.FC<CustomTextProps> = ({
  children,
  ...others
}) => {
  return (
    <Text {...others} fontFamily="Poppins">
      {children}
    </Text>
  );
};
