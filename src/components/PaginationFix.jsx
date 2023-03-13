import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { NUMBER_CLICKED } from "../redux/searchSlice";
import { useQueryClient } from "react-query";

export default function PaginationFix({ count, refetch }) {
  const query = useQueryClient();
  const dispatch = useDispatch();
  const totalPage = [];
  console.log(count);
  for (let i = 0; i < count; i++) {
    totalPage.push(i);
  }

  const handleCLick = (id) => {
    dispatch(NUMBER_CLICKED(2));
    query.invalidateQueries("listCards");
    // refetch();
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Box width="60vw" display="flex" height="10" gap="1em">
        {totalPage.map((button, id) => (
          <Button variant="solid" onClick={() => handleCLick(id)}>
            {button + 1}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
