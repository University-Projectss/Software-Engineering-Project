import {
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  TabList,
  TabPanels,
  Tabs,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import { FormField } from "../profile/FormField";
import {
  ProfileInterface,
  defaultProfileValues,
  formData,
} from "../profile/types";
import { apiClient, authorise } from "../utils/apiClient";
import { TicketsTab } from "./TicketsTab";
import { TicketsTabContent } from "./TicketsTabContent";
import { TicketForm } from "./ticketForm";
import { TicketInterface } from "./types";
import { NavBar } from "../common/NavBar";

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
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [profile, setProfile] =
    useState<ProfileInterface>(defaultProfileValues);

  //variabile to refresh tickets list without reloading the whole page
  const [fakeReload, setFakeReload] = useState<boolean>(false);

  useEffect(() => {
    //check if the user profile exists
    apiClient
      .get("/patients/0", authorise())
      .then(async (res) => {
        const profileDetails = res.data;

        const accountDetails = await apiClient.get("/accounts/0", authorise());

        auth.setUser({
          ...auth.user,
          ...profileDetails,
          ...accountDetails.data,
        });
        setHasProfile(true);
      })
      .catch((err) => {
        if (err.response.data.status === 404) {
          setHasProfile(false);
          setOpenModal(true);
        }
        console.log(err);
      });
  }, []);

  //get the card only if ther user has a profile
  useEffect(() => {
    if (hasProfile) {
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
    }
  }, [hasProfile, fakeReload]);

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
        window.location.reload();
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
    <Box bg="gray.100" minH="100vh">
      {/* Create profile modal */}
      <Modal
        isCentered
        size={"xl"}
        isOpen={openModal}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        onClose={() => {
          setHasProfile(true);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"x-large"}>Create profile</ModalHeader>
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

      <NavBar />

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
          {`Hello ${auth.user?.firstName ?? ""},`}
          {/* Hello, */}
          <br />
          we wish you a wonderful day! 🌤
        </Text>

        {/* Big "Open Ticket" button */}
        <TicketForm fakeReload={fakeReload} setFakeReload={setFakeReload} />
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
            <TicketsTabContent
              text="Opened Tickets"
              tickets={openedTickets}
              fakeReload={fakeReload}
              setFakeReload={setFakeReload}
            />
            <TicketsTabContent
              text="Closed Tickets"
              tickets={closedTickets}
              fakeReload={fakeReload}
              setFakeReload={setFakeReload}
            />
          </TabPanels>
        )}
      </Tabs>
    </Box>
  );
};
