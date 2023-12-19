import {
  Button,
  useDisclosure,
  Text,
  Textarea,
  Box,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
} from "@chakra-ui/react";
import { colors } from "../../../theme";

export const TicketForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const specializationList = ["prima", "the rock", "hello", "there"];
  return (
    <>
      <Button
        bg={colors.blue}
        _hover={{ bgColor: colors.blue }}
        color="white"
        borderRadius="20px"
        h="80px"
        w="250px"
        fontSize="3xl"
        fontWeight="bold"
        onClick={onOpen}
      >
        Open Ticket
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            alignSelf={"center"}
            fontWeight="bold"
            fontSize={"x-large"}
          >
            Open Ticket
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight={"bold"}>
              Please enter your symptoms or questions{" "}
            </Text>
            <Textarea minH={"150px"} />
            <Box height={5} />
            <Flex gap={2} alignItems={"center"}>
              <Text>Specialization: </Text>
              <Box bgColor={colors.blue} px={3} py={1} borderRadius={100}>
                <Text color={"white"} fontWeight={900}>
                  Cardio
                </Text>
              </Box>
            </Flex>
            <Flex
              color={"#525252"}
              marginTop={10}
              gap={5}
              alignItems={"center"}
            >
              <Text>Not what you want? </Text>
              <Select
                placeholder="Choose yourself"
                variant={"flushed"}
                width={"50%"}
              >
                {specializationList.map((s) => (
                  <option value={s}>{s}</option>
                ))}
              </Select>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
