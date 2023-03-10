import React from "react";
import { Box, Image, Stack, Text, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const url =
    "https://images.unsplash.com/photo-1568150279679-d16bc9eb9eb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80";

  return (
    <Box
      padding={"1em"}
      minHeight="80vh"
      minWidth="10vw"
      display="flex"
      flexDir={{ base: "column", md: "row" }}
    >
      <Box
        height={{ base: "none", md: "80vh" }}
        width={{ base: "none", md: "50vw" }}
        borderRadius="1em"
      >
        <Image
          src={url}
          height="100%"
          width="100%"
          objectFit="cover"
          borderRadius="1em"
        ></Image>
      </Box>
      <Box height={"80vh"} width={{ base: "100vw", md: "50vw" }} padding="4em">
        <Stack>
          <Text fontSize={{ base: "6xl" }}>Manage your diary hassle-free</Text>
          <Text
            fontSize={{ base: "2xl" }}
            fontWeight="light"
            style={{ marginBottom: "3em" }}
          >
            Introducing the ultimate companion for your daily musings - the
            diary note taking app! With its sleek design and intuitive
            interface, this app allows you to easily capture your thoughts,
            ideas, and experiences in a convenient digital format.
          </Text>
        </Stack>
      </Box>
    </Box>
  );
}
