import { Box, HStack, Image, Button, Text, Avatar } from "@chakra-ui/react";
import ModalLogin from "./ModalLogin";
import ModalRegister from "./ModalRegister";
import React, { useState } from "react";
import headerIcon from "../assets/iconBig.svg";
import { useDisclosure } from "@chakra-ui/react";
import AvatarPop from "./AvatarPop";

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [opened, setOPened] = useState(false);

  // handle modal toggle func
  const handleOpen = () => {
    setOPened(true);
  };
  const closed = () => {
    setOPened(false);
  };

  return (
    <>
      <ModalLogin isOpen={isOpen} onClose={onClose} />
      <ModalRegister isOpen={opened} onClose={closed} />
      <HStack
        width="100vw"
        padding="1em"
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        boxShadow="lg"
        bgGradient="linear(orange.100 15%, grey.100 50%)"
      >
        <a href="/">
          <Box
            boxSize="4em"
            marginLeft={{ md: "5em" }}
            display="flex"
            gap="2em"
          >
            <Image src={headerIcon} cursor="pointer" />

            <Text
              fontSize="5xl"
              fontWeight="bold"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
            >
              MyDiary
            </Text>
          </Box>
        </a>
        <Box
          style={{ marginBottom: "10px", marginRight: "3em" }}
          direction="row"
          spacing={4}
          align="center"
          alignSelf={"flex-end"}
          display={{ base: "none", sm: "flex" }}
          gap="1em"
        >
          {localStorage.getItem("token") ? (
            <AvatarPop />
          ) : (
            <>
              <Button
                backgroundColor={"green.500"}
                variant="solid"
                onClick={onOpen}
              >
                Login
              </Button>
              <Button
                colorScheme="teal"
                variant="outline"
                color={"black"}
                onClick={handleOpen}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </HStack>
    </>
  );
}
