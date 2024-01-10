import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { colors } from "../../theme";

export const NavBar = () => {
  return (
    <Box
      bg={colors.blue}
      color="white"
      fontSize="3xl"
      fontWeight="bold"
      p={3}
      pl={12}
      pr={4}
      mb={4}
      borderBottomRadius="30px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Flex gap={1} alignItems={"center"}>
        <Image src="/logo.png" width={20} />
        <Text fontFamily={"Rubik Moonrocks"}>MinnieHealth</Text>
      </Flex>
      <Box borderRadius="full" p={2} ml={4} display="flex" alignItems="center">
        {/* Clickable Blog Text */}
        <Link to="/blog" style={{ textDecoration: "none" }}>
          <Text pr={8}>Blog</Text>
        </Link>
        {/* Clickable Avatar */}
        <Link to="/profile" style={{ textDecoration: "none" }}>
          <Avatar src="https://bit.ly/broken-link" bg={colors.blue} />
        </Link>
      </Box>
    </Box>
  );
};
