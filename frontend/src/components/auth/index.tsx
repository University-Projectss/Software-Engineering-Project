import { useContext, useState } from "react";
import { DataInterface } from "./types";
import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { CustomInput } from "./CustomInput";
import DoctorsSVG from "../../assets/doctors.svg";
import { UserContext } from "../../App";
import { colors } from "../../theme";
import { CustomText } from "../common/CustomText";

export const Auth = () => {
  const userContext = useContext(UserContext);
  const [authState, setAuthState] = useState<"Login" | "Register">("Login");
  const [data, setData] = useState<DataInterface>({ email: "", password: "" });
  const [errors, setErrors] = useState<DataInterface>({
    email: "",
    password: "",
  });

  const handleChangeAuthState = () => {
    setAuthState(authState === "Login" ? "Register" : "Login");
  };

  const handleSubmit = () => {
    if (data.email === "" || data.password === "") {
      setErrors({
        email: data.email === "" ? "Error!" : "",
        password: data.password === "" ? "Error!" : "",
      });
    } else {
      userContext.login();
    }
  };

  return (
    <Flex h="100vh" w="100vw" align="center">
      {/* Left Side */}
      <Flex
        w="50%"
        h="100vh"
        overflow="hidden"
        flexDir="column"
        justify="space-evenly"
        align="center"
        pl="4"
      >
        <Box p="4">
          <CustomText color={colors.blue} fontSize="7xl" fontWeight="black">
            WELCOME
          </CustomText>
          <CustomText color={colors.blue} fontWeight="regular" fontSize={15}>
            Seamless Care, Endless Possibilities: Welcome to Our Virtual Healing
            Hub.
          </CustomText>
        </Box>
        <Image marginLeft={10} src={DoctorsSVG} />
      </Flex>

      {/* Right Side */}
      <Flex
        pos="relative"
        w="50%"
        h="100%"
        flexDir="column"
        align="center"
        justify="center"
      >
        {/* Top Section */}
        <Flex h="33vh" flexDir="column" justify="center" pos="relative">
          <CustomText
            pos="absolute"
            top="0"
            left="0"
            color={colors.blue}
            fontSize="4xl"
            fontWeight="bold"
          >
            {authState}
          </CustomText>
          <CustomInput
            type="text"
            value={data.email}
            error={errors.email}
            setValue={(e) => setData({ ...data, email: e })}
          />
          <CustomInput
            type="password"
            isLast
            value={data.password}
            error={errors.password}
            setValue={(e) => setData({ ...data, password: e })}
          />
          <Button
            onClick={handleSubmit}
            pos="absolute"
            bottom="0"
            right="0"
            bg={colors.blue}
            color="white"
            px="7"
            py="3"
            variant=""
          >
            {authState}
          </Button>
        </Flex>

        {/* Bottom Section */}
        <Flex pos="absolute" bottom="4" color={colors.blue}>
          <CustomText mr="1">
            {authState === "Login" ? "Don't" : "Already"} have an account?
          </CustomText>
          <CustomText
            fontWeight="bold"
            textDecoration="underline"
            cursor="pointer"
            onClick={handleChangeAuthState}
          >
            {authState === "Login" ? "Create one!" : "Login!"}
          </CustomText>
        </Flex>
      </Flex>
    </Flex>
  );
};
