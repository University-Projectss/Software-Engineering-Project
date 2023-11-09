import { Flex, Image, Text } from "@chakra-ui/react";
import NotFoundSvg from "../../assets/404.svg";

export const NotFound = () => {
  return (
    <Flex direction="column" height="100vh" align="center" justify="center">
      <Image src={NotFoundSvg} width={400} marginBottom={10} />
      <Text
        color="#3F3D56"
        fontFamily="Poppins"
        fontSize={50}
        fontWeight="thin"
      >
        Page not found.
      </Text>
    </Flex>
  );
};
