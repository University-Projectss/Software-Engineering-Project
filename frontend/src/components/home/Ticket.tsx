import {
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FaPen, FaTrash } from "react-icons/fa";
import { colors } from "../../theme";
import { TicketInterface } from "./types";
import { apiClient } from "../utils/apiClient";
import { UserContext } from "../../App";

interface TicketProps {
  ticket: TicketInterface;
  handleOpenTicket: (val: string) => void;
  fakeReload: boolean;
  setFakeReload: (val: boolean) => void;
  handleEditTicket: (val: TicketInterface) => void;
}

export const Ticket: React.FC<TicketProps> = ({
  ticket,
  handleOpenTicket,
  fakeReload,
  setFakeReload,
  handleEditTicket,
}) => {
  const auth = useContext(UserContext);
  const toast = useToast();

  const handleCloseTicket = async () => {
    apiClient
      .patch(`/tickets/${ticket.id}`, {
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
      });
  };

  return (
    <Box
      bgColor="white"
      p={4}
      borderRadius="xl"
      boxShadow="md"
      w="300px"
      position="relative"
    >
      {/* 3-dots menu */}
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<BiDotsHorizontalRounded />}
          size="lg"
          variant="ghost"
          aria-label="Options"
          position="absolute"
          top="0"
          right="0"
        />
        <MenuList>
          {ticket.status === "OPENED" && auth.user?.role === "PATIENT" && (
            <MenuItem
              icon={<FaPen />}
              onClick={() => {
                handleEditTicket(ticket);
              }}
            >
              Edit
            </MenuItem>
          )}
          <MenuItem
            icon={<FaTrash />}
            color="red.500"
            onClick={handleCloseTicket}
          >
            Close
          </MenuItem>
        </MenuList>
      </Menu>

      {/* Ticket content */}
      <Box>
        <Text fontSize="lg" fontWeight="bold" color="black">
          {`${
            ticket.doctorName ? `Dr. ${ticket.doctorName}` : ticket.patientName
          }`}
        </Text>
        {/* Specialization Badge */}
        <Badge ml={2} bg={colors.blue} color="white">
          {ticket.specialization}
        </Badge>
        {/* </Text> */}
        <Divider borderColor="black" mt={2} mb={2} />
        <Text
          fontSize="md"
          color="black"
          mt={4}
          fontWeight="bold"
          noOfLines={3}
        >
          Your Request
        </Text>
        <Text fontSize="md" color="black" noOfLines={3}>
          {ticket.description}
        </Text>
      </Box>

      <Box textAlign="center">
        <Button
          colorScheme="gray"
          variant="solid"
          fontWeight="bold"
          mt={4}
          bgColor="#C0C0C0"
          onClick={() => {
            handleOpenTicket(ticket.id + "");
          }}
        >
          See more details
        </Button>
      </Box>
    </Box>
  );
};
