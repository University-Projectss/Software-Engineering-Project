import { Flex } from "@chakra-ui/react";
import { CustomText } from "../common/CustomText";

export const NotFound = () => {
  return (
    <Flex
      height="100vh"
      width="100vw"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-evenly"
    >
      <CustomText size="xl">Page not found</CustomText>
    </Flex>
  );
};
