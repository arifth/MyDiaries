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
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import authService from "../services/authService";
import { useMutation } from "react-query";

export default function ModalRegister({ isOpen, onClose }) {
  const [input, setInput] = useState({
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
  });

  const submit = useMutation((e) => {
    e.preventDefault();
    try {
      const data = authService.register(input);
      if (submit.isSuccess) {
        alert("berhasil daftar");
        onClose();
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  });

  console.log(submit.isSuccess);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered width="50vw">
        <ModalOverlay backdropFilter="blur(10px) hue-rotate(0deg)" />
        <ModalContent bgColor={"hsla(57, 100%, 50%, 1)"} padding={"2rem"}>
          <form onSubmit={(e) => submit.mutate(e)}>
            <ModalHeader color={"primary"} fontSize={"3rem"}>
              Register
            </ModalHeader>
            <ModalBody>
              <Flex flexDirection={"column"} gap={"1rem"} marginBottom={"1rem"}>
                <Input
                  bgColor={"whitesmoke"}
                  placeholder="Email"
                  type="text"
                  value={input.email}
                  onChange={(e) =>
                    setInput({ ...input, email: e.target.value })
                  }
                />
                <Input
                  bgColor={"whitesmoke"}
                  placeholder="Username"
                  type="text"
                  value={input.username}
                  onChange={(e) =>
                    setInput({ ...input, username: e.target.value })
                  }
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
                <Input
                  bgColor={"whitesmoke"}
                  placeholder="confirm Password"
                  type="password"
                  value={input.password_confirmation}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      password_confirmation: e.target.value,
                    })
                  }
                />
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button
                type="submit"
                backgroundColor={"green.300"}
                // onClick={(e) => submit.mutate(input)}
                width={"100%"}
              >
                {submit.isLoading ? <Spinner /> : <Text>Register</Text>}
              </Button>
            </ModalFooter>
            <Text textAlign={"center"} fontSize={"1.5rem"}>
              Dont Have an Account, <span>klik Here</span>
            </Text>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
