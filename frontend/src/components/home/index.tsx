import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Text,
  Divider,
  Flex,
  Button,
  Avatar,
  Tabs,
  TabList,
  TabPanels,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { TicketsTab } from "./TicketsTab";
import { TicketsTabContent } from "./TicketsTabContent";
import { colors } from "../../theme";
import { apiClient, authorise } from "../utils/apiClient";
import { TicketInterface } from "./types";

export const Home: React.FC = () => {
  const auth = useContext(UserContext);
  const toast = useToast();
  const [tickets, setTickets] = useState<TicketInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const openedTickets = tickets.filter((ticket) => ticket.status === "OPENED");
  const closedTickets = tickets.filter((ticket) => ticket.status === "CLOSED");

  const numOpenedTickets = openedTickets.length;
  const numClosedTickets = closedTickets.length;

  useEffect(() => {
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
        <Button
          bg={colors.blue}
          color="white"
          borderRadius="20px"
          h="80px"
          w="250px"
          fontSize="3xl"
          fontWeight="bold"
        >
          Open Ticket
        </Button>
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
