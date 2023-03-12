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
  Textarea,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import cardService from "../services/cardService";
import { useMutation } from "react-query";

export default function ModalEdit({
  isOpen,
  onClose,
  idCard,
  title,
  note,
  refetch,
}) {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [alert, setAlert] = useState(false);
  const [input, setInput] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    setInput({
      title: title,
      content: note,
    });
  }, []);

  const handleSubmit = useMutation(async (e) => {
    e.preventDefault();
    const response = await cardService.updateCard(idCard, input);
    if (response.status === 200) {
      setAlert(true);
      onClose();
      refetch();
    }
  });

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered width="70vw">
        <ModalOverlay backdropFilter="blur(10px) hue-rotate(0deg)" />
        <ModalContent bgColor={"hsla(57, 100%, 50%, 1)"} padding={"2rem"}>
          <ModalHeader color={"primary"} fontSize={"3rem"}>
            Edit Diary note
          </ModalHeader>
          <ModalBody>
            <Flex flexDirection={"column"} gap={"1rem"} marginBottom={"1rem"}>
              <Input
                bgColor={"whitesmoke"}
                placeholder={input.title}
                type="text"
                value={input.title}
                onChange={(e) => setInput({ ...input, title: e.target.value })}
              />
              <Textarea
                bgColor={"whitesmoke"}
                placeholder={input.content}
                type="text"
                value={input.content}
                onChange={(e) =>
                  setInput({ ...input, content: e.target.value })
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
              {handleSubmit.isLoading ? <Spinner /> : <Text>Edit Note</Text>}
            </Button>
            {alert && <Text>Berhasil Update data</Text>}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
