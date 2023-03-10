import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  VStack,
  Box,
  HStack,
  Image,
  Text,
  Button,
  Avatar,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

export default function AvatarPop() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar />
      </PopoverTrigger>
      <PopoverContent style={{ border: "none" }}>
        <PopoverBody
          bgColor={"blackAlpha.800"}
          style={{ border: "none" }}
          padding={"1rem"}
        >
          <VStack>
            <Box marginBottom={"1rem"}>
              <Link to={`/list-cards`}>
                <HStack width={"100%"} justifyContent={"flex-start"}>
                  <Text fontSize={"1.5rem"} color={"white"}>
                    List cards
                  </Text>
                </HStack>
              </Link>
            </Box>

            <HStack width={"100%"} justifyContent={"flex-start"}>
              <Button
                bgColor={"blackAlpha.900"}
                width={"100%"}
                onClick={handleLogout}
              >
                <Text fontSize={"1.5rem"} color={"white"}>
                  Logout
                </Text>
              </Button>
            </HStack>
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
