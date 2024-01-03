import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Text,
  Divider,
  Flex,
  Avatar,
  Tabs,
  TabList,
  TabPanels,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { TicketsTab } from "./TicketsTab";
import { TicketsTabContent } from "./TicketsTabContent";
import { colors } from "../../theme";
import { apiClient, authorise } from "../utils/apiClient";
import { TicketInterface } from "./types";
import { TicketForm } from "./ticketForm";
import {
  ProfileInterface,
  defaultProfileValues,
  formData,
} from "../profile/types";
import { FormField } from "../profile/FormField";

export const Home: React.FC = () => {
  const auth = useContext(UserContext);
  const toast = useToast();
  const [tickets, setTickets] = useState<TicketInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const openedTickets = tickets.filter((ticket) => ticket.status === "OPENED");
  const closedTickets = tickets.filter((ticket) => ticket.status === "CLOSED");

  const numOpenedTickets = openedTickets.length;
  const numClosedTickets = closedTickets.length;

  const [hasProfile, setHasProfile] = useState<boolean>(false);
  const [profile, setProfile] =
    useState<ProfileInterface>(defaultProfileValues);

  useEffect(() => {
    //check if the user profile exists

    setLoading(true);
    apiClient
      .get("/tickets", authorise())
      .then((res) => {
        setTickets(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: err.response.data.error,
          description: err.response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleCreateProfile = async () => {
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
        setHasProfile(true);
        toast({
          title: "Success!",
          description: "Profile created",
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
      {/* Create profile modal */}
      <Modal
        isOpen={false}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        onClose={() => {
          setHasProfile(true);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create profile</ModalHeader>
          <ModalBody>
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
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              variant="solid"
              onClick={handleCreateProfile}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <Avatar src="https://bit.ly/broken-link" bg={colors.blue} />
          </Link>
        </Box>
      </Box>

      {/* Flex container for greeting text and Open Ticket button */}
      <Flex
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={6}
        p={4}
      >
        {/* Greeting Text */}
        <Text fontSize="4xl" fontWeight="bold" color="black" pl={10}>
          {/* {`Hello ${auth.user?.email},`} */}
          Hello,
          <br />
          we wish you a wonderful day!
        </Text>

        {/* Big "Open Ticket" button */}
        <TicketForm />
      </Flex>

      <Tabs>
        {/* Flex container for buttons */}
        <Flex alignItems="center" mb={4} pl={10}>
          <TabList style={{ borderBottom: "none" }}>
            {/* Opened Tickets Tab Button */}
            <TicketsTab text="Opened Tickets" numTickets={numOpenedTickets} />

            {/* Closed Tickets Tab Button */}
            <TicketsTab text="Closed Tickets" numTickets={numClosedTickets} />
          </TabList>
        </Flex>

        {/* Black horizontal line */}
        <Divider borderColor="black" mt={2} mb={4} />

        {/* Tickets Section */}
        {loading ? (
          <Flex width={"100vw"} justify={"center"}>
            <Spinner />
          </Flex>
        ) : (
          <TabPanels>
            <TicketsTabContent text="Opened Tickets" tickets={openedTickets} />
            <TicketsTabContent text="Closed Tickets" tickets={closedTickets} />
          </TabPanels>
        )}
      </Tabs>
    </Box>
  );
};
