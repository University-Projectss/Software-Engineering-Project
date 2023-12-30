//TicketsTab.tsx
import React from "react";
import { Tab, Box, Text } from "@chakra-ui/react";
import { colors } from "../../theme";

interface TicketsTabProps {
    text: string;
    numTickets: number;
}

export const TicketsTab: React.FC<TicketsTabProps> = ({
    text,
    numTickets,
}) => {
    return (
        <Tab _selected={{ fontWeight: "bold" }}>
            <Box
                data-testid="tickets-tab-box"
                p={2}
                bg="white"
                color="black"
                border="1px solid black"
                borderRadius="full"
                width="fit-content"
                display="flex"
                alignItems="center"
                cursor="pointer" // Add this line to change cursor to pointer on hover
            >
                <Text mr={2}>{text}</Text>
                <Text
                    fontWeight="bold"
                    bg={colors.blue}
                    color="white"
                    borderRadius="full"
                    px={2}
                >
                    {numTickets}
                </Text>
            </Box>
        </Tab>
    );
};
