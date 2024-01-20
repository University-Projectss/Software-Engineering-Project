// TicketsTabContent.tsx
import {
  Badge,
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  TabPanel,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { apiClient } from "../utils/apiClient";
import { Ticket } from "./Ticket";
import { TicketInterface } from "./types";
import { colors } from "../../theme";
import { UserContext } from "../../App";

interface TicketsTabContentProps {
  tickets: TicketInterface[];
  text: string;
  fakeReload: boolean;
  setFakeReload: (val: boolean) => void;
}

interface TicketDetailsInterface {
  id: number;
  doctorName: string;
  patientName: string;
  title: string;
  description: string;
  response: string;
  status: "OPENED" | "CLOSED";
  specialization: string;
}

export const TicketsTabContent: React.FC<TicketsTabContentProps> = ({
  tickets,
  text,
  fakeReload,
  setFakeReload,
}) => {
  const auth = useContext(UserContext);
  const toast = useToast();

  const [isOpenDetails, setIsOpenDetails] = useState<boolean>(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState<boolean>(true);

  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [ticketDetails, setTicketDetails] =
    useState<TicketDetailsInterface | null>(null);

  const [isOpenSafety, setIsOpenSafety] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("");

  const [ticketToUpdate, setTicketToUpdate] = useState<TicketInterface | null>(
    null
  );
  const [isOpenTicketUpdate, setIsOpenTicketUpdate] = useState<boolean>(false);
  const [specializations, setSpecializations] = useState<string[]>([]);

  useEffect(() => {
    if (isOpenDetails && selectedTicket) {
      setIsLoadingDetails(true);
      apiClient
        .get(`/tickets/${selectedTicket}`)
        .then((res) => {
          setTicketDetails(res.data);
          setIsLoadingDetails(false);
        })
        .catch((err) => {
          setIsOpenDetails(false);
          toast({
            title: err.response.data.error,
            description: err.response.data.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    }
  }, [selectedTicket]);

  useEffect(() => {
    apiClient
      .get("/specializations")
      .then((res) => {
        setSpecializations(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onClose = () => {
    setIsOpenDetails(false);
    setIsLoadingDetails(false);
    setTicketDetails(null);
    setSelectedTicket(null);
    setIsOpenSafety(false);
  };

  const handleOpenTicket = (ticketId: string) => {
    setIsOpenDetails(true);
    setSelectedTicket(ticketId);
  };

  const handleCloseTicket = () => {
    apiClient
      .patch(`/tickets/${selectedTicket}`, {
        response: response !== "" ? response : null,
        status: "CLOSED",
      })
      .then((res) => {
        setFakeReload(!fakeReload);
        toast({
          title: "Success!",
          description: "Ticket closed successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log("Erro close ticket", err);
        toast({
          title: err.response.data.error,
          description: err.response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      })
      .finally(() => {
        onClose();
      });
  };

  const handleEditTicket = (ticket: TicketInterface) => {
    setTicketToUpdate(ticket);
    setIsOpenTicketUpdate(true);
  };

  const handleSubmitTicketUpdate = async () => {
    console.log(ticketToUpdate);

    apiClient
      .patch(`/tickets/${ticketToUpdate?.id}`, {
        title: ticketToUpdate?.title,
        description: ticketToUpdate?.description,
        specialization: ticketToUpdate?.specialization,
      })
      .then((res) => {
        setFakeReload(!fakeReload);
        toast({
          title: "Success!",
          description: "Ticket updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log("Error update ticket", err);
        toast({
          title: err.response.data.error,
          description: err.response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      })
      .finally(() => {
        setIsOpenTicketUpdate(false);
      });
  };

  return (
    <TabPanel>
      {/* Ticket update modal */}
      <Modal
        isOpen={isOpenTicketUpdate}
        onClose={() => {
          setIsOpenTicketUpdate(false);
        }}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            alignSelf={"center"}
            fontWeight="bold"
            fontSize={"x-large"}
          >
            Update Ticket
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {auth.user?.role === "PATIENT" && (
              <>
                <Input
                  placeholder="Ticket title"
                  value={ticketToUpdate?.title}
                  variant={"flushed"}
                  onChange={(e) => {
                    ticketToUpdate &&
                      setTicketToUpdate({
                        ...ticketToUpdate,
                        title: e.target.value,
                      });
                  }}
                />
                <Box height={10} />
                <Text fontWeight={"bold"}>
                  Please enter your symptoms or questions{" "}
                </Text>
                <Textarea
                  value={ticketToUpdate?.description}
                  minH={"150px"}
                  onChange={(e) => {
                    ticketToUpdate &&
                      setTicketToUpdate({
                        ...ticketToUpdate,
                        description: e.target.value,
                      });
                  }}
                />
                <Box height={5} />
              </>
            )}
            {auth.user?.role === "DOCTOR" && (
              <>
                <Flex gap={2} alignItems={"center"}>
                  <Text>Specialization: </Text>
                  <Box bgColor={colors.blue} px={3} py={1} borderRadius={100}>
                    <Text color={"white"} fontWeight={900}>
                      {ticketToUpdate?.specialization}
                    </Text>
                  </Box>
                </Flex>
                <Flex
                  color={"#525252"}
                  marginTop={10}
                  gap={5}
                  alignItems={"center"}
                >
                  <Text>Set a new specialization: </Text>
                  <Select
                    placeholder="Choose yourself"
                    variant={"flushed"}
                    width={"50%"}
                    onChange={(e) => {
                      ticketToUpdate &&
                        setTicketToUpdate({
                          ...ticketToUpdate,
                          specialization: e.target.value,
                        });
                    }}
                  >
                    {specializations.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </Select>
                </Flex>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleSubmitTicketUpdate}
            >
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Ticket details modal */}
      <Modal
        isCentered
        size={"xl"}
        isOpen={isOpenDetails}
        closeOnEsc={false}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"x-large"}>{ticketDetails?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isLoadingDetails ? (
              <Spinner />
            ) : (
              <>
                <Badge bg={colors.blue} color="white">
                  {ticketDetails?.specialization}
                </Badge>

                <Flex gap={1}>
                  <Text>
                    {auth.user?.role === "PATIENT"
                      ? "Doctor name: "
                      : "Patient name: "}
                  </Text>
                  <Text fontWeight={700}>
                    {auth.user?.role === "PATIENT"
                      ? ticketDetails?.doctorName
                      : ticketDetails?.patientName}
                  </Text>
                </Flex>

                <Box h={5} />

                <Flex direction={"column"}>
                  <Text fontWeight={700}>Description</Text>
                  <Text>{ticketDetails?.description}</Text>
                </Flex>

                <Box h={10} />

                <Flex direction={"column"}>
                  <Text fontWeight={700}>Response</Text>
                  {auth.user?.role === "DOCTOR" ? (
                    ticketDetails?.response ?? (
                      <Textarea
                        value={response}
                        onChange={(e) => {
                          setResponse(e.target.value);
                        }}
                        placeholder="Write your response"
                        minH={"100px"}
                      ></Textarea>
                    )
                  ) : (
                    <Text>{ticketDetails?.response ?? "No response yet."}</Text>
                  )}
                </Flex>
              </>
            )}
          </ModalBody>

          <ModalFooter>
            {ticketDetails?.status === "OPENED" && (
              <Button
                variant={"solid"}
                colorScheme="blue"
                onClick={() => {
                  if (auth.user?.role === "PATIENT") {
                    setIsOpenSafety(true);
                    setIsOpenDetails(false);
                  } else {
                    handleCloseTicket();
                  }
                }}
                isDisabled={auth.user?.role === "DOCTOR" && response === ""}
              >
                Close ticket
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        isCentered
        size={"sm"}
        isOpen={isOpenSafety}
        closeOnEsc={false}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"x-large"} color={"red"}>
            Warning!
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight={900}>
              This action is irreversible! Are you sure you want to close this
              ticket?
            </Text>
          </ModalBody>

          <ModalFooter gap={5}>
            <Button
              variant={"outline"}
              colorScheme="blue"
              onClick={onClose}
              px={5}
            >
              No
            </Button>

            <Button
              variant={"solid"}
              colorScheme="blue"
              onClick={handleCloseTicket}
              px={5}
            >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Text fontSize="4xl" fontWeight="bold" color="black" pl={10}>
        {text}
      </Text>
      <Flex mt={4} pl={10} wrap={"wrap"} gap={5}>
        {tickets.length > 0 ? (
          tickets.map((ticket, i) => (
            <Box key={i} mr={4}>
              <Ticket
                ticket={ticket}
                handleOpenTicket={handleOpenTicket}
                fakeReload={fakeReload}
                setFakeReload={setFakeReload}
                handleEditTicket={handleEditTicket}
              />
            </Box>
          ))
        ) : (
          <Text>{`No ${text.toLowerCase()}`}</Text>
        )}
      </Flex>
    </TabPanel>
  );
};
