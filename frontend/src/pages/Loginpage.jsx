import React, { useState } from "react";
import axios from "axios";
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
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const Loginpage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      console.log(response);
      if (response && response.data && response.data.token) {
        console.log(response.data);
        setIsSuccessModalOpen(true);
        setModalMessage("Login successful!");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
      } else {
        setIsErrorModalOpen(true);
        setModalMessage(
          "Login failed. Please make sure your email and password are correct."
        );
      }
    } catch (error) {
      console.error("Login Failed", error);
      setIsErrorModalOpen(true);
      setModalMessage(
        "Login failed. Please make sure your email and password are correct. If you haven't registered yet, please register yourself."
      );
    }
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    navigate("/mapcomponent");
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  return (
    <Box
      w="100%"
      h="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgColor="#121212"  // Dark background similar to Spotify
    >
      <Box
        bg="black"
        w={["90%", "70%", "40%"]}  // Responsive width
        h="auto"
        minH="400px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        textAlign="center"
        p={"20px"}
        borderRadius="10px"
        boxShadow="1px 7px 9px 1px"
      >
        <form onSubmit={handleSubmit}>
          <Heading color="white" mb={4}>
            Login
          </Heading>
          <FormControl>
            <FormLabel mt={"10px"} color="gray.400">
              Email address:
            </FormLabel>
            <Input
              bg="gray.800"
              color="white"
              borderColor="gray.600"
              focusBorderColor="#1DB954"  // Spotify green focus color
              mt={"10px"}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel mt={"10px"} color="gray.400">
              Password:
            </FormLabel>
            <Input
              bg="gray.800"
              color="white"
              borderColor="gray.600"
              focusBorderColor="#1DB954"  // Spotify green focus color
              mt={"10px"}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <p
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
              gap: "5px",
              color: "#B3B3B3",  // Light gray for text
            }}
          >
            Not Registered?{" "}
            <span style={{ color: "#1DB954" }}>
              <Link to="/signup">Signup</Link>
            </span>
          </p>
          <Button
            type="submit"
            mt={"40px"}
            w="100%"
            bg="#1DB954"  // Spotify green button
            _hover={{ bg: "#1ed760" }}  // Lighter hover green
            color="white"
          >
            Login
          </Button>
        </form>
      </Box>

      {/* Success Modal */}
      <Modal isOpen={isSuccessModalOpen} onClose={handleCloseSuccessModal}>
        <ModalOverlay />
        <ModalContent bg="black" color="white">
          <ModalHeader>Success</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalMessage}</ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleCloseSuccessModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Error Modal */}
      <Modal isOpen={isErrorModalOpen} onClose={handleCloseErrorModal}>
        <ModalOverlay />
        <ModalContent bg="black" color="white">
          <ModalHeader>Error</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalMessage}</ModalBody>
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

export default Loginpage;
