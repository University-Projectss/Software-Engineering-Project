// TicketsTabContent.tsx
import React from "react";
import { Box, Flex, TabPanel, Text } from "@chakra-ui/react";
import { Ticket } from "./Ticket";

interface TicketsTabContentProps {
    tickets: {
        id: number;
        doctorName: string;
        date: string;
        userRequest: string;
        status: "opened" | "closed";
        specialization: string;
    }[];
    text: string;
}

export const TicketsTabContent: React.FC<TicketsTabContentProps> = ({
    tickets,
    text,
}) => {
    return (
        <TabPanel>
            <Text fontSize="4xl" fontWeight="bold" color="black" pl={10}>
                {text}
            </Text>
            <Flex mt={4} pl={10}>
                {tickets.length > 0 ? (
                    tickets.map((ticket) => (
                        <Box key={ticket.id} mr={4}>
                            <Ticket
                                doctorName={ticket.doctorName}
                                date={ticket.date}
                                userRequest={ticket.userRequest}
                                status={ticket.status}
                                specialization={ticket.specialization}
                            />
                        </Box>
                    ))
                ) : (
                    <Text>{`No ${text.toLowerCase()} tickets`}</Text>
                )}
            </Flex>
        </TabPanel>
    );
};
