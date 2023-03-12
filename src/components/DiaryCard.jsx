import React, { useState } from "react";
import {
  Card,
  CardBody,
  Image,
  Text,
  Heading,
  Stack,
  Divider,
  Button,
  CardFooter,
  ButtonGroup,
  Skeleton,
  Modal,
} from "@chakra-ui/react";
import { HiPencilSquare } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom";
import { HiArchiveBox } from "react-icons/hi2";
import cardService from "../services/cardService";
import ModalEdit from "../components/ModalEdit";

export default function DiaryCard({ idDiary, title, note, date, refetch }) {
  const navigate = useNavigate();

  const [isToggle, setToggle] = useState(false);

  const handleOpen = () => {
    setToggle(true);
  };
  const handleClose = () => {
    setToggle(false);
  };

  const handleArchieve = async () => {
    await cardService.archieveCard(idDiary);
    refetch();
  };

  return (
    <>
      <ModalEdit
        idCard={idDiary}
        isOpen={isToggle}
        onClose={handleClose}
        note={note}
        title={title}
        refetch={refetch}
      />
      <Card
        background="white"
        overflow="hidden"
        maxW="sm"
        _hover={{
          background: "0xF1DEC9",
          color: "teal.500",
        }}
        cursor="pointer"
      >
        <CardBody>
          <Link to={`/detail/${idDiary}`}>
            <Stack mt="6" spacing="3" padding="1em">
              <Heading size="md">{title}</Heading>
              <Text
                style={{
                  width: "350px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  height: "100px",
                  textOverflow: "ellipsis",
                }}
              >
                {note}
              </Text>
              <Text color="grey" fontSize="14px">
                {date}
              </Text>
            </Stack>
          </Link>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="20">
            <Button variant="outline" colorScheme="blue" onClick={handleOpen}>
              Edit
              <span style={{ marginLeft: "1em" }}>
                <HiPencilSquare />
              </span>
            </Button>
            <Button
              variant="ghost"
              colorScheme="red"
              onClick={() => handleArchieve()}
            >
              Archieve
              <span style={{ marginLeft: "1em" }}>
                <HiArchiveBox />
              </span>
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </>
  );
}
