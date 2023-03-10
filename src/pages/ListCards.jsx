import React, { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import { Box, Heading, HStack, Button } from "@chakra-ui/react";
import SearchBox from "../components/SearchBox";
import cardService from "../services/cardService";
import CatalogMagic from "../components/BulkSkeleton";
import { API } from "../services/baseUrl";
import DiaryCard from "../components/DiaryCard";
import { useSelector } from "react-redux";
import ModalCreate from "../components/ModalCreate";
import PaginationFix from "../components/PaginationFix";
import { useQuery } from "react-query";

export default function ListCards() {
  const [cards, setCards] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [isToggle, setToggle] = useState(false);
  const [pageCount, setPageCount] = useState(5);

  const searchText = useSelector((state) => state.search.searchText);
  const pageNumber = useSelector((state) => state.search.page);

  const newFilter = cards.filter((value) => {
    return value.title.toLowerCase().includes(searchText.toLowerCase());
  });

  const handleClick = () => {
    setToggle(true);
  };

  const handleClose = () => {
    setToggle(false);
  };

  useEffect(() => {
    async function fetchdata() {
      // let { data, isLoading, refetch } = useQuery(
      //   "listCards",
      //   cardService.getAllCards(pageNumber)
      // );
      // console.log("its here");
      // console.log(data);
      const data = await cardService.getAllCards(pageNumber);
      if (data.status === 200) {
        setIsloading(false);
        setCards(data.data.data);
      }
    }
    if (API.defaults.headers.common.Authorization !== null) {
      fetchdata();
    }
  }, []);

  return (
    <>
      <ModalCreate isOpen={isToggle} onClose={handleClose} />
      <NavBar />
      <Box
        width={"100vw"}
        padding={"3em"}
        display={{ base: "flex" }}
        alignItems="center"
        justifyContent="flex-start"
        gap={"3em"}
        flexWrap="wrap"
      >
        <HStack justifyContent="space-between" width="100vw">
          <Heading> Search for notes here</Heading>
          <Button colorScheme="teal" variant="solid" onClick={handleClick}>
            Create a new Notes
          </Button>
        </HStack>
        <SearchBox />
        <PaginationFix count={pageCount} />
        {isLoading && <CatalogMagic />}
        <Box display="flex" flexWrap="wrap" gap="3em">
          {newFilter?.map((val, id) => (
            <DiaryCard
              key={id}
              title={val.title}
              note={val.content}
              idDiary={val.id}
              date={val.updated_at}
            />
          ))}
        </Box>
      </Box>
    </>
  );
}
