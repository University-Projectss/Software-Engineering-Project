import { Flex } from "@chakra-ui/react";
import { CustomText } from "../common/CustomText";

export const Home = () => {
  return (
    <Flex height="100vh" align="center" justify="center">
      <CustomText>Hello there from home</CustomText>
    </Flex>
  );
};
