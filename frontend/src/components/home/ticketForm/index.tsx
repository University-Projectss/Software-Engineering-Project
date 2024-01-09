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
  Spinner,
  useToast,
  Input,
} from "@chakra-ui/react";
import { colors } from "../../../theme";
import { useEffect, useState } from "react";
import { apiClient, authorise } from "../../utils/apiClient";

export const TicketForm: React.FC<{
  fakeReload: boolean;
  setFakeReload: (val: boolean) => void;
}> = ({ fakeReload, setFakeReload }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);
  const [sugestion, setSugestion] = useState<string | null>(null);
  const [ticketData, setTicketData] = useState<{
    title: string;
    description: string;
  }>({ title: "Ticket title", description: "" });
  const [specializations, setSpecializations] = useState<string[]>([]);

  const onCloseModal = () => {
    setSugestion(null);
    setTicketData({ title: "Ticket title", description: "" });
    onClose();
  };

  const generateSugestion = async () => {
    setLoading(true);
    await apiClient
      .post(
        "/specialization-detection",
        {
          description: ticketData.description,
        },
        authorise()
      )
      .then((res) => {
        setSugestion(res.data.specialization);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast({
          title: err.response.data.error,
          description: err.response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const handleSubmitTicket = async () => {
    await apiClient
      .post(
        "/tickets",
        {
          ...ticketData,
          specialization: sugestion ?? "",
        },
        authorise()
      )
      .then(() => {
        setFakeReload(!fakeReload);
        onCloseModal();
        toast({
          title: "Success",
          description: "Ticket created",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
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
      });
  };

  useEffect(() => {
    apiClient
      .get("/specializations", authorise())
      .then((res: any) => {
        setSpecializations(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

      <Modal isOpen={isOpen} onClose={onCloseModal} size={"xl"}>
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
            <Input
              placeholder="Ticket title"
              value={ticketData.title}
              variant={"flushed"}
              onChange={(e) => {
                setTicketData({ ...ticketData, title: e.target.value });
              }}
            />
            <Box height={10} />
            <Text fontWeight={"bold"}>
              Please enter your symptoms or questions{" "}
            </Text>
            <Textarea
              minH={"150px"}
              onChange={(e) => {
                setTicketData({ ...ticketData, description: e.target.value });
              }}
            />
            <Box height={5} />
            <Flex gap={2} alignItems={"center"}>
              <Text>Specialization: </Text>
              {loading ? (
                <Spinner />
              ) : sugestion === null ? (
                <Text
                  textDecoration={"underline"}
                  fontWeight={"bold"}
                  cursor={"pointer"}
                  onClick={generateSugestion}
                >
                  Generate
                </Text>
              ) : (
                <Box bgColor={colors.blue} px={3} py={1} borderRadius={100}>
                  <Text color={"white"} fontWeight={900}>
                    {sugestion}
                  </Text>
                </Box>
              )}
            </Flex>
            {sugestion !== null && (
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
                  onChange={(e) => {
                    setSugestion(e.target.value);
                  }}
                >
                  {specializations.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Select>
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmitTicket}>
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
