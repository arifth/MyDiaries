import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { WORD_TYPED } from "../redux/searchSlice";

export default function PaginationFix({ count }) {
  const dispatch = useDispatch();
  const totalPage = [];
  console.log(count);
  for (let i = 0; i < count; i++) {
    totalPage.push(i);
  }

  const handleCLick = (id) => {
    dispatch(WORD_TYPED(id));
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Box
        width="60vw"
        display="flex"
        height="10"
        gap="1em"
        justifyContent="space-between"
      >
        {totalPage.map((button, id) => (
          <Button variant="solid" onClick={() => handleCLick(id)}>
            {button + 1}
          </Button>
        ))}
      </Box>
    </Box>
  );
}
