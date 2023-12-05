import React from "react";
import {
    Box,
    Text,
    Divider,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    Badge,
} from "@chakra-ui/react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FaTrash, FaPen } from "react-icons/fa";
import { colors } from "../../theme";

interface TicketProps {
    doctorName: string;
    date: string;
    userRequest: string;
    status: "opened" | "closed";
    specialization: string;
}

export const Ticket: React.FC<TicketProps> = ({
    doctorName,
    date,
    userRequest,
    specialization,
}) => {
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
                    <MenuItem icon={<FaPen />} onClick={() => console.log("Edit")}>
                        Edit
                    </MenuItem>
                    <MenuItem
                        icon={<FaTrash />}
                        color="red.500"
                        onClick={() => console.log("Delete")}
                    >
                        Delete
                    </MenuItem>
                </MenuList>
            </Menu>

            {/* Ticket content */}
            <Box>
                <Text fontSize="lg" fontWeight="bold" color="black">
                    Dr. {doctorName}
                </Text>
                <Text fontSize="md" color="black">
                    Date:{" "}
                    <Text as="span" fontWeight="bold">
                        {date}
                    </Text>
                    {/* Specialization Badge */}
                    <Badge ml={2} bg={colors.blue} color="white">
                        {specialization}
                    </Badge>
                </Text>
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
                    {userRequest}
                </Text>
            </Box>

            <Box textAlign="center">
                <Button
                    colorScheme="gray"
                    variant="solid"
                    fontWeight="bold"
                    mt={4}
                    bgColor="#C0C0C0"
                >
                    See more details
                </Button>
            </Box>
        </Box>
    );
};
