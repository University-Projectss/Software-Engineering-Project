import React, { useContext, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Text,
  useToast,
} from "@chakra-ui/react";
import { colors } from "../../theme";
import { Link } from "react-router-dom";
import { FormField } from "./FormField";
import { ProfileInterface, formData } from "./types";
import { apiClient, authorise } from "../utils/apiClient";
import { UserContext } from "../../App";

export const Profile: React.FC = () => {
  const toast = useToast();
  const auth = useContext(UserContext);
  const [profile, setProfile] = useState<ProfileInterface>({
    firstName: auth.user?.firstName ?? "Anakin",
    lastName: auth.user?.lastName ?? "Skywalker",
    sex: auth.user?.sex ?? "MALE",
    birthDate: auth.user?.birthdate ?? "10/11/1970",
  });

  const handleSubmit = async () => {
    for (let key of Object.keys(profile)) {
      console.log(key);
      if (profile[key] === "") {
        toast({
          title: "Oops",
          description: "Please complete every field!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
    }

    await apiClient
      .post(
        "/patients",
        {
          firstName: profile.firstName,
          lastName: profile.lastName,
          sex: profile.sex.toUpperCase(),
          birthdate: new Date(profile.birthDate),
        }, //not the best way but it works for now
        authorise()
      )
      .then((res) => {
        toast({
          title: "Success!",
          description: "Profile updated",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        toast({
          title: err.response.data.error,
          description: err.response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Box bg="gray.100" height="100vh">
      {/* Blue bar at the top */}
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
        <Text>App Name</Text>
        <Box
          borderRadius="full"
          p={2}
          ml={4}
          display="flex"
          alignItems="center"
        >
          {/* Clickable Blog Text */}
          <Link to="/blog" style={{ textDecoration: "none" }}>
            <Text pr={8}>Blog</Text>
          </Link>

          {/* Clickable Avatar */}
          <Link to="" style={{ textDecoration: "none" }}>
            <Avatar src="https://bit.ly/broken-link" bg={colors.blue} />
          </Link>
        </Box>
      </Box>

      <Grid templateColumns="repeat(2, 1fr)" gap={6} p={8}>
        <GridItem colSpan={1}>
          {/* Form for profile information - left half */}
          <Flex direction={"column"} alignItems={"flex-end"} width={"100%"}>
            <Flex direction={"column"} gap={2} width={"100%"}>
              {/* a better way to render similar items using a map 
            instead of manually writing each item */}
              {formData.map((field) => (
                <FormField
                  key={field.label}
                  label={field.label}
                  type={field.type}
                  profile={profile}
                  setProfile={setProfile}
                />
              ))}
            </Flex>
            <Button
              mt={10}
              alignSelf={"flex-end"}
              bg={colors.blue}
              color="white"
              borderRadius="20px"
              px={10}
              py={8}
              fontSize="xl"
              fontWeight="bold"
              // onClick={handleSubmit}
            >
              Update Profile
            </Button>
          </Flex>
        </GridItem>

        {/* Image and submit/logout button - right half */}
        <GridItem
          colStart={2}
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
          justifyContent="flex-end"
        >
          <img src="../../UserProfileImage.png" alt="Have a great day!" />
          <Button
            mr={20}
            colorScheme="blue"
            borderRadius="20px"
            px={10}
            py={8}
            fontSize="xl"
            fontWeight="bold"
            variant={"outline"}
            onClick={() => {
              auth.logout();
            }}
          >
            Log Out
          </Button>
        </GridItem>
      </Grid>
    </Box>
  );
};
