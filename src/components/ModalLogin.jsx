import {
  Modal,
  Button,
  ModalOverlay,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalHeader,
  Input,
  Flex,
  Text,
  Alert,
} from "@chakra-ui/react";
import React, { useState } from "react";
import authService from "../services/authService";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { LOGIN_SUCCESS } from "../redux/authSlice";
import { useDispatch } from "react-redux";

export default function ModalLogin({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const handleSubmit = useMutation(async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(input);
      onClose();
      if (response.status === 200) {
        dispatch(LOGIN_SUCCESS(response));
        navigation("/list-cards");
        return response;
      }
    } catch (error) {
      setError(true);
      console.log(error);
    }
    onClose();
  });

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered width="50vw">
        <ModalOverlay backdropFilter="blur(10px) hue-rotate(0deg)" />
        <ModalContent bgColor={"hsla(57, 100%, 50%, 1)"} padding={"2rem"}>
          <ModalHeader color={"primary"} fontSize={"3rem"}>
            Login
          </ModalHeader>
          <ModalBody>
            <Flex flexDirection={"column"} gap={"1rem"} marginBottom={"1rem"}>
              <Input
                bgColor={"whitesmoke"}
                placeholder="Email"
                type="text"
                value={input.email}
                onChange={(e) => setInput({ ...input, email: e.target.value })}
              />
              <Input
                bgColor={"whitesmoke"}
                placeholder="Password"
                type="password"
                value={input.password}
                onChange={(e) =>
                  setInput({ ...input, password: e.target.value })
                }
              />
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              backgroundColor={"green.300"}
              onClick={(e) => handleSubmit.mutate(e)}
              width={"100%"}
            >
              Login
            </Button>
          </ModalFooter>
          <Text textAlign={"center"} fontSize={"1.5rem"}>
            Dont Have an Account, <span>klik Here</span>
          </Text>
          {error && (
            <Alert variant={"danger"} backgroundColor="red.100">
              Email atau password salah{" "}
            </Alert>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
