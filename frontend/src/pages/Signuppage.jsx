import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Box,
  Heading,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useBreakpointValue,
} from "@chakra-ui/react";

const Signuppage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://geo-data-app-t6t1.onrender.com/users/register", {
        username,
        email,
        password,
      });
      console.log("Signup Successful", response.data);
      setUsername("");
      setEmail("");
      setPassword("");
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Signup Failed", error);
      setErrorMessage(error.response?.data?.msg || "Something went wrong");
      setIsErrorModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsSuccessModalOpen(false);
    navigate("/"); // Redirect to home or login page
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  const boxWidth = useBreakpointValue({ base: "90%", md: "50%", lg: "30%" });

  return (
    <Box
      w="100%"
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgGradient="linear(to-r, #191414, #1db954)"
      p="4"
    >
      <Box
        bg="black"
        w={boxWidth}
        p="8"
        borderRadius="md"
        boxShadow="lg"
        textAlign="center"
      >
        <form onSubmit={handleSubmit}>
          <Heading mb="6" color="white">
            Signup
          </Heading>
          <FormControl>
            <FormLabel color="gray.300">Username:</FormLabel>
            <Input
              type="text"
              bg="gray.800"
              borderColor="gray.600"
              focusBorderColor="#1db954"
              color="white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl mt="4">
            <FormLabel color="gray.300">Email address:</FormLabel>
            <Input
              type="email"
              bg="gray.800"
              borderColor="gray.600"
              focusBorderColor="#1db954"
              color="white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl mt="4">
            <FormLabel color="gray.300">Password:</FormLabel>
            <Input
              type="password"
              bg="gray.800"
              borderColor="gray.600"
              focusBorderColor="#1db954"
              color="white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button
            type="submit"
            mt="6"
            w="100%"
            bg="#1db954"
            _hover={{ bg: "#1aa34a" }}
            color="white"
          >
            Signup
          </Button>
        </form>
      </Box>

      {/* Success Modal */}
      <Modal isOpen={isSuccessModalOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent bg="black" color="white">
          <ModalHeader>Success!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>User registered successfully.</ModalBody>
          <ModalFooter>
            <Button colorScheme="green" onClick={handleModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Error Modal */}
      <Modal isOpen={isErrorModalOpen} onClose={handleCloseErrorModal}>
        <ModalOverlay />
        <ModalContent bg="black" color="white">
          <ModalHeader>Error!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{errorMessage}</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={handleCloseErrorModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Signuppage;
