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
  const [isToggle, setToggle] = useState(false);
  // const [pageCount, setPageCount] = useState(5);

  const searchText = useSelector((state) => state.search.searchText);
  const pageNumber = useSelector((state) => state.search.page);

  const handleClick = () => {
    setToggle(true);
  };

  const handleClose = () => {
    setToggle(false);
  };

  let { data, isLoading, refetch, isError, isSuccess } = useQuery(
    "listCards",
    () => cardService.getAllCards(pageNumber)
  );

  const response = data?.data?.data;

  const pageCount = Math.ceil(data?.data?.total_data / 10);

  const filter = response?.filter((value) => {
    return value.title.toLowerCase().includes(searchText?.toLowerCase());
  });

  return (
    <>
      <ModalCreate isOpen={isToggle} onClose={handleClose} refetch-={refetch} />
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
        {isLoading && <CatalogMagic />}
        <Box display="flex" flexWrap="wrap" gap="3em">
          {filter !== undefined &&
            filter?.map((val, id) => (
              <DiaryCard
                refetch={refetch}
                key={id}
                title={val.title}
                note={val.content}
                idDiary={val.id}
                date={val.updated_at}
              />
            ))}
        </Box>
        <PaginationFix count={pageCount} refetch={refetch} />
      </Box>
    </>
  );
}
