import React, { useContext } from "react";
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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { TicketsTab } from "./TicketsTab";
import { TicketsTabContent } from "./TicketsTabContent";
import { colors } from "../../theme";

export const Home: React.FC = () => {
    const auth = useContext(UserContext);

    // Sample tickets data
    const tickets = [
        { id: 1, doctorName: "Matei Biciusca", date: "23-10-2023", userRequest: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", status: "opened" as const, specialization: "Urology" },
        { id: 2, doctorName: "Roaianu Robert", date: "23-10-2023", userRequest: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", status: "closed" as const, specialization: "Cardiology" },
        { id: 3, doctorName: "Andrei Tava", date: "23-10-2023", userRequest: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", status: "opened" as const, specialization: "General" },
        { id: 4, doctorName: "Petrica Simion", date: "23-10-2023", userRequest: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", status: "closed" as const, specialization: "General" },
        // Add more tickets as needed
    ];

    const openedTickets = tickets.filter((ticket) => ticket.status === "opened");
    const closedTickets = tickets.filter((ticket) => ticket.status === "closed");

    const numOpenedTickets = openedTickets.length;
    const numClosedTickets = closedTickets.length;

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
                    {`Hello ${auth.user?.email},`}
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
                        <TicketsTab
                            text="Opened Tickets"
                            numTickets={numOpenedTickets}
                        />

                        {/* Closed Tickets Tab Button */}
                        <TicketsTab
                            text="Closed Tickets"
                            numTickets={numClosedTickets}
                        />
                    </TabList>
                </Flex>

                {/* Black horizontal line */}
                <Divider borderColor="black" mt={2} mb={4} />

                {/* Tickets Section */}
                <TabPanels>
                    <TicketsTabContent text="Opened Tickets" tickets={openedTickets} />
                    <TicketsTabContent text="Closed Tickets" tickets={closedTickets} />
                </TabPanels>
            </Tabs>
        </Box>
    );
};
