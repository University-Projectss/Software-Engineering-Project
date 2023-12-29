import React, { FormEvent, useState } from "react";
import { Avatar, Box, Button, Grid, GridItem, Text } from "@chakra-ui/react";
import { colors } from "../../theme";
import { Link } from "react-router-dom";
import { FormField } from "./FormField";
import { ProfileInterface } from "./types";

export const Profile: React.FC = () => {
  const [authState] = useState<"Login" | "Register">("Login");
  const [profile, setProfile] = useState<ProfileInterface>({
    fullName: "",
    email: "",
    dateOfBirth: "",
    gender: "Male",
    height: 155,
    weight: 60,
    knownDiseases: "Autism",
    allergies: "",
    pastSurgeries: "",
    currentMedications: "",
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    // Don't know what should go here yet
  }

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
          <form onSubmit={handleSubmit}>
            <FormField
              label="Full Name"
              input={profile.fullName}
              type="string"
            />
            <FormField label="Email" input={profile.email} type="string" />

            <br></br>
            <br></br>

            <FormField
              label="Date of Birth"
              input={profile.dateOfBirth}
              type="string"
            />
            <FormField label="Gender" input={profile.gender} type="string" />
            <FormField label="Height" input={profile.height} type="number" />
            <FormField label="Weight" input={profile.weight} type="number" />

            <br></br>
            <br></br>

            <FormField
              label="Known Diseases"
              input={profile.knownDiseases}
              type="string"
            />
            <FormField
              label="Allergies"
              input={profile.allergies}
              type="string"
            />
            <FormField
              label="Past Surgeries"
              input={profile.pastSurgeries}
              type="string"
            />
            <FormField
              label="Current Medications"
              input={profile.currentMedications}
              type="string"
            />
          </form>
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
            bg={colors.blue}
            color="white"
            borderRadius="20px"
            h="80px"
            w="250px"
            fontSize="3xl"
            fontWeight="bold"
          >
            {authState === "Login" ? "Submit" : "Log Out"}
          </Button>
        </GridItem>
      </Grid>
    </Box>
  );
};
