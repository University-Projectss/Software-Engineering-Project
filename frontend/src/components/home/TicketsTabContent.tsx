// TicketsTabContent.tsx
import React from "react";
import { Box, Flex, TabPanel, Text } from "@chakra-ui/react";
import { Ticket } from "./Ticket";
import { TicketInterface } from "./types";

interface TicketsTabContentProps {
  tickets: TicketInterface[];
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
      <Flex mt={4} pl={10} wrap={"wrap"}>
        {tickets.length > 0 ? (
          tickets.map((ticket, i) => (
            <Box key={i} mr={4}>
              <Ticket ticket={ticket} />
            </Box>
          ))
        ) : (
          <Text>{`No ${text.toLowerCase()}`}</Text>
        )}
      </Flex>
    </TabPanel>
  );
};
