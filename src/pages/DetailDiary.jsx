import React, { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Center,
  Skeleton,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import cardService from "../services/cardService";
import { useNavigate } from "react-router-dom";
import { CiTurnL1 } from "react-icons/ci";

export default function DetailDiary({ title, content }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [card, setCard] = useState(null);

  const handleBack = () => {
    navigate("/list-cards");
  };

  useEffect(() => {
    async function fetchData() {
      const data = await cardService.getSingleCard(id);
      console.log(data.data);
      setCard(data.data);
      return data;
    }
    fetchData();
  }, []);
  return (
    <>
      <NavBar />
      <Box position="relative" h="100vh" p={12}>
        <Center>
          <Card width={"100%"} padding="2em">
            <CardHeader>
              {card === null ? (
                <Skeleton height="20px" />
              ) : (
                <Heading>{card.title}</Heading>
              )}
            </CardHeader>
            {card === null ? (
              <Skeleton height="50px" />
            ) : (
              <CardBody>{card.content}</CardBody>
            )}
            <CardFooter>
              <Button colorScheme="blue" onClick={handleBack}>
                <span style={{ marginRight: "1em" }}>
                  <CiTurnL1 />
                </span>
                back
              </Button>
            </CardFooter>
          </Card>
        </Center>
      </Box>
    </>
  );
}
